import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

export default async function likePost( postId: string, likeStatus: boolean ) {
    // Ensure the user is authenticated
    if (!auth.currentUser) {
        alert("Authentication required to like posts.");
        return;
    }

    // creates a reference to the like document, and saves or deletes it based on likeStatus
    const likeRef = doc(db, "users", auth.currentUser.uid, "likedPosts", postId);

    if (!likeStatus) {
        await setDoc(likeRef, { title: postId });
    } else {
        await deleteDoc(likeRef);
    }
};