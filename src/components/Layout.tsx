import type { UserObj } from "../utils/userObj";
import Footer from "./elements/Footer";
import Navbar from "./elements/Navbar";

interface LayoutProps {
    navType: number;
    userObj?: UserObj;
    children: React.ReactNode;
}

export default function Layout({ navType, userObj = {}, children }: LayoutProps) {
    
    return (
        <>
            <Navbar type={navType} userObj={userObj}/>

            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">{children}</main>
            
            <Footer type={navType}/>
        </>
    );
}