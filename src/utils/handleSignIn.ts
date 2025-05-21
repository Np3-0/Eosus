import { auth } from "../config/firebase.ts";
import { sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default async function handleSignIn(
    event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    buttonUsed: string,
    logInInfo?: string
) {
    event.preventDefault();
    if (buttonUsed == "google") {
        await signInWithPopup(auth, new GoogleAuthProvider());
        window.location.href = "/dashboard";
        return;
    } else if (!logInInfo || logInInfo === "") {
        alert("Please enter a valid email address.");
        return;
    }

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

    try {
        await sendSignInLinkToEmail(auth, logInInfo, actionCodeSettings);
        alert("Sign-in link sent! Please check your email.");
        // Optionally, store the email for completing sign-in after redirect
        window.localStorage.setItem("emailForSignIn", logInInfo);

    } catch (err) {
        console.error(err);
        alert("Failed to send sign-in link. Please try again.");
    }
}