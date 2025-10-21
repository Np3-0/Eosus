import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../config/firebase.ts";

export default function fetchDownloadURL(path: string) {
    // returns the URL to an image uploaded to Firebase Storage
    const avatarRef = ref(storage, path);
    return getDownloadURL(avatarRef);
};
