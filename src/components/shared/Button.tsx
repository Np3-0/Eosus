interface ButtonProps {
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}

export default function Button({ onClick, children, className = "",}: ButtonProps) {
    return(
        <button onClick={onClick} className={`px-6 py-3 rounded-full outline-none cursor-pointer relative overflow-hidden bg-cordovan ${className}`}>
            {children}
        </button>
    );
}