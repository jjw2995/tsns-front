import {
  COMMENTS_APPEND_TO_END,
  COMMENTS_APPEND_TO_FRONT,
  COMMENTS_SET,
} from "./commentsTypes";

const initialState = [];

export const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENTS_APPEND_TO_END:
      return [...state, ...payload];
    case COMMENTS_APPEND_TO_FRONT:
      return [...payload, ...state];

    case COMMENTS_SET:
      return [...payload];

    default:
      return state;
  }
};
