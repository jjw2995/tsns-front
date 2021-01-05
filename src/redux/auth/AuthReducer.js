import {
  SET_AUTH,
  HYDRATE_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
  REFRESH_TOKEN,
} from "./AuthTypes";
const initialState = { reqQueue: [], hasFetched: false };

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_AUTH:
      // Save auth info, filter out isRefreshing
      let toStore = { ...state, ...payload };
      localStorage.setItem("AUTH", JSON.stringify(toStore));
      return toStore;

    case REFRESH_TOKEN:
      // Set isRefreshing true, save auth info, set isRefreshing false
      localStorage.setItem("AUTH", JSON.stringify({ ...state, ...payload }));
      return { ...state, ...payload };

    case HYDRATE_AUTH:
      // Get from local storage
      const data = JSON.parse(localStorage.getItem("AUTH"));
      return data;

    case ADD_REQ_QUEUE:
      return { ...state, reqQueue: [...state.reqQueue, payload] };

    case CLEAR_REQ_QUEUE:
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
