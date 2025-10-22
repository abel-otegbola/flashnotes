'use client'
import { Moon, Sun } from "@solar-icons/react";
import { ReactElement, useEffect, useState } from "react";

interface Theme {
    id: string | number, img: ReactElement, title: string
}

type Themes = Array<Theme>


function ThemeSelector() {
    const [theme, setTheme] = useState(localStorage.theme || 'light')

    const themes: Themes = [
        { id: 1, img: <Sun size={20} />, title: "light" },
        { id: 2, img: <Moon size={20} />, title: "dark" },
    ]
    
    useEffect(() => {
        const root = document.documentElement;
        
        if(theme === 'light') {
            // Whenever the user explicitly chooses light mode
            localStorage.theme = 'light'
            root.style.colorScheme = 'light'
            root.setAttribute('data-theme', 'light')
        }
        else if(theme === 'dark') {
            // Whenever the user explicitly chooses dark mode
            localStorage.theme = 'dark'
            root.style.colorScheme = 'dark'
            root.setAttribute('data-theme', 'dark')
        }  
    }, [theme])
    
    useEffect(() => {
        // On page load, set the initial theme
        const savedTheme = localStorage.theme;
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            setTheme('light')
        }
    }, [])

    return (
        <button >                      
            {
            themes.map(item => {
                return (
                    <span 
                        key={item.id} 
                        className={`relative text-[16px] ${item.title === theme ? "block" : "hidden"}`} 
                        aria-label={"Theme setting changed to "+ theme} 
                        onClick={() => setTheme(item.title === "light" ? "dark" : "light" )} 
                    >{item.img}</span>
                )
            })}
        </button>
    )
}

export default ThemeSelector;