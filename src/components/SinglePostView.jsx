import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../App";
import { sendMessage, deletePost } from "../api";

const SinglePostView = (props) => {
  const { postID } = useParams();
  const { token } = useContext(UserContext);
  const [posts, setPosts] = [props.posts, props.setPosts];

  const [post, setPost] = useState({});
  const [message, setMessage] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [deletedPost, setDeletedPost] = useState(false);

  useEffect(() => {
    const thisPost = posts.filter(
      (ele) => ele._id === postID && ele.active === true
    );
    setPost(thisPost[0]);
  }, [postID, posts]);

  return (
    <section className="bg-red-50 p-4 h-screen">
      <nav className="flex justify-evenly mt-4 mb-4">
        <Link
          to="/posts"
          className="border-2 border-red-300 rounded-lg p-1 bg-white font-bold text-red-700 hover:shadow"
        >
          Return to all posts
        </Link>
        {post && post.isAuthor && !deletedPost ? (
          <Link
            to={`/posts/${postID}/edit`}
            className="border-2 border-red-300 bg-red-300 rounded-lg p-1 font-bold text-red-700 hover:shadow hover:text-red-100"
          >
            Edit this post
          </Link>
        ) : null}
        {post && post.isAuthor && !deletedPost ? (
          <button
            type="button"
            className="bg-red-700 border-2 border-red-700 p-1 rounded-lg mr-4 font-extrabold text-black hover:text-red-400 hover:shadow"
            onClick={() => {
              deletePost(postID, token)
                .then(() => {
                  setDeletedPost(true);
                })
                .finally(() => {
                  const activePosts = posts.filter(
                    (post) => post.active === true
                  );
                  setPosts(activePosts);
                });
            }}
          >
            DELETE THIS POST
          </button>
        ) : null}
      </nav>
      <hr />
      <article className="space-y-6">
        {deletedPost ? (
          <p>
            <em>Your post has been deleted.</em>
          </p>
        ) : null}
        {post ? (
          <Fragment>
            <h1 className="mt-4 text-center text-4xl">
              {post ? post.title : null}
            </h1>
            <p className="text-center text-xl">
              {post ? post.description : null}
            </p>
            <p className="text-2xl">
              <strong>Price:</strong> {post ? post.price : null}
            </p>
            <p className="text-2xl">
              <strong>Delivery available?</strong>
              {post && post.willDeliver ? " yes" : " none"}
            </p>
            <p className="text-2xl">
              <strong>Location:</strong> {post ? post.location : null}
            </p>
          </Fragment>
        ) : null}
      </article>
      <aside className="mt-4">
        {/* Message form will show if user is not author */}
        {post && !post.isAuthor && token ? (
          <h2 className="text-center text-2xl font-semibold">SEND A MESSAGE</h2>
        ) : null}
        {post && !msgSent && !post.isAuthor && token ? (
          <div>
            <form
              className="flex flex-col items-center mt-4 p-4 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(postID, token, message).then(() => {
                  setMsgSent(!msgSent);
                  setMessage("");
                });
              }}
            >
              <label className="font-bold flex flex-col w-3/4">
                Message:
                <textarea
                  className="block mt-2 mb-4 shadow-inner p-4"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </label>
              <button
                type="submit"
                className="block border-solid border-4 border-red-300 bg-red-300 font-bold text-white rounded-lg p-2 hover:shadow hover:text-red-400"
              >
                SUBMIT
              </button>
            </form>
          </div>
        ) : null}
        {post && !post.isAuthor && msgSent ? (
          <p className="text-center">
            <em>Your message has been sent</em>
          </p>
        ) : null}
        {/* Message pane will show if user is author */}
        {post && post.isAuthor ? (
          <div className="flex flex-col items-center mt-4 p-4 space-y-6">
            <h2 className="text-2xl font-semibold">Messages</h2>
            {post.messages.map((msg) => (
              <div key={msg._id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="italic">From: {msg.fromUser.username}</h3>
                <p>{msg.content}</p>
              </div>
            ))}
          </div>
        ) : null}
      </aside>
    </section>
  );
};

export default SinglePostView;
