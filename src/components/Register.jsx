import React, { useContext, useState, useEffect } from "react";
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

  const createAccount = async () => {
    registerNewUser(user, pass)
      .then((res) => {
        setActiveUser(user);
        setToken(res.data.token);
        setRegisterError("");
      })

      .catch((err) => {
        console.error(err);
        setRegisterError("That username is already taken. Try another.");
      })
      .finally(() => {
        setUser("");
        setPass("");
      });
    // add token to session storage? Or redirect to login page
  };

  async function handleSubmit() {
    await createAccount();
  }

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", token);
    }
    if (sessionStorage.getItem("token")) {
      history.push("/");
    }
  }, [token]);

  return (
    <main>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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
