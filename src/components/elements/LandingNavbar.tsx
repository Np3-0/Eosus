import { useThemeStore } from "../../store/ThemeStore";
import { navbarItems } from "../../utils/navbar_items";
import BtnLink from "../shared/BtnLink";
import Container from "../shared/Container";
import NavItem from "../shared/NavItem";
import MoonSVG from "../../assets/MoonSVG";
import SunSVG from "../../assets/SunSVG";

export default function Navbar() {
    const { toggleTheme, theme } = useThemeStore();

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
                            {navbarItems[0].map((item, key) => (
                                <NavItem href={item.href} text={item.text} key={key}/>
                            ))}
                        </ul>
                        
                        {/* Call to action button */}
                        
                        <div className="lg:min-w-max flex items-center sm:w-max w-full pb-6 lg:pb-0 border-b border-box-border lg:border-0 px-6 lg:px-0">
                            <BtnLink text="Get Started!" href="/signup" className=""/>
                        </div>  
                    
                    {/* Light/Dark Mode Switch */}
                    <div className="min-w-max flex items-center gap-x-3 mx-4">
                            <button onClick={toggleTheme} className="outline-hidden flex relative text-heading-2 rounded-full p-2 lg:p-3 
                                                                    cursor-pointer hover:bg-platinum duration-300 ease-linear"
                            >
                                {theme === "dark" ? <MoonSVG /> : <SunSVG />}
                            </button>
                    </div>
                    </div>
                </nav>
            </Container>
        </header>
    );
}