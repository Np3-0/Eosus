import AppNavbar from "./elements/AppNavbar";
import Footer from "./elements/Footer";
import Sidebar from "./elements/Sidebar";

interface SidebarLayoutProps {
    img?: string;
    email?: string;
    name?: string;
    children: React.ReactNode;
}

export default function SidebarLayout({ img, email, name, children }: SidebarLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-body">
            <AppNavbar img={img ?? ""} email={email ?? ""} name={name ?? ""} sidebarOpen={true} />

            <div className="flex">
                <Sidebar />
                <main className="w-full ml-0 lg:ml-54 xl:ml-12 flex flex-col items-center gap-y-20 md:gap-y-32 overflow-hidden transition-all duration-300">
                    <div className="w-full max-w-7xl px-4 md:px-8">
                        {children}
                    </div>
                </main>
            </div>
            
            <div className="w-full lg:ml-64 transition-all duration-300">
                <Footer type={1} />
            </div>
        </div>
    );
}