import Paragraph from "../shared/Paragraph";

interface InfoProps {
        title: string;
        description: string;
        children?: React.ReactNode;
}

export default function Info({ title, description, children }: InfoProps) {
    return(
        <div className="p-5 sm:p-6 lg:p-8 rounded-3xl border border-box-border bg-box-bg 
                        shadow-lg shadow-box-shadow relative overflow-hidden transform transition 
                        duration-300 hover:scale-[1.05]"
        >
            <div className="rounded-xl bg-platinum p-3 text-heading-1 w-max relative">{children}</div>
            <div className="mt-4 space-y-2 relative">
                <h2 className="text-heading-2 w-max relative font-semibold md:text-xl">{title}</h2>
                <Paragraph>{description}</Paragraph>
            </div>
        </div>
    );
}
