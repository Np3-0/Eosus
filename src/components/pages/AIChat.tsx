import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from 'react-markdown'
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import checkUserStatus from "../../utils/checkUserStatus";
import getAIChats from "../../utils/ai/getAIChats";
import SidebarLayout from "../SidebarLayout";
import Container from "../shared/Container";
import Button from "../shared/Button";
import promptAI from "../../utils/ai/promptAI";
import saveAIChat from "../../utils/ai/saveAIChat";
import getCurrentChat from "../../utils/ai/getCurrentChat";
import AILoadingAnim from "../shared/AILoadingAnim";


export default function AIChat() {
    const navigate = useNavigate();
    const { chatId } = useParams();
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [isMessageLoading, setIsMessageLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState<string>("");
    const [chat, setChat] = useState<Array<{ id: string; messages: Array<string> }>>([]);
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
            const fetchedChats = await getAIChats();
            const mappedChats = (fetchedChats ?? []).map((chat: { id: string; messages?: Array<string> }) => ({
                id: chat.id,
                messages: chat.messages ?? []
            }));
            setChats(mappedChats);

            if (chatId) {
                const index = mappedChats.findIndex((chat: { id: string }) => chat.id === chatId);
                setChat(mappedChats[index] ? [mappedChats[index]] : []);
            } else {
                setChat([]);
            }
        };

        fetchUserData();
        fetchChats();
    }, [user, chatId]);

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat]);

    return (
        <SidebarLayout img={userObj.img} email={userObj.email} name={userObj.name} sidebarData={chats}>
            <Container className="min-h-screen flex flex-col items-center px-4 py-8">
                <div className="flex flex-col w-full gap-y-6 mt-32 flex-1">
                    {chat[0]?.messages &&
                        chat[0].messages.map((msg, index) => {
                            const isLast = index === chat[0].messages.length - 1;
                            return (
                                <div
                                    key={index}
                                    ref={isLast ? lastMessageRef : undefined}
                                    className={`bg-box-bg shadow-xl mt-4 text-lg text-heading-2 px-6 py-4 rounded-xl ${index % 2 === 0 ? "self-end" : "self-start"}`}
                                >
                                    <img src={index % 2 === 0 ? userObj.img : "/ai_logo.svg"} alt="icon" className={`relative top-0 left-0 mr-2 mb-1 ${index % 2 === 0 ? "w-8 h-8" : "w-10 h-10"}`} />
                                    <div className="mt-4 mx-4 leading-loose">
                                        <Markdown>{msg}</Markdown>
                                    </div>
                                </div>
                            );
                        })
                    }
                    {isMessageLoading && (
                        <AILoadingAnim />
                    )}
                </div>
                <div className="w-full max-w-3xl text-heading-1 flex my-12">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (message.trim() === "" || message.length > 500) {
                                alert("Please enter a message within the parameters (max 500 characters).");
                                return;
                            }
                            setIsMessageLoading(true);
                            const prevMessages = chat[0]?.messages ?? [];
                            const updatedMessages = [...prevMessages, message];

                            let response = await promptAI(updatedMessages);
                            if (response.slice(0, 3) === "AI:") {
                                response = response.slice(3).trim();
                            }

                            await saveAIChat(message, response, chat[0].id);

                            const fetchedChat = await getCurrentChat(chat[0]?.id);
                            setChat(
                                (Array.isArray(fetchedChat) ? fetchedChat : []).map((chat: { id: string; messages?: Array<string> }) => ({
                                    id: chat.id,
                                    messages: chat.messages ?? []
                                }))
                            );
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
            </Container>
        </SidebarLayout>
    )
};

