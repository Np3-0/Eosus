import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Container from "../shared/Container";
import Title from "../shared/Title";
import checkUserStatus from "../../utils/checkUserStatus";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import IconButton from "../shared/IconButton";
import LightningSVG from "../../assets/LightningSVG";

export default function Create() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [userObj, setUserObj] = useState<{ 
        name: string 
        img: string
        email: string
        privacy: boolean
        location: string | null
    }>({
        name: "",
        img: "",
        email: "",
        privacy: false,
        location: null
    });

    // splitting it into separate useEffects makes it work
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
                    setUserObj(docSnap.data() as { 
                        name: string; 
                        img: string; 
                        email: string; 
                        privacy: boolean; 
                        location: string | null
                    });
                }
            };
            fetchUserData();
        }, [user]);

    return(
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
    <Container className="h-screen flex flex-col mt-48 items-center">
        <Title className="text-center">Create a New Post</Title>
        <div className="flex flex-row items-center justify-center mt-12 gap-2">
            <IconButton className="px-6 py-3 transform transition hover:scale-[1.1]"><LightningSVG /></IconButton>
            <IconButton className="px-6 py-3 transform transition hover:scale-[1.1]"><LightningSVG /></IconButton>
            <IconButton className="px-6 py-3 transform transition hover:scale-[1.1]"><LightningSVG /></IconButton>
            <IconButton className="px-6 py-3 transform transition hover:scale-[1.1]"><LightningSVG /></IconButton>
            <IconButton className="px-6 py-3 transform transition hover:scale-[1.1]"><LightningSVG /></IconButton>
        </div>
    </Container>
</Layout>
    );
};
