import { useState } from "react";
import Button from "./Button";

interface FilterDropDownProps {
    items: string[];
    className?: string;
}

export default function FilterDropDown({ items, className = "" }: FilterDropDownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    return (
        <div className={`relative inline-block ${className}`}>
            <button id="dropdownDefault"
                className="text-white text-heading-1 font-semibold hover:bg-platinum hover:cursor-pointer rounded-full text-lg 
                            px-6 py-3 text-center inline-flex items-center transition transform"
                type="button"
                onClick={() => {
                    setIsOpen(!isOpen);
                }}
            >
                Filter by category
                <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            <div className={`absolute top-full left-0 z-10 w-56 p-3 bg-platinum rounded-lg mt-2.5 ${isOpen ? "block" : "hidden"}`}>
                <h6 className="mb-3 text-lg font-semibold text-heading-1 text-center">
                    Category
                </h6>
                <ul className="space-y-2 text-sm">
                    {items.map((item, index) => (
                        <li 
                            key={index} 
                            className={`flex items-center py-2 ml-1 rounded-full hover:bg-cordovan 
                                        hover:scale-[1.05] hover:cursor-pointer transform transition ${selectedItem == item ? "bg-cordovan" : ""}`}
                            onClick={() => setSelectedItem(item)}
                        >
                            <input id={item} 
                                type="radio"
                                className="appearance-none" 
                                readOnly
                                checked={selectedItem == item}
                            />
                            <label htmlFor={item} className="ml-2 pl-2.5 text-lg font-semibold text-heading-2">
                                {item}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-4">
                    <Button 
                        className="text-white font-semibold transform transition hover:scale-[1.05]"
                        onClick={() => {
                            alert(`Filter applied: ${selectedItem}`);
                        }}
                    >
                        Confirm
                    </Button>
                </div>
                
            </div> 
        </div>
    )
};