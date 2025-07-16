import { useState } from "react";

interface RadioInputProps {
    items: string[];
    clickFunction?: (userData: any) => void; // Changed to accept userData object
}

export default function RadioInput({ items, clickFunction }: RadioInputProps) {

    const [selectedItem, setSelectedItem] = useState<string>(items[1]);

    function handleClick(e: React.MouseEvent<HTMLInputElement>, item: string) {
        setSelectedItem(item);
        e.currentTarget.checked = true;
        
        // Pass the updated userData object to the parent
        const isPublic = item === "Public";
        clickFunction?.((prevData: any) => ({
            ...prevData,
            public: isPublic
        }));
    }

    return (
        <div className="flex flex-col lg:flex-row items-center w-full justify-center gap-x-8 gap-y-6 text-heading-3 font-semibold mt-6">
            {items.map((item, index) => (
                <div key={index}>
                    <label className={`rounded-3xl hover:text-black px-6 py-3 mb-2 cursor-pointertext-2xl transition duration-300 ease-linear
                                        ${selectedItem === item ? "bg-cordovan text-white rounded-3xl hover:bg-cordovan hover:text-white" : "hover:bg-platinum"} 
                    `}>
                    <input 
                        id={`${item}Toggle`} 
                        type="radio" 
                        name="public" 
                        className="appearance-none"
                        onClick={(e) => handleClick(e, item)}
                        value={item === "Public" ? "public" : "private"}
                        checked={selectedItem === item}
                        onChange={() => {}}
                    />
                        {item}
                    </label>
                </div>
            ))}
            
        </div>
    );

}