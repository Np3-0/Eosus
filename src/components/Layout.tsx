import Footer from "./elements/Footer";
import Navbar from "./elements/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({children }: LayoutProps) {
    
    return (
        <>
            <Navbar />

            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">{children}</main>
            
            <Footer />
        </>
    );
}