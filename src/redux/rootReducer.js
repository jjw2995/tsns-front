import { combineReducers } from "redux";

import authReducer from "./auth/AuthReducer";
import postsReducer from "./posts/postsReducer";
// import cakeReducer from "./cake/cakeReducer";
// import iceCreamReducer from "./iceCream/iceCreamReducer";
// import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  post: postsReducer,
  //   cake: cakeReducer,
  //   iceCream: iceCreamReducer,
  //   user: userReducer,
});

export default rootReducer;
