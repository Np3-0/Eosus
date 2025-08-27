import { postItems } from "../../../utils/items/post_items";
import Paragraph from "../../shared/Paragraph";
import Button from "../../shared/Button";
import { capitalize } from "../../../utils/capitalize";

interface TypeSelectionProps {
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
    changeHandler: (updatedData: TypeSelectionProps["postData"]) => void;
    onComplete: () => void;
}

export default function TypeSelection({ postData, changeHandler, onComplete }: TypeSelectionProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <div className={`flex flex-row items-start mt-12 gap-x-5 relative transition-all duration-500
                            ${postData.type ? "justify-center" : "justify-between"}`}>
                {postItems.map((item, key) => {
                    const itemValue = capitalize(item.title);
                    const isSelected = postData.type === itemValue;
                    const isAnySelected = postData.type !== "";                    
                            
                    return (
                        <div className="flex flex-col items-center" key={key}>
                            <label
                                className={`flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out
                                            ${isAnySelected && !isSelected ? "opacity-30 scale-75" : "opacity-100 scale-100"}`}
                            >
                                <input
                                    type="radio"
                                    name="element"
                                    value={itemValue}
                                    className="hidden peer"
                                    onChange={(e) => {
                                        changeHandler({
                                            ...postData,
                                            type: e.target.value,
                                            subType: "",
                                        });
                                    }}
                                    checked={isSelected}
                                />
                                <div className={`flex flex-col items-center px-6 py-3 transform transition-all duration-300 hover:scale-[1.1] mb-2 rounded-xl
                                    ${isSelected ? "scale-110 shadow-lg" : "hover:bg-platinum"}`}>
                                    <img src={item.href} className="w-12 h-12" alt={item.title} />
                                    <Paragraph className="text-center text-sm">
                                        {item.title}
                                    </Paragraph>
                                </div>
                            </label>
                            <div className={`flex flex-col items-start gap-y-2 mt-5 ${isSelected ? "block" : "hidden"}`}>
                                {item.subItems.map((subItem, subKey) => {
                                    const isSubSelected = postData.subType === subItem;
                                    return (
                                        <label key={subKey} className="flex items-center cursor-pointer px-2 py-0.5">
                                            <input
                                                type="radio"
                                                value={subItem}
                                                id={`${item.title}-${subItem}-${subKey}`}
                                                checked={isSubSelected}
                                                onChange={(e) => {
                                                    changeHandler({
                                                        ...postData,
                                                        subType: e.target.value,
                                                    });
                                                }}
                                            />
                                            <span className="ml-2 text-heading-3">{subItem}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
                    
            {/* Reset button to show all items again */}
            {postData.type && (
                <div className="flex flex-col lg:flex-row justify-center mt-12 gap-4">
                    <Button
                        type="button"
                        onClick={() => {
                            changeHandler({
                                ...postData,
                                type: "",
                                subType: "",
                            });
                        }}
                        className="text-xl text-white bg-cordovan hover:scale-[1.1] transition transform "
                    >
                        Reset
                    </Button>
                    <Button
                        type="button"
                        onClick={() => {
                            if (!postData.type || !postData.subType) {
                                alert("Please select all options.");
                                return;
                            }
                            onComplete();
                        }}
                        className="text-xl text-white bg-cordovan hover:scale-[1.1] transition transform"
                    >
                        Continue
                    </Button>
                </div>
            )}
        </form>
    )
};
