import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  function handleDashboard() {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-36 -left-24 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="absolute top-44 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"></div>

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-16">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left"
        >

          <span className="inline-flex items-center px-5 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold shadow-md hover:scale-105 transition">

            AI Powered Hospitality Platform

          </span>

          <h1 className="mt-7 text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">

            Turn Guest Reviews Into

            <span className="block text-blue-600 mt-2">

              Actionable Insights

            </span>

          </h1>

          <p className="mt-7 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-8">

            StayInsight helps hotels and homestays understand customer
            feedback through AI-powered review analysis, sentiment
            detection, and interactive dashboards.

          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Get Started
            </Link>

            <button
              onClick={handleDashboard}
              className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:border-blue-600 hover:text-blue-600 hover:scale-105 active:scale-95 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              View Dashboard
            </button>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="w-full lg:w-1/2 flex justify-center"
        >

          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/40 dark:border-slate-700 shadow-2xl p-8 w-full max-w-md hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300">

            <h2 className="text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">

              Review Overview

            </h2>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span className="text-slate-700 dark:text-slate-300">
                  Average Rating
                </span>

                <span className="text-yellow-500 font-bold text-lg">
                  ★ 4.8
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-700 dark:text-slate-300">
                  Total Reviews
                </span>

                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  1,284
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-700 dark:text-slate-300">
                  Positive Reviews
                </span>

                <span className="font-bold text-green-600 text-lg">
                  92%
                </span>

              </div>

              <div>

                <div className="flex justify-between text-sm mb-2 text-slate-500">

                  <span>Guest Satisfaction</span>

                  <span>92%</span>

                </div>

                <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{
                      duration: 1.6,
                      delay: 0.5,
                    }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;