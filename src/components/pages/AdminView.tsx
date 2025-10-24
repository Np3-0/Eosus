import { useState, useEffect } from "react";
import { auth, db } from "../../config/firebase.ts";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import checkUserStatus from "../../utils/checkUserStatus.ts";
import getReportedItems from "../../utils/posts/getReportedItems.ts";
import Layout from "../Layout.tsx";
import Container from "../shared/Container.tsx";
import Title from "../shared/Title.tsx";
import Paragraph from "../shared/Paragraph.tsx";
import PostComment from "../shared/PostComment.tsx";
import Post from "../shared/Post.tsx";
import Button from "../shared/Button.tsx";
import deleteProfile from "../../utils/deleteProfile.ts";

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
                console.log(docSnap.data());
                const data = {
                    comment: {
                        comment: docSnap.data().comment,
                        timestamp: docSnap.data().timestamp,
                        creator: docSnap.data().author,
                        userId: docSnap.data().userId,
                        img: docSnap.data().img
                    },
                    postId: postId
                };
                return data;
            }
        }
        return null;
    }

    async function handleReport(item: any, action: string) {
        // Handle the report action (e.g., take action or dismiss report)
        if (action === "delete" || action === "ban") {
            const itemRef = item.type === "post" ? doc(db, "posts", item.reportedID) : doc(db, "posts", item.postId, "comments", item.reportedID);
            await deleteDoc(itemRef);
        } if (action === "ban") {
            deleteProfile(navigate, item.reportedUser);

        }
        const reportRef = doc(db, "reports", item.id);
        await deleteDoc(reportRef);
        setReportedItems(reportedItems.filter((i) => i.id !== item.id));
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
            <Container className="mt-48 mb-12 min-h-screen flex flex-col items-center">
                <Title>Admin View</Title>
                <Paragraph className="ml-2 lg:ml-0">Welcome to the admin panel. Here you can manage users and content.</Paragraph>
                <section className="w-full mt-24">
                    <Title>Reported Items</Title>
                    <div className="grid lg:grid-cols-2">
                        {reportedItems.length === 0 ? (
                            <Paragraph>No reported items at the moment.</Paragraph>
                        ) : (
                            reportedItems.map((item, index) => (
                                <div key={index} className="p-4 m-2">
                                    {item.type == "post" && item.details ? (
                                        <div className="mb-8">
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
                                                menuEnabled={false}
                                            />
                                        </div>
                                    ) : item.type == "comment" && item.details ? (
                                        <div className="mt-12 mb-8">
                                            <PostComment comment={item.details.comment} index={index} postId={item.details.postId} />
                                        </div>
                                    ) : (
                                        <Paragraph>Item details not found.</Paragraph>
                                    )}

                                    <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-y-0 justify-between text-white font-semibold">
                                        <Button 
                                            className="transform transition hover:scale-[1.05]" 
                                            onClick={() => handleReport(item, "delete")}
                                        >
                                            Delete Content
                                        </Button>
                                        <Button 
                                            className="transform transition hover:scale-[1.05]" 
                                            onClick={() => handleReport(item, "ban")}
                                        >
                                            Reset User
                                        </Button>
                                        <Button 
                                            className="transform transition hover:scale-[1.05]" 
                                            onClick={() => handleReport(item, "dismiss")}
                                        >
                                            Dismiss Report
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </Container>
        </Layout>
    );
}