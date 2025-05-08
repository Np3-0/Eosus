import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";
import Service from "../shared/Service";
import Title from "../shared/Title";

export default function Services() {
    return (
        <section id="services">
            <Container className="space-y-10 md:space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <Title>Our Services</Title>
                    <Paragraph>
                        Stay in the know about the issues going on in your community
                        with the help of others and AI. Our services include:
                    </Paragraph>
                </div>
                <div>
                    <Service />
                </div>
            </Container>
        </section>
    );
}