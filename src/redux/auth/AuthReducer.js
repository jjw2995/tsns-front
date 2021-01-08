import { SET_AUTH, HYDRATE_AUTH, CLEAR_AUTH } from "./AuthTypes";

const initialState = {
  // hasFetched: false,
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  user: { _id: null, nickname: null },
};

export const authReducer = (
  state = initialState,
  { type, payload, message }
) => {
  // console.log("@ authReducer, state: ", state);
  // console.log("@ authReducer, payload: ", payload);
  if (message) {
    console.log("@ authReducer, message: ", message);
  }
  switch (type) {
    case SET_AUTH:
      localStorage.setItem("AUTH", JSON.stringify({ ...state, ...payload }));
      return { ...state, ...payload };

    case HYDRATE_AUTH:
      // Get from local storage
      return { ...initialState, ...JSON.parse(localStorage.getItem("AUTH")) };

    case CLEAR_AUTH:
      localStorage.removeItem("AUTH");
      return initialState;

    default:
      return state;
  }
};
