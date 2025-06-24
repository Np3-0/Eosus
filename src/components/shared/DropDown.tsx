import { useNavigate } from "react-router-dom";
import { dropdownItems } from "../../utils/dropdown_items";
import { handleSignOut } from "../../utils/handleSignIn";

interface DropDownProps {
    name: string | undefined;
    email: string | undefined;
}

export default function DropDown({ name, email }: DropDownProps) {
    const navigate = useNavigate();

    return (
        <div className="bg-box-bg rounded-lg shadow-lg mt-2 px-4 py-2 z-150 absolute right-0 text-heading-1 divide-y-[2px] divide-platinum">
            <div className="px-4 py-3 text-sm">
                <div>{name}</div>
                <div className="font-medium truncate">{email}</div>
            </div>
            <ul className="py-2 text-sm" aria-labelledby="dropdownInformationButton">
                {dropdownItems.map((item, key) => (
                    <li key={key}>
                        <a href={item.href} className="duration-300 ease-linear block px-4 py-2 hover:bg-platinum hover:rounded-full hover:text-cordovan">{item.text}</a>
                    </li>
                ))}
            </ul>
            <div className="pt-2">
                <button 
                    onClick={() => handleSignOut(() => navigate("/"))} 
                    className="duration-300 ease-linear block px-4 w-full text-left py-2 text-sm hover:bg-platinum hover:rounded-full hover:text-cordovan"
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};
