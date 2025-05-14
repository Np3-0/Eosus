import { auth } from "../config/firebase.ts";
import { sendSignInLinkToEmail } from "firebase/auth";

export default async function handleSignIn( 
  event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  buttonUsed: string,
  logInInfo?: string
) {
  
  event.preventDefault();
  console.log(logInInfo);
  if (buttonUsed == "google") {
    alert("Google Sign In");
    return;
  } else if (buttonUsed == "apple") {
    alert("Apple Sign In");
    return;
  }
  if (!logInInfo || logInInfo === "") {
    alert("Please enter a valid email address.");
    return;
  }
  
  const actionCodeSettings = {
    url: window.location.origin,
    handleCodeInApp: true,
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