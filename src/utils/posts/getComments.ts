import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

export default async function getComments(postId: string) {
    // Ensure the user is authenticated
    if (!auth.currentUser) {
        alert("You must be logged in to view comments.");
        return;
    }

    // gets the comments and returns them for a post
    const commentRef = collection(db, "posts", postId, "comments");
    const commentSnapshot = await getDocs(commentRef);
    const comments = commentSnapshot.docs.map(doc => doc.data());
    return comments;
}