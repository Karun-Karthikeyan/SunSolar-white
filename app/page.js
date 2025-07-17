// app/page.js
import Hero from "./components/Hero";
import StatesList from "./components/StateList";
import Howworks from "./components/Howworks";
import Faq from "./components/Faq";
import Network from "./components/Network";
import Footer from "./components/Footer";
export const metadata = {
  title: "SunSolar - Find the Best Solar Companies in India",
  description: "Discover top-rated solar companies, compare installers, and learn about solar energy solutions for your home or business. Empowering India with clean, renewable energy.",
};
export default function HomePage() {
  return (
    <section>
      <Hero />
      <StatesList />
      <Howworks />
      <Faq />
      <Network />
      <Footer />
    </section>
  );
}
