import {auth, db} from "../../config/firebase.ts";
import { getDoc, deleteDoc, doc } from "firebase/firestore";

export default async function selectOption(option: string, type: string, id: string, author: string) {
    if (!auth.currentUser) {
        alert("You must be logged in to perform this action.");
        return;
    }

    console.log(`Selected option: ${option}`);
    if (option == "Delete") {
        console.log(author, auth.currentUser.uid);
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
            // Delete post logic
            const postDoc = await getDoc(doc(db, "posts", id));
            const postData = postDoc.data();
            if (!postData) {
                alert("Post not found or already deleted.");
                return;
            }
            console.log(postData);

            await deleteDoc(doc(db, "posts", id));
            
        } else if (type === "comment") {
            alert("Comment deletion not yet implemented.");
        }

        window.location.reload();
        return true;
    }
}