import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
} from "../actions/types";

let initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  user: null,
  loading: true,
};

export default function (state = initState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: null,
        user: null,
        token: null,
      };
    default:
      return { ...state };
  }
}
