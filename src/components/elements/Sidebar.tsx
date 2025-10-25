import { useEffect } from "react";
import { auth } from "../../config/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import checkUserStatus from "../../utils/checkUserStatus.ts";

interface SidebarProps {
    data: Array<{ id: string; messages: Array<string> }>;
}

export default function Sidebar({ data }: SidebarProps) {
    const navigate = useNavigate();

    {/* Check user status on mount */ }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                checkUserStatus(navigate);
            } else {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    return (
        <div className="w-64 bg-box-bg shadow-xl fixed h-full px-4 py-2 hidden lg:block overflow-y-auto">
            <div className="min-w-max inline-flex mb-4 pt-4">
                <a className="relative flex items-center gap-3">
                    <img src="/eosus_logo.svg" alt="Eosus Logo" className="w-10 h-10" />
                    <div className="inline-flex text-lg font-normal text-heading-1">Eosus</div>
                </a>
            </div>
            <hr className="text-heading-1 mb-3" />
            <ul className="mt-3">
                {data.length === 0 ? (
                    <li className="mb-2 rounded-full text-heading-1 px-6 py-3 ">
                        <a href="/#" className="font-semibold">No chats found.</a>
                    </li>
                ) : (
                    data.map((item) => (
                        <li
                            key={item.id}
                            className="mb-2 rounded-full text-heading-1 px-6 py-3 cursor-pointer hover:bg-cordovan hover:scale-[1.05] transform transition duration-300"
                            onClick={() => navigate(`/ai/${item.id}`)}
                        >
                            <a className="font-semibold">
                                {item.messages[0].length > 30 ? item.messages[0].substring(0, 30) + "..." : item.messages[0]}
                            </a>
                        </li>
                    ))
                )}

            </ul>
        </div>
    );
}