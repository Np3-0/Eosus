import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "../../config/firebase.ts";
import { doc, getDoc } from "firebase/firestore";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import promptAI from "../../utils/ai/promptAI.ts";
import saveAIChat from "../../utils/ai/saveAIChat.ts";
import getAIChats from "../../utils/ai/getAIChats.ts";
import Container from "../shared/Container.tsx";
import Title from "../shared/Title.tsx";
import Paragraph from "../shared/Paragraph.tsx";
import Button from "../shared/Button.tsx";
import SidebarLayout from "../SidebarLayout";
import AILoadingAnim from "../shared/AILoadingAnim.tsx";

export default function AILanding() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [chats, setChats] = useState<Array<{ id: string; messages: Array<string> }>>([]);
    const [userObj, setUserObj] = useState<{
        name: string;
        img: string;
        email: string;
        privacy: boolean;
        location: string | null;
    }>({
        name: "",
        img: "",
        email: "",
        privacy: false,
        location: null,
    });

    const getChats = async () => {
        const chats = await getAIChats();
        return chats;
    };

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
        if (!user) return;
        const fetchUserData = async () => {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserObj(
                    docSnap.data() as {
                        name: string;
                        img: string;
                        email: string;
                        privacy: boolean;
                        location: string | null;
                    });
            }
        };

        const fetchChats = async () => {
            const fetchedChats = await getChats();
            setChats(
                (fetchedChats ?? []).map((chat: { id: string; messages?: Array<string> }) => ({
                    id: chat.id,
                    messages: chat.messages ?? []
                }))
            );
        };

        fetchUserData();
        fetchChats();
    }, [user]);

    return (
        <SidebarLayout img={userObj.img} email={userObj.email} name={userObj.name} sidebarData={chats}>
            <Container className="min-h-screen flex flex-col justify-center items-center px-4">
                <div className="flex flex-col items-center max-w-4xl w-full">
                    <Title>Meet Pranny</Title>
                    <img src="/ai_logo.svg" alt="Pranny" className="w-32 h-32 sm:w-48 sm:h-48 mb-4" />
                    <Paragraph className="font-semibold text-center mb-10">
                        An AI assistant programmed to help you stay alert with natural disasters.
                    </Paragraph>

                    <div className="w-full max-w-3xl text-heading-1 mt-12">
                        {/* Message input*/}
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (message.trim() === "" || message.length > 500) {
                                    alert("Please enter a message within the parameters (max 500 characters).");
                                    return;
                                } else if (isMessageLoading) {
                                    return;
                                }
                                setIsMessageLoading(true);
                                const response = await promptAI([message]);
                                await saveAIChat(message, response);
                                const fetchedChats = await getChats();
                                setChats(
                                    (fetchedChats ?? []).map((chat: { id: string; messages?: Array<string> }) => ({
                                        id: chat.id,
                                        messages: chat.messages ?? []
                                    }))
                                );
                                const chatId = fetchedChats?.[fetchedChats.length - 1];
                                if (!chatId) {
                                    setIsMessageLoading(false);
                                    return;
                                }
                                navigate(`/ai/${chatId.id}`);
                                setMessage("");
                                setIsMessageLoading(false);

                            }}
                            className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-1
                                        shadow-lg shadow-box-shadow border border-box-border
                                        bg-box-bg rounded-full transition-all duration-200
                                        focus-within:bg-body focus-within:border-primary"
                        >
                            <input
                                type="text"
                                placeholder="What should I do during a flood?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="text-heading-3 w-full py-3 outline-none bg-transparent"
                            />
                            <Button
                                type="submit"
                                className="min-w-max text-white transform transition duration-300 hover:scale-[1.02]"
                            >
                                <span className="relative z-[5]">Ask Pranny</span>
                            </Button>
                        </form>
                    </div>
                    <div className="mt-6">
                        {isMessageLoading && <AILoadingAnim />}
                    </div>
                </div>
            </Container>
        </SidebarLayout>
    );
}