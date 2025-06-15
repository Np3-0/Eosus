import type { UserObj } from "../utils/userObj";
import Footer from "./elements/Footer";
import AppNavbar from "./elements/AppNavbar";
import LandingNavbar from "./elements/LandingNavbar";

interface LayoutProps {
    navType: number;
    userObj?: UserObj;
    children: React.ReactNode;
}

export default function Layout({ navType, userObj = {}, children }: LayoutProps) {
    
    return (
        <>
            {navType === 0 ? <LandingNavbar /> : <AppNavbar userObj={userObj} />}
            
            {/* Main content area */}

            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">{children}</main>
            
            <Footer type={navType}/>
        </>
    );
}