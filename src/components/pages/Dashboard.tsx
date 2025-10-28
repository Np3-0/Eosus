import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import getPosts from "../../utils/posts/getPosts.ts";
import Layout from "../Layout.tsx";
import Post from "../shared/Post.tsx";
import Title from "../shared/Title.tsx";
import Container from "../shared/Container.tsx";
import Button from "../shared/Button.tsx";
import FilterDropDown from "../shared/FilterDropDown.tsx";

export default function Dashboard() {
    const navigate = useNavigate();    
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(Array);
    const [filterType, setFilterType] = useState<string>("recent");
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

            const fetchedPosts = await getPosts(filterType);
            setPosts(fetchedPosts ?? []);
        };
        
        fetchData();
    }, [user, filterType]);
    if (loading) return <h1 className="text-center text-3xl mt-20 text-semibold">Loading...</h1>;
    if (!user) return null; // Redirecting
    
    return (
    <Layout navType={1} img={userObj.img} email={userObj.email} name={userObj.name}>
        <Container className="min-h-screen">
            <div className="mt-12 flex flex-col items-center justify-baseline">
                {/* Lets user filter posts by location, recency, or liked */}
                <FilterDropDown 
                    items={["Recent", "Location", "Liked"]} 
                    className="self-start mt-12 " 
                    onConfirm={(value) => setFilterType(value)}
                />
                
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
                <Title className="text-center mt-12 mb-4 ">That's all the posts. Why not create one?</Title>
                <Button 
                    onClick={() => navigate("/create")} 
                    className="mt-4 mb-8 min-w-max text-white transform transition duration-300 hover:scale-[1.02] text-lg lg:text-xl"
                >
                    Create Post
                </Button>
            </div>
        </Container>
    </Layout>
);
}