import { useNavigate } from "react-router-dom";
import { dropdownItems } from "../../utils/items/dropdown_items.ts";
import { handleSignOut } from "../../utils/handleSignIn.ts";

interface DropDownProps {
    name: string | undefined;
    email: string | undefined;
}

export default function DropDown({ name, email }: DropDownProps) {
    const navigate = useNavigate();

    return (
        <div className="bg-platinum rounded-lg shadow-lg mt-2 px-4 py-2 absolute right-0 text-heading-1 ">
            <div className="px-4 py-3 text-sm">
                <div className="duration-300 ease-linear">{name}</div>
                <div className="font-medium truncate duration-300 ease-linear ">{email}</div>
            </div>
            <ul className="py-2 text-sm" aria-labelledby="dropdownInformationButton">
                {dropdownItems.map((item, key) => (
                    <li key={key}>
                        <a href={item.href} className="duration-300 ease-linear block px-4 py-2 hover:bg-cordovan rounded-full">{item.text}</a>
                    </li>
                ))}
            </ul>
            <div className="pt-2">
                <button 
                    onClick={() => handleSignOut(() => navigate("/"))} 
                    className="duration-300 ease-linear block px-4 w-full text-left py-2 text-sm hover:bg-cordovan rounded-full cursor-pointer"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};
