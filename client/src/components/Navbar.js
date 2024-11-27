import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile", { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        setUser(null); // Ensure user is reset if unauthorized
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.delete("/api/auth/logout", { withCredentials: true });
      setUser(null);
      alert("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err.response?.data || err.message);
    }
  };

  return (
    <nav>
      <h1>My App</h1>
      <ul>
        {user ? (
          <>
            <li onClick={() => navigate("/profile")}>Welcome, {user.name}</li>
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
