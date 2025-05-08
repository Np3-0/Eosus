interface NavItemProps {
    href: string;
    text: string;
    className?: string;
}

export default function NavItem({ href, text, className = "" }: NavItemProps) {
    return(
        <li>
           <a href={href} className= {`duration-300 font-medium ease-linear hover:text-cordovan hover:bg-platinum p-3 rounded-full ${className}`}>{text}</a> 
        </li>
    );
}