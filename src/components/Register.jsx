import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";
import { registerNewUser } from "../api";

const Register = (props) => {
  const history = useHistory();
  const [user, setUser, pass, setPass] = [
    props.user,
    props.setUser,
    props.pass,
    props.setPass,
  ];

  const { setActiveUser, setToken, token } = useContext(UserContext);

  const [registerError, setRegisterError] = useState("");

  const createAccount = () => {
    registerNewUser(user, pass)
      .then((res) => {
        setActiveUser(user);
        setToken(res.data.token);
        setRegisterError("");
      })
      .then(() => {
        sessionStorage.setItem("token", token); // CHANGE TO SESSION BEFORE DEPLOYMENT
      })
      .catch((err) => {
        console.error(err);
        setRegisterError("That username is already taken. Try another.");
      });
    // add token to session storage? Or redirect to login page
  };

  //TODO: add min-length requirements to username & password
  return (
    <main>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createAccount();
          setUser("");
          setPass("");
          history.push("/");
        }}
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            required={true}
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
            minLength="5"
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            required={true}
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            minLength="8"
          ></input>
        </label>

        <button type="submit">REGISTER</button>
      </form>
      {registerError ? <p>{registerError}</p> : null}
    </main>
  );
};

export default Register;
