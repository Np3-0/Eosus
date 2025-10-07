import {auth, db} from "../config/firebase";

export default function getAIChats() {
    if (!auth.currentUser || auth.currentUser.uid === "") {
        alert("Authentication error. Please log in again.");
        return;
    }

    return [];
};
