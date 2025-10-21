import { services } from "../../utils/items/services_data.tsx";
import Container from "../shared/Container.tsx";
import Paragraph from "../shared/Paragraph.tsx";
import Service from "../cards/Service.tsx";
import Title from "../shared/Title.tsx";

export default function Services() {
    return (
        <section id="services">
            <Container className="space-y-10 md:space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <Title>Our Services</Title>
                    <Paragraph>
                        Stay in the know about the issues going on in your community and worldwide
                        with the help of locals and AI. Our services include:
                    </Paragraph>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, key) => (
                        <Service key={key} title={service.title} description={service.description} icon={service.icon}/>
                    ))}   
                </div>
            </Container>
        </section>
    );
}