import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

function Login({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email", email);
        localStorage.setItem("role", data.role);

        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
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
              Welcome Back 👋
            </h1>

            <p className="text-center text-gray-500 dark:text-gray-300 mt-3 mb-8">
              Sign in to continue to StayInsight
            </p>

            <form onSubmit={handleLogin}>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 mb-5 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
              />

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500 dark:text-gray-300"
                >
                  {showPassword ? "🔒" : "👁"}
                </button>

              </div>

              <button
                type="submit"
                className="w-full mt-7 bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>

            <div className="flex items-center my-8">

              <div className="flex-1 border-t border-gray-300 dark:border-slate-600"></div>

              <span className="mx-4 text-gray-500 dark:text-gray-300 text-sm">
                OR
              </span>

              <div className="flex-1 border-t border-gray-300 dark:border-slate-600"></div>

            </div>

            <div className="flex justify-center">

              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const response = await fetch(
                      `${API_URL}/api/auth/google`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          credential: credentialResponse.credential,
                        }),
                      }
                    );

                    const data = await response.json();

                    if (response.ok) {
                      localStorage.setItem("token", data.access_token);
                      localStorage.setItem("email", data.email);
                      localStorage.setItem("role", data.role);

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
                }}
                onError={() => alert("Google Login Failed")}
              />

            </div>

          </div>

        </motion.div>

      </div>

      <Footer />
    </>
  );
}

export default Login;