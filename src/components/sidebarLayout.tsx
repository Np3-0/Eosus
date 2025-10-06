import AppNavbar from "./elements/AppNavbar";
import Footer from "./elements/Footer";

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

            <div className="flex flex-1 relative">
                <aside className="hidden md:block md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-gray-900 text-white shadow-lg z-40 pt-5">
                    <nav className="h-full overflow-y-auto">
                        <ul className="p-6 ml-6 space-y-4">
                            
                            <li className="hover:bg-gray-800 p-3 rounded transition-colors cursor-pointer">Menu Item 1</li>
                            <li className="hover:bg-gray-800 p-3 rounded transition-colors cursor-pointer">Menu Item 2</li>
                            <li className="hover:bg-gray-800 p-3 rounded transition-colors cursor-pointer">Menu Item 3</li>
                        </ul>
                    </nav>
                </aside>

                {/* Main content area */}
                <div className="flex-1 w-full">
                    <main>{children}</main>
                </div>
            </div>

            <div className="w-full sm:pl-64">
                <Footer type={1} />
            </div>
        </div>
    );
}