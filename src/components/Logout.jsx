import React, { useEffect, useContext } from "react";
// import { BrowserRouter, Router, Link } from "react-router-dom";

import { UserContext } from "../App";

const Logout = () => {
  const { setActiveUser, setToken } = useContext(UserContext);

  useEffect(() => {
    setActiveUser("");
    setToken("");
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <h1 className="text-center m-60 font-extrabold text-4xl">
      You are now logged out.
    </h1>
  );
};

export default Logout;
