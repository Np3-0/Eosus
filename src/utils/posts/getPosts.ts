import { auth, db } from "../../config/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getCoords } from "../getLocation";

export default async function getPosts(type: string) {
    if (!auth.currentUser) {
        alert("Authentication failed. Please log in again.");
        return;
    }
    const uid = auth.currentUser.uid;
    const postsRef = collection(db, "posts");
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map(doc => {
        const data = doc.data() as { latitude?: number; longitude?: number; [key: string]: any };
        return { id: doc.id, ...data };
    });

    if (type === "recent") {
        return posts.reverse();
    } else if (type === "location") {
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
        const distances: Float32Array = new Float32Array(posts.length);
        posts.forEach(post => {
            const [postLat, postLong] = [post.latitude, post.longitude];
            //implement haversine formula
        });

    } else if (type === "liked") {
        const userLikeDoc = collection(db, "users", uid, "likedPosts");
        const userLikeSnapshot = await getDocs(userLikeDoc);
        const likedPostIds = userLikeSnapshot.docs.map(doc => doc.id);
        return posts.filter(post => likedPostIds.includes(post.id)).reverse();
    }
};
