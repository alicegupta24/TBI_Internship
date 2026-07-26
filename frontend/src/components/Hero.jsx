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
    <section className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-14 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">

          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-xs md:text-sm font-semibold mb-6">
            AI Powered Hospitality Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
            Turn Guest Reviews into
            <span className="text-blue-600"> Actionable Insights</span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-300 leading-7 md:leading-8">
            StayInsight helps hotels and homestays manage guest reviews,
            discover trends, improve customer satisfaction, and make
            data-driven decisions through an intelligent dashboard.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              Get Started
            </Link>

            <button
              onClick={handleDashboard}
              className="border border-gray-300 dark:border-slate-600 text-slate-700 dark:text-white hover:border-blue-600 hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition duration-300"
            >
              View Dashboard
            </button>

          </div>

        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center">

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-sm">

            <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white text-center">
              Review Overview
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  Average Rating
                </span>

                <span className="font-bold text-yellow-500">
                  ★ 4.8
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  Total Reviews
                </span>

                <span className="font-bold text-slate-900 dark:text-white">
                  1,284
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-700 dark:text-slate-300">
                  Positive Reviews
                </span>

                <span className="font-bold text-green-600">
                  92%
                </span>
              </div>

              <div className="mt-6 h-3 bg-gray-300 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[92%] rounded-full"></div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero; 