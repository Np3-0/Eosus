import { auth, db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getAIChats() {

    if (auth.currentUser) {
        const chatsRef = collection(db, "chats");
        const snapshot = await getDocs(chatsRef);
        const chats = snapshot.docs.map(doc => {
            const data = doc.data();
            return { id: doc.id, ...data };
        });
        return chats;
    }
};
