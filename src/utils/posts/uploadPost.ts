import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

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

interface UploadProps {
    postData: PostData;
    date: number;
}

export default async function uploadPost({ postData, date }: UploadProps) {
    if (!auth.currentUser) {
        alert("Authentication failed. Please log in again.");
        return;
    }

    const uid = auth.currentUser.uid;
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
        author: uid,
        timestamp: date,
        likes: [],
        comments: 0,
    };

    await setDoc(postDoc, data, { merge: true });
};
