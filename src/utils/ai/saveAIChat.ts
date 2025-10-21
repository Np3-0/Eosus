import { setDoc, doc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

export default async function saveAIChat(message: string, response: string, chatId?: string) {
    // check if user is authenticated
    if (!auth.currentUser || !auth.currentUser.uid) {
        alert("User not authenticated.");
        return;
    }

    // gets current date for timestamp
    const date = Date.now();
    const chatDoc = doc(db, "chats", chatId ? chatId : `${auth.currentUser.uid}_${Date.now()}`);

    let data = {};

    // The messages are stored in an array within the document
    if (chatId) {
        data = {
            messages: arrayUnion(message, response),
        };
    } else {
        data = {
            uid: auth.currentUser.uid,
            timestamp: date,
            messages: arrayUnion(message, response)
        };
    }

    await setDoc(chatDoc, data, { merge: true });
}