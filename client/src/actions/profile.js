import { PROFILE_ERROR, PROFILE_LOADED } from "./types";
const axios = require("axios").default;

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
