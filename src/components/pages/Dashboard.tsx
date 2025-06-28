import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import Layout from "../Layout";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    console.log(user?.photoURL);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            if (!firebaseUser) {
                navigate("/signup");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    if (loading) return <h1 className="text-center text-3xl mt-20 text-semibold">Loading...</h1>;
    if (!user) return null; // Redirecting

    const userObj = {
        img: user.photoURL ?? undefined,
        email: user.email ?? undefined,
        name: user.displayName ?? "User",
    };

    return (
        <Layout navType={1} userObj={userObj}>
            
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-heading-1 text-5xl">Hello, {userObj.name}</h1>
                
            </div>
        </Layout>
    );
}