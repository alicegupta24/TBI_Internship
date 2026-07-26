import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const [darkMode, setDarkMode] = useState(
  localStorage.getItem("theme") === "dark"
);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 dark:text-white">  
      <Routes>

          <Route
            path="/"
            element={
              <Home
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
            <Route
              path="/about"
              element={
                <About
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              }
            />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
           <ProtectedRoute adminOnly={true}>
              <AdminDashboard
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Login
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          }
        />
      </Routes>

    </div>
  );
}

export default App;