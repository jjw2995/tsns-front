import {
  SET_AUTH,
  HYDRATE_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
  REFRESH_TOKEN,
} from "./AuthTypes";

const initialState = {
  reqQueue: [],
  hasFetched: false,
  isRefreshing: false,
  user: { _id: "", nickname: "" },
};

export const authReducer = (state = initialState, { type, payload }) => {
  // function storeAndReturn(params) {
  //   localStorage.setItem("AUTH", JSON.stringify(toStore));
  //     return toStore;
  // }
  let toStore = { ...state, ...payload };
  // console.log("in authReducer: state");
  // console.log(state);
  // console.log("in authReducer: payload");
  // console.log(payload);
  switch (type) {
    case SET_AUTH:
      localStorage.setItem("AUTH", JSON.stringify({ ...state, ...payload }));
      return { ...state, ...payload };

    case REFRESH_TOKEN:
      localStorage.setItem("AUTH", JSON.stringify({ ...state, ...payload }));
      return { ...state, ...payload };

    case HYDRATE_AUTH:
      // Get from local storage
      const data = { ...state, ...JSON.parse(localStorage.getItem("AUTH")) };
      return data;

    case ADD_REQ_QUEUE:
      localStorage.setItem(
        "AUTH",
        JSON.stringify({ ...state, reqQueue: [...state.reqQueue, payload] })
      );
      return { ...state, reqQueue: [...state.reqQueue, payload] };

    case CLEAR_REQ_QUEUE:
      localStorage.setItem("AUTH", JSON.stringify({ ...state, reqQueue: [] }));
      return { ...state, reqQueue: [] };

    case CLEAR_AUTH:
      localStorage.removeItem("AUTH");
      return {};

    default:
      return state;
  }
};
// Save auth info, filter out isRefreshing
// Set isRefreshing true, save auth info, set isRefreshing false
// Get from local storage
