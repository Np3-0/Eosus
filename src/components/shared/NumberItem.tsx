interface NumberItemProps {
    className?: string;
    title: string;
    paragraph: string;
}

export default function NumberItem({ title, paragraph, className = "" }: NumberItemProps) {
    return (
        <div className={`text-center px-5 ${className}`}>
            <h2 className="font-bold text-xl sm:text-2xl md:text-4xl text-heading-1">{title}</h2>
            <p className="mt-2 text-heading-3">{paragraph}</p>
        </div>
    );
}