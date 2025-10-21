import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase.ts";

type PostData = {
    title: string;
    content: string;
    type: string;
    subType: string;
    image: File | string | null;
    lat: number;
    long: number;
    townName: string | null;
};

export default async function uploadPost(postData: PostData, date: number): Promise<void> {
    if (!auth.currentUser) {
        alert("Authentication failed. Please log in again.");
        return;
    }
    
    // Create a document reference with the date as the ID
    const postDoc = doc(db, "posts", date.toString());
    const data = {
        title: postData.title,
        content: postData.content,
        type: postData.type,
        subType: postData.subType,
        image: postData.image,
        latitude: postData.lat,
        longitude: postData.long,
        townName: postData.townName,
        author: auth.currentUser.uid,
        timestamp: date,
    };

    // Upload the post data to Firestore
    await setDoc(postDoc, data, { merge: true });
};
