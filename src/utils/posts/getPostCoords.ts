import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import getPosts from "./getPosts";
import { postItems } from "../items/post_items";

export default async function getPostCoords() {
    type post = {
        author: string;
        content: string;
        title: string;
        id: string;
        latitude: string;
        longitude: string;
        type: string;
        subType: string;
        timestamp: number;
        townName: string;
        image: string;
    }
    
    if (!auth.currentUser) {
        alert("Authentication failed. Please log in again.");
        return;
    }

    const posts = await getPosts("recent") as post[];
    if (!posts || posts.length === 0) return null;

    const seenCoords: Record<string, number> = {};

    const modPosts = posts.map((post: post) => {
        const key = `${post.latitude},${post.longitude}`;
        const count = seenCoords[key] || 0;
        seenCoords[key] = count + 1;

        const offset = count * 0.005 * (Math.random() > 0.5 ? 1 : -1);
        const postItem = postItems.find(item => item.title === post.type);
        const postColor = postItem ? postItem.color : "gray";

        return {
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.author,
            timestamp: post.timestamp,
            latitude: Number(post.latitude) + offset,
            longitude: Number(post.longitude) + offset,
            type: post.type,
            subType: post.subType,
            image: post.image,
            townName: post.townName,
            color: postColor,
        };
    });

    return modPosts;
};
