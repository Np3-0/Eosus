import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../Layout";
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
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <Container className="min-h-screen flex flex-col mt-48 items-center">
                <Title>Meet Pranny</Title>
                <img src="/ai_logo.svg" alt="Pranny" className="w-48 h-48 mb-4" />
                <Paragraph className="font-semibold">An AI assistant programmed to help you stay alert with natural disasters.</Paragraph>
                <div className="mt-10 w-3/4 flex">
                    <div className="flex sm:flex-row flex-col gap-5 w-full">
                        <form 
                            onSubmit={(e) => e.preventDefault()}
                            className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3
                                        shadow-lg shadow-box-shadow border border-box-border
                                        bg-box-bg rounded-full ease-linear focus-within:bg-body
                                        focus-within:border-primary"
                        >
                            <input
                                type="text"
                                placeholder="What should I do during a flood?"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                                className="w-full py-3 outline-none bg-transparent" />
                            <Button 
                                type="button" 
                                className="min-w-max text-white transform transition duration-300 hover:scale-[1.02]"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (message.trim() == "" || message.length > 500) {
                                        alert("Please enter a message.");
                                        return;
                                    }
                                    promptAI(message);
                                    setMessage("");
                                }}
                            >
                                <span className="relative z-[5]">Ask Pranny</span>
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}