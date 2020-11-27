import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  getPosts,
  deletePost,
  addLike,
  removeLike,
  addPost,
} from "../../actions/post";
import Spinner from "../layout/Spinner";
import { Link, useParams } from "react-router-dom";

const Posts = ({
  getPosts,
  auth,
  post: { post, loading, posts },
  deletePost,
  removeLike,
  addLike,
  addPost,
}) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost(formData);
            setFormData({ text: "" });
          }}
          className="form my-1"
        >
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
            value={formData.text}
            onChange={(e) => {
              setFormData({ text: e.target.value });
            }}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      {!loading && posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div key={post._id} className="posts">
              <div className="post bg-white p-1 my-1">
                <div>
                  <Link to={`/profile/${post.user._id}`}>
                    <img className="round-img" src={post.user.avatar} alt="" />
                    <h4>{post.user.name}</h4>
                  </Link>
                </div>
                <div>
                  <p className="my-1">{post.text}</p>
                  <p className="post-date">
                    Posted on <Moment format="DD-MM-YYYY">{post.date}</Moment>
                  </p>
                  <button
                    onClick={() => {
                      addLike(post._id);
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-up"></i>
                    <span> {post.likes.length}</span>
                  </button>
                  <button
                    onClick={() => {
                      removeLike(post._id);
                    }}
                    type="button"
                    className="btn btn-light"
                  >
                    <i className="fas fa-thumbs-down"></i>
                  </button>
                  <Link to={`/post/${post._id}`} className="btn btn-primary">
                    Discussion{" "}
                    <span className="comment-count">
                      {post.comments.length}
                    </span>
                  </Link>
                  {auth.isAuthenticated && post.user._id === auth.user._id && (
                    <button
                      onClick={() => {
                        deletePost(post._id);
                      }}
                      type="button"
                      className="btn btn-danger"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <h4>No posts found</h4>
      )}
    </>
  );
};

export default connect((state) => state, {
  getPosts,
  deletePost,
  removeLike,
  addLike,
  addPost,
})(Posts);
