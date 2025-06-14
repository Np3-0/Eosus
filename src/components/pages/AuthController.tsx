import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export default function AuthController() {
    const navigate = useNavigate();

    useEffect(() => {
        async function completeSignIn() {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem("emailForSignIn");
                if (!email) {
                    email = window.prompt("Please provide your email for confirmation");
                }
                try {
                    await signInWithEmailLink(auth, email!, window.location.href);
                    window.localStorage.removeItem("emailForSignIn");
                    navigate("/dashboard");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (err) {
                    // Wait for a sec, then check if user is already signed in
                    setTimeout(() => {
                        if (auth.currentUser) {
                            window.localStorage.removeItem("emailForSignIn");
                            navigate("/dashboard");
                        } else {
                            alert("Sign-in failed.");
                            navigate("/signup");
                        }
                    }, 500);
                }
            } else {
                alert("Invalid or expired sign-in link.");
                navigate("/signup");
            }
        }
        completeSignIn();
    }, [navigate]);

    return (
        <h1 className="text-center text-3xl mt-20 text-semibold text-heading-1">Processing sign-in...</h1>
    );
}