import { sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../config/firebase.ts";

export async function handleSignIn(
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    buttonUsed: string,
    logInInfo?: string,
) {
    event.preventDefault();
    // google oauth, and sends to dashboard
    if (buttonUsed == "google") {
        await signInWithPopup(auth, new GoogleAuthProvider());
        console.log("Sign-in successful");
        window.location.href = "/dashboard";
        return;
    // checks input for validity
    } else if (!logInInfo || logInInfo === "") {
        alert("Please enter a valid email address.");
        return;
    }

    // settings for email auth
    const actionCodeSettings = {
        url: window.location.origin + "/auth",
        handleCodeInApp: true,
        iOS: {
           bundleId: "com.example.ios",
        },
        android: {
            packageName: "com.example.android",
            installApp: true,
            minimumVersion: "12",
        },
    };

    //sends link if possible
    try {
        await sendSignInLinkToEmail(auth, logInInfo, actionCodeSettings);
        alert("Sign-in link sent! Please check your email.");
        window.localStorage.setItem("emailForSignIn", logInInfo);

    } catch (err) {
        console.error(err);
        alert("Failed to send sign-in link. Please try again.");
    }
    
}

export async function handleSignOut(callback?: () => void) {
    try {
        await auth.signOut();
        window.localStorage.removeItem("emailForSignIn");
        if (callback) callback();
    } catch (error) {
        console.error("Sign out error:", error);
        alert("Failed to sign out. Please try again.");
    }
}