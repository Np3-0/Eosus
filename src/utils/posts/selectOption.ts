import { auth, db } from "../../config/firebase.ts";
import { getDoc, deleteDoc, doc } from "firebase/firestore";
import promptAI from "../ai/promptAI.ts";
import saveAIChat from "../ai/saveAIChat.ts";
import getChats from "../ai/getAIChats.ts";

export default async function selectOption(option: string, type: string, id: string, author: string, postId?: string, navigate?: (path: string) => void) {
    if (!auth.currentUser) {
        alert("You must be logged in to perform this action.");
        return;
    }

    if (option == "Send to AI") {
        if (type !== "post") {
            alert("This action can only be performed on posts.");
            return;
        }
        const postDoc = await getDoc(doc(db, "posts", id));
        const postData = postDoc.data();
        if (!postData) {
            alert("Post not found or has been deleted.");
            return;
        }
        const data = {
            title: postData.title,
            content: postData.content,
            latitude: postData.latitude,
            longitude: postData.longitude,
            townName: postData.townName,
            type: postData.type,
            subType: postData.subType,
        }
        const message = "Analyze the following post and provide a short summary of its content. Also, give important information on risks, and next steps to take. Post data: " + JSON.stringify(data);
        const response = await promptAI([message]);
        await saveAIChat(message, response);
        const fetchedChats = await getChats();
        const chatId = fetchedChats?.[fetchedChats.length - 1];
        if (!chatId) {
            return;
        }
        if (navigate) {
            navigate(`/ai/${chatId.id}`);
        }
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