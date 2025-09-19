import {auth, db} from "../../config/firebase.ts";
import { getDoc, deleteDoc, doc } from "firebase/firestore";

export default async function selectOption(option: string, type: string, id: string, author: string, postId?: string) {
    if (!auth.currentUser) {
        alert("You must be logged in to perform this action.");
        return;
    }

    if (option == "Delete") {
        if (author !== auth.currentUser.uid) {
            alert("You can only delete your own posts.");
            return;
        }
        const confirm = prompt("Are you sure you want to delete this? This action cannot be undone. Type 'DELETE' to confirm.");
        if (confirm !== "DELETE") {
            alert("Deletion cancelled.");
            return;
        }

        if (type === "post") {
            const postDoc = await getDoc(doc(db, "posts", id));
            if (!postDoc.data()) {
                alert("Post not found or already deleted.");
                return;
            }
            await deleteDoc(doc(db, "posts", id));
            
        } else if (type === "comment") {
            if (!postId) {
                alert("Action failed. Please try to log in again.");
                return;
            }

            const fullID = `${auth.currentUser.uid}_${id}`;
            const commentDoc = await getDoc(doc(db, "posts", postId, "comments", fullID));
            if (!commentDoc.data()) {
                alert("Comment not found or already deleted.");
                return;
            }
            await deleteDoc(doc(db, "posts", postId, "comments", fullID));
        }

        window.location.reload();
        return true;
    }
}