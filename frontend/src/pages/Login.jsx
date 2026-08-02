import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
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

      <div className="min-h-screen flex items-center justify-center
        bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        transition-colors duration-300">

        <div className="bg-white dark:bg-slate-800 shadow-2xl rounded-3xl p-10 w-[420px] transition-colors duration-300">

          <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-blue-400">
            Welcome Back 👋
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-300 mt-2 mb-8">
            Login to StayInsight
          </p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
             className="w-full p-3 mb-5 border rounded-xl
            bg-white dark:bg-slate-700
            text-slate-900 dark:text-white
            border-gray-300 dark:border-slate-600
            focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
               className="w-full p-3 border rounded-xl
                bg-white dark:bg-slate-700
                text-slate-900 dark:text-white
                border-gray-300 dark:border-slate-600
                focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? "🔒" : "👁"}
              </button>

            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl mt-6 transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
          <div className="my-6 flex items-center">
  <div className="flex-grow border-t"></div>
<span className="mx-4 text-gray-500 dark:text-gray-300">OR</span>
<div className="flex-grow border-t border-gray-300 dark:border-slate-600"></div>
</div>

<GoogleLogin
  onSuccess={async (credentialResponse) => {
    try {
      const response =await fetch(`${API_URL}/api/auth/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential: credentialResponse.credential,
      }),
    });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);

        alert("Google Login Successful!");

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
  onError={() => {
    alert("Google Login Failed");
  }}
/>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default Login;