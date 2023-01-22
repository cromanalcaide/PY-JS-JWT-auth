import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const LoginForm = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.setItem("token", "hola");

  const handleClick = () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch(
      "https://3001-4geeksacade-reactflaskh-3tv1758ui84.ws-eu83.gitpod.io/api/token",
      opts
    )
      .then((resp) => {
        if (resp.status === 200) return resp.json();
        else alert("There has been some error");
      })
      .then((data) => {
        console.log("this came from the back", data);
        sessionStorage.setItem("token", data.access_token);
      })
      .catch((error) => {
        console.error("there was an error", error);
      });
  };

  return (
    <div className="m-auto col-6 col-xs-6 col-sm-6 col-m-4 col-lg-3 col-xl-2">
      {token && token != "" && token != undefined ? (
        "You're logged in with this token" + token
      ) : (
        <div className="Auth-form-container">
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  value={password}
                  placeholder="Also your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Login
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Forgot <a href="#">password?</a>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
