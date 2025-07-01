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
        clickFunction?.(prevData => ({
            ...prevData,
            public: isPublic
        }));
    }

    return (
        <div className="flex flex-row items-center w-full justify-center gap-x-8 text-heading-3 font-semibold mt-6">
            {items.map((item, index) => (
                <div key={index}>
                    <label className={`hover:bg-platinum rounded-3xl hover:text-black px-6 py-3 mb-2 cursor-pointer text-lg lg:text-xl xl:text-2xl 
                                    ${selectedItem === item ? "bg-cordovan text-white rounded-3xl" : ""} transition duration-300 ease-linear`}>
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