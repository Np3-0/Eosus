import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getComments(postId: string) {
    if (!auth.currentUser) {
        alert("You must be logged in to view comments.");
        return;
    }

    const commentRef = collection(db, "posts", postId, "comments");
    const commentSnapshot = await getDocs(commentRef);
    const comments = commentSnapshot.docs.map(doc => doc.data());
    return comments;
}