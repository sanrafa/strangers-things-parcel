import React, { useState, useContext, Fragment } from "react";
import { useHistory } from "react-router-dom";

import { makeNewPost } from "../api";

import { UserContext } from "../App";

//import "posts/setPosts" as prop, update state on fetch so all posts will be available on state
const NewPost = (props) => {
  const history = useHistory();
  const [posts, setPosts] = [props.posts, props.setPosts];
  const { token } = useContext(UserContext);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    willDeliver: false,
  }); // state to store new post object

  const [postSubmitted, setPostSubmitted] = useState(false);
  const [newPostID, setNewPostID] = useState("");

  const handleChange = (event) => {
    // for text fields
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  return (
    <main className="bg-red-50 mr-4 ml-4 flex flex-col items-center space-y-6 h-screen">
      <h1 className="font-extrabold text-4xl">Make a new post</h1>
      {!postSubmitted ? (
        <form
          className="flex flex-col space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            makeNewPost(token, newPost).then((res) => {
              setPosts([...posts, res.data.post]);

              setPostSubmitted(true);
              setNewPostID(res.data.post._id);
            });
            setNewPost({
              title: "",
              description: "",
              price: "",
              location: "",
              willDeliver: false,
            });
          }}
        >
          <label className="font-bold text-xl">
            Post title:
            <input
              className="ml-4 p-2 shadow-inner block"
              type="text"
              name="title"
              required={true}
              value={newPost.title}
              onChange={handleChange}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Description:
            <input
              className="ml-4 p-2 shadow-inner block"
              type="textarea"
              name="description"
              required={true}
              value={newPost.description}
              onChange={handleChange}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Price:
            <input
              className="ml-4 p-2 shadow-inner block"
              type="text"
              name="price"
              required={true}
              value={newPost.price}
              onChange={handleChange}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Location:
            <input
              className="ml-4 p-2 shadow-inner block"
              type="text"
              name="location"
              required={true}
              value={newPost.location}
              onChange={handleChange}
            ></input>
          </label>
          <label className="font-bold text-xl">
            Delivery available?
            <input
              className="ml-4 w-10"
              type="checkbox"
              name="willDeliver"
              value={newPost.willDeliver}
              onChange={() =>
                setNewPost({ ...newPost, willDeliver: !newPost.willDeliver })
              }
            ></input>
          </label>
          <button
            type="submit"
            className="border-red-900 border-2 bg-red-800 text-white font-bold w-3/4 self-center rounded-lg hover:text-black"
          >
            SUBMIT
          </button>
        </form>
      ) : null}
      {postSubmitted && newPostID ? (
        <Fragment>
          <p>
            <em>Your post has been submitted</em>
          </p>
          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => history.push(`/posts/${newPostID}/post`)}
          >
            VIEW YOUR POST
          </button>
        </Fragment>
      ) : null}
    </main>
  );
};

export default NewPost;
