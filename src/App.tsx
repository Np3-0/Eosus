import Layout from "./components/Layout";
import Brands from "./components/sections/Brands";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";

export default function App() {
  return (
    <>
      <Layout title="Eosus">
        <Hero />
        <Brands />
        <Services />
      </Layout>
      
    </>
  )
}