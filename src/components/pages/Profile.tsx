import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import Container from "../shared/Container";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import checkUserStatus from "../../utils/checkUserStatus";
import getPosts from "../../utils/posts/getPosts";
import Title from "../shared/Title";
import Post from "../shared/Post";

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
        console.log(posts),
        <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
            <Container className="min-h-screen">
                <div className="mt-36 w-full">
                    <Title className="text-center"><span className="text-transparent bg-clip-text bg-gradient-to-r from-cordovan to-gr-orange">Hi, {userObj.name}</span></Title>
                    <Title className="mt-12">Your Posts</Title>
                    <div className="mt-12 grid lg:grid-cols-2 lg:gap-x-4 items-center justify-baseline">
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
            </Container>
        </Layout>
    )
};
