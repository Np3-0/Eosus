interface IconButtonProps {
    children: React.ReactNode;
    className?: string;
}

export default function IconButton({ children, className }: IconButtonProps) {
    return (
        <button className={`rounded-full outline-none cursor-pointer relative overflow-hidden text-heading-2 hover:bg-platinum transition transform ${className}`}>
            {children}
        </button>
    );
};
