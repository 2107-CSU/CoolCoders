import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../api/constant";
import { loginUser, registerUser } from "../api/users";
import { UserContext } from "./App";

const Login = ({ match, history, setToken }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  /*   async function handleRegister(email, name, password, setToken, setEmail) {
    try {
      const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.token) {
        const token = data.token;
        setToken(token);
        localStorage.setItem("token", token);
        return data;
      } else {
        alert(data.error);
        setEmail("");
        setName("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  } */

  async function handleLogin() {
    try {
      const user = await loginUser(email, password);
      if (user.token) {
        setToken(user.token);
        localStorage.setItem("token", user.token);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRegister() {
    try {
      const user = await registerUser(email, password, name);
      if (user.token) {
        setToken(user.token);
        localStorage.setItem("token", user.token);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="text-center ">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (match.url === "/register") {
            try {
              if (password === confirmedPassword && password.length >= 8) {
                handleRegister();
                setEmail("");
                setPassword("");
                setConfirmedPassword("");
                setName("");
              }
            } catch (error) {
              console.log(error);
            }
          }
          if (match.path === "/login") {
            handleLogin();
            setEmail("");
            setPassword("");
          }
        }}
      >
        <h1 className="marginTop">
          {match.url === "/login" ? "Please Sign In" : "Make An Account"}
        </h1>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
            placeholder="Your Email"
            autoFocus
            className="form-control mb-2"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required
            placeholder="Your Password"
            className="form-control mb-2"
          />
        </div>
        {match.url === "/register" ? (
          <>
            <div>
              <label>Confirmed Password</label>
              <input
                type="password"
                value={confirmedPassword}
                onChange={(e) => setConfirmedPassword(e.target.value)}
                id="confirmedPassword"
                placeholder="Confirm Password"
                className="form-control mb-2"
              />
            </div>
            <div>
              <label>name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                required
                placeholder="Your Name"
                className="form-control mb-2"
              />
            </div>
          </>
        ) : null}
        <button type="submit" className="btn-lg btn-primary btn-block mt-4">
          Submit
        </button>
        {match.url === "/register" ? (
          <div className="mt-3">
            {" "}
            <Link to="/login">Already have an account? </Link>
          </div>
        ) : (
          <div className="mt-3">
            <Link to="register">Don't have an account?</Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
