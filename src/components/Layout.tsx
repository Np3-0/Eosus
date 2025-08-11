import Footer from "./elements/Footer";
import AppNavbar from "./elements/AppNavbar";
import LandingNavbar from "./elements/LandingNavbar";

interface LayoutProps {
    navType: number;
    img?: string;
    email?: string;
    name?: string;
    children: React.ReactNode;
}

export default function Layout({ navType, img, email, name, children }: LayoutProps) {

    return (
        <>
            {navType === 0 ? <LandingNavbar /> : <AppNavbar img={img ?? ""} email={email ?? ""} name={name ?? ""} />}
            
            {/* Main content area */}

            <main className="flex flex-col gap-y-20 md:gap-y-32 overflow-hidden">{children}</main>
            
            <Footer type={navType}/>
        </>
    );
}