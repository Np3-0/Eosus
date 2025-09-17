import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import CrossIconSVG from "../../assets/CrossIconSVG";
import IconButton from "./IconButton";

interface PostOptionsModalProps {
    items: string[];
    isOpen?: boolean;
    onClose?: () => void;
    anchorRef?: React.RefObject<HTMLButtonElement>;
}

export default function PostOptionsModal({ isOpen, onClose, items, anchorRef }: PostOptionsModalProps) {
    const [position, setPosition] = useState<{top: number, left: number}>({ top: 0, left: 0 });

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
                <IconButton className="hover:bg-cordovan p-1.5" onclick={onClose}><CrossIconSVG /></IconButton>
            </div>
            <ul className="p-2 space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <button 
                            className="w-full text-left text-sm bg-transparent rounded-full cursor-pointer 
                                       transform transition hover:bg-cordovan hover:scale-[1.05] px-2 py-2"
                        >
                            <label 
                                htmlFor={item} 
                                className="ml-2 pl-2.5 text-lg font-semibold text-heading-1">
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