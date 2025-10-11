import {auth} from "../../config/firebase.ts";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import getAIChats from "../../utils/ai/getAIChats.ts";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import checkUserStatus from "../../utils/checkUserStatus.ts";

export default function Sidebar() {
    const navigate = useNavigate();
    const [chats, setChats] = useState<Array<{ id: string; message: string }>>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
                setUser(firebaseUser);
                if (firebaseUser) {
                    checkUserStatus(navigate);
                } else {
                    navigate("/signup");
                }
            });
            return () => unsubscribe();
        }, [navigate]);

    useEffect(() => {
        const fetchChats = async () => {
            if (!user) return;
            const fetchedChats = await getAIChats();
            console.log("Fetched chats:", fetchedChats);
            setChats(
                (fetchedChats ?? []).map((chat: { id: string; message?: string }) => ({
                    id: chat.id,
                    message: chat.message ?? ""
                }))
            );
        };
        fetchChats();
    }, []);

    return (
        <div className="w-64 bg-box-bg shadow-xl fixed h-full px-4 py-2 hidden lg:block">
            <div className="min-w-max inline-flex mb-4 pt-4">
                <a className="relative flex items-center gap-3">
                    <img src="/eosus_logo.svg" alt="Eosus Logo" className="w-10 h-10" />
                    <div className="inline-flex text-lg font-normal text-heading-1">Eosus</div>
                </a>
            </div>
            <hr className="text-heading-1 mb-3" />
            <ul className="mt-3">
                {chats.length === 0 ? (
                    <li className="mb-2 rounded-full text-heading-1 px-6 py-3 ">
                        <a href="/#" className="font-semibold">No chats found.</a>
                    </li>
                ) : (
                    <li className="mb-2 rounded-full hover:bg-platinum text-heading-1 hover:text-cordovan cursor-pointer px-6 py-3 transition-colors duration-300">
                        <a href="/#" className="font-semibold">Menu Item 1</a>
                    </li>
                )}
                
            </ul>
        </div>
    );
}