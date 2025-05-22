import Layout from "../Layout";
import AboutUs from "../sections/AboutUs";
import Brands from "../sections/Brands";
import CallToAction from "../sections/CallToAction";
import Hero from "../sections/Hero";
import Services from "../sections/Services";

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
