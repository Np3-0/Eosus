interface BtnLinkProps {
    href: string;
    text: string;
    className?: string;
}

export default function BtnLink({ href, text, className = "" }: BtnLinkProps) {
    return(
        <a href={href} className={`px-6 py-3 rounded-full outline-none relative overflow-hidden bg-cordovan cursor-pointer transform transition duration-300 hover:scale-[1.02] ${className}`}>
            <span className="relative z-10 text-white ">{text}</span>
        </a>
    );
}