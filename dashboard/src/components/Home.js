import React, { useEffect, useState } from "react";
import axios from "axios";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
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
        if (!res.data.status) {
          window.location.href = "http://localhost:3001/login";
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        window.location.href = "http://localhost:3001/login";
      });
  }, []);

  if (loading) {
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