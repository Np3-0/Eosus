import { auth, db } from "../../config/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getCoords } from "../getLocation";
import haversine from "../math/haversine";

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
        const distances: Array<object> = [];

        posts.forEach(post => {
            const [postLat, postLong] = [post.latitude, post.longitude];
            const dist = haversine(latitude, longitude, Number(postLat), Number(postLong));
            distances.push({ ...post, distance: dist });
        });
        
        distances.sort((a: any, b: any) => a.distance - b.distance);
        return distances;

    } else if (type === "liked") {
        const userLikeDoc = collection(db, "users", uid, "likedPosts");
        const userLikeSnapshot = await getDocs(userLikeDoc);
        const likedPostIds = userLikeSnapshot.docs.map(doc => doc.id);
        return posts.filter(post => likedPostIds.includes(post.id)).reverse();
    }
};
