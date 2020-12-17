import {
  SET_POST,
  APPEND_POSTS_TO_END,
  APPEND_POSTS_TO_FRONT,
  CLEAR_POST,
  SET_REQ,
} from "./postsTypes";

const initialState = { posts: [], isLoading: false };

const postsReducer = (state = initialState, { type, payload }) => {
  // const { posts, isLoading } = payload;
  // console.log("payload: ", payload);
  // const { oldPosts, oldIsLoading } = state;
  switch (type) {
    case SET_POST:
      console.log("SET_POST in postsReducer: ", payload);
      return { ...state, ...payload };

    case APPEND_POSTS_TO_END:
      return { ...state, posts: [...state.posts, ...payload.posts] };

    case APPEND_POSTS_TO_FRONT:
      return { ...state, posts: [...payload.posts, ...state.posts] };

    case SET_REQ:
      return { ...state, ...payload };

    case CLEAR_POST:
      return {};

    default:
      return state;
  }
};

export default postsReducer;

// import { APPEND_POST_FRONT, APPEND_POSTS_END, CLEAR_POSTS } from "./postsTypes";

// const initialState = { posts: [], isLoading: false };

// const stateGen = (newPosts, newIsLoading) => {
//   return { posts: newPosts, isLoading: newIsLoading };
// };

// const postsReducer = (state = initialState, { type, payload }) => {
//   const { posts, isLoading } = payload;
//   const { sPosts, sIsLoading } = state;
//   switch (type) {
//     case APPEND_POST_FRONT:
//       return { ...state, ...payload };

//     case APPEND_POSTS_END:
//       // console.log([...state, ...payload]);
//       return [...state, ...payload];

//     case CLEAR_POSTS:
//       return [];
//     default:
//       return state;
//   }
// };

// export default postsReducer;
