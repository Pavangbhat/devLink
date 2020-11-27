import React, { useEffect } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { getPosts, deletePost, addLike, removeLike } from "../../actions/post";
import Spinner from "../layout/Spinner";

const Posts = ({
  getPosts,
  auth,
  post: { post, loading, posts },
  deletePost,
  removeLike,
  addLike,
}) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>
      {!loading && posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div key={post._id} class="posts">
              <div class="post bg-white p-1 my-1">
                <div>
                  <a href="profile.html">
                    <img class="round-img" src={post.user.avatar} alt="" />
                    <h4>{post.user.name}</h4>
                  </a>
                </div>
                <div>
                  <p class="my-1">{post.text}</p>
                  <p class="post-date">
                    Posted on <Moment format="DD-MM-YYYY">{post.date}</Moment>
                  </p>
                  <button
                    onClick={() => {
                      addLike(post._id);
                    }}
                    type="button"
                    class="btn btn-light"
                  >
                    <i class="fas fa-thumbs-up"></i>
                    <span> {post.likes.length}</span>
                  </button>
                  <button
                    onClick={() => {
                      removeLike(post._id);
                    }}
                    type="button"
                    class="btn btn-light"
                  >
                    <i class="fas fa-thumbs-down"></i>
                  </button>
                  <a href="post.html" class="btn btn-primary">
                    Discussion{" "}
                    <span class="comment-count">{post.comments.length}</span>
                  </a>
                  {auth.isAuthenticated && post.user._id === auth.user._id && (
                    <button
                      onClick={() => {
                        deletePost(post._id);
                      }}
                      type="button"
                      class="btn btn-danger"
                    >
                      <i class="fas fa-times"></i>
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
})(Posts);
