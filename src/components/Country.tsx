import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
const Country = ({ country }: { country: Country }): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    return (
        <div className={clsx('w-[calc(25%-50px)] mb:w-full h-fit rounded-md shadow-md', {
            "bg-white": theme == "light",
            "bg-[#2B3844]": theme == "dark"
        })}>
            <NavLink to={`/${country.name}`} state={country}>
                <img loading="lazy" src={country.flag} alt={country.name} className='w-full h-full object-cover aspect-video' /></NavLink>
            <div className='p-6'>
                <NavLink to={`/${country.name}`} state={country}>  <h2 className='font-extrabold text-[1.125rem] leading-6 mb-4'>{country.name}</h2> </NavLink>
                <div className='font-light text-[0.875rem] leading-4 flex flex-col gap-3'>
                    <span><strong>Population:</strong>{country.population}</span>
                    <span><strong>Region:</strong>{country.region}</span>
                    <span><strong>Capital:</strong>{country.capital}</span>
                </div>
            </div>

        </div>)
}
export default Country
