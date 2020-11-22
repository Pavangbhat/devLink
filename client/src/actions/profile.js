import { setAlert } from "../actions/alert";
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
export const createOrUpdateProfile = (formData, history, edit = false) => (
  dispatch
) => {
  console.log(formData);
  const data = JSON.stringify({ ...formData, handle: "tr" });
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
