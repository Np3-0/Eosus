import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import getPosts from "../../utils/posts/getPosts.ts";
import updateProfile from "../../utils/updateProfile.ts";
import deleteProfile from "../../utils/deleteProfile.ts";
import Layout from "../Layout.tsx";
import Container from "../shared/Container.tsx";
import Title from "../shared/Title.tsx";
import Post from "../shared/Post.tsx";
import InputGroup from "../shared/InputGroup.tsx";
import LocationInput from "../shared/LocationInput.tsx";
import Button from "../shared/Button.tsx";
import Paragraph from "../shared/Paragraph.tsx";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState(Array);
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
        const fetchData = async () => {
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

            const fetchedPosts = await getPosts("own");
            setPosts(fetchedPosts ?? []);
        };

        fetchData();
    }, [user]);

    return (
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <Container className="min-h-screen">
                <div className="mt-36 w-full">
                    <Title className="text-center"><span className="text-transparent bg-clip-text bg-gradient-to-r from-cordovan to-gr-orange">Hi, {userObj.name}</span></Title>

                    {/* Posts Section */}
                    <Title className="mt-12">Your Posts</Title>
                    <div className="mt-12 grid lg:grid-cols-2 lg:gap-x-4 items-center justify-baseline" id="posts">
                        {posts.length > 0 && posts.map((post: any) => (
                            <Post
                                key={post.id}
                                title={post.title}
                                content={post.content}
                                type={post.type}
                                subType={post.subType}
                                image={post.image}
                                latitude={post.latitude}
                                longitude={post.longitude}
                                townName={post.townName}
                                author={post.author}
                                timestamp={post.timestamp}
                            />
                        ))}
                    </div>
                </div>
                {/* Settings Section */}
                <div className="my-12" id="settings">
                    <Title className="mt-12 text-left">Your Settings</Title>
                    <div className="flex flex-col justify-center items-center mt-12 p-5 sm:p-6 w-full max-w-4xl mx-auto rounded-3xl bg-box-bg shadow-lg shadow-box-shadow">
                        <form className="w-full text-heading-2">
                            <div className="flex flex-col justify-center gap-y-6 w-full max-w-2xl mx-auto text-heading-2 text-2xl font-semibold">
                                <InputGroup name="email" type="email" value={userObj.email} required={true} disabled={true} onChange={(e) => setUserObj({ ...userObj, email: e.target.value })} />
                                <InputGroup name="name" value={userObj.name} required={true} onChange={(e) => setUserObj({ ...userObj, name: e.target.value })} />
                                <LocationInput value={userObj.location || ""} onChange={(e) => setUserObj({ ...userObj, location: e.target.value })} />
                                <Button onClick={async (e) => {
                                    e.preventDefault();
                                    try {
                                        if (user) {
                                            await updateProfile({
                                                email: userObj.email,
                                                name: userObj.name,
                                                location: userObj.location ?? "N/A",
                                                privacy: userObj.privacy,
                                                img: userObj.img
                                            });
                                            alert("Profile updated successfully!");
                                            navigate(0);
                                        }
                                    } catch (err) {
                                        console.error("Error updating profile:", err);
                                        alert("There was an error updating your profile. Please try again.");
                                    }
                                }} className="min-w-max text-white transform transition duration-300 hover:scale-[1.02] mt-8">
                                    Update Profile
                                </Button>
                            </div>
                        </form>
                    </div>
                    {/* Delete Profile Section */}
                    <Title className="mt-18">Delete Account</Title>
                    <Paragraph className="mt-4">
                        Clicking this button will delete all saved data from your account, including location, posts, comments, and AI usage. This process is irreversible.
                    </Paragraph>
                    <div className="flex justify-center my-6">
                        <Button 
                            className="min-w-max text-white text-xl transform transition duration-300 hover:scale-[1.05] py-3 px-12 font-bold"
                            onClick={async () => {
                                const confirm = prompt("Are you sure you want to delete your account? Type 'DELETE' to confirm.");
                                if (confirm !== 'DELETE') {
                                    alert("Profile deletion cancelled.");
                                    return;
                                }
                                deleteProfile(navigate);
                            }}
                        >
                            Delete Account
                        </Button>
                    </div>
                </div>
            </Container>
        </Layout>
    )
};
