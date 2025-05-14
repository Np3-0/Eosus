interface ButtonProps {
    className?: string;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export default function Button({ onClick, children, className = "", type = "button"}: ButtonProps) {
    return(
        <button type={type} onClick={onClick} className={`px-6 py-3 rounded-full outline-none cursor-pointer relative overflow-hidden bg-cordovan ${className}`}>
            {children}
        </button>
    );
}