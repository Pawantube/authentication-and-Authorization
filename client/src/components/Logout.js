import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete("/api/auth/logout", { withCredentials: true });
      alert("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Error logging out:", err.response?.data || err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
