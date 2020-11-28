import {
  GET_POSTS,
  DELETE_POST,
  UPDATE_LIKE,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";
import { setAlert } from "./alert";

const axios = require("axios").default;
export const getPosts = () => (dispatch) => {
  var config = {
    method: "get",
    url: "http://localhost:5000/api/posts",
  };

  axios(config)
    .then(function (response) {
      dispatch({ type: GET_POSTS, payload: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deletePost = (postId) => (dispatch) => {
  var config = {
    method: "delete",
    url: `http://localhost:5000/api/post/delete/${postId}`,
  };

  axios(config)
    .then(function (response) {
      dispatch(setAlert("Post removed"));
      dispatch({
        type: DELETE_POST,
        payload: postId,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addLike = (postId) => (dispatch) => {
  var config = {
    method: "put",
    url: `http://localhost:5000/api/post/like/${postId}`,
  };

  axios(config)
    .then(function (response) {
      const { data } = response;
      dispatch({
        type: UPDATE_LIKE,
        payload: { postId, data },
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const removeLike = (postId) => (dispatch) => {
  var config = {
    method: "put",
    url: `http://localhost:5000/api/post/unlike/${postId}`,
  };

  axios(config)
    .then(function (response) {
      const { data } = response;

      dispatch({
        type: UPDATE_LIKE,
        payload: { postId, data },
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const addPost = (formData) => (dispatch) => {
  var data = JSON.stringify(formData);

  var config = {
    method: "post",
    url: "http://localhost:5000/api/post/create",
    headers: {
      "content-type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: ADD_POST,
        payload: response.data,
      });
      dispatch(setAlert("Add post", "success"));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const getPost = (postId) => (dispatch) => {
  var config = {
    method: "get",
    url: `http://localhost:5000/api/post/${postId}`,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_POST,
        payload: response.data,
      });
    })
    .catch(function (error) {
      dispatch(setAlert("Post not found user might have deleted the post"));
    });
};

export const addComment = (postId, formData, userAndAvatar) => (dispatch) => {
  var data = JSON.stringify({ ...formData, ...userAndAvatar });
  console.log(formData);
  var config = {
    method: "put",
    url: `http://localhost:5000/api/post/comment/${postId}`,
    headers: {
      "content-type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      const { comments } = response.data;
      dispatch({
        type: ADD_COMMENT,
        payload: comments,
      });
      dispatch(setAlert("Comment added", "success"));
    })
    .catch(function (error) {
      dispatch(
        setAlert("Post not found.User might have removed this post", "danger")
      );
    });
};

export const deleteComment = (postId, commentId) => (dispatch) => {
  var config = {
    method: "put",
    url: `http://localhost:5000/api/post/${postId}/comment/${commentId}`,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId,
      });
      dispatch(setAlert("Comment removed", "success"));
    })
    .catch(function (error) {
      dispatch(setAlert("Comment or Post not found", "danger"));
    });
};
