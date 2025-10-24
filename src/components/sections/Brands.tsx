import Container from "../shared/Container.tsx";
import Title from "../shared/Title.tsx";

const logos = ["EPA", "FEMA", "NASA", "NOAA", "GOOGLE", "RUTGERS"];

export default function Brands() {
    
    return (
        <section id="brands">
            <Container className="space-y-8">
                <div className="text-center max-w-3xl mx-auto">
                    <Title>Information Gathered From</Title>
                </div>
                <div className="flex justify-center flex-wrap gap-4">
                    {logos.map((logo, key) => (
                        <div key={key} className="p-4 sm:p-5 rounded-xl bg-body border border-box-border group">
                            <img 
                                src={`src/assets/logos/${logo}_logo.png`} 
                                width={100}
                                height={80} 
                                alt={logo}
                                className="h-7 sm:h-10 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
