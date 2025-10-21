import { getLocation } from "../../utils/getLocation.ts";
import Button from "./Button.tsx";

interface LocationInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

export default function LocationInput({ value, onChange }: LocationInputProps) {
    return (
        <div className="gap-y-2">
            <label htmlFor="location" className="text-heading-2">Location</label>
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">Optional</p>
            <div className="flex flex-col lg:flex-row gap-x-2">
                <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="New York City"
                    value={value}
                    onChange={(e) => onChange(e)}
                    className="flex-1 text-heading-3 font-normal text-base md:text-lg lg:text-xl p-2 border-b-3 outline-none"
                />
                <Button
                    className="min-w-max lg:w-1/3 text-white transform transition duration-300 hover:scale-[1.02] mt-2 lg:mt-0"
                    onClick={async (e) => {
                        e.preventDefault();
                        const town = await getLocation();
                        if (town) {
                            onChange({ target: { name: "location", value: town } } as React.ChangeEvent<HTMLInputElement>);
                        } else {
                            alert("Unable to get location. Please enter it manually.");
                        }
                    }}
                >
                    Get Location
                </Button>
            </div>
        </div>
    );
}