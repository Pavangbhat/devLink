import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  UPDATE_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "../actions/types";

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
    case ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [action.payload, ...state.posts],
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.commentId
          ),
        },
      };
    default:
      return state;
  }
}
