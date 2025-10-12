import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getCurrentChat(id: string) {
    if (!auth.currentUser) {
        alert("User not authenticated");
        return [];
    }
    const chatRef = doc(db, "chats", id);
            const chatSnap = await getDoc(chatRef);
            if (chatSnap.exists()) {
                return { id: chatSnap.id, ...chatSnap.data() };
            } else {
                alert("Chat not found");
                return [];
            }
};
