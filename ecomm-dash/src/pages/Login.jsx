import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/api/auth-api";
import { UilUser, UilLock } from "@iconscout/react-unicons";

import "../styles/login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
  };

  useEffect(() => {
    document.body.classList.add("no-border-page");

    return () => {
      document.body.classList.remove("no-border-page");
    };
  });

  return (
    <>
      <div className="login-layout">
        <div className="login-card">
          <div className="login-card-title">Løgin</div>
          <form action="#">
            <br />
            <div className="field">
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label>
                <UilUser size="20" />
                Username
              </label>
            </div>
            <br />
            <div className="field">
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>
                <UilLock size="20" />
                Password
              </label>
            </div>

            <div className="field">
              <input type="submit" value="Løgin" onClick={handleClick} />
              {error && <h5>{error}</h5>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
