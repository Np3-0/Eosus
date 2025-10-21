import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import selectOption from "../../utils/posts/selectOption.ts";
import CrossIconSVG from "../../assets/CrossIconSVG.tsx";
import IconButton from "./IconButton.tsx";

interface PostOptionsModalProps {
    items: string[];
    isOpen?: boolean;
    onClose?: () => void;
    anchorRef?: React.RefObject<HTMLButtonElement>;
    type: string;
    id?: string;
    author: string;
    postId?: string;
}

export default function PostOptionsModal({ isOpen, onClose, items, anchorRef, type, id, author, postId }: PostOptionsModalProps) {
    const [position, setPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });
    const navigate = useNavigate();

    // positioning for the modal
    useEffect(() => {
        if (isOpen && anchorRef?.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            const height: number = 200;
            const spaceBelow: number = window.innerHeight - rect.bottom;
            const top: number = spaceBelow >= height ? rect.bottom + window.scrollY : rect.top + window.scrollY - height;

            setPosition({
                top,
                left: rect.left + window.scrollX
            });
        }
    }, [isOpen, anchorRef]);

    if (!isOpen) return null;
    return createPortal(
        <div
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                zIndex: 9999,
                width: "12rem",
            }}
            className="bg-platinum rounded-lg shadow-lg border-cordovan border-2"
        >
            <div className="flex items-center justify-between py-2 px-4">
                <h3 className="text-base font-semibold text-heading-1">
                    More Options
                </h3>
                <IconButton className="hover:bg-cordovan hover:text-white p-1.5" onclick={onClose}><CrossIconSVG /></IconButton>
            </div>
            <ul className="p-2 space-y-2">
                {/* Lists options */}
                {items.map((item, index) => (
                    <li key={index}>
                        <button
                            className="w-full text-left text-sm bg-transparent rounded-full cursor-pointer 
                                       transform transition hover:bg-cordovan hover:scale-[1.05] hover:text-white px-2 py-2"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!id) {
                                    alert("Action failed. Please try to log in again.");
                                    return;
                                }
                                selectOption(item, type, id, author, postId, navigate);
                            }}
                        >
                            <label
                                htmlFor={item}
                                className="ml-2 pl-2.5 text-lg font-semibold text-heading-1 cursor-pointer">
                                {item}
                            </label>
                        </button>
                    </li>
                ))}
            </ul>
        </div>,
        document.body
    );
};