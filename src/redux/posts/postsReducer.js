import {
  SET_POST,
  ADD_NEW_POST,
  GET_MORE_POSTS,
  GET_INITIAL_POSTS,
} from "./postsTypes";

const initialState = {
  posts: [],
  isLoading: false,
  hasFetched: false,
  hasMore: true,
};

export const postsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_POST:
      return { ...state, ...payload };

    case GET_INITIAL_POSTS:
      return { ...state, posts: payload.posts, hasFetched: true };

    case GET_MORE_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...payload.posts],
        hasMore: payload.posts.length > 0 ? true : false,
        // hasFetched: true,
      };

    case ADD_NEW_POST:
      return { ...state, posts: [...payload.posts, ...state.posts] };

    default:
      return state;
  }
};

// export default postsReducer;
