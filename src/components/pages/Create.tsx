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
import TypeSelection from "../sections/createSections/typeSelection";
import CreatePost from "../sections/createSections/CreatePost";


export default function Create() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isInTypeSection, setIsInTypeSection] = useState<boolean>(true);
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

    const [postData, setPostData] = useState<{
        title: string;
        content: string;
        type: string;
        subType: string;
        image: string | null;
    }>({
        title: "",
        content: "",
        type: "",
        subType: "",
        image: null,
    });

    const handleChange = (updatedData: typeof postData) => {
        setPostData(updatedData);
    };

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
    
    console.log(postData);
    return (
        <Layout
            navType={1}
            img={userObj.img}
            email={userObj.email}
            name={userObj.name}
        >
            <Container className="h-screen flex flex-col mt-48 items-center">
                <Title className="text-center">Create a New Post</Title>
                {isInTypeSection ? <TypeSelection postData={postData} changeHandler={handleChange} onComplete={() => setIsInTypeSection(false)} /> : <CreatePost />}
            </Container>
        </Layout>
    );
}