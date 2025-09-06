import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getPosts() {
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Fetched posts:", posts);
    return posts;
};
