import { auth, db } from "../../config/firebase.ts";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default async function commentPost(postId: string, comment: string) {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to comment.");
        return;
    }

    const date = Date.now();

    const commentRef = doc(db, "posts", postId, "comments", `${user.uid}_${date}`);
    const userRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    if (!userData) {
        alert("User data not found.");
        return;
    }

    try {
        await setDoc(commentRef, {
            userId: userData.uid,
            author: userData.name,
            img: userData.img,
            comment: comment,
            timestamp: date,
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
    };
}