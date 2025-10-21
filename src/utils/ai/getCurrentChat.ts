import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

export default async function getCurrentChat(id: string) {
    // Ensure user is authenticated
    if (!auth.currentUser) {
        alert("User not authenticated");
        return [];
    }

    // gets the chat document from Firestore
    const chatRef = doc(db, "chats", id);
    const chatSnap = await getDoc(chatRef);

    if (chatSnap.exists()) {
        return [{ id: chatSnap.id, ...chatSnap.data() }];
    } else {
        alert("Chat not found");
        return [];
    }
};
