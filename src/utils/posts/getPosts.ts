import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { auth, db } from "../../config/firebase.ts";
import { getCoords } from "../getLocation.ts";
import haversine from "../math/haversine.ts";

export default async function getPosts(type: string) {
    // Ensure user is authenticated
    if (!auth.currentUser) {
        alert("Authentication failed. Please log in again.");
        return;
    }

    // gets the posts from firestore
    const uid = auth.currentUser.uid;
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map(doc => {
        const data = doc.data() as { latitude?: number; longitude?: number; author?: string; [key: string]: any };
        return { id: doc.id, ...data };
    });

    // returns posts, with recent ones first.
    if (type === "recent") {
        return posts.reverse();
    } else if (type === "location") {
        // returns posts based on where they are located, compared to the user
        const userDoc = await getDoc(doc(db, "users", uid));
        const userData = userDoc.data();
        if (!userData || !userData.location || userData.location === "N/A") {
            alert("Location data not found. Showing recent posts instead.");
            return posts.reverse();
        }
        const location = userData.location;
        const coords = await getCoords(location);
        if (coords === "N/A" || coords === "OVER") {
            alert("Could not fetch coordinates for your location. Showing recent posts instead.");
            return posts.reverse();
        }
        const { latitude, longitude } = coords as { latitude: number; longitude: number; name: string };
        const distances: Array<object> = [];

        posts.forEach(post => {
            const [postLat, postLong] = [post.latitude, post.longitude];
            const dist = haversine(latitude, longitude, Number(postLat), Number(postLong));
            distances.push({ ...post, distance: dist });
        });
        
        distances.sort((a: any, b: any) => a.distance - b.distance);
        return distances;

    } else if (type === "liked") {
        // returns posts that the user has liked
        const userLikeDoc = collection(db, "users", uid, "likedPosts");
        const userLikeSnapshot = await getDocs(userLikeDoc);
        const likedPostIds = userLikeSnapshot.docs.map(doc => doc.id);
        return posts.filter(post => likedPostIds.includes(post.id)).reverse();
    } else if (type === "own") {
        // returns posts by user, mainly for profile page
        return posts.filter(post => post.author === uid).reverse();
    }
};
