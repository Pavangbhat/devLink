import { GET_POSTS, DELETE_POST, UPDATE_LIKE } from "./types";
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
