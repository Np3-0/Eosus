import Container from "../shared/Container";
import NavItem from "../shared/NavItem";
import Paragraph from "../shared/Paragraph";
import { navbarItems } from "../../utils/navbar_items";

interface FooterProps {
    type: number;
}

export default function Footer({ type } : FooterProps) {
    return(
        <footer className="relative pt-15 rounded-t-3xl bg-box-bg">
            <Container className="pb-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <img src="/eosus_logo.svg" alt="Eosus Logo" className="w-10 h-10 mb-4 md:mb-0"/>
                        <span className="text-lg font-semibold text-heading-1 ">Eosus</span>
                    </div>
                    
                    <ul className="flex gap-6 text-heading-1">
                        {navbarItems[type].map((item, key) => (
                            <NavItem key={key} href={item.href} text={item.text}/>
                        ))}
                    </ul>
                </div>
                <Paragraph className="pt-6 text-heading-2 text-left font-medium">&copy;2025 Eosus. Created for the 2025 Congressional App Challenge. Photos sourced from Pexels.</Paragraph>
                <Paragraph className="pt-1 text-heading-2 text-left text-sm md:text-sm font-medium">
                    If currently in an emergency situation, call 911. Eosus is not an alternative to local, state, and federal law enforcement.
                </Paragraph>
            </Container>
        </footer>
    );
}