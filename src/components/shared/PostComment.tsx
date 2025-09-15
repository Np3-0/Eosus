import { useState } from "react";
import MoreIconSVG from "../../assets/MoreIconSVG";
import IconButton from "./IconButton";
import PostOptionsModal from "./postOptionsModal";

export default function PostComment({ comment, index }: PostCommentProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    return (
        <div key={index} className="flex flex-row items-center justify-between mt-4 p-4 bg-platinum text-heading-1 font-semibold rounded-lg relative">
            <div className="flex flex-row items-center gap-x-3">
                <img src={comment.img} className="w-6 h-6" />
                <div className="flex flex-col gap-y-1.5">
                    <p className="text-heading-3 text-sm lg:text-base font-bold">{comment.author}</p>
                    <p className="text-base lg:text-lg">{comment.comment}</p>
                </div>
            </div>
            <div className="relative">
                <IconButton className="ml-auto px-6 py-3 transform transition hover:bg-cordovan" onclick={() => setIsOptionsOpen(!isOptionsOpen)}>
                    <MoreIconSVG />
                </IconButton>
                <PostOptionsModal isOpen={isOptionsOpen} onClose={() => setIsOptionsOpen(false)} items={["Report", "Send to AI"]}/>
            </div>
        </div>
    )
};