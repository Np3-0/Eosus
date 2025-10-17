import { auth, db } from "../config/firebase";
import { setDoc, query, collection, where, getDocs } from "firebase/firestore";

export default async function changeUserName(name: string) {
    if (!auth.currentUser) {
        alert("Authentification failed. Please log in again.");
        return;
    }

    const postsRef = collection(db, "posts");
    console.log(postsRef);

    console.log(name);
}