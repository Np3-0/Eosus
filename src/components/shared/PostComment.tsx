import { useState, useRef } from "react";
import MoreIconSVG from "../../assets/MoreIconSVG.tsx";
import IconButton from "./IconButton.tsx";
import PostOptionsModal from "./PostOptionsModal.tsx";

interface PostCommentProps {
    comment: {
        comment: string;
        timestamp: Date;
        creator: string;
        userId: string;
        img: string;
    }
    index: number;
    postId: string;
}

export default function PostComment({ comment, index, postId }: PostCommentProps) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <div
            key={index}
            className="flex flex-row items-center justify-between mt-4 p-4
                        bg-platinum text-heading-1 font-semibold rounded-lg relative"
        >
            {/* Shows commenter's profile image + name + comment*/}
            <div className="flex flex-row items-center gap-x-3">
                <img src={comment.img} className="w-6 h-6" />
                <div className="flex flex-col gap-y-1.5">
                    <p className="text-heading-3 text-sm lg:text-base font-bold">{comment.creator}</p>
                    <p className="text-base lg:text-lg">{comment.comment}</p>
                </div>
            </div>
            <div className="relative">
                {/* Options button and modal */}
                <IconButton
                    className="ml-auto px-6 py-3 transform transition hover:bg-cordovan"
                    onclick={() => setIsOptionsOpen(!isOptionsOpen)}
                    ref={buttonRef as React.RefObject<HTMLButtonElement>}
                >
                    <MoreIconSVG />
                </IconButton>
                <PostOptionsModal
                    anchorRef={buttonRef as React.RefObject<HTMLButtonElement>}
                    isOpen={isOptionsOpen} onClose={() => setIsOptionsOpen(false)}
                    items={["Delete", "Report", "Send to AI"]}
                    type="comment"
                    author={comment.userId}
                    id={comment.timestamp.toString()}
                    postId={postId}
                />
            </div>
        </div>
    )
};