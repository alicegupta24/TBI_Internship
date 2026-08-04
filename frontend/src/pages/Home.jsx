import { motion } from "framer-motion";
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

      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6 py-20 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card
            title="Review Analysis"
            description="Analyze guest reviews with AI-powered insights."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card
            title="Trend Dashboard"
            description="Track customer sentiment and service trends."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            title="Smart Search"
            description="Quickly search guest reviews to identify recurring issues."
          />
        </motion.div>

      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <HowItWorks />
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Features />
      </motion.div>

      <Footer />
    </>
  );
}

export default Home;