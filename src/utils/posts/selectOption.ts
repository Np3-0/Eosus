import {auth, db} from "../../config/firebase.ts";
import { getDocs, getDoc, deleteDoc ,doc } from "firebase/firestore";

export default async function selectOption(option: string, type: string, id: string) {
    if (!auth.currentUser) {
        alert("You must be logged in to perform this action.");
        return;
    }

    console.log(`Selected option: ${option}`);
    if (option == "Delete") {
        if (type === "post") {
            let confirm = prompt("Are you sure you want to delete this post? This action cannot be undone. Type 'DELETE' to confirm.");
            if (confirm !== "DELETE") {
                alert("Post deletion cancelled.");
                return;
            }
            // Delete post logic
            const postDoc = await getDoc(doc(db, "posts", id));
            const postData = postDoc.data();
            if (!postData) {
                alert("Post not found or already deleted.");
                return;
            }
            console.log(postData);

            deleteDoc(doc(db, "posts", id));
            alert("Post deleted successfully.");
        }
    }
}