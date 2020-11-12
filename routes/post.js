const express = require("express");
const { check } = require("express-validator");
const { isAuthenticated } = require("../controllers/auth");
const {
  createPost,
  getAllPost,
  getAPost,
  deleteAPost,
  likeAPost,
  unLikeAPost,
  commentAPost,
  deleteAComment,
} = require("../controllers/post");

const route = express.Router();

// Create post
route.post(
  "/post/create",
  [isAuthenticated, [check("text", "text is required").not().isEmpty()]],
  createPost
);

// Get all posts
route.get("/posts", isAuthenticated, getAllPost);

// Get a post
route.get("/post/:id", isAuthenticated, getAPost);

// Delete a post
route.delete("/post/:id", isAuthenticated, deleteAPost);

// Like a post
route.put("/post/like/:id", isAuthenticated, likeAPost);

// Unlike a post
route.put("/post/unlike/:id", isAuthenticated, unLikeAPost);

// Comment a post
route.put(
  "/post/comment/:id",
  [isAuthenticated, [check("text", "text is required").not().isEmpty()]],
  commentAPost
);

// Delete a comment
route.put(
  "/post/:post_id/comment/:comment_id",
  isAuthenticated,
  deleteAComment
);

module.exports = route;
