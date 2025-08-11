import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

interface userData {
    email: string;
    name: string;
    location: string | "N/A";
    privacy: boolean;
}

export default async function updateProfile({ email, name, location, privacy } : userData) {
    const userUid = auth.currentUser?.uid;
    if (!userUid) {
        throw new Error("User is not authenticated");
    }
     
    const randomNum = Math.floor(Math.random() * (16 - 1) + 1);    

    const userDoc = doc(db, "users", userUid);
    const data = {
        email: email,
        location: location || "N/A",
        img: `https://viwuaxxlyqybdjkjkmoi.supabase.co/storage/v1/object/public/profile-photos/icon_${randomNum}.svg`,
        name: name,
        privacy: privacy,
        uid: userUid,
    };

    await setDoc(userDoc, data, { merge: true });
};
