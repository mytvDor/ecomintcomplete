import React, { useState } from "react";

import "../component/allStyle/Login.css";
import Homepage from "./Homepage";
import { Link, NavLink } from "react-router-dom";
import FirstHome from "./FirstHome";

const Login = () => {
  const [data, setData] = useState({
    email: null,
    password: null,
  });

  const [authUser, setAuthUser] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const respData = await response.json();
        setAuthUser(true);
        // console.log(authUser);

        localStorage.setItem("authData", JSON.stringify(respData));
        // console.log(respData);
        // console.log(respData.email);
        handleUserData(respData.email);
      } else {
        alert("fill correct email and password");
        console.log("fail");
        setData({
          email: "",
          password: "",
        });
      }
    } catch (e) {
      console.log(err);
    }
  };

  const handleUserData = async (email) => {
    try {
      const postEmail = {
        email: email,
      };
      const res = await fetch("http://localhost:9000/getUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(postEmail),
      });

      if (res.ok) {
        const user = await res.json();
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("place", JSON.stringify(user.orderPlaced));
      } else {
        console.log("something wrong from fetch data from login ");
      }
    } catch (err) {
      console.log("err From login", err);
    }
  };

  return (
    <div>
      {authUser ? (
        <FirstHome />
      ) : (
        <div className="body">
          {" "}
          <div className="login-container">
            <h2>Login</h2>
            <form action="#" method="post" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email || ""}
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={data.password || ""}
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                Create Account
              </div>{" "}
              <button type="submit">Login</button>{" "}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
