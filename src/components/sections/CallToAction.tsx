import Button from "../shared/Button";
import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";

export default function CallToAction() {
    return (
        <section className="pb-20 relative">
            <Container>
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="relative z-10 mx-auto text-center max-w-xl md:max-w-2xl py-8 md:py-10 px-6 md:px-8">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading-1">
                            Help your 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cordovan to-gr-orange ml-3 mr-3 md:ml-4 md:mr-4">local community</span> 
                            today.
                        </h1>
                        <Paragraph className="pt-10">
                            Report local biological, natural, and industrial events in your community.
                            Join today, and help the spread of information for <span className="font-bold">completely free</span>.
                        </Paragraph>
                        <div className="mx-auto max-w-md sm:max-w-xl pt-10 text-white">
                            <Button className="transform transition duration-300 hover:scale-[1.02]"> Sign Up Today</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
