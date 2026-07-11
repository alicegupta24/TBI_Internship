import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";

function Home({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <Hero />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-16">
        <Card
          title="Review Analysis"
          description="Analyze guest reviews with AI-powered insights."
        />

        <Card
          title="Trend Dashboard"
          description="Track customer sentiment and service trends."
        />

        <Card
          title="Smart Search"
          description="Quickly search guest reviews to identify recurring issues."
        />
      </div>

      <HowItWorks />

      {/* NEW SECTION */}
      <Features />

      <Footer />
    </>
  );
}

export default Home;