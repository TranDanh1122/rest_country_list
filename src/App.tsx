
import './App.css'
import clsx from 'clsx'
import { ThemeContext } from './context/ThemeContext'
import React from 'react'
import { v4 } from 'uuid'
import Select from './components/Select'
import { useDispatch, useSelector } from 'react-redux'
import { AppDisPatch, AppState } from './redux/store'
import { getCountry, setFilter } from './redux/countrySlicer'
function App() {
  const { theme, setTheme } = React.useContext(ThemeContext)
  const { filter, filteredCountries, loading, error } = useSelector((state: AppState) => state.country)
  const dispatch: AppDisPatch = useDispatch()
  const addFilter = (type: string, value: string) => {
    dispatch(setFilter({ ...filter, [type]: value }))
  }
  React.useEffect(() => {
    dispatch(getCountry())
  }, [])
  if (loading) return <>Loading...</>
  if (error) return <>Error</>
  return (
    <>
      <div className={clsx('min-h-[100vh] w-full h-full ', {
        "bg-[#FAFAFA] text-black": theme == "light",
        "bg-[#202C36] text-white": theme == "dark"
      })}>

        <header className={clsx(' sticky top-0 left-0 w-full  py-6 shadow-black/20 shadow-md ', {
          "bg-white": theme == "light",
          "bg-[#2B3844]": theme == "dark"
        })}>
          <div className='container mb:max-w-none flex items-center justify-between'>
            <h1 className='font-extrabold text-[1.5rem]'>Where in the world?</h1>
            <span onClick={() => setTheme(theme == "light" ? "dark" : "light")} className='flex items-center justify-start gap-2 font-semibold'>
              <i className={clsx('w-4 h-4 block', {
                "bg-black": theme == "light",
                "bg-white": theme == "dark"
              })} style={{ mask: 'url(./assets/moon.svg) center / cover no-repeat', WebkitMask: 'url(./assets/moon.svg) center / cover no-repeat' }}></i>
              Dark Mode
            </span>
          </div>
        </header>
        <main className='container mb:max-w-none mt-12'>
          <div className='flex justify-between items-center'>
            <div className={clsx('relative  max-w-[480px] flex items-center justify-start shadow-md', {
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
              <input type="text" className='text-[0.875rem] leading-5 py-5 w-full outline-none border-none ' />
            </div>
            <div className='flex items-center justify-start gap-4'>
              <Select key={v4()} text="Filter by Region" items={["Africa", "America", "Asia", "Europe", "Oceania"]} type="region" handleClick={addFilter} />
              <Select key={v4()} text="Sorted By" items={["name", "population"]} type="sortBy" handleClick={addFilter} />
              <Select key={v4()} text="Order" items={["Asc", "Desc"]} type="order" handleClick={addFilter} />
            </div>
          </div>
          <div className='flex flex-wrap items-center justify-between'>
            {
              filteredCountries.map((country: Country) => <div className='w-1/4 h-fit'>
                <img src={country.flag} alt={country.name} className='w-full h-full object-cover aspect-video' />
                <h2 className='font-extrabold text-[1.125rem] leading-6'>{country.name}</h2>
                <div className='font-light text-[0.875rem] leading-4'>
                  <span><strong>Population:</strong>{country.population}</span>
                  <span><strong>Region:</strong>{country.region}</span>
                  <span><strong>Capital:</strong>{country.capital}</span>
                </div>
              </div>)

            }
          </div>
        </main >
      </div >
    </>
  )
}

export default App
