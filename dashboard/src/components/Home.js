import React, { useEffect, useState } from "react";

// Axios is a JavaScript library used to send HTTP requests from your frontend (React) or backend (Node.js) to a server or API.
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // sending post res to backend to verify user is verified or not
    axios
      .post(
        "http://localhost:3002/auth",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (!res.data.status) {
          // if its not verified then it will redirect to frontend login page
          window.location.href = "http://localhost:3001/login";
        } else {
          // Authentication is complete, and the user is allowed to view this page.
          setLoading(false);
        }
      })
      .catch(() => {
        window.location.href = "http://localhost:3001/login";
      });
  }, []);

  if (loading) {
    // without verifing cant open dashboard
    return <h2>Checking Authentication...</h2>;
  }

  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;