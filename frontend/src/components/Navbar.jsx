import { Link, useNavigate } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
    const navigate = useNavigate();

  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            StayInsight
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">
              AI Review Analytics
          </p>
        </div>

        {/* Navigation */}

        <div className="flex items-center gap-5 text-gray-700 dark:text-gray-200 font-medium">          <Link
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
              <Link
                to="/dashboard"
                className="hover:text-blue-600 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;