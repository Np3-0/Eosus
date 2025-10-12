import { auth, db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function getAIChats() {
    if (!auth.currentUser) {
        alert("User not authenticated");
        return;
    }
    const chatsRef = collection(db, "chats");
    const q = query(chatsRef, where("uid", "==", auth.currentUser.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

}

