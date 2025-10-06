import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "../shared/Container";
import Title from "../shared/Title";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import checkUserStatus from "../../utils/checkUserStatus";
import Paragraph from "../shared/Paragraph";
import Button from "../shared/Button";
import promptAI from "../../utils/promptAI";
import SidebarLayout from "../sidebarLayout";

export default function AI() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [message, setMessage] = useState<string>("");
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
        fetchUserData();
    }, [user]);

    return (
        <SidebarLayout img={userObj.img} email={userObj.email} name={userObj.name}>
            <Container className="min-h-screen flex flex-col justify-center items-center sm:ml-64 px-4">
                <div className="flex flex-col items-center max-w-4xl w-full">
                    <Title>Meet Pranny</Title>
                    <img src="/ai_logo.svg" alt="Pranny" className="w-32 h-32 sm:w-48 sm:h-48 mb-4" />
                    <Paragraph className="font-semibold text-center mb-10">
                        An AI assistant programmed to help you stay alert with natural disasters.
                    </Paragraph>
                    <div className="w-full max-w-3xl">
                        <form 
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (message.trim() === "" || message.length > 500) {
                                    alert("Please enter a message within the parameters (max 500 characters).");
                                    return;
                                }
                                promptAI(message);
                                setMessage("");
                            }}
                            className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3
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
                                className="w-full py-3 outline-none bg-transparent" 
                            />
                            <Button 
                                type="submit"
                                className="min-w-max text-white transform transition duration-300 hover:scale-[1.02]"
                            >
                                <span className="relative z-[5]">Ask Pranny</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </SidebarLayout>
    );
}