import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserContext } from "../App";
import { sendMessage } from "../api";

const FeaturedPost = (props) => {
  const { postID } = useParams();
  const { token } = useContext(UserContext);
  const posts = props.posts;

  const [featuredPost, setFeaturedPost] = useState({});
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const thisPost = posts.filter((post) => post._id === postID);
    setFeaturedPost(thisPost[0]);
    if (messageSent) setMessageSent(!messageSent);
  }, [postID]);

  return (
    <aside>
      <h1>{featuredPost ? featuredPost.title : null}</h1>
      <p>{featuredPost ? featuredPost.description : null}</p>
      {featuredPost && !featuredPost.isAuthor && !messageSent ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(postID, token, message).then(() => {
              setMessageSent(!messageSent);
              setMessage("");
            });
          }}
        >
          <label>
            Message:
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          <button type="submit">SEND MESSAGE</button>
        </form>
      ) : null}
      {messageSent ? (
        <p>
          <em>Thank you for your message.</em>
        </p>
      ) : null}
    </aside>
  ); // use aside element, use flex row for styling
};

export default FeaturedPost;
