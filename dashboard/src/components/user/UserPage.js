import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserPage.css";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(
        "http://localhost:3002/auth",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3002/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      window.location.href = "http://localhost:3001/login";
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <h2 className="loading">Loading...</h2>;

  if (!user) return <h2 className="loading">User not found.</h2>;

  return (
    <div className="user-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>

          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-body">

          <div className="info-box">
            <span>Available Funds</span>
            <p>₹ {user.fund.toLocaleString()}</p>
          </div>

          <div className="info-box">
            <span>Account Created</span>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;