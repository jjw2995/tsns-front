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
  console.log(state);
  switch (type) {
    case SET_AUTH:
      localStorage.setItem("AUTH", JSON.stringify({ ...state, ...payload }));
      return { ...state, ...payload };

    case HYDRATE_AUTH:
      // Get from local storage
      console.log("local storage", JSON.parse(localStorage.getItem("AUTH")));
      console.log("merged with state", {
        ...initialState,
        ...JSON.parse(localStorage.getItem("AUTH")),
      });

      return { ...initialState, ...JSON.parse(localStorage.getItem("AUTH")) };

    case CLEAR_AUTH:
      localStorage.removeItem("AUTH");
      return initialState;

    default:
      return state;
  }
};
