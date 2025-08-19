import CommentIconSVG from "../../../assets/logos/CommentIconSVG";
import LikeIconSVG from "../../../assets/logos/LikeIconSVG";
import MoreIconSVG from "../../../assets/logos/MoreIconSVG";
import IconButton from "../../shared/IconButton";
import Paragraph from "../../shared/Paragraph";

export default function CreatePost() {
    return (
        <div className="flex flex-col my-10 p-5 sm:p-6 lg:p-8 rounded-3xl bg-box-bg 
                                shadow-lg shadow-box-shadow relative overflow-hidden 
                                w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
                >
                    <div className="space-y-4">
                        <h2 className="text-2xl md:text-3xl font-semibold text-heading-2">
                            Title <span className="text-lg text-gray-500">Category</span>
                        </h2>
                        <div className="w-full">
                            <img 
                                src="https://images.pexels.com/photos/25682006/pexels-photo-25682006.jpeg" 
                                alt="Post image"
                                className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg" 
                            />
                        </div>
                        <Paragraph className="text-sm sm:text-base">
                            <span className="font-semibold mr-2">Location</span><span className="font-bold">·</span> Description
                        </Paragraph>
                        {/*Like and comment buttons */}
                        <div className="flex flex-row items-center justify-start mt-4">
                            <IconButton className="px-6 py-3"><LikeIconSVG /></IconButton>
                            <IconButton className="px-6 py-3"><CommentIconSVG /></IconButton>
                            <IconButton className="px-6 py-3 ml-auto"><MoreIconSVG /></IconButton>
                        </div>
                    </div>
                </div>
    );
};
