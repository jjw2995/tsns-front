import { combineReducers } from "redux";

import authReducer from "./auth/AuthReducer";
// import cakeReducer from "./cake/cakeReducer";
// import iceCreamReducer from "./iceCream/iceCreamReducer";
// import userReducer from "./user/userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  //   cake: cakeReducer,
  //   iceCream: iceCreamReducer,
  //   user: userReducer,
});

export default rootReducer;
