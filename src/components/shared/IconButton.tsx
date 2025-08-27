interface IconButtonProps {
    children: React.ReactNode;
    className?: string;
    label?: string;
}

export default function IconButton({ children, className, label }: IconButtonProps) {
    return (
        <label>{label}
            <button type="button" className={`rounded-full outline-none cursor-pointer relative overflow-hidden text-heading-2 hover:bg-platinum transition transform ${className}`}>
                {children}
            </button>
        </label>
    );
};
