import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";

import { UserContext } from "../App";
import { editPost } from "../api";

const EditPost = (props) => {
  const { postID } = useParams();
  const { token } = useContext(UserContext);
  const [posts, setPosts] = [props.posts, props.setPosts];

  const [post, setPost] = useState({});
  const [editedPost, setEditedPost] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  });
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const thisPost = posts.filter((ele) => ele._id === postID);
    setPost(thisPost[0]);
  }, [postID, posts]);

  useEffect(() => {
    if (post) {
      setEditedPost({
        title: post.title,
        description: post.description,
        price: post.price,
        location: post.location,
        willDeliver: post.willDeliver,
      });
    }
  }, [postID, post]);

  const handleChange = (event) => {
    // for text fields
    setEditedPost({ ...editedPost, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    for (let key in editedPost) {
      if (editedPost[key] === "") {
        setEditedPost({ ...editedPost, [key]: post[key] });
      }
    }
    editPost(token, postID, editedPost).then(() => {
      setEdited(true);
      setPosts([...posts, post]);
    });
  };

  return (
    <main className="bg-red-50 mr-4 ml-4">
      <header className="flex flex-col items-center mt-4 mb-4 space-y-4">
        <h1 className="font-extrabold text-4xl">Edit Post</h1>
        <Link
          to={`/posts/${postID}/post`}
          className="border-2 border-red-500 bg-red-500 p-2 rounded-lg text-center text-white font-bold w-1/12 hover:shadow-md hover:text-red-400"
        >
          Cancel
        </Link>
      </header>

      {post && !edited ? (
        <form
          className="flex flex-col space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="font-bold text-xl">
            Post title:
            <input
              className="ml-4 p-2 shadow-inner block w-3/6"
              type="text"
              name="title"
              value={editedPost.title}
              onChange={handleChange}
              required={true}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Description:
            <input
              className="ml-4 p-2 shadow-inner block w-9/12"
              type="textarea"
              name="description"
              value={editedPost.description}
              onChange={handleChange}
              required={true}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Price:
            <input
              className="ml-4 p-2 shadow-inner block"
              type="text"
              name="price"
              value={editedPost.price}
              onChange={handleChange}
              required={true}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Location:
            <input
              className="ml-4 p-2 shadow-inner block"
              type="text"
              name="location"
              value={editedPost.location}
              onChange={handleChange}
              required={true}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Delivery available?
            <input
              className="ml-4 w-10"
              type="checkbox"
              name="willDeliver"
              value={editedPost.willDeliver}
              defaultChecked={post.willDeliver}
              onChange={() =>
                setEditedPost({
                  ...editedPost,
                  willDeliver: !editedPost.willDeliver,
                })
              }
            ></input>
          </label>
          <button
            type="submit"
            className="border-red-900 border-2 bg-red-800 text-white font-bold w-3/4 self-center hover:text-black"
          >
            SUBMIT
          </button>
        </form>
      ) : null}
      {edited ? (
        <div className="text-center">
          <p>
            <em>Your post has been edited.</em>
          </p>
          <p>
            Click{" "}
            <Link
              to={`/posts/${postID}/post`}
              className="text-red-500 hover:text-red-700"
            >
              HERE
            </Link>{" "}
            to view your post.
          </p>
        </div>
      ) : null}
    </main>
  );
};

export default EditPost;
