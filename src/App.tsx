import Layout from "./components/Layout";
import AboutUs from "./components/sections/AboutUs";
import Brands from "./components/sections/Brands";
import CallToAction from "./components/sections/CallToAction";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";

export default function App() {
  return (
    <>
      <Layout title="Eosus">
        <Hero />
        <Brands />
        <Services />
        <AboutUs />
        <CallToAction />
      </Layout>
      
    </>
  )
}