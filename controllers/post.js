const { validationResult } = require("express-validator");

const Post = require("../models/Post");

exports.createPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const newPost = new Post({
    text: req.body.text,
    title: req.body.title,
    user: req.user.payload.id,
    name: req.user.payload.name,
    avatar: req.user.payload.avatar,
  });

  newPost
    .save()
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      return res.send("Server error");
    });
};

exports.getAllPost = async (req, res) => {
  const posts = await Post.find()
    .populate("user", ["name", "avatar"])
    .sort({ date: -1 });
  res.json(posts);
};

exports.getAPost = (req, res) => {
  Post.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      return res.json(post);
    })
    .catch((err) => {
      return res.status(404).send({ msg: "Post not found" });
    });
};

exports.deleteAPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      if (post.user._id.toString() !== req.user.payload.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      post.remove().then(() => {
        return res.json({ msg: "Post removed" });
      });
    })
    .catch((err) => {
      return res.status(404).json({ msg: "Post not found" });
    });
};

exports.likeAPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      if (
        post.likes.filter(
          (like) => like.user.toString() === req.user.payload.id
        ).length > 0
      ) {
        return res.status(400).json({ msg: "User already liked this post" });
      }

      post.likes.unshift({ user: req.user.payload.id });

      post.save().then(() => {
        return res.status(200).json({ msg: "Liked post" });
      });
    })
    .catch((err) => {
      return res.status(404).json({ msg: "Post not found", err });
    });
};

exports.unLikeAPost = (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      if (
        post.likes.filter(
          (like) => like.user.toString() === req.user.payload.id
        ).length == 0
      ) {
        return res.status(400).json({ msg: "User has not liked this post" });
      }

      let updatedLikes = post.likes.filter(
        (like) => like.user.toString() !== req.user.payload.id
      );

      post.likes = updatedLikes;

      post.save().then(() => {
        return res.status(200).json({ msg: "unLiked post" });
      });
    })
    .catch((err) => {
      return res.status(404).json({ msg: "Post not found", err });
    });
};

exports.commentAPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const newComment = {
    text: req.body.text,
    title: req.body.title,
    user: req.user.payload.id,
    name: req.user.payload.name,
    avatar: req.user.payload.avatar,
  };

  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      post.comments.unshift(newComment);

      post.save().then((post) => {
        res.json(post);
      });
    })
    .catch((err) => {
      return res.status(404).json({ msg: "Post not found", err });
    })
    .catch((err) => {
      return res.send("Server error");
    });
};

exports.deleteAComment = (req, res) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }

      let comment = post.comments.find(
        (comment) => comment._id.toString() === req.params.comment_id
      );
      if (!comment) {
        return res.status(404).json({ msg: "Comment not found" });
      }

      if (comment.user.toString() !== req.user.payload.id) {
        return res.json({ msg: "User not authorized" });
      }

      let updatedComments = post.comments.filter(
        (co) => co.text !== comment.text
      );

      post.comments = updatedComments;

      post.save().then(() => {
        return res.status(200).json({ msg: "comment removed successfully" });
      });
    })
    .catch((err) => {
      return res.send("Server error");
    });
};
