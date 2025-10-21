import { useState } from "react";
import { postItems } from "../../../utils/items/post_items.ts";
import { getCoords, getLocation } from "../../../utils/getLocation.ts";
import CommentIconSVG from "../../../assets/CommentIconSVG.tsx";
import LikeIconSVG from "../../../assets/LikeIconSVG.tsx";
import MoreIconSVG from "../../../assets/MoreIconSVG.tsx";
import IconButton from "../../shared/IconButton.tsx";
import DocPlusSVG from "../../../assets/DocPlusSVG.tsx";
import Button from "../../shared/Button.tsx";
import Paragraph from "../../shared/Paragraph.tsx";

type PostData = {
    title: string;
    content: string;
    type: string;
    subType: string;
    image: File | string | null;
    lat: number;
    long: number;
    townName: string | null;
};

interface CreatePostProps {
    postData: PostData;
    changeHandler: (updatedData: PostData) => void;
    reset: () => void;
    submitData: (postData: PostData) => void;
}

export default function CreatePost({ postData, changeHandler, reset, submitData }: CreatePostProps) {
    const [isGetLocationUsed, setIsGetLocationUsed] = useState(false);

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col my-10 p-5 sm:p-6 lg:p-8 rounded-3xl bg-box-bg 
                        shadow-lg shadow-box-shadow relative overflow-hidden 
                        w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
            >
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-semibold text-heading-2">
                        {/* Title input */}
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
                    {/* Image upload */}
                    <div className="w-full relative">
                        <img
                            src="https://images.pexels.com/photos/25682006/pexels-photo-25682006.jpeg"
                            alt="Post stock image"
                            className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="post-image-upload"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.files) {
                                    changeHandler({
                                        ...postData,
                                        image: e.target.files[0],
                                    });
                                }
                            }}
                        />
                        <label
                            htmlFor="post-image-upload"
                            className="absolute inset-0 flex items-center justify-center cursor-pointer"
                        >
                            <div className="bg-platinum bg-opacity-75 shadow-lg p-5 transform transition hover:scale-[1.1] rounded-full flex items-center justify-center">
                                <DocPlusSVG className="w-10 h-10 text-heading-1" />
                            </div>
                        </label>
                    </div>
                    <Paragraph className="font-semibold">
                        {postData.image instanceof File ? postData.image.name : "No image selected"}
                    </Paragraph>
                    {/* Location and description */}
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
                                    const coords = await getCoords(town);
                                    if (coords && coords !== "N/A" && coords !== "OVER") {
                                        changeHandler({
                                            ...postData,
                                            lat: coords.latitude,
                                            long: coords.longitude,
                                            townName: town,
                                        });
                                        setIsGetLocationUsed(true);
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
                        value={postData.content}
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
                        <IconButton className="px-6 py-3 hover:bg-platinum "><LikeIconSVG /></IconButton>
                        <IconButton className="px-6 py-3 hover:bg-platinum "><CommentIconSVG /></IconButton>
                        <IconButton className="px-6 py-3 ml-auto hover:bg-platinum "><MoreIconSVG /></IconButton>
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
                        /* Submit handler */
                        e.preventDefault();
                        if (!postData.type || !postData.subType || !postData.townName || !postData.content || !postData.title || !postData.image) {
                            alert("Please fill in all options.");
                            return;
                        }

                        let latitude = postData.lat;
                        let longitude = postData.long;

                        if (!isGetLocationUsed) {
                            const coords = await getCoords(postData.townName);
                            if (coords === "N/A") {
                                alert("Location not found. Please try again, or use the get location button.");
                                return;
                            }
                            if (coords === "OVER") {
                                alert("Too many locations found. Please be more specific.");
                                return;
                            }
                            if (typeof coords === "object" && coords !== null) {
                                latitude = coords.latitude;
                                longitude = coords.longitude;
                            }
                        }
                        submitData({
                            ...postData,
                            lat: latitude,
                            long: longitude,
                        });
                        alert("Post created successfully!");

                    }}
                    className="text-xl text-white bg-cordovan hover:scale-[1.1] transition transform"
                >
                    Continue
                </Button>
            </div>
        </form>
    );
};