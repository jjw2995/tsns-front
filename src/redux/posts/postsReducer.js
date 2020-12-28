import {
  SET_POST,
  ADD_POSTS_TO_END,
  ADD_POSTS_TO_FRONT,
  CLEAR_POST,
  SET_REQ,
} from "./postsTypes";

const initialState = { posts: [], isLoading: false };

export const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POST:
      return { ...state, ...payload };

    case ADD_POSTS_TO_END:
      return { ...state, posts: [...state.posts, ...payload.posts] };

    case ADD_POSTS_TO_FRONT:
      return { ...state, posts: [...payload.posts, ...state.posts] };

    case SET_REQ:
      return { ...state, ...payload };

    case CLEAR_POST:
      return { ...initialState };

    default:
      return state;
  }
};

// export default postsReducer;
