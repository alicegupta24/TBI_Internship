import {
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Database,
  Sparkles,
  Users,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About({ darkMode, setDarkMode }) {
  const technologies = [
    "React.js",
    "FastAPI",
    "MongoDB Atlas",
    "Tailwind CSS",
    "JWT Authentication",
    "Google Gemini AI",
    "Recharts",
    "Render & Vercel",
  ];

  const features = [
    {
      icon: BrainCircuit,
      title: "AI Review Analysis",
      text: "Generate intelligent summaries from guest reviews using Gemini AI to quickly understand customer sentiment.",
    },
    {
      icon: BarChart3,
      title: "Interactive Dashboard",
      text: "Visualize ratings, review distribution and customer sentiment through interactive charts.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Authentication",
      text: "JWT-based authentication with role-based access for customers and administrators.",
    },
    {
      icon: Database,
      title: "Centralized Review Storage",
      text: "Store and manage hotel reviews securely using MongoDB Atlas.",
    },
  ];

  return (
    <>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
            About StayInsight
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-300 leading-8">
            StayInsight is an AI-powered hotel review analytics platform that
            helps hospitality businesses understand guest feedback, identify
            service trends, and improve customer satisfaction through
            intelligent insights and interactive dashboards.
          </p>

        </section>

        {/* Mission */}
        <section className="max-w-6xl mx-auto px-6 pb-16">

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-10">

            <div className="flex items-center gap-3 mb-5">
              <Sparkles className="text-blue-600" size={30} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Our Mission
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-8">
              Our mission is to simplify hotel review management by combining
              Artificial Intelligence with modern data visualization. StayInsight
              enables hotel owners and managers to make informed decisions,
              improve guest experiences, and monitor customer satisfaction in
              real time.
            </p>

          </div>

        </section>

        {/* Features */}
        <section className="max-w-7xl mx-auto px-6 pb-20">

          <h2 className="text-4xl font-bold text-center mb-14 text-slate-900 dark:text-white">
            Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-8"
                >

                  <Icon
                    size={36}
                    className="text-blue-600 mb-5"
                  />

                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 leading-7">
                    {feature.text}
                  </p>

                </div>

              );
            })}

          </div>

        </section>

        {/* Tech Stack */}
        <section className="max-w-6xl mx-auto px-6 pb-20">

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-10">

            <div className="flex items-center gap-3 mb-8">

              <Users
                size={30}
                className="text-blue-600"
              />

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Technology Stack
              </h2>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

              {technologies.map((tech) => (

                <div
                  key={tech}
                  className="bg-slate-100 dark:bg-slate-700 rounded-xl p-4 text-center font-medium text-slate-800 dark:text-white"
                >
                  {tech}
                </div>

              ))}

            </div>

          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default About;