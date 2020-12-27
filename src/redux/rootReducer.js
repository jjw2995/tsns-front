import { combineReducers } from "redux";

import { authReducer } from "./auth/AuthReducer";
import { commentsReducer } from "./comments/commentsReducer";
import { followsReducer } from "./follows/followsReducer";
import { postsReducer } from "./posts/postsReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postsReducer,
  comments: commentsReducer,
  follows: followsReducer,
});

export default rootReducer;
