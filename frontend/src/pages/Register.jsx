import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Register({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleRegister(e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setLoading(true);

  try {
   const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(`${API_URL}/api/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email,
    password,
    admin_code: adminCode,
  }),
});

    const data = await response.json();

if (response.ok) {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("role", data.role);

  alert("Registration Successful!");

  if (data.role === "admin") {
    navigate("/admin");
  } else {
    navigate("/dashboard");
  }
} else {
  alert(data.detail);
}

} catch (err) {
  console.error(err);
  alert("Server Error");
}

setLoading(false);
}
return (
  <>
    <Navbar
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -top-32 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-5"
      >

        <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-slate-700 p-10">

          <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
            Create Account
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-300 mt-3 mb-8">
            Join StayInsight and start exploring AI-powered insights.
          </p>

          <form onSubmit={handleRegister}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 mb-5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 mb-5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 mb-5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <input
              type="password"
              placeholder="Admin Code (Optional)"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              className="w-full p-4 mb-6 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="text-center mt-7 text-gray-600 dark:text-gray-300">

            Already have an account?

            <span
              onClick={() => navigate("/login")}
              className="ml-2 text-blue-600 dark:text-blue-400 cursor-pointer font-semibold hover:underline"
            >
              Login
            </span>

          </p>

        </div>

      </motion.div>

    </div>

    <Footer />
  </>
);
}

export default Register;