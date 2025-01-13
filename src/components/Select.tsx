import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import clsx from "clsx";
interface SelectProps {
    text: string,
    items: string[],
    type:  string,
    handleClick: (type: string, value: string) => void
}
export default function Select({ text, items, type, handleClick }: SelectProps): React.JSX.Element {
    const { theme } = React.useContext(ThemeContext)
    const [show, setShow] = React.useState<boolean>(false)
    const selectItem = (e: React.MouseEvent<HTMLSpanElement>) => {
        const value = (e.target as HTMLSpanElement).textContent || ""
        handleClick(type, value)
    }
    return (
        <div onClick={(e) => { e.stopPropagation(); setShow(!show) }} className={clsx('cursor-pointer relative flex items-center justify-between gap-4 px-6 py-4', {
            "bg-white": theme == "light",
            "bg-[#2B3844]": theme == "dark"
        })}>
            <span className='text-[0.875rem]'>{text}</span>
            <i className={clsx('w-3 h-3 block', {
                "bg-white": theme == "dark",
                "bg-[#2B3844]": theme == "light",
                "rotate-45": show,
                "rotate-0": !show

            })} style={{
                mask: "url(./assets/chevon.svg) center/cover no-repeat",
                WebkitMask: "url(./assets/chevon.svg) center/cover no-repeat",
            }}></i>
            <div className={clsx('w-full h-fit absolute top-[110%] py-2 px-6 left-0  flex-col', {
                "bg-white": theme == "light",
                "bg-[#2B3844]": theme == "dark",
                "flex": show,
                "hidden": !show
            })} >
                {
                    items.map((item, index) => <span key={index} onClick={e => selectItem(e)} className='py-2 cursor-pointer'>{item}</span>
                    )
                }
            </div>
        </div>
    )
}