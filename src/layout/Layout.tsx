import React from "react";
import clsx from "clsx";
import { ThemeContext } from "../context/ThemeContext";
import Header from "./Header";
const Layout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    const { theme } = React.useContext(ThemeContext)
    return (
        <div className={clsx('min-h-[100vh] w-full h-full ', {
            "bg-[#FAFAFA] text-black": theme == "light",
            "bg-[#202C36] text-white": theme == "dark"
        })}>
            <Header />
            <main className='container mb:max-w-none mt-12'>
                                {children}
            </main>
        </div >
    )
}
export default Layout