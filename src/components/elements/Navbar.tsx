import { useState } from "react";
import { useThemeStore } from "../../store/ThemeStore";
import { navbarItems } from "../../utils/navbar_items";
import { dropdownItems } from "../../utils/dropdown_items";
import BtnLink from "../shared/BtnLink";
import Container from "../shared/Container";
import NavItem from "../shared/NavItem";
import MoonSVG from "../../assets/MoonSVG";
import SunSVG from "../../assets/SunSVG";
import UserSVG from "../../assets/UserSVG";
import type { UserObj } from "../../utils/userObj";


interface NavbarProps {
    type: number;
    userObj?: UserObj;
}

export default function Navbar({ type, userObj }: NavbarProps) {
    const { toggleTheme, theme } = useThemeStore();
    const [imgError, setImgError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50 py-6">
            <Container>
                <nav className="w-full flex justify-between gap-6 relative">
                    {/* Image and title */}
                    <div className="min-w-max inline-flex relative">
                        <a className="relative flex items-center gap-3">
                            <img src="/eosus_logo.svg" alt="Eosus Logo" className="w-10 h-10"/>
                            <div className="inline-flex text-lg font-semibold text-heading-1">Eosus</div>
                        </a>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full lg:justify-between lg:items-center absolute top-full left-0 lg:static 
                                    lg:top-0 bg-body lg:bg-transparent border-x border-x-box-border lg:border-x-0 lg:h-auto h-0 overflow-hidden"
                    >
                        {/* Navbar items */}
                        <ul className="border-t border-box-border lg:border-t-0 px-6 lg:px-0 pt-6 lg:pt-0 flex flex-col lg:flex-row gap-y-4 
                                        gap-x-3 text-lg text-heading-2 w-full lg:justify-center lg:items-center"
                        >
                            {navbarItems[type].map((item, key) => (
                                <NavItem href={item.href} text={item.text} key={key}/>
                            ))}
                        </ul>
                        
                        {/* Call to action button */}
                        {type === 0 && (
                            <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-border lg:border-0 px-6 lg:px-0">
                                <BtnLink text="Get Started!" href="/signup" className=""/>
                            </div>
                        )}
                        
                    
                    {/* Light/Dark Mode Switch */}
                    <div className="min-w-max flex items-center gap-x-3 mr-4">
                            <button onClick={toggleTheme} className="outline-hidden flex relative text-heading-2 rounded-full p-2 lg:p-3 
                                                                    cursor-pointer hover:bg-platinum duration-300 ease-linear"
                            >
                                {theme === "dark" ? <MoonSVG /> : <SunSVG />}
                            </button>
                    </div>

                    {/* User Profile */}
                        {type === 1 && (
                            <div>
                                <button className="outline-hidden flex relative text-heading-2 rounded-full p-2 lg:p-3 
                                                    cursor-pointer hover:bg-platinum duration-300 ease-linear"
                                                    onClick={() => setIsExpanded(!isExpanded)}
                                >
                                    {userObj?.img && !imgError ? (
                                        <img
                                            src={userObj?.img}
                                            className="w-12 h-10 rounded-full"
                                            onError={() => setImgError(true)}
                                            alt="Profile"
                                        />
                                    ) : (
                                        <UserSVG />
                                    )}
                                </button>
                                {/* Dropdown Menu */}
                                { isExpanded && 
                                    <div className="bg-box-bg rounded-lg shadow-lg mt-2 px-4 py-2 z-50 absolute right-0 text-heading-1 divide-y-[2px] divide-platinum">
                                        <div className="px-4 py-3 text-sm">
                                            <div>{userObj?.name}</div>
                                            <div className="font-medium truncate">{userObj?.email}</div>
                                        </div>
                                        <ul className="py-2 text-sm" aria-labelledby="dropdownInformationButton">
                                            {dropdownItems.map((item, key) => (
                                                <li key={key}>
                                                    <a href={item.href} className="block px-4 py-2 hover:bg-platinum hover:rounded-full hover:text-cordovan">{item.text}</a>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-2">
                                            <a href="#" className="block px-4 py-2 text-sm hover:bg-platinum hover:rounded-full hover:text-cordovan">Sign out</a>
                                        </div>
                                    </div>
                                }
                            </div>
                        )}
                    </div>
                </nav>
            </Container>
        </header>
    );
}