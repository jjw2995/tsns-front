import {
  SET_POST,
  ADD_POSTS_TO_END,
  ADD_POSTS_TO_FRONT,
  CLEAR_POST,
  SET_REQ,
} from "./postsTypes";

const initialState = { posts: [], isLoading: false };

export const postsReducer = (state = initialState, { type, payload }) => {
  // const { posts, isLoading } = payload;
  // console.log("payload: ", payload);
  // const { oldPosts, oldIsLoading } = state;
  // console.log("postsReducer: ", payload);
  switch (type) {
    case SET_POST:
      console.log("SET_POST in postsReducer: ", payload);
      return { ...state, ...payload };

    case ADD_POSTS_TO_END:
      return { ...state, posts: [...state.posts, ...payload.posts] };

    case ADD_POSTS_TO_FRONT:
      return { ...state, posts: [...payload.posts, ...state.posts] };

    case SET_REQ:
      return { ...state, ...payload };

    case CLEAR_POST:
      return {};

    default:
      return state;
  }
};

// export default postsReducer;
