import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../assets/icons/logo";
import Button from "../button/button";
import { useState } from "react";

function Topbar() {
    const pathname = useLocation().pathname;
    const [open, setOpen] = useState(false)

    return (
        <div className="flex justify-between items-center w-full md:px-9 p-4 z-[3] overflow-hidden">
            <div className="sm:w-[10%] text-start flex gap-2 items-center">
                <LogoIcon />
                <h3 className="text-[16px] font-bold bg-gradient-to-r bg-clip-text text-transparent from-primary to-fuchsia-400">Flashnotes</h3>
            </div>
            
            <ul className={`
                flex sm:flex-row flex-col md:gap-4 md:px-0 md:py-0 py-12 px-6 md:sticky fixed top-0 right-0 z-20 md:bg-none bg-white sm:w-auto h-full w-[75%] 
                ${open ? "translate-x-[0px]" : "sm:translate-x-[0] translate-x-[120%]"} duration-500
            `}>
                {
                    [
                        { id: 0, title: "home", href: "/" },
                        { id: 1, title: "about us", href: "/about" },
                        { id: 2, title: "features", href: "/features" },
                        { id: 3, title: "contact us", href: "/help" },
                    ].map(link => (
                        <li key={link.id} className="px-2 py-3">
                            <Link 
                                to={link.href} 
                                className={`font-medium md:p-4 p-4 duration-300 w-full ${pathname === link.href ? "text-primary" : "hover:md:text-primary"}`}
                            >
                                <span className="capitalize">{link.title}</span> 
                            </Link>
                        </li>
                    ))
                }
                <div className="flex flex-col gap-4 sm:hidden p-6 mt-16">
                    Have ideas to make flashnote better?
                    <Link to="/contact" className="text-primary">Message us</Link>
                </div>
            </ul>

            <Button href="/auth/waitlist" className="sm:flex hidden">Join waitlist</Button> 
            <button className="flex flex-col justify-center items-center gap-1 text-lg w-10 h-10 sm:hidden z-[50]" onClick={() => setOpen(!open)}>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-[#000] rounded-[2px] ${open ? "rotate-[45deg] translate-y-[4.5px]" : "rotate-[0deg]"}`}></span>
                <span className={`duration-500 transition-all bg-[#111] rounded-[2px] ${open ? "py-[0px] w-[0px] h-[0px] translate-x-[-12px]" : "translate-x-[4px] py-[1px] px-[4px] w-[8px] h-[2px]"}`}></span>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-[#222] rounded-[2px] ${open ? "rotate-[-45deg] translate-y-[-4.5px]" : "rotate-[0deg]"}`}></span>
            </button>
        </div>
    )
}

export default Topbar
