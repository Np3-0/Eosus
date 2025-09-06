import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default async function checkUserStatus(navigate: (path: string) => void) {
    const user = getAuth().currentUser;

    if (!user) {
        navigate("/signup");
        return;
    }

    const uid = user.uid;
    const userDoc = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists() && window.location.pathname === "/complete-profile") {
        navigate("/dashboard");
    } else if (userSnapshot.exists()) {
        navigate(window.location.pathname);
    }
    else {
        navigate("/complete-profile");
    }
    return;
}