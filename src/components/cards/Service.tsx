import Paragraph from "../shared/Paragraph";

interface ServiceProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export default function Service({ title, description, icon }: ServiceProps) {
    return (
        <div className="p-5 sm:p-6 lg:p-8 rounded-3xl border border-box-border bg-box-bg 
                        shadow-lg shadow-box-shadow relative overflow-hidden transform transition 
                        duration-300 hover:scale-[1.05]"
        >
            <div className="rounded-xl bg-platinum p-3 text-heading-1 w-max relative">{icon}</div>
            <div className="mt-6 space-y-4 relative">
                <h2 className="text-lg md:text-xl font-semibold text-heading-2">{title}</h2>
                <Paragraph>{description}</Paragraph>
            </div>
        </div>
    );
}