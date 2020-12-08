// import counterReducer from "./counter";
// import loggedReducer from "./isLogged";
// import userReducer from "./user";
import navigationReducer from "./navigation";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  // counter: counterReducer,
  // isLogged: loggedReducer,
  // user: userReducer,
  navigation: navigationReducer,
});

export default allReducers;
