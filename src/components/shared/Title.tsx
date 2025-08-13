interface TitleProps {
    children: React.ReactNode;
    className?: string;
}

export default function Title({ children, className }: TitleProps) {
    return (
        <h1 className={`text-heading-1 font-semibold text-2xl sm:text-3xl md:text-4xl ${className}`}>
            {children}
        </h1>
    );
}