import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { postItems } from "../items/post_items";

export default async function getPostCoords() {
    if (!auth.currentUser) {
        alert("Authentication failed. Please log in again.");
        return;
    }
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map(doc => {
        const data = doc.data() as { latitude: any; longitude: any; type: string };
        return {
            id: doc.id,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
            type: data.type
        };
    });

    const seenCoords: Record<string, number> = {};

    const modPosts = posts.map(post => {
        const key = `${post.latitude},${post.longitude}`;
        const count = seenCoords[key] || 0;
        seenCoords[key] = count + 1;

        const offset = count * 0.005 * (Math.random() > 0.5 ? 1 : -1);
        const postItem = postItems.find(item => item.title === post.type);
        const postColor = postItem ? postItem.color : "gray";

        return {
            id: post.id,
            latitude: post.latitude + offset,
            longitude: post.longitude + offset,
            type: post.type,
            color: postColor
        };
    });

    return modPosts;
};
