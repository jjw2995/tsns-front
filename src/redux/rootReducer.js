import { combineReducers } from "redux";

import { authReducer } from "./auth/AuthReducer";
import { commentsReducer } from "./comments/commentsReducer";
import { postsReducer } from "./posts/postsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postsReducer,
  comments: commentsReducer,
  // comment: commentsReducer,
});

export default rootReducer;
