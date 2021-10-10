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
    <main className="flex flex-col items-center space-y-6 bg-red-50 mt-20 p-4">
      <h1 className="mt-4 text-4xl mb-4">Register</h1>
      <form
        className="flex flex-col space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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
            minLength="5"
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
            minLength="8"
          ></input>
        </label>

        <button
          type="submit"
          className="border-2 border-red-500 p-2 font-semibold bg-red-500 text-white rounded-lg hover:text-red-700 hover:shadow"
        >
          REGISTER
        </button>
      </form>
      {registerError ? <p>{registerError}</p> : null}
    </main>
  );
};

export default Register;
