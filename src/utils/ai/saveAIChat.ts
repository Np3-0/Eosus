import { auth, db } from "../../config/firebase";
import { collection, setDoc, doc, arrayUnion} from "firebase/firestore";

export default async function saveAIChat(message: string, response: string) {
    const user = auth.currentUser;
    if (!user || !user.uid) {
        alert("User not authenticated.");
        return;
    }
    console.log("Saving chat:", message, response);
    const date = Date.now();
    const postDoc = doc(db, "chats", `${user.uid}_${date}`);
    const data = {
        uid: user.uid,
        timestamp: date,
        messages: arrayUnion(message, response)
    };
    console.log(data);

    await setDoc(postDoc, data, { merge: true });
}