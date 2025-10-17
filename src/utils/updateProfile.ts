import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import fetchDownloadURL from "./fetchDownloadURL";

interface userData {
    email: string;
    name: string;
    location: string | "N/A";
    privacy: boolean;
    img?: string;
}

export default async function updateProfile({ email, name, location, privacy, img } : userData) {
    const userUid = auth.currentUser?.uid;
    if (!userUid) {
        throw new Error("User is not authenticated");
    }
    
    let imgURL = "";
    if (!img || img === "") {
        const randomNum = Math.floor(Math.random() * (16 - 1) + 1);
        const imgPath = `avatars/icon_${randomNum}.svg`;
        imgURL = await fetchDownloadURL(imgPath);
    } else {
        imgURL = img;
    }

    const userDoc = doc(db, "users", userUid);
    const data = {
        email: email,
        location: location || "N/A",
        img: imgURL,
        name: name,
        privacy: privacy,
        uid: userUid,
    };
    await setDoc(userDoc, data, { merge: true });
};
