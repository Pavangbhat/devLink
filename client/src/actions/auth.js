import setHeader from "../utlis/setHeader";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  PROFILE_CLEAR,
} from "./types";
const axios = require("axios").default;

export const register = ({ name, email, password }) => (dispatch) => {
  var config = {
    method: "post",
    url: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ name, email, password }),
  };

  axios(config)
    .then(function (response) {
      const { errors, token } = response.data;
      if (errors) {
        errors.map((error) => {
          dispatch(setAlert(error.msg, "danger"));
          dispatch({
            type: REGISTER_FAIL,
          });
        });
      }
      if (token) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: {
            token,
          },
        });
      }
      setHeader(token);
    })
    .catch(function (error) {
      console.log("FROM ERROR", JSON.stringify(error));
    });
};

export const login = (email, password) => (dispatch) => {
  var config = {
    method: "post",
    url: "http://localhost:5000/api/auth",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ email, password }),
  };

  axios(config)
    .then(function (response) {
      const { errors, token } = response.data;

      if (errors) {
        errors.map((error) => {
          dispatch(setAlert(error.msg, "danger"));
          dispatch({
            type: LOGIN_FAIL,
          });
          setHeader(null);
        });
      }
      if (token) {
        setHeader(token);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: {
            token,
          },
        });
      }
    })
    .catch(function (error) {
      console.log("FROM ERROR", JSON.stringify(error));
      setHeader(null);
    });
};
export const loadUser = () => (dispatch) => {
  if (localStorage.token) {
    axios
      .get("http://localhost:5000/api/getuser")
      .then((user) => {
        dispatch({
          type: USER_LOADED,
          payload: user.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: AUTH_ERROR,
        });
      });
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: PROFILE_CLEAR,
  });
  setHeader(null);
};
