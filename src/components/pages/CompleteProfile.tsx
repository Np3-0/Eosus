import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import updateProfile from "../../utils/updateProfile";
import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";
import Title from "../shared/Title";
import InputGroup from "../shared/InputGroup";
import Button from "../shared/Button";
import { getLocation } from "../../utils/getLocation";
import RadioInput from "../shared/RadioInput";
import checkUserStatus from "../../utils/checkUserStatus";

export default function CompleteProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        location: "",
        privacy: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    useEffect(() => {
        const checkStatus = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (!firebaseUser) {
                navigate("/signup");
            } else {
                const userDoc = doc(db, "users", firebaseUser.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    navigate("/dashboard");
                } else {
                    setUserData((prev) => ({
                        ...prev,
                        email: firebaseUser.email ?? "",
                        name: firebaseUser.displayName ?? "User",
                    }));
                }
            }
        });
        return () => checkStatus();
    }, [navigate]);

    return (
        <section className="relative flex justify-center pt-32 lg:pt-36">
            <Container className="flex flex-col items-center justify-center w-full">
                <div className="relative flex flex-col items-center text-center w-full max-w-3xl">
                    <Title>Complete Your Profile</Title>
                    <Paragraph className="mt-8">Before you can use Eosus, please fill out some information about yourself.</Paragraph>
                </div>
                <div className="flex flex-col justify-center items-center mt-10 p-5 sm:p-6 w-4/5 rounded-3xl bg-box-bg shadow-lg shadow-box-shadow">
                    <form className="w-full">
                        <div className="flex flex-col justify-center gap-y-6 w-2/3 mx-auto lg:mg-0 text-heading-2 text-2xl font-semibold">
                            <InputGroup name="email" type="email" value={userData.email} required={true} disabled={true} onChange={(e) => handleInputChange(e)} />
                            <InputGroup name="name" value={userData.name} required={true} onChange={(e) => handleInputChange(e)} />
                            {/* Not using InputGroup for location to allow for more customization */}
                            <div className="gap-y-2">
                                <label htmlFor="location" className="text-heading-2">Location</label>
                                <p className="text-gray-500 text-sm md:text-base lg:text-lg">Optional</p>
                                <div className="flex flex-col lg:flex-row gap-x-2">
                                    <input
                                        id="location"
                                        type="text"
                                        name="location"
                                        placeholder="New York City"
                                        value={userData.location}
                                        onChange={(e) => handleInputChange(e)}
                                        className="flex-1 text-heading-3 font-normal text-base md:text-lg lg:text-xl p-2 border-b-3 outline-none"
                                    />
                                    <Button
                                        className="min-w-max lg:w-1/3 text-white transform transition duration-300 hover:scale-[1.02] mt-2 lg:mt-0"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            const town = await getLocation();
                                            if (town) {
                                                setUserData((prevData) => ({
                                                    ...prevData,
                                                    location: `${town}`,
                                                }));
                                            } else {
                                                alert("Unable to get location. Please enter it manually.");
                                            }
                                        }}
                                    >
                                        Get Location
                                    </Button>
                                </div>
                            </div>

                            <div className="gap-y-2">
                                <label className="text-heading-2">Profile Visibility</label>
                                <p
                                    className="text-gray-500 text-sm md:text-base lg:text-lg mb-4"
                                >
                                    Not sure? Check out our <a className="underline hover:text-cordovan transition duration-300" href="/privacy-info" target="_blank">Privacy Policy</a>
                                </p>
                                <RadioInput items={["Public", "Private"]} clickFunction={(e) => setUserData(e)} />
                            </div>
                            { /* Submit button to save profile data */}

                            <Button onClick={async (e) => {
                                e.preventDefault();
                                try {
                                    if (user) {
                                        await updateProfile(userData);
                                        checkUserStatus(navigate);
                                    }
                                } catch (err) {
                                    console.error("Error updating profile:", err);
                                    alert("There was an error updating your profile. Please try again.");
                                }
                            }} className="min-w-max text-white transform transition duration-300 hover:scale-[1.02] mt-8">
                                Complete Profile
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </section>
    );
};