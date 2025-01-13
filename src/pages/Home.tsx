import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import Select from "../components/Select";
import Country from "../components/Country";
import { v4 } from 'uuid'
import { getCountry, loadMore, setFilter } from "../redux/countrySlicer";
import { AppDisPatch, AppState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function Home(): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    const { filter, filteredCountries, loading, error, pagination } = useSelector((state: AppState) => state.country)
    const dispatch: AppDisPatch = useDispatch()
    const debound = React.useRef<number | null>(null)
    const addFilter = (type: string, value: string) => {

        dispatch(setFilter({ ...filter, [type]: value }))
    }
    React.useEffect(() => {
        dispatch(getCountry())
    }, [])
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (debound.current) clearTimeout(debound.current)
        debound.current = setTimeout(() => {
            dispatch(setFilter({ ...filter, search: e.target.value }))
        }, 200)
    }
    const lastPage = filter.page >= pagination.totalPages
    
    const handleLoadMore = () => {
        if (!lastPage)
            dispatch(loadMore())

    }
    if (loading) return <>Loading...</>
    if (error) return <>Error</>
    return (<>
        <div className='flex justify-between items-center mb:flex-col mb:gap-4'>
            <div className={clsx('relative  max-w-[480px] mb:w-full flex items-center justify-start shadow-md', {
                "bg-white": theme == "light",
                "bg-[#2B3844]": theme == "dark"
            })}>
                <span className='px-8 py-6 w-fit '>
                    <i className={clsx('w-[1.125rem] h-[1.125rem] block', {
                        "bg-[#848484]": theme == "light",
                        "bg-white": theme == "dark"
                    })} style={{
                        mask: "url(./assets/search.svg) center /cover no-repeat",
                        WebkitMask: "url(./assets/search.svg) center /cover no-repeat"
                    }}></i>
                </span>
                <input onChange={(e) => handleSearch(e)} type="text" className='text-[0.875rem] leading-5 py-5 w-full outline-none border-none ' />
            </div>
            <div className='flex items-center justify-start gap-4 mb:flex-col mb:w-full'>
                <Select key={v4()} text="Filter by Region" items={["Africa", "Americas", "Asia", "Europe", "Oceania"]} type="region" handleClick={addFilter} />
                <Select key={v4()} text="Sorted By" items={["name", "population"]} type="sortBy" handleClick={addFilter} />
                <Select key={v4()} text="Order" items={["Asc", "Desc"]} type="order" handleClick={addFilter} />
            </div>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-16 mb:flex-col mt-10'>
            {
                pagination.items.map((country: Country) => <Country key={v4()} country={country} />)

            }
        </div>
        {
            !lastPage && filteredCountries.length > 0
            && <div onClick={handleLoadMore} className={clsx("text-center mx-auto w-fit px-6 py-3 my-10 shadow-md cursor-pointer rounded-md", {
                "bg-[#848484]/20": theme == "light",
                "bg-white": theme == "dark"
            })}>
                Load More
            </div>
        }

    </>)
}