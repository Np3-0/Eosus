import { storage } from "../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";


export default function fetchDownloadURL(path: string) {
    const avatarRef = ref(storage, path);
    return getDownloadURL(avatarRef);
};
