interface IconButtonProps {
    children: React.ReactNode;
    className?: string;
    label?: string;
    type?: "button" | "submit" | "reset";
    onclick?: () => void;
    ref?: React.RefObject<HTMLButtonElement>;
}

export default function IconButton({ children, className, label, type, onclick, ref }: IconButtonProps) {
    return (
        <label>{label}
            <button 
                type={type ? type : "button"} 
                className={`rounded-full outline-none cursor-pointer relative overflow-hidden text-heading-2 transition transform ${className}`}
                onClick={onclick}
                ref={ref}
            >
                {children}
            </button>
        </label>
    );
};
