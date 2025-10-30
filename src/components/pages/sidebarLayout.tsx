import AppNavbar from "../elements/AppNavbar.tsx";
import Footer from "../elements/Footer.tsx";
import Sidebar from "../elements/Sidebar.tsx";

interface SidebarLayoutProps {
    img?: string;
    email?: string;
    name?: string;
    children: React.ReactNode;
    sidebarData: Array<{ id: string; messages: Array<string> }>;
}

export default function SidebarLayout({ img, email, name, children, sidebarData }: SidebarLayoutProps) {
    return (
        /* The same as Layout but with Sidebar included */
        <div className="min-h-screen flex flex-col bg-body">
            <AppNavbar img={img ?? ""} email={email ?? ""} name={name ?? ""} sidebarOpen={true} />

            <div className="flex">
                <Sidebar data={sidebarData}/>
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