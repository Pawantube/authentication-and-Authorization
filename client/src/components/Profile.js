import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/auth/profile", { withCredentials: true });
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        alert("Please login to access your profile.");
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user._id}</p>
    </div>
  );
};

export default Profile;
