import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
const Header = React.memo((): React.JSX.Element => {
    const { theme, setTheme } = React.useContext(ThemeContext)
    return (
        <header className={clsx(' sticky top-0 left-0 w-full z-10 py-6 shadow-black/20 shadow-md ', {
            "bg-white": theme == "light",
            "bg-[#2B3844]": theme == "dark"
        })}>
            <div className='container mb:max-w-none flex items-center justify-between'>
                <NavLink to="/">
                    <h1 className='font-extrabold text-[1.5rem]'>Where in the world?</h1>

                </NavLink>
                <span onClick={() => setTheme(theme == "light" ? "dark" : "light")} className='flex items-center justify-start gap-2 font-semibold'>
                    <i className={clsx('w-4 h-4 block', {
                        "bg-black": theme == "light",
                        "bg-white": theme == "dark"
                    })} style={{ mask: 'url(./assets/moon.svg) center / cover no-repeat', WebkitMask: 'url(./assets/moon.svg) center / cover no-repeat' }}></i>
                    Dark Mode
                </span>
            </div>
        </header>
    )
})
export default Header