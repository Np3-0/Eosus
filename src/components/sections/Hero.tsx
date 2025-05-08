import EmailIconSVG from "../../assets/EmailIconSVG";
import Button from "../shared/Button";
import Container from "../shared/Container";
import Paragraph from "../shared/Paragraph";
import Numbers from "./Numbers";

export default function Hero() {
    return (
        <section className="relative pt-32 lg:pt-36 ">
            <Container className="flex flex-col lg:flex-row gap-10 lg:gap-12">
                {/* Glow for hero */}
                <div className="absolute w-full lg:w-1/2 inset-y-0 lg:right-0">
                    <span className="absolute -left-6 md:left-4 top-24 lg:top-28 w-24 h-24 rotate-90 
                                    skew-x-12 rounded-3xl bg-gradient-to-r from-cordovan to-gr-orange
                                    blur-xl opacity-60 lg:opacity-95 lg:block hidden"
                    ></span>
                    <span className="absolute right-4 bottom-12 w-24 h-24 rounded-3xl bg-primary blur-xl opacity-80"></span>
                </div>

                <div className="relative flex flex-col items-center text-center lg:text-left lg:py-8 lg:items-start
                                lg:max-w-none max-w-3xl mx-auto lg:mx-0 lg:flex-1 lg:w-1/2"
                >
                    <h1 className="text-heading-1 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold">
                        The modern way to 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cordovan to-gr-orange ml-3 md:ml-4">
                            stay aware.
                        </span>
                    </h1>
                    <Paragraph className="mt-8">
                        Eosus allows for you to report and get up-to-date information on fires, floods, and 
                        other natural disasters in your area. Never get stuck waiting for current information again, 
                        and contribute to your local community.
                    </Paragraph>
                    <div className="mt-10 w-full flex max-w-md mx-auto lg:mx-0">
                        <div className="flex sm:flex-row flex-col gap-5 w-full">
                            <form action="#" className="py-1 pl-6 w-full pr-1 flex gap-3 items-center text-heading-3
                                                        shadow-lg shadow-box-shadow border border-box-border
                                                        bg-box-bg rounded-full ease-linear focus-within:bg-body
                                                        focus-within:border-primary"
                            >
                                <span className="min-w-max pr-2 border-r border-box-border">
                                    <EmailIconSVG />
                                </span>
                                <input type="email" placeholder="johndoe@gmail.com" className="w-full py-3 outline-none bg-transparent"/>
                                <Button className="min-w-max text-white transform transition duration-300 hover:scale-[1.02]">
                                    <span className="relative z-[5]">Get Started</span>
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 lg:w-1/2 lg:h-auto relative lg:max-w-non lg:mx-0 mx-auto max-w-3xl">
                    <img src="https://images.pexels.com/photos/589841/pexels-photo-589841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        alt="Hero Image"
                        width={2350}
                        height={2359}
                        className="lg:absolute lg:w-full lg:h-full rounded-3xl object-cover lg:max-h-non max-h-96"
                    />
                </div>
            </Container>
            <Numbers />
        </section>
    );
}