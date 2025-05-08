import Layout from "./components/Layout";
import Brands from "./components/sections/Brands";
import Hero from "./components/sections/Hero";

export default function App() {
  return (
    <>
      <Layout title="Eosus">
        <Hero />
        <Brands />

      </Layout>
      
    </>
  )
}