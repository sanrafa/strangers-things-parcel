import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { getUserInfo } from "../api";
import { UserContext } from "../App";

const UserProfile = () => {
  const { token, activeUser } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [loginError, setLoginError] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [myMessages, setMyMessages] = useState([]);

  useEffect(() => {
    if (token) {
      getUserInfo(token).then((res) => {
        if (res.success === false) {
          setLoginError(res.error.message);
        } else {
          setUserData(res.data);
          setLoginError("");
          setMyPosts(res.data.posts);
          setMyMessages(res.data.messages);
        }
      });
    }
  }, [activeUser, token]);

  return (
    <main>
      <header className="mb-4 space-y-4">
        <h1 className="text-center text-4xl font-extrabold">User Profile</h1>
        {loginError ? <p className="text-center">{loginError}</p> : null}
        {userData ? (
          <h3 className="text-center text-2xl">Hello {userData.username}!</h3>
        ) : null}
      </header>

      <hr />
      <div className="flex m-4 justify-around">
        <section className=" flex-grow space-y-4">
          <h2 className="font-bold text-2xl">My Posts</h2>
          {myPosts.length > 0 ? (
            myPosts.map((post) => (
              <div key={post._id} className="shadow-lg w-3/4 p-4">
                <h3
                  className={
                    !post.active
                      ? "font-bold text-gray-600"
                      : "font-bold text-red-700"
                  }
                >
                  {post.active ? (
                    <Link
                      to={`/posts/${post._id}/post`}
                      className="hover:text-red-600"
                    >
                      {post.title}
                    </Link>
                  ) : (
                    post.title + " (inactive)"
                  )}
                </h3>
                <p>{post.description}</p>
              </div>
            ))
          ) : (
            <p>Nothing to see here...</p>
          )}
        </section>
        <section className="space-y-4 flex-grow">
          <h2 className="font-bold text-2xl">My Messages</h2>
          {myMessages.length > 0 ? (
            myMessages.map((msg) => (
              <div key={msg._id} className="shadow-lg w-3/4 p-4">
                <h3 className="text-red-600 font-bold">
                  To:{" "}
                  {msg.fromUser.username !== activeUser
                    ? `Me (${msg.post.title})`
                    : msg.post.title}
                </h3>
                <p>{msg.content}</p>
                <h4 className="text-red-900">
                  From:{" "}
                  {msg.fromUser.username === activeUser
                    ? "Me"
                    : msg.fromUser.username}
                </h4>
              </div>
            ))
          ) : (
            <p>Nothing to see here...</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default UserProfile;
