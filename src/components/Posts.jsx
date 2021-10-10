import React, { useContext, Fragment, useState, useEffect } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { FeaturedPost } from ".";

import { UserContext } from "../App";

import { deletePost } from "../api";

const Posts = (props) => {
  let match = useRouteMatch();
  const [posts, setPosts] = [props.posts, props.setPosts];

  const { token, activeUser } = useContext(UserContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearch = (search, postStr) => {
    function escRegEx(str) {
      return str.replace(/[-\\^$*+?.()|[\]{}]/g, "");
    }
    const escapedTerm = escRegEx(search);
    const regex = new RegExp(escapedTerm, "gi");
    return regex.test(postStr);
  };

  useEffect(() => {
    const searchPosts = posts.filter(
      (post) =>
        handleSearch(searchTerm, post.title) ||
        handleSearch(searchTerm, post.description)
    );
    setFilteredPosts(searchPosts);
  }, [searchTerm]);

  return (
    <Fragment>
      <main className="flex flex-col items-center bg-gray-50">
        <header className="flex flex-col items-center">
          <h1 className="font-extrabold text-5xl mt-4 mb-6">Posts</h1>
          {token && activeUser ? (
            <Link
              to="/newpost"
              className="hover:text-black border-solid border-4 rounded-lg border-red-500 p-2 mb-4 bg-red-500 text-white font-bold"
            >
              Create new post
            </Link>
          ) : null}

          <form>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-center p-1 mb-4 shadow-inner bg-white rounded-lg focus:shadow-lg"
            ></input>
          </form>
        </header>
        <div className="flex flex-1 items-baseline ml-4 mr-4 space-x-4">
          <section className="flex flex-col">
            {posts && !(filteredPosts.length > 0)
              ? posts.map((post) => (
                  <div
                    key={post._id}
                    className="shadow-lg rounded-lg p-4 mb-4 bg-white"
                  >
                    <h3 className="font-bold">{post.title}</h3>
                    <p>{post.description}</p>
                    {post.isAuthor === true ? (
                      <button
                        type="button"
                        onClick={() =>
                          deletePost(post._id, token).then(() => {
                            const activePosts = posts.filter(
                              (post) => post.active === true
                            );
                            setPosts(activePosts);
                          })
                        }
                      >
                        DELETE
                      </button>
                    ) : null}
                    {activeUser && !post.isAuthor ? (
                      <Link to={`/posts/${post._id}`}>Send a message</Link>
                    ) : null}
                    <Link to={`/posts/${post._id}/post`}>View post</Link>
                  </div>
                ))
              : posts && filteredPosts.length > 0
              ? filteredPosts.map((post) => (
                  <div
                    key={post._id}
                    className="shadow-lg rounded-lg p-4 mb-4 bg-white"
                  >
                    <h3 className="font-extrabold">{post.title}</h3>
                    <p>{post.description}</p>
                    {post.isAuthor === true ? (
                      <button
                        type="button"
                        onClick={() =>
                          deletePost(post._id, token).then(() => {
                            const activePosts = posts.filter(
                              (post) => post.active === true
                            );
                            setPosts(activePosts);
                          })
                        }
                      >
                        DELETE
                      </button>
                    ) : null}
                    {activeUser && !post.isAuthor ? (
                      <Link
                        to={`/posts/${post._id}`}
                        className="font-bold text-gray-500 mr-6 hover:text-red-500"
                      >
                        Send a message
                      </Link>
                    ) : null}
                    <Link
                      to={`/posts/${post._id}/post`}
                      className="font-bold text-gray-500 hover:text-red-500"
                    >
                      View post
                    </Link>
                  </div>
                ))
              : null}
          </section>
          <Route exact path={`${match.path}/:postID`}>
            <FeaturedPost posts={posts} />
          </Route>
        </div>
      </main>
    </Fragment>
  );
};

export default Posts;
