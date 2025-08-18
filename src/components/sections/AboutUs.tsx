import LightningSVG from "../../assets/LightningSVG";
import Info from "../cards/Info";
import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";
import Title from "../shared/Title";

export default function AboutUs() {
    return(
        <section id="about-us">
            <Container className="flex flex-col md:flex-row gap-10 lg:gap-12 items-center">
                <div className="w-full md:w-5/12 lg:w-1/2">
                    <div className="w-full h-80 sm:h-96 relative">
                        <img 
                            src="https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            className="w-full h-full object-cover rounded-3xl shadow-lg relative z-10"
                            alt="About our mission"
                        />
                    </div>
                </div>

                <div className="w-full md:w-7/12 lg:w-1/2 flex flex-col space-y-4">
                    <Title>About Our Mission</Title>
                    <Paragraph>
                        Our mission is to speed up the time it takes for everyday citizens to receive information on ecological, chemical, or industrial events.
                        We combine an easy-to-use system that allows a user to report an event occurring around them, with an AI system that summarizes posts and
                        gives users up-to-date information on current developments. Created for the 2025 Congressional App Challenge.
                    </Paragraph>

                    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
                        <Info title="Mission" description="Our mission is to create an application that spreads awareness on local events.">
                            <LightningSVG className="w-4 h-4 sm:w-5 sm:h-5 " />
                        </Info>
                        <Info title="Vision" description="Our vision is for everyone to have the same access to emergency information, no matter what.">
                            <LightningSVG className="w-4 h-4 sm:w-5 sm:h-5 "/>
                        </Info>
                    </div>
                </div>
            </Container>
        </section>
    );
}
