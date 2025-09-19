import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../../config/firebase";
import type { User } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchDownloadURL from "../../utils/fetchDownloadURL";
import checkUserStatus from "../../utils/checkUserStatus";
import Layout from "../Layout";
import Container from "../shared/Container";
import Title from "../shared/Title";
import TypeSelection from "../sections/createSections/TypeSelection";
import CreatePost from "../sections/createSections/CreatePost";
import uploadPost from "../../utils/posts/uploadPost";

type PostData = {
    title: string;
    content: string;
    type: string;
    subType: string;
    image: File | string | null;
    lat: number;
    long: number;
    townName: string | null;
};

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
        image: File | string | null;
        lat: number;
        long: number;
        townName: string | null;
    }>({
        title: "",
        content: "",
        type: "",
        subType: "",
        image: null,
        lat: 0,
        long: 0,
        townName: null,
    });

    const handleChange = (updatedData: typeof postData) => {
        setPostData(updatedData);
    };

    const fullReset = () => {
        setPostData({
            title: "",
            content: "",
            type: "",
            subType: "",
            image: null,
            lat: 0,
            long: 0,
            townName: null,
        });
        setIsInTypeSection(true);
    }

    const submitData = async (postData: PostData) => {
        if (!(postData.image instanceof File)) {
            return;
        }
        const date = Date.now();
        const filePath = `photos/${user?.uid}/${date}`;
        const storageRef = ref(storage, filePath);
        if (postData.image) {
            try {
                await uploadBytes(storageRef, postData.image);
                const url = await fetchDownloadURL(filePath);

                // a copy is made because react doesnt update the data in time
                const updatedPostData = { ...postData, image: url };
                await uploadPost({ postData: updatedPostData, date });
                navigate("/dashboard");
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("An error occurred while processing your request. Please reload the page and try again.")
            }
        }
    }

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

    return (
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <Container className="min-h-screen flex flex-col mt-48 items-center">
                <Title className="text-center">Create a New Post</Title>
                {isInTypeSection ?
                    <TypeSelection postData={postData} changeHandler={handleChange} onComplete={() => setIsInTypeSection(false)} />
                    : <CreatePost postData={postData} changeHandler={handleChange} reset={fullReset} submitData={submitData} />}
            </Container>
        </Layout>
    );
}