'use client'
import { useState, type ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../assets/icons/logo";
import { useOutsideClick } from "../../customHooks/useOutsideClick";
import { Bell, Calendar, Home, IconProps, Logout, Server, Settings, UsersGroupTwoRounded } from "@solar-icons/react";

export interface Link {
    id: number; label: string; icon: ReactElement<IconProps>, link: string, subtext?: string
}

function Sidebar() {
    const [open, setOpen] = useState(false)
    const pathname = useLocation().pathname;

    const generalLinks: Link[] = [
        { id: 0, label: "Dashboard", icon: <Home size={20} />, link: "/account/dashboard" },
        { id: 1, label: "Tasks", icon: <Server size={20} />, link: "/account/tasks" },
        { id: 2, label: "Calendar", icon: <Calendar size={20} />, link: "/account/calendar" },
        { id: 3, label: "Teams", icon: <UsersGroupTwoRounded size={20} />, link: "/account/teams" },
    ]
    
    const otherLinks: Link[] = [
        { id: 0, label: "Notifications", icon: <Bell size={20} />, link: "/account/notifications" },
        { id: 1, label: "Settings", icon: <Settings size={20} />, link: "/account/settings" },
        { id: 2, label: "Logout", icon: <Logout size={20} />, link: "#" },
    ]
    const modalRef = useOutsideClick(setOpen, false)

    return (
        <div ref={modalRef} className="md:sticky top-0 left-0 h-screen md:w-[280px] w-0 md:p-4 ">
            <button className="flex flex-col justify-center items-center gap-1 w-10 h-10 sm:hidden z-[50]" onClick={() => setOpen(!open)}>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-dark-bg dark:bg-white rounded-[2px] ${open ? "rotate-[45deg] translate-y-[4.5px]" : "rotate-[0deg]"}`}></span>
                <span className={`duration-500 transition-all bg-dark-bg dark:bg-white rounded-[2px] ${open ? "py-[0px] w-[0px] h-[0px] translate-x-[-12px]" : "translate-x-[4px] py-[1px] px-[4px] w-[8px] h-[2px]"}`}></span>
                <span className={`w-[8px] h-[2px] py-[1px] px-[10px] duration-500 transition-all bg-dark-bg dark:bg-white rounded-[2px] ${open ? "rotate-[-45deg] translate-y-[-4.5px]" : "rotate-[0deg]"}`}></span>
            </button>
            <div className={`flex flex-col md:w-full w-[280px] md:h-full bg-white dark:bg-[#151515] h-[100vh] md:rounded-[20px] md:sticky fixed md:top-0 top-0 py-4 px-4 right-0 overflow-y-auto overflow-x-hidden z-[5] transition-all duration-700 ${open ? "translate-x-[0px] opacity-[1]": "translate-x-[400px] md:translate-x-[0px] md:opacity-[1] opacity-[0]"}`}>  
                <h1 className="flex items-center mb-10">
                    <LogoIcon className="text-primary 2xl:w-[40px] md:w-[32px] w-[24px]" />
                </h1>

                <div className="flex flex-col gap-2">
                    <p className="text-gray-400 mb-2">GENERAL</p>
                    {
                    generalLinks.map(link => {
                            return (
                            <Link key={link.id} onClick={() => setOpen(false)} to={ link.link} className={`relative flex items-center justify-between px-3 py-1 md:rounded-[6px] duration-300 font-medium ${pathname.includes(link.link) ? "bg-bg-gray-100 dark:bg-dark-bg-secondary border border-border-gray-100 dark:border-gray-700" : " hover:bg-gray-100 dark:hover:bg-dark-bg-secondary/50"}`}>
                                <div className="flex items-center gap-2">
                                    <span className="w-[30px] opacity-[0.6]">{link.icon}</span>
                                    <span className="flex-1 py-1 break-normal">{link.label} </span>
                                </div>
                                { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                            </Link>
                            )
                    })
                    }
                </div>
                
                <div className="flex flex-col gap-2 mt-6">
                    <p className="text-gray-400 mb-2">OTHERS</p>
                    {
                    otherLinks.map(link => {
                            return (
                            <Link key={link.id} onClick={() => setOpen(false)} to={ link.link} className={`relative flex items-center justify-between px-3 py-1 md:rounded-[6px] duration-300 font-medium ${pathname.includes(link.link) ? "bg-bg-gray-100 dark:bg-dark-bg-secondary border border-border-gray-100 dark:border-gray-700" : " hover:bg-gray-100 dark:hover:bg-dark-bg-secondary/50"}`}>
                                <div className="flex items-center gap-2">
                                    <span className="w-[30px] opacity-[0.6]">{link.icon}</span>
                                    <span className="flex-1 py-1 break-normal">{link.label} </span>
                                </div>
                                { link.subtext ? <span className="flex items-center justify-center bg-primary text-white text-[9px] rounded-full px-[6px]">{link.subtext}</span> : ""}
                            </Link>
                            )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar
