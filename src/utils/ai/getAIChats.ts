import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

export default async function getAIChats() {
    // Ensure the user is authenticated
    if (!auth.currentUser) {
        alert("User not authenticated");
        return;
    }

    // gets chats for the current user and returns
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("uid", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

}

