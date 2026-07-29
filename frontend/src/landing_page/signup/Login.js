// // useState is a React Hook that lets a functional component store and update data.
import React, { useState } from "react";

// useNavigate is a React Router Hook that allows you to navigate from one page to another programmatically.
import { Link, useNavigate } from "react-router-dom";

// Axios is a JavaScript library used to send HTTP requests from your frontend (React) or backend (Node.js) to a server or API.
import axios from "axios";

// used to show small notification messages to the user.
import { ToastContainer, toast } from "react-toastify";
import "./signup.css";

const Login = () => {
  const navigate = useNavigate();

  // inputValue to store the email , password and provides setInputValue to update those values.
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;

  // This function updates the email, password in the React state whenever the user types into an input.
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  // This function displays an error msg at the bottom-left of the screen.
  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  // This function displays an success msg at the bottom-right of the screen.
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    // preventDefault stop browser to reloading the page after clicking submit button.
    e.preventDefault();
    try {
      // Axios sends post request to backend server and ask for token also and wait till server responds.
      const { data } = await axios.post(
        "http://localhost:3002/auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true },
      );
      console.log(data);
      const { success, message } = data;
      // if server verify and send us token then we redirect to dashboard
      if (success) {
        handleSuccess(message);
        //directing to dashboard with the delay 1 second
        setTimeout(() => {
          window.location.href = "http://localhost:3000";
        }, 1000);
      } else {
        // server unable to verify user info or any error occur
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }

    // Resets all input fields to empty strings.
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="auth-page">
      <div className="form_container">
        {/* Login form */}
        <h2>Login Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit">Submit</button>
          <span>
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
