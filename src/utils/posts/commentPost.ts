import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

export default async function commentPost(postId: string, comment: string) {
    // check if user is authenticated
    if (!auth.currentUser) {
        alert("You must be logged in to comment.");
        return;
    }

    // gets the current date for timestamp
    const date = Date.now();
    const commentRef = doc(db, "posts", postId, "comments", `${auth.currentUser.uid}_${date}`);
    const userRef = doc(db, "users", auth.currentUser.uid);

    // gets user data
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();

    if (!userData) {
        alert("User data not found.");
        return;
    }

    // saves the comment to the database
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