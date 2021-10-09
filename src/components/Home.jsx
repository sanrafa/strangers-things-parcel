import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

const Home = (props) => {
  const { activeUser, token } = useContext(UserContext);
  return (
    <main className="flex flex-col items-center space-y-32 mt-8 text-center">
      <h1 className="text-red-900 text-4xl font-extrabold p-3 mt-4">
        Welcome to{" "}
        <span className="tracking-wider underline">Stranger's Things</span>!
      </h1>
      <p className="mt-4 text-2xl font-bold">
        The <span className="underline">only</span> place on the internet where
        strangers can buy each other's things.
      </p>
      <div>
        <Link
          to="/posts"
          className="border-solid border-4 p-2 rounded-lg border-red-800 bg-red-700 font-bold hover:shadow-lg hover:text-white"
        >
          View active posts
        </Link>
        {/* Import context, only show add new post if user is logged in */}
        {activeUser && token ? (
          <Link
            to="/newpost"
            className="border-solid border-4 p-2 rounded-lg border-red-800 bg-red-700 font-bold hover:shadow-lg hover:text-white"
          >
            Add a new post
          </Link>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
