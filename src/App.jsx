import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import useReveal from "./hooks/Usereveal";
import Services from "./components/ Services";
import Work from "./components/Work";
import Introduction from "./components/Introduction";
import OurProcess from "./components/Ourprocess";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => {
  useReveal();

  return (
    <>
      <Navbar />
      <Hero />
      <Introduction />
      <Services />
      <Work />
      <About />
      <OurProcess />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
