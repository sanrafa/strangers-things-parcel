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
    <main>
      <h1>Edit Post</h1>

      {post && !edited ? (
        <Fragment>
          <Link to={`/posts/${postID}/post`}>Cancel</Link>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label>
              Post title:
              <input
                type="text"
                name="title"
                value={editedPost.title}
                onChange={handleChange}
                required={true}
              ></input>
            </label>
            <label>
              Description:
              <input
                type="textarea"
                name="description"
                value={editedPost.description}
                onChange={handleChange}
                required={true}
              ></input>
            </label>
            <label>
              Price:
              <input
                type="text"
                name="price"
                value={editedPost.price}
                onChange={handleChange}
                required={true}
              ></input>
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={editedPost.location}
                onChange={handleChange}
                required={true}
              ></input>
            </label>
            <label>
              Delivery available?
              <input
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
            <button type="submit">SUBMIT</button>
          </form>
        </Fragment>
      ) : null}
      {edited ? (
        <div>
          <p>
            <em>Your post has been edited.</em>
          </p>
          <p>
            Click <Link to={`/posts/${postID}/post`}>HERE</Link> to view your
            post.
          </p>
        </div>
      ) : null}
    </main>
  );
};

export default EditPost;
