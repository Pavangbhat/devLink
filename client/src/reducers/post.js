import { DELETE_POST, GET_POSTS, UPDATE_LIKE } from "../actions/types";

const initState = {
  post: null,
  posts: [],
  loading: true,
  errors: {},
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case UPDATE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload.postId
            ? { ...post, likes: action.payload.data }
            : post;
        }),
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
}
