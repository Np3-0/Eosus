import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase.ts";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import getReportedItems from "../../utils/posts/getReportedItems.ts";
import Layout from "../Layout.tsx";
import Container from "../shared/Container.tsx";
import Title from "../shared/Title.tsx";
import Paragraph from "../shared/Paragraph.tsx";
import PostComment from "../shared/PostComment.tsx";
import Post from "../shared/Post.tsx";

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
    const [reportedItems, setReportedItems] = useState<Array<any>>([]);

    async function fetchItem(type: string, id: string, postId?: string) {
        if (type === "post") {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            }
        } else if (type === "comment") {
            const docRef = doc(db, "posts", postId!, "comments", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = {
                    comment: docSnap.data(),
                    postId: postId
                };
                return data;
                }
            }
            return null;
        }
        

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

        const fetchReportedItems = async () => {
            const items = (await getReportedItems()) as Array<{
                type: string;
                id: string;
                reportingUser: string;
                reportedID: string;
                postId: string;
            }>;

            setReportedItems(items ?? []);
            const detailsPromises = items.map(async (item) => {
                const details = item.type == "post" ? await fetchItem(item.type, item.reportedID) : await fetchItem(item.type, item.reportedID, item.postId);
                return { ...item, details };
            });
            const detailsResults = await Promise.all(detailsPromises);
            setReportedItems(detailsResults);
        };

        fetchUserData();
        fetchReportedItems();
    }, [user]);

    return (
        <Layout navType={1} img={userObj.img} name={userObj.name} email={userObj.email}>
            <Container className="mt-48 min-h-screen flex flex-col items-center">
                <Title>Admin View</Title>
                <Paragraph>Welcome to the admin panel. Here you can manage users and content.</Paragraph>
                <section className="w-full mt-24">
                    <Title>Reported Items</Title>
                    <div className="grid grid-cols-2">
                        {reportedItems.length === 0 ? (
                            <Paragraph>No reported items at the moment.</Paragraph>
                        ) : (
                            reportedItems.map((item, index) => (
                                <div key={index} className="border p-4 m-2">
                                    {item.type == "post" && item.details ? (
                                        <Post
                                            title={item.details.title}
                                            content={item.details.content}
                                            type={item.details.type}
                                            subType={item.details.subType}
                                            image={item.details.image}
                                            latitude={item.details.latitude}
                                            longitude={item.details.longitude}
                                            townName={item.details.townName}
                                            author={item.details.author}
                                            timestamp={item.details.timestamp}
                                        />
                                    ) : item.type == "comment" && item.details ? (
                                        
                                        <PostComment comment={item.details.comment} index={index} postId={item.details.postId}/>
                                    ) : (
                                        <Paragraph>Item details not found.</Paragraph>
                                    )}
                                    <Paragraph><strong>Item ID:</strong> {item.id}</Paragraph>
                                    <Paragraph><strong>Reported By:</strong> {item.reportingUser}</Paragraph>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </Container>
        </Layout>
    );
}