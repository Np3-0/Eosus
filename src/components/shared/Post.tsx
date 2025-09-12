import { useState, useEffect } from "react";
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

    useEffect(() => {
        const fetchComments = async () => {
            const fetchedComments = await getComments(postInfo.timestamp.toString());
            setComments(fetchedComments ?? []);
        };

        fetchComments();
    }, [postInfo.timestamp]);
    console.log(comments);
    return (
        <div className="flex flex-col my-10 p-5 sm:p-6 lg:p-8 rounded-3xl bg-box-bg 
                        shadow-lg shadow-box-shadow relative overflow-hidden 
                        w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
            <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-semibold text-heading-2">
                    {title} <span className="text-lg text-gray-500" style={{ color: postItems.find(item => item.title === type)?.color }}>{subType}</span>
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
                        <IconButton type="button" className="px-6 py-3"
                            onclick={() => {
                                setIsLiked(!isLiked);
                                likePost({ postId: postInfo.timestamp.toString(), likeStatus: isLiked });
                            }}
                        >
                            <LikeIconSVG isToggled={isLiked} />
                        </IconButton>
                        <IconButton className="px-6 py-3" onclick={() => setIsCommentsOpen(!isCommentsOpen)}>
                            <CommentIconSVG />
                        </IconButton>
                    </div>
                    <IconButton className="px-6 py-3" onclick={() => setIsOptionsOpen(!isOptionsOpen)}>
                        <MoreIconSVG />
                    </IconButton>

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
                    {comments.map((item, index) => (
                        <div key={index} className="mt-4 p-4 bg-gray-100 rounded-lg">
                            <p className="text-sm sm:text-base">{item.comment}</p>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};