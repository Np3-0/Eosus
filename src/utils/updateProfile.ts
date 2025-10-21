import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.ts";
import fetchDownloadURL from "./fetchDownloadURL.ts";

interface userData {
    email: string;
    name: string;
    location: string | "N/A";
    privacy: boolean;
    img?: string;
}

export default async function updateProfile({ email, name, location, privacy, img } : userData) {
    if (!auth.currentUser) {
        throw new Error("User is not authenticated");
    }
    
    // gets the random profile image URL, if not there already
    let imgURL = "";
    if (!img || img === "") {
        const randomNum = Math.floor(Math.random() * (16 - 1) + 1);
        const imgPath = `avatars/icon_${randomNum}.svg`;
        imgURL = await fetchDownloadURL(imgPath);
    } else {
        imgURL = img;
    }

    // saves data to firestore
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const data = {
        email: email,
        location: location || "N/A",
        img: imgURL,
        name: name,
        privacy: privacy,
        uid: auth.currentUser.uid,
    };
    await setDoc(userDoc, data, { merge: true });
};
