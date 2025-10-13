import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../assets/icons/logo";
import Button from "../button/button";

function Topbar() {
    const pathname = useLocation().pathname;

    return (
        <div className="flex justify-between items-center w-full md:px-9 p-4 z-[3]">
            <LogoIcon />
            
            <ul className="flex md:gap-4 items-center md:justify-start justify-between md:p-0 px-[3%] pt-1 border md:border-none border-transparent border-t-gray-300/[0.5] dark:border-t-gray-200/[0.08] md:static fixed bottom-0 left-0 z-20 md:bg-none md:w-auto w-full">
                {
                    [
                        { id: 0, title: "home", href: "/" },
                        { id: 1, title: "about us", href: "/about" },
                        { id: 2, title: "features", href: "/faetures" },
                        { id: 3, title: "contact us", href: "/help" },
                    ].map(link => (
                        <li key={link.id}>
                            <Link 
                                to={link.href} 
                                className={`font-medium p-4 rounded duration-300 ${pathname === link.href ? "text-primary" : "hover:md:text-primary"}`}
                            >
                                <span className="capitalize">{link.title}</span> 
                            </Link>
                        </li>
                    ))
                }
            </ul>

            <Button href="/auth/waitlist">Join waitlist</Button> 
        </div>
    )
}

export default Topbar
