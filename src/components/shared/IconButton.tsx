interface IconButtonProps {
    children: React.ReactNode;
    className?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
    onclick?: () => void;
}

export default function IconButton({ children, className, label, type, onclick }: IconButtonProps) {
    return (
        <label>{label}
            <button 
                type={type ? type : "button"} 
                className={`rounded-full outline-none cursor-pointer relative overflow-hidden text-heading-2 hover:bg-platinum transition transform ${className}`}
                onClick={onclick}
            >
                {children}
            </button>
        </label>
    );
};
