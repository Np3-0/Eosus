import { auth, db } from "../../config/firebase";
import { setDoc, doc, arrayUnion } from "firebase/firestore";

export default async function saveAIChat(message: string, response: string, chatId?: string) {
    const user = auth.currentUser;
    if (!user || !user.uid) {
        alert("User not authenticated.");
        return;
    }

    const date = Date.now();
    console.log("Chat ID:", chatId);
    const chatDoc = doc(db, "chats", chatId ? chatId : `${user.uid}_${Date.now()}`);

    let data = {};

    if (chatId) {
        data = {
            messages: arrayUnion(message, response),
        };
    } else {
        data = {
            uid: user.uid,
            timestamp: date,
            messages: arrayUnion(message, response)
        };
    }

    console.log(data);

    await setDoc(chatDoc, data, { merge: true });
}