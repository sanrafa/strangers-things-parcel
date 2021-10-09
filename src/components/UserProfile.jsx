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
    <div>
      <h1>User Profile</h1>
      {loginError ? <p>{loginError}</p> : null}
      {userData ? <h3>Hello {userData.username}!</h3> : null}
      <h2>My Posts</h2>
      {myPosts.length > 0 ? (
        myPosts.map((post) => (
          <div key={post._id}>
            <h3>
              {post.active ? (
                <Link to={`/posts/${post._id}/post`}>{post.title}</Link>
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
      <h2>My Messages</h2>
      {myMessages.length > 0 ? (
        myMessages.map((msg) => (
          <div key={msg._id}>
            <h3>
              To:{" "}
              {msg.fromUser.username !== activeUser
                ? `Me (${msg.post.title})`
                : msg.post.title}
            </h3>
            <p>{msg.content}</p>
            <h4>
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
    </div>
  );
};

export default UserProfile;
