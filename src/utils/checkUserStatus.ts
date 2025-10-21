import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.ts";

export default async function checkUserStatus(navigate: (path: string) => void) {
    // Check if user is authenticated
    if (!auth.currentUser) {
        navigate("/signup");
        return;
    }

    // gets the user document from firestore
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    const userData = userSnapshot.data();
    // sends user to the correct page, depending on whether their profile is complete or not
    if (userSnapshot.exists() && window.location.pathname === "/complete-profile") {
        navigate("/dashboard");
    } else if (userData && userData.admin) {
        navigate("/admin");
    } else if (userSnapshot.exists() && window.location.pathname !== "/admin") {
        navigate(window.location.pathname || "/dashboard");
    } else {
        navigate("/complete-profile");
    }
    return;
}