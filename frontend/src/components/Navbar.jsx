import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold"
      : "text-gray-700 dark:text-gray-200 hover:text-blue-600 transition";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="group">

          <h1 className="text-2xl font-extrabold text-blue-600 group-hover:scale-105 transition">

            StayInsight

          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">

            AI Review Analytics

          </p>

        </Link>

        {/* Desktop */}

        <div className="hidden md:flex items-center gap-7">

          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink to="/about" className={navStyle}>
            About
          </NavLink>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-110 transition"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!token ? (
            <>
              <NavLink to="/login" className={navStyle}>
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 hover:scale-105 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              {role === "admin" ? (
                <NavLink to="/admin" className={navStyle}>
                  Admin Panel
                </NavLink>
              ) : (
                <NavLink to="/dashboard" className={navStyle}>
                  Dashboard
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 hover:scale-105 text-white px-5 py-2 rounded-xl transition-all"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-blue-600"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-700"
          >

            <div className="flex flex-col gap-5 p-6">

              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navStyle}
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={navStyle}
              >
                About
              </NavLink>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-left"
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>

              {!token ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className={navStyle}
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className={navStyle}
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  {role === "admin" ? (
                    <NavLink
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className={navStyle}
                    >
                      Admin Panel
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className={navStyle}
                    >
                      Dashboard
                    </NavLink>
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

          </motion.div>

        )}

      </AnimatePresence>

    </nav>
  );
}

export default Navbar;