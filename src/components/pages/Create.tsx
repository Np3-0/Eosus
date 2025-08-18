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
import { postItems } from "../../utils/items/post_items";
import Paragraph from "../shared/Paragraph";

export default function Create() {
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

    const [postData, setPostData] = useState<{
        title: string;
        content: string;
        type: string;
        image: string | null;
    }>({
        title: "",
        content: "",
        type: "",
        image: null,
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div className="flex flex-row items-start justify-center mt-12 gap-x-5 relative">
                        {postItems.map((item, key) => {
                            const itemValue = item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase();
                            const isSelected = postData.type === itemValue;
                            const isAnySelected = postData.type !== "";                    
                            
                            return (
                                <div className="flex flex-col items-center" key={key}>
                                    <label
                                        key={key}
                                        className={`flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out
                                            ${isAnySelected && !isSelected ? "opacity-30 scale-75" : "opacity-100 scale-100"}`}
                                    >
                                        <input
                                            type="radio"
                                            name="element"
                                            value={itemValue}
                                            className="hidden peer"
                                            onChange={(e) => {
                                                setPostData({ ...postData, type: e.target.value });
                                            }}
                                            checked={isSelected}
                                        />
                                        <div className={`flex flex-col items-center px-6 py-3 transform transition-all duration-300 hover:scale-[1.1] mb-2 rounded-xl
                                            ${isSelected ? "scale-110 shadow-lg" : "hover:bg-gray-100"}`}>
                                            <img src={item.href} className="w-12 h-12" alt={item.title} />
                                            <Paragraph className="text-center text-sm">
                                                {item.title}
                                            </Paragraph>
                                        </div>
                                    </label>
                                    <div className={`flex flex-col items-start gap-y-2 mt-5 ${isSelected ? "block" : "hidden"}`}>
                                        {item.subItems.map((subItem, subKey) => (
                                            <label key={subKey} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    value={subItem}                                     
                                                />
                                                <span className="ml-2 text-heading-3">{subItem}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Reset button to show all items again */}
                    {postData.type && (
                        <div className="flex justify-center mt-8">
                            <button
                                type="button"
                                onClick={() => 
                                    setPostData({ ...postData, type: "" })
                                    
                                }
                                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
                            >
                                Reset
                            </button>
                        </div>
                    )}
                </form>
            </Container>
        </Layout>
    );
}