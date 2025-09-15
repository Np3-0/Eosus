import CrossIconSVG from "../../assets/CrossIconSVG";
import IconButton from "./IconButton";

interface PostOptionsModalProps {
    items: string[];
    isOpen?: boolean;
    onClose?: () => void;
}

export default function PostOptionsModal({ isOpen, onClose, items }: PostOptionsModalProps) {
    if (!isOpen) return null;
    return (
        <div className="absolute right-0 top-full mt-2 z-50 w-48 bg-box-bg rounded-lg shadow-lg border-4">
            <div className="flex items-center justify-between py-2 px-4">
                <h3 className="text-base font-semibold text-heading-1">
                    More Options
                </h3>
                <IconButton className="hover:bg-platinum px-2 py-1" onclick={onClose}><CrossIconSVG /></IconButton>
            </div>
            <ul className="p-2 space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <button 
                            className="w-full text-left text-heading-1 font-semibold text-sm bg-transparent rounded-lg cursor-pointer 
                                       transform transition hover:bg-platinum px-2 py-2"
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};