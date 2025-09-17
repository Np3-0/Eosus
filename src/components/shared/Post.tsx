import { useState, useRef } from "react";
import { postItems } from "../../utils/items/post_items";
import likePost from "../../utils/posts/likePost";
import commentPost from "../../utils/posts/commentPost";
import IconButton from "./IconButton";
import Paragraph from "./Paragraph";
import Button from "./Button";
import CommentIconSVG from "../../assets/CommentIconSVG";
import LikeIconSVG from "../../assets/LikeIconSVG";
import MoreIconSVG from "../../assets/MoreIconSVG";
import getComments from "../../utils/posts/getComments";
import type { DocumentData } from "firebase/firestore";
import PostComment from "./PostComment";
import PostOptionsModal from "./PostOptionsModal";

interface PostProps {
    title: string,
    content: string,
    type: string,
    subType: string,
    image: string,
    latitude: string,
    longitude: string,
    townName: string,
    author: string,
    timestamp: Date,
}

export default function Post({
    title,
    content,
    type,
    subType,
    image,
    latitude,
    longitude,
    townName,
    author,
    timestamp,
}: PostProps) {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [comments, setComments] = useState<DocumentData[]>([]);
    const [typedComment, setTypedComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [hasFetchedComments, setHasFetchedComments] = useState(false);
    const [postInfo, setPostInfo] = useState({
        title: title,
        content: content,
        type: type,
        subType: subType,
        image: image,
        latitude: latitude,
        longitude: longitude,
        townName: townName,
        author: author,
        timestamp: timestamp,
        comments: comments,
    });

    const handleCommentsOpen = async () => {
        setIsCommentsOpen(!isCommentsOpen);
        if (!hasFetchedComments && !isCommentsOpen) {
            const fetchedComments = await getComments(postInfo.timestamp.toString());
            setComments(fetchedComments ?? []);
            setHasFetchedComments(true);
        }
    };

    const buttonRef = useRef<HTMLButtonElement>(null);
    console.log(comments);
    return (
        <div className="flex flex-col my-10 p-5 sm:p-6 lg:p-8 rounded-3xl bg-box-bg 
                        shadow-lg shadow-box-shadow relative overflow-hidden 
                        w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
            <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-heading-2">
                    {title} <span className="text-lg" style={{ color: postItems.find(item => item.title === type)?.color }}>{subType}</span>
                </h2>
                <div className="w-full">
                    <img
                        src={image}
                        alt="Post image"
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-lg"
                    />
                </div>
                <Paragraph className="text-sm sm:text-base">
                    <span className="font-semibold mr-2">{townName}</span><span className="font-bold">·</span> {content}
                </Paragraph>
                {/*Like and comment buttons */}
                <div className="flex flex-row items-center justify-between mt-4">
                    <div className="flex flex-row">
                        <IconButton type="button" className="px-6 py-3 hover:bg-platinum "
                            onclick={() => {
                                setIsLiked(!isLiked);
                                likePost(postInfo.timestamp.toString(), isLiked);
                            }}
                        >
                            <LikeIconSVG isToggled={isLiked} />
                        </IconButton>
                        <IconButton className="px-6 py-3 hover:bg-platinum " onclick={() => handleCommentsOpen()}>
                            <CommentIconSVG />
                        </IconButton>
                    </div>
                    <div className="relative">
                        <IconButton
                            className="px-6 py-3 hover:bg-platinum"
                            onclick={() => setIsOptionsOpen(!isOptionsOpen)}
                            ref={buttonRef as React.RefObject<HTMLButtonElement>}
                        >
                            <MoreIconSVG />
                        </IconButton>
                        <PostOptionsModal
                            anchorRef={buttonRef as React.RefObject<HTMLButtonElement>}
                            isOpen={isOptionsOpen} onClose={() => setIsOptionsOpen(false)}
                            items={["Report", "Send to AI"]}
                        />
                    </div>


                </div>
            </div>
            {isCommentsOpen && (

                <div className="transform transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col lg:flex-row gap-x-3 mt-4">
                        <input
                            id="comment"
                            type="text"
                            name="comment"
                            value={typedComment}
                            placeholder="Write a comment..."
                            onChange={(e) => setTypedComment(e.target.value)}
                            className="flex-1 text-heading-3 font-normal text-base md:text-lg lg:text-xl p-2 border-b-3 outline-none"
                        />
                        <Button
                            className="min-w-max lg:w-1/3 text-white font-semibold transform transition duration-300 hover:scale-[1.02] mt-2 lg:mt-0"
                            onClick={async (e) => {
                                e.preventDefault();
                                if (typedComment.trim() === "") {
                                    alert("Comment cannot be empty.");
                                    return;
                                }
                                setTypedComment("");
                                await commentPost(postInfo.timestamp.toString(), typedComment);
                                setComments(await getComments(postInfo.timestamp.toString()) ?? []);
                            }}
                        >
                            Comment
                        </Button>
                    </div>
                    <div className="mt-6">
                        {comments.map((item, index) => (
                            <PostComment
                                key={index}
                                comment={{
                                    comment: item.comment,
                                    timeStamp: item.timeStamp,
                                    author: item.author,
                                    img: item.img,
                                }}
                                index={index}
                            />
                        ))}
                    </div>

                </div>
            )}

        </div>
    );
};