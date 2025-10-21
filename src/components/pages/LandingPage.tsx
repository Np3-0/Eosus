import Layout from "../Layout.tsx";
import AboutUs from "../sections/AboutUs.tsx";
import Brands from "../sections/Brands.tsx";
import CallToAction from "../sections/CallToAction.tsx";
import Hero from "../sections/Hero.tsx";
import Services from "../sections/Services.tsx";

export default function LandingPage() {
    return (
        <Layout navType={0}>
            <Hero />
            <Brands />
            <Services />
            <AboutUs />
            <CallToAction />
        </Layout>
    );
}
