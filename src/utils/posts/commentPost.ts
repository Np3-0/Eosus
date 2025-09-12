import {auth, db} from "../../config/firebase.ts";
import {collection, doc, setDoc} from "firebase/firestore";``

export default async function commentPost(postId: string, comment: string) {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to comment.");
        return;
    }

    const commentRef = doc(db, "posts", postId, "comments", `${user.uid}_${Date.now()}`);

    try {
        await setDoc(commentRef, {
            userId: user.uid,
            comment: comment,
            timestamp: Date.now(),
        });
    } catch (error) {
        console.error("Error adding comment: ", error);
    };
}