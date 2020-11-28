import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addComment, deleteComment, getPost } from "../../actions/post";
import { Link, useParams } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Moment from "react-moment";

const Post = ({
  getPost,
  auth,
  addComment,
  deleteComment,
  post: { post, loading },
}) => {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    text: "",
    name: "",
    avatar: "",
  });
  useEffect(() => {
    getPost(postId);
  }, [getPost, post]);

  return (
    <>
      {post === null || loading ? (
        <Spinner />
      ) : (
        <>
          {console.log()}
          <Link to="/posts" className="btn btn-light">
            Go back
          </Link>
          <div className="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user._id}`}>
                <img className="round-img" src={post.user.avatar} alt="" />
                <h4>{post.user.name}</h4>
              </Link>
            </div>
            <div>
              <p className="my-1">{post.text}</p>
            </div>
          </div>
          <div class="post-form">
            <div class="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const userAndAvatar = {
                  name: auth.user.name,
                  avatar: auth.user.avatar,
                };

                addComment(post._id, formData, userAndAvatar);
                setFormData({ ...formData, text: "" });
              }}
              class="form my-1"
            >
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                required
                value={formData.text}
                onChange={(e) => {
                  setFormData({ ...formData, text: e.target.value });
                }}
              ></textarea>
              <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
          </div>
          {post.comments.length > 0 ? (
            <>
              {post.comments.map((comment) => (
                <div class="comments">
                  <div class="post bg-white p-1 my-1">
                    <div>
                      <Link to={`/profile/${comment.user}`}>
                        <img class="round-img" src={comment.avatar} alt="" />

                        <h4>{comment.name}</h4>
                      </Link>
                    </div>
                    <div>
                      <p class="my-1">{comment.text}</p>
                      <p class="post-date">
                        Posted on{" "}
                        <Moment format="DD-MM-YYYY">{comment.date}</Moment>
                      </p>
                      {!auth.loading &&
                        auth.isAuthenticated &&
                        auth.user._id === comment.user && (
                          <button
                            onClick={() => {
                              deleteComment(post._id, comment._id);
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
            <h4>No comments found</h4>
          )}
        </>
      )}
    </>
  );
};

export default connect((state) => state, {
  getPost,
  addComment,
  deleteComment,
})(Post);
