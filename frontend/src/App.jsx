import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Admin from "./pages/admin";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <header>
        <Link to="/" className="logo">
          ✦ Side Quest
        </Link>
        <div className="nav-links">
          <Link to="/home">Главная</Link>
          <Link to="/profile">Профиль</Link>
          {user && user.role === "admin" && <Link to="/admin">Админ</Link>}
        </div>
        {user ? (
          <div className="user-section">
            <button onClick={handleLogout} className="logoutBtn">
              Выйти
            </button>
            <span>{user.username}</span>
          </div>
        ) : (
          <Link to="/login" className="loginBtn">
            Войти
          </Link>
        )}
      </header>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
