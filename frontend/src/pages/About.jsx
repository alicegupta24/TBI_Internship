import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About({ darkMode, setDarkMode }) {
  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="p-10 dark:bg-slate-900 min-h-screen">
        <h1 className="text-4xl font-bold dark:text-white">
          About Page
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Learn more about StayInsight.
        </p>
      </div>

      <Footer />
    </>
  );
}

export default About;