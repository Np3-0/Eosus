import { auth, db } from "../config/firebase.ts"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import getPosts from "./posts/getPosts.ts";
import getAIChats from "./ai/getAIChats.ts";
import { handleSignOut } from "./handleSignIn.ts";
import type { NavigateFunction } from "react-router-dom";

export default async function deleteProfile(navigate: NavigateFunction) {
    if (!auth.currentUser) {
        alert("No user is currently logged in.");
        return;
    }

    // all posts are gathered because we need to find comments created by the user too
    const posts = await getPosts("recent");
    const userPosts = await getPosts("own");
    const chats = await getAIChats();
    if (!posts) {
        alert("Could not retrieve posts.");
        return;
    }

    // deletes user's comments
    for (const post of posts) {
        const commentsRef = collection(db, "posts", (post as any).id, "comments");
        const commentsSnap = await getDocs(commentsRef);
        if (commentsSnap.empty) {
            continue;
        }
        for (const commentDoc of commentsSnap.docs) {
            const commentData = commentDoc.data();
            if (commentData.userId === auth.currentUser.uid) {
                await deleteDoc(commentDoc.ref);
            }
        }
    }

    // deletes user's posts
    if (userPosts) {
        for (const post of userPosts) {
            const postRef = doc(db, "posts", (post as any).id);
            await deleteDoc(postRef);
        }
    }

    // deletes user's ai chats
    if (chats) {
        for (const chat of chats) {
            const chatRef = doc(db, "chats", (chat as any).id);
            await deleteDoc(chatRef);
        }
    }

    // deletes user's likedPosts
    const likeRef = collection(db, "users", auth.currentUser.uid, "likedPosts");
    if (likeRef) {
        const likeSnap = await getDocs(likeRef);
        for (const likeDoc of likeSnap.docs) {
            await deleteDoc(likeDoc.ref);
        }
    }

    // lastly, deletes user profile, signs them out, and redirects to homepage
    const userRef = doc(db, "users", auth.currentUser.uid);
    navigate("/");
    await deleteDoc(userRef);
    await handleSignOut();
    auth.currentUser.delete();
};