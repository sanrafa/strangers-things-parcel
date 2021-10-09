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
    <main>
      <h1>Make a new post</h1>
      {!postSubmitted ? (
        <form
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
          <label>
            Post title:
            <input
              type="text"
              name="title"
              required={true}
              value={newPost.title}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Description:
            <input
              type="textarea"
              name="description"
              required={true}
              value={newPost.description}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Price:
            <input
              type="text"
              name="price"
              required={true}
              value={newPost.price}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              required={true}
              value={newPost.location}
              onChange={handleChange}
            ></input>
          </label>
          <label>
            Delivery available?
            <input
              type="checkbox"
              name="willDeliver"
              value={newPost.willDeliver}
              onChange={() =>
                setNewPost({ ...newPost, willDeliver: !newPost.willDeliver })
              }
            ></input>
          </label>
          <button type="submit">SUBMIT</button>
        </form>
      ) : null}
      {postSubmitted && newPostID ? (
        <Fragment>
          <p>
            <em>Your post has been submitted</em>
          </p>
          <button
            type="button"
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
