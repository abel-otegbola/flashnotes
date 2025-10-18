'use client'
import { Moon, Sun, Tablet } from "@solar-icons/react";
import { ReactElement, useEffect, useState } from "react";

interface Theme {
    id: string | number, img: ReactElement, title: string
}

type Themes = Array<Theme>


function ThemeSelector() {
    const [theme, setTheme] = useState(localStorage.theme)

    const themes: Themes = [
        { id: 0, img: <Tablet size={20} />, title: "System" },
        { id: 1, img: <Sun size={20} />, title: "light" },
        { id: 2, img: <Moon size={20} />, title: "dark" },
    ]
    useEffect(() => {
        if(theme === 'light') {
            // Whenever the user explicitly chooses light mode
            localStorage.theme = 'light'
        }
        else if(theme === 'dark') {
            // Whenever the user explicitly chooses dark mode
            localStorage.theme = 'dark'
        }  
        else {
            // Whenever the user explicitly chooses to respect the OS preference
            localStorage.removeItem('theme')
        }  
    }, [theme])
    
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
        if(!localStorage.theme) {
            setTheme("System")
        }
    }, [theme])

    return (
        <button >                      
            {
            themes.map(item => {
                return (
                    <span key={item.id} className={`relative text-[16px] ${item.title === theme ? "block" : "hidden"}`} aria-label={"Theme setting changed to "+ theme} onClick={() => setTheme(item.title === "System" ? "light" : item.title === "light" ? "dark" : "System" )} >{item.img}</span>
                )
            })}
        </button>
    )
}

export default ThemeSelector;