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
      alert("Registration Successful!");
      navigate("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">

      <div className="bg-white shadow-2xl rounded-3xl p-10 w-[420px]">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Join StayInsight
        </p>

        <form onSubmit={handleRegister}>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Admin Code (Optional)"
            className="w-full p-3 mb-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={adminCode}
            onChange={(e) => setAdminCode(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>

      </div>

    </div>

    <Footer />
  </>
);
}

export default Register;