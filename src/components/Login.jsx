import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";
import { loginUser } from "../api";

const Login = (props) => {
  const history = useHistory();
  const [user, setUser, pass, setPass] = [
    props.user,
    props.setUser,
    props.pass,
    props.setPass,
  ];

  const { setActiveUser, token, setToken } = useContext(UserContext);

  //state for login preferences
  const [persistLogin, setPersistLogin] = useState(false);

  useEffect(() => {
    if (persistLogin) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }
  }, [token]);

  const accessAccount = () => {
    loginUser(user, pass)
      .then((res) => {
        setActiveUser(user);
        setToken(res.data.token);
        setUser("");
        setPass("");
        if (document.getElementById("login-error").style.display === "block") {
          document.getElementById("login-error").style.display = "none";
        }
      })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        document.getElementById("login-error").style.display = "block";
      });
  };

  return (
    <main className="flex flex-col items-center space-y-6 bg-red-50 mt-20 p-4">
      <h1 className="mt-4 text-4xl mb-4">Login</h1>
      <form
        className="flex flex-col space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          accessAccount();
        }}
      >
        <label className="font-bold">
          Username:
          <input
            className="shadow-inner ml-4 p-2"
            type="text"
            name="username"
            required={true}
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          ></input>
        </label>
        <label className="font-bold">
          Password:
          <input
            className="shadow-inner ml-4 p-2"
            type="password"
            name="password"
            required={true}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          ></input>
        </label>
        <label className="font-semibold">
          Stay logged in?
          <input
            className="ml-4"
            type="checkbox"
            name="stayLoggedIn"
            value="stayLoggedIn"
            onClick={() => {
              setPersistLogin(!persistLogin);
            }}
          ></input>
        </label>
        <button
          type="submit"
          className="border-2 border-red-500 p-2 font-semibold bg-red-500 text-white rounded-lg hover:text-red-700 hover:shadow"
        >
          LOG IN
        </button>
      </form>
      <p id="login-error" style={{ display: "none" }}>
        Incorrect username or password
      </p>
    </main>
  );
};

export default Login;
