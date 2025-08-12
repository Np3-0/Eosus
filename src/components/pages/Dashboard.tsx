import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import checkUserStatus from "../../utils/checkUserStatus";
import Layout from "../Layout";
import Post from "../shared/Post";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
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
    const navigate = useNavigate();    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        setLoading(false);
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

    if (loading) return <h1 className="text-center text-3xl mt-20 text-semibold">Loading...</h1>;
    if (!user) return null; // Redirecting
    
    return (
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <div className="mt-24 flex flex-col items-center justify-baseline h-screen">
                <Post />
            </div>
        </Layout>
    );
}