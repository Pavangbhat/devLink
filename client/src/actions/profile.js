import { setAlert } from "../actions/alert";
import {
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  GET_PROFILES,
  PROFILE_CLEAR,
  PROFILE_ERROR,
  PROFILE_LOADED,
  UPDATE_PROFILE,
  GET_PROFILE,
  GET_REPOS,
} from "./types";
const axios = require("axios").default;

export const getProfiles = () => (dispatch) => {
  dispatch({ type: PROFILE_CLEAR });

  var config = {
    method: "get",
    url: "http://localhost:5000/api/profiles",
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};
export const getProfile = (userId) => (dispatch) => {
  var config = {
    method: "get",
    url: `http://localhost:5000/api/profile/user/${userId}`,
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
    })
    .catch(function (error) {
      dispatch(setAlert("unable to load profile"));
    });
};

export const getRepos = (githubUsername) => (dispatch) => {
  var config = {
    method: "get",
    url: `http://localhost:5000/api/github/profile/${githubUsername}`,
  };

  axios(config)
    .then(function (response) {
      if (response.data.message) {
      } else {
        dispatch({
          type: GET_REPOS,
          payload: response.data,
        });
      }
    })
    .catch(function (error) {
      dispatch(setAlert("Error getting user repos", "danger"));
    });
};

export const getUserProfile = () => (dispatch) => {
  axios
    .get("http://localhost:5000/api/profile/me")
    .then((res) => {
      if (res.data.errors) {
        dispatch({
          type: PROFILE_ERROR,
          payload: res.data.errors,
        });
      } else {
        dispatch({
          type: PROFILE_LOADED,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createOrUpdateProfile = (formData, history, edit = false) => (
  dispatch
) => {
  console.log(formData);
  const data = JSON.stringify({ ...formData });
  var config = {
    method: "post",
    url: "http://localhost:5000/api/profile",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.errors) {
        response.data.errors.map((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      } else {
        dispatch({
          type: PROFILE_LOADED,
          payload: response.data,
        });
        dispatch(
          setAlert(edit ? "profile updated" : "profile created", "success")
        );
        history.push("/dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addExperience = (formData, history) => (dispatch) => {
  const data = JSON.stringify({ ...formData });
  var config = {
    method: "put",
    url: "http://localhost:5000/api/profile/experience",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.errors) {
        response.data.errors.map((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      } else {
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data,
        });
        dispatch(setAlert("Experience added", "success"));
        history.push("/dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addEducation = (formData, history) => (dispatch) => {
  const data = JSON.stringify({ ...formData });
  var config = {
    method: "put",
    url: "http://localhost:5000/api/profile/education",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      if (response.data.errors) {
        response.data.errors.map((err) => {
          dispatch(setAlert(err.msg, "danger"));
        });
      } else {
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data,
        });
        dispatch(setAlert("Experience added", "success"));
        history.push("/dashboard");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteExperience = (id) => (dispatch) => {
  var config = {
    method: "delete",
    url: `http://localhost:5000/api/profile/experience/delete/${id}`,
    headers: {
      "content-type": "application/json",
    },
  };

  axios(config)
    .then(function (response) {
      dispatch({
        type: DELETE_EXPERIENCE,
        payload: response.data,
      });
      dispatch(setAlert("Experience removed"));
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const deleteEducation = (id) => (dispatch) => {
  var config = {
    method: "delete",
    url: `http://localhost:5000/api/profile/education/delete/${id}`,
    headers: {
      "content-type": "application/json",
    },
  };
  axios(config)
    .then(function (response) {
      dispatch({
        type: DELETE_EDUCATION,
        payload: response.data,
      });
      dispatch(setAlert("Education removed", "success"));
    })
    .catch(function (err) {
      console.log(err);
    });
};
