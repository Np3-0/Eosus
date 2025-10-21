import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase.ts";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import Layout from "../Layout.tsx";
import Container from "../shared/Container.tsx";
import Title from "../shared/Title.tsx";
import Paragraph from "../shared/Paragraph.tsx";

export default function AdminView() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
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
                    }
                );
            }
        };
        fetchUserData();
    }, [user]);

    return (
        <Layout navType={1} img={userObj.img} name={userObj.name} email={userObj.email}>
            <Container className="mt-48 min-h-screen flex flex-col items-center">
                <Title>Admin View</Title>
                <Paragraph>Welcome to the admin panel. Here you can manage users and content.</Paragraph>
                <section className="w-full mt-24">
                    <Title>Reported Items</Title>
                </section>
            </Container>
        </Layout>
    );
}