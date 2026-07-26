import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700">

      {/* Navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">
            StayInsight
          </h1>

          <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">
            AI Review Analytics
          </p>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-5 text-gray-700 dark:text-gray-200 font-medium">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-blue-600 transition"
          >
            About
          </Link>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!token ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {role === "admin" ? (
                <Link
                  to="/admin"
                  className="hover:text-blue-600 transition"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl text-blue-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">

          <div className="flex flex-col p-4 space-y-4 text-gray-700 dark:text-gray-200 font-medium">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-left"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>

            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {role === "admin" ? (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            )}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;