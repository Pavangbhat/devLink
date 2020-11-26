import {
  DELETE_EDUCATION,
  DELETE_EXPERIENCE,
  PROFILE_CLEAR,
  PROFILE_ERROR,
  PROFILE_LOADED,
  UPDATE_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  errors: [],
  repos: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        loading: false,
        repos: [],
        profiles: action.payload,
      };
    case PROFILE_LOADED:
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case DELETE_EXPERIENCE:
    case DELETE_EDUCATION:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        profile: null,
        profiles: [],
      };
    case PROFILE_CLEAR:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: true,
        errors: [],
        repos: [],
      };
    default:
      return state;
  }
}
