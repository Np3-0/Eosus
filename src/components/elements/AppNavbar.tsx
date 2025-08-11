import { useState } from "react";
import { useThemeStore } from "../../store/ThemeStore";
import type { UserObj } from "../../utils/userObj";
import { navbarItems } from "../../utils/navbar_items";
import Container from "../shared/Container";
import NavItem from "../shared/NavItem";
import MoonSVG from "../../assets/MoonSVG";
import SunSVG from "../../assets/SunSVG";
import DropDown from "../shared/DropDown";
import HamburgerSVG from "../../assets/HamburgerSVG";
import { useNavigate } from "react-router-dom";

interface AppNavbarProps {
    userObj: UserObj | null;
}

export default function AppNavbar({ userObj }: AppNavbarProps) {
    const { toggleTheme, theme } = useThemeStore();
    const [imgError, setImgError] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    
    return (
        <header className="absolute inset-x-0 top-0 z-50 py-6">
            <Container>
                <nav className="w-full flex justify-between items-center relative">
                    {/* Logo and title */}
                    <div className="min-w-max inline-flex relative">
                        <a className="relative flex items-center gap-3">
                            <img src="/eosus_logo.svg" alt="Eosus Logo" className="w-10 h-10"/>
                            <div className="inline-flex text-lg font-semibold text-heading-1">Eosus</div>
                        </a>
                    </div>

                    {/* Navbar items */}
                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <ul className="flex items-center gap-6 text-lg text-heading-2">
                            {navbarItems[1].map((item, key) => (
                                <NavItem href={item.href} text={item.text} key={key}/>
                            ))}
                        </ul>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <button 
                            onClick={toggleTheme} 
                            className="outline-hidden flex relative text-heading-2 rounded-full p-2 lg:p-3 
                                     cursor-pointer hover:bg-platinum duration-300 ease-linear"
                        >
                            {theme === "dark" ? <MoonSVG /> : <SunSVG />}
                        </button>

                        {/* User dropdown */}
                        <div className="relative">
                            <button 
                                className="outline-hidden flex relative text-heading-2 rounded-full p-2 lg:p-3 
                                         cursor-pointer hover:bg-platinum duration-300 ease-linear"
                                onClick={() => setIsExpanded(!isExpanded)}
                            >
                                {userObj?.img && !imgError ? (
                                    <img
                                        src={userObj?.img}
                                        className="w-8 h-8 rounded-full"
                                        onError={() => setImgError(true)}
                                        alt="Profile"
                                    />
                                ) : (
                                    <p>Not yet</p>
                                )}
                            </button>
                            {isExpanded && (
                                <div className="absolute right-0 top-full mt-2">
                                    <DropDown name={userObj?.name} email={userObj?.email}/>
                                </div>
                            )}
                        </div>
                    </div>

                    <button 
                        type="button" 
                        className="lg:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-heading-2 rounded-full
                                 hover:bg-platinum focus:outline-none duration-300 ease-linear"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-controls="mobile-menu" 
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <HamburgerSVG />
                    </button>

                    {/* Collapsed navbar */}
                    <div 
                        className={`bg-box-bg lg:hidden absolute top-full left-0 w-full bg-body shadow-lg rounded-lg mt-2 
                                  transition-all duration-300 ease-in-out ${
                                      isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                                  }`}
                        id="mobile-menu"
                    >
                        <div className="p-4 space-y-4">
                            {/* Navbar items */}
                            <ul className="space-y-3">
                                {navbarItems[1].map((item, key) => (
                                    <li key={key}>
                                        <a 
                                            href={item.href}
                                            className="block py-2 px-3 text-heading-2 rounded-full hover:bg-platinum 
                                                     duration-300 ease-linear hover:text-cordovan"
                                        >
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="pt-4 border-t border-box-border">
                                <div className="flex items-center justify-between">
                                    <button 
                                        onClick={toggleTheme} 
                                        className="outline-hidden flex items-center gap-2 text-heading-2 rounded-full p-2 
                                                 cursor-pointer hover:bg-platinum duration-300 ease-linear"
                                    >
                                        {theme === "dark" ? <MoonSVG /> : <SunSVG />}
                                        <span className="text-sm">Toggle theme</span>
                                    </button>

                                    {/* Dropdown toggle */}
                                    <button 
                                        className="outline-hidden flex items-center gap-2 text-heading-2 rounded-full p-2 
                                                 cursor-pointer hover:bg-platinum duration-300 ease-linear"
                                        onClick={() => navigate("/profile")}
                                    >
                                        {/* {userObj?.img && !imgError ? (
                                            <img
                                                src={userObj?.img}
                                                className="w-6 h-6 rounded-full"
                                                onError={() => setImgError(true)}
                                                alt="Profile"
                                            />
                                        ) : (
                                            <UserSVG />
                                        )} */}
                                        <span className="text-sm">Account</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
};