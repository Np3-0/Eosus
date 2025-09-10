import { auth, db } from "../../config/firebase.ts";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

interface LikePostProps {
    postId: string;
    likeStatus: boolean;
}

export default async function likePost({ postId, likeStatus }: LikePostProps) {
    if (!auth.currentUser) return;

    const uid = auth.currentUser.uid;
    const likeRef = doc(db, "users", uid, "likedPosts", postId);

    if (!likeStatus) {
        await setDoc(likeRef, { title: postId });
    } else {
        await deleteDoc(likeRef);
    }
};