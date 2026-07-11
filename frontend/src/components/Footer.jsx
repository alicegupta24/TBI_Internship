import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            StayInsight
          </h2>

          <p className="mt-4 leading-7 text-gray-400">
            AI-powered guest review analytics platform that helps
            hospitality businesses understand customer feedback,
            improve service quality, and make data-driven decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">

            <Link
              to="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/about"
              className="hover:text-blue-400 transition"
            >
              About
            </Link>

            <Link
              to="/login"
              className="hover:text-blue-400 transition"
            >
              Login
            </Link>

          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Contact
          </h3>

          <p>support@stayinsight.com</p>
          <p className="mt-2">Graphic Era (Deemed to be University)</p>
          <p className="mt-2">Dehradun, Uttarakhand</p>
        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center text-sm text-gray-400">
        © 2026 StayInsight. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;