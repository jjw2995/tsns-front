import {
  COMMENTS_APPEND_TO_END,
  COMMENTS_APPEND_TO_FRONT,
  COMMENTS_SET,
  COMMENTS_SET_POSTID,
} from "./commentsTypes";

const initialState = { comments: [], postID: "" };

export const commentsReducer = (state = initialState, { type, payload }) => {
  console.log("commentsReducer, state: ", state);
  console.log("commentsReducer, payload: ", payload);
  switch (type) {
    case COMMENTS_APPEND_TO_END:
      // console.log([...state, payload]);
      return { ...state, comments: [...state.comments, ...payload] };
    case COMMENTS_APPEND_TO_FRONT:
      return { ...state, comments: [...payload, ...state.comments] };

    case COMMENTS_SET_POSTID:
      return { ...state, ...payload };

    case COMMENTS_SET:
      return { ...state, ...payload };

    default:
      return state;
  }
};

// export commentsReducer;
