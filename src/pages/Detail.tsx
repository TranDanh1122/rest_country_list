import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
export default function Detail(): React.JSX.Element {
    const location = useLocation()
    const country: Country = location.state
    const { theme } = React.useContext(ThemeContext)
    const navigate = useNavigate();
    console.log(country.languages);

    if (!country) return <></>
    return (<div className="container mb:max-w-none ">
        <div onClick={() => navigate(-1)} className={clsx(" py-2 px-6  cursor-pointer flex w-fit items-center justify-start gap-4 rounded-md mt-10", {
            "bg-white text-[#111517]": theme == "light",
            "bg-[#2B3844] text-white": theme == "dark"
        })}>
            <i className={clsx("w-5 h-5 block", {
                "bg-[#111517]": theme == "light",
                "bg-white": theme == "dark"

            })} style={{ mask: "url(./assets/back.svg) center / cover no-repeat", WebkitMask: "url(./assets/back.svg) center /cover no-repeat" }}></i>
            Back
        </div >
        <div className="flex justify-between items-center mb:flex-col mt-10">
            <img src={country.flag} alt={country.name} className=" h-full object-cover aspect-auto w-2/5 mb:w-full" />
            <div className={clsx("w-2/5 mb:w-full", {
                "text-[#111517]": theme == "light",
                "text-white": theme == "dark"
            })}>
                <h1 className="font-extrabold text-[2rem] ">
                    {country.name}
                </h1>
                <div className="mt-6 flex justify-between items-start mb:flex-col">
                    <div className="flex flex-col justify-start gap-2">
                        <span><strong>Native Name:</strong> {country.nativeName}</span>
                        <span><strong>Population:</strong> {country.population}</span>
                        <span><strong>Region: </strong> {country.region}</span>
                        <span><strong>Sub Region: </strong> {country.subregion}</span>
                        <span><strong>Capital: </strong>{country.capital}</span>
                    </div>
                    <div className="flex flex-col justify-start gap-2 mb:mt-10">
                        <span><strong>Top Level Domain:</strong> {country.topLevelDomain}</span>
                        <span><strong>Currencies: </strong> {country.currencies.map(el => el.name)}</span>
                        <span><strong> Languages: </strong> {country.languages.map(el => el.name)}</span>
                    </div>
                </div>
                <div className="flex items-center flex-wrap justify-start gap-4 mt-16">
                    <strong className="text-left" >
                        Border Countries:
                    </strong>
                    {

                        country.borders?.map(border => <span className={clsx("py-2 px-6 border-[1px] border-solid border-[#2B3844]", {
                            "bg-[#2B3844]": theme == "dark",
                            "bg-white": theme == "dark",
                        })}>
                            {border}
                        </span>)
                    }

                </div>
            </div>
        </div>
    </div>)
}