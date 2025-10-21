import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../config/firebase.ts";
import { handleSignIn } from "../../utils/handleSignIn.ts";
import Button from "../shared/Button.tsx";
import Container from "../shared/Container.tsx";
import Paragraph from "../shared/Paragraph.tsx";

export default function Signup() {

    const [logInInfo, setLogInInfo] = useState("");
    const [buttonUsed, setButtonUsed] = useState("");
    const [, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    // navigates to dashboard if user is already logged in
    useEffect(() => {
        const checkUserState = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                navigate("/dashboard");
            }
        });
        return () => checkUserState();
    }, [navigate]
    );

    return (
        <section className="relative flex justify-center pt-32 lg:pt-36">
            <Container className="flex flex-col items-center justify-center w-full">
                <div className="relative flex flex-col items-center text-center w-full max-w-3xl">
                    <h1 className="text-cordovan text-5xl xl:text-6xl font-bold text-center">Eosus</h1>
                    <div className="flex justify-center gap-4 pt-4 text-heading-2 text-xl md:text-2xl xl:text-3xl font-semibold text-center mt-4">
                        <Paragraph>Sign Up</Paragraph>
                    </div>
                    <div className="flex justify-center items-center mt-10 p-5 sm:p-6 w-4/5 rounded-3xl bg-box-bg border border-box-border shadow-lg shadow-box-shadow">
                        <form
                            onSubmit={(e) => {
                                handleSignIn(e, buttonUsed, logInInfo);
                                setLogInInfo("");
                                setButtonUsed("");
                            }}
                            className="w-full"
                        >
                            <div className="flex flex-col justify-center gap-y-8 w-2/3 mx-auto lg:mg-0 text-heading-2 text-2xl font-semibold">
                                <label className="text-left">Email</label>
                                <input
                                    id="logInInfo"
                                    value={logInInfo}
                                    type="email"
                                    placeholder="johndoe@gmail.com"
                                    required
                                    className="text-heading-3 font-normal text-base md:text-lg lg:text-xl w-full pb-2 border-b-3 bg-transparent outline-none"
                                    onChange={(e) => setLogInInfo(e.target.value)}
                                />

                                <Button type="submit" onClick={() => setButtonUsed("continue")} className="text-white text-center">Continue</Button>

                                {/* Or thing */}
                                <div className="flex items-center justify-center gap-x-4">
                                    <div className="h-px w-1/2 bg-box-border"></div>
                                    <Paragraph>Or</Paragraph>
                                    <div className="h-px w-1/2 bg-box-border"></div>
                                </div>

                                <Button
                                    type="button"
                                    onClick={(e) => handleSignIn(e, "google", logInInfo)}
                                    className="flex flex-row w-full justify-center md:gap-x-4 items-center mx-auto lg:mx-0 text-white"
                                >
                                    <img src="src/assets/logos/google_logo.svg" className="h-8 hidden md:block" alt="Google Logo" />
                                    Google
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Container>
        </section>
    );
}