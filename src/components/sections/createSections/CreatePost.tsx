import { useState } from "react";
import CommentIconSVG from "../../../assets/logos/CommentIconSVG";
import LikeIconSVG from "../../../assets/logos/LikeIconSVG";
import MoreIconSVG from "../../../assets/logos/MoreIconSVG";
import IconButton from "../../shared/IconButton";
import { postItems } from "../../../utils/items/post_items";
import Button from "../../shared/Button";
import { getCoords, getLocation } from "../../../utils/getLocation";
import Modal from "../../shared/Modal";

interface CreatePostProps {
    postData: {
        title: string;
        content: string;
        type: string;
        subType: string;
        image: string | null;
        lat: number;
        long: number;
        townName: string | null;
    };
    changeHandler: (updatedData: CreatePostProps["postData"]) => void;
    reset: () => void;
}

export default function CreatePost({ postData, changeHandler, reset }: CreatePostProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<Array<{ lat: number; long: number; name: string }>>([]);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col my-10 p-5 sm:p-6 lg:p-8 rounded-3xl bg-box-bg 
                        shadow-lg shadow-box-shadow relative overflow-hidden 
                        w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
            >
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-heading-2">
                        <input
                            type="text"
                            placeholder="Title"
                            className="p-1 min-w-full border-b-3 outline-none"
                            required
                            value={postData.title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                changeHandler({
                                    ...postData,
                                    title: e.target.value,
                                });
                                
                            }}
                        />
                        <span className="text-lg min-w-max" style={{ color: postItems.find(item => item.title === postData.type)?.color }}>{postData.subType}</span>
                    </h2>
                    <div className="w-full">
                        <img
                            src="https://images.pexels.com/photos/25682006/pexels-photo-25682006.jpeg"
                            alt="Post image"
                            className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-x-2">
                        <input
                            id="location"
                            type="text"
                            name="location"
                            placeholder="Location"
                            required
                            className="flex-1 text-heading-3 font-semibold text-xl md:text-2xl p-2 border-b-3 outline-none"
                            value={postData.townName ?? ""}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                changeHandler({
                                    ...postData,
                                    townName: e.target.value,
                                });
                            }}
                        />
                        <Button
                            className="min-w-max font-semibold lg:w-1/3 text-white transform transition duration-300 hover:scale-[1.02] mt-2 lg:mt-0"
                            onClick={async (e) => {
                                e.preventDefault();
                                const town = await getLocation();
                                if (town) {
                                    console.log(town);
                                    const coords = await getCoords(town);
                                    if (coords && coords !== "N/A") {
                                        changeHandler({
                                            ...postData,
                                            lat: coords.latitude,
                                            long: coords.longitude,
                                            townName: town,
                                        });
                                    } else {
                                        alert("Unable to get coordinates for the location.");
                                    }
                                } else {
                                    alert("Unable to get location. Please enter it manually.");
                                }
                            }}
                        >
                            Get Location
                        </Button>
                    </div>
                    <label className="text-heading-2 text-xl lg:text-2xl font-semibold" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="w-full h-32 px-3 py-2 mt-4 rounded-md bg-platinum text-heading-3 text-lg lg:text-xl focus:outline-none focus:ring-0"
                        placeholder="Write your description here..."
                        required
                        id="description"
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                            changeHandler({
                                ...postData,
                                content: e.target.value,
                            });
                        }}
                    >
                    </textarea>

                    {/*Like and comment buttons */}
                    <div className="flex flex-row items-center justify-start mt-4">
                        <IconButton className="px-6 py-3"><LikeIconSVG /></IconButton>
                        <IconButton className="px-6 py-3"><CommentIconSVG /></IconButton>
                        <IconButton className="px-6 py-3 ml-auto"><MoreIconSVG /></IconButton>
                    </div>
                </div>

            </div>
            <div className="flex flex-col lg:flex-row justify-center mt-12 gap-4">
                <Button
                    type="button"
                    onClick={() => {
                        reset();
                    }}
                    className="text-xl text-white bg-cordovan hover:scale-[1.1] transition transform "
                >
                    Reset
                </Button>
                <Button
                    type="submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        if (!postData.type || !postData.subType || !postData.townName || !postData.content || !postData.title) {
                            alert("Please fill in all options.");
                            return;
                        }
                        const coords = await getCoords(postData.townName);
                        if (coords === "N/A") {
                            alert("Location not found. Please try again, or use the get location button.");
                            return;
                        } if (coords === "OVER") {
                            alert("Multiple locations found. Please be more specific.");
                            return;
                        // shows modal for location checking
                        } if (Array.isArray(coords)) {
                            setIsModalOpen(true);
                            setModalData(coords);
                        }
                        if (!isModalOpen) {
                            alert("Post created successfully!");
                        }
                    }}
                    className="text-xl text-white bg-cordovan hover:scale-[1.1] transition transform"
                >
                    Continue
                </Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={modalData} postData={postData} changeHandler={changeHandler} />
            </div>
        </form>
    );
};
