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
    <aside className="flex flex-col items-center p-6 space-y-6 shadow-md bg-white rounded-lg">
      <h1 className="font-extrabold text-2xl">
        {featuredPost ? featuredPost.title : null}
      </h1>
      <p className="italic p-4">
        {featuredPost ? featuredPost.description : null}
      </p>
      {featuredPost && !featuredPost.isAuthor && !messageSent ? (
        <form
          className="flex flex-col w-3/4"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(postID, token, message).then(() => {
              setMessageSent(!messageSent);
              setMessage("");
            });
          }}
        >
          <label className="font-bold flex flex-col">
            Message:
            <textarea
              className="block mt-2 mb-4 shadow-inner"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </label>
          <button
            type="submit"
            className="block border-solid border-4 border-red-300 bg-red-300 font-bold text-white rounded-lg p-2 hover:shadow hover:text-red-400"
          >
            SEND MESSAGE
          </button>
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
