import { useState } from "react";
import Button from "../shared/Button";
import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";
import handleSignIn from "../../utils/handleSignIn";

export default function Signup() {

    const [usingEmail, setUsingEmail] = useState(true);
    const [logInInfo, setLogInInfo] = useState("");
    const [buttonUsed, setButtonUsed] = useState("");

    const handleEmailClick = (e: React.MouseEvent<HTMLInputElement>) => {
        setUsingEmail((e.target as HTMLInputElement).id === "emailToggle");
        setLogInInfo("");
    }
    
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
                                setButtonUsed("");}} 
                            className="w-full"
                        >
                            <div className="flex flex-col justify-center gap-y-8 w-2/3 mx-auto lg:mg-0 text-heading-2 text-2xl font-semibold">
                                <div className="flex flex-row items-center w-full justify-center gap-x-8 text-heading-3 font-semibold border-b-3 border-platinum">
                                    <label
                                        className={`px-4 p-2 mb-2 cursor-pointer text-lg lg:text-xl xl:text-2xl rounded-3xl duration-300 ease-linear
                                                    ${usingEmail ? "bg-cordovan text-white dark" : ""} 
                                                    ${usingEmail ? "hover:bg-cordovan hover:text-white hover:dark" : "hover:bg-platinum hover:rounded-3xl"}`}
                                        htmlFor="emailToggle"
                                    >
                                        <input
                                            id="emailToggle"
                                            onClick={handleEmailClick}
                                            type="radio"
                                            name="mode"
                                            className="appearance-none"
                                            checked={usingEmail}
                                            readOnly
                                        />
                                        Email
                                    </label>
                                    <label
                                        className={`px-4 p-2 mb-2 cursor-pointer text-lg lg:text-xl xl:text-2xl rounded-3xl duration-300 ease-linear
                                                    ${!usingEmail ? "bg-cordovan text-white dark" : ""}
                                                    ${!usingEmail ? "hover:bg-cordovan hover:text-white hover:dark" : "hover:bg-platinum hover:rounded-3xl"}`}
                                        htmlFor="phoneToggle"
                                    >
                                        <input
                                            id="phoneToggle"
                                            onClick={handleEmailClick}
                                            type="radio"
                                            name="mode"
                                            className="appearance-none"
                                            checked={!usingEmail}
                                            readOnly
                                        />
                                        Phone Number
                                    </label>
                                </div>
                                <label className="text-left">{usingEmail ? "Email" : "Phone Number"}</label>
                                <input 
                                    id="logInInfo"
                                    value={logInInfo}
                                    type= {usingEmail ? "email" : "tel"}
                                    placeholder= {usingEmail ? "johndoe@gmail.com" : "+1 234 567 8900"}
                                    required
                                    pattern={
                                        !usingEmail
                                        ? "^\\+?\\d{1,3}(\\s|-)?\\d{3}(\\s|-)?\\d{3}(\\s|-)?\\d{4}$"
                                        : undefined
                                    }
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
                                    <img src="src/assets/logos/google_logo.svg" className="h-8 hidden md:block" alt="Google Logo"/>
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