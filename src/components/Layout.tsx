import Footer from "./elements/Footer";
import Navbar from "./elements/Navbar";

interface LayoutProps {
    navType: number;
    userImg?: string;
    children: React.ReactNode;
}

export default function Layout({ navType, userImg = "", children }: LayoutProps) {
    
    return (
        <>
            <Navbar type={navType} userImg={userImg}/>

            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">{children}</main>
            
            <Footer type={navType}/>
        </>
    );
}