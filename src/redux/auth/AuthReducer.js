import {
  SET_AUTH,
  HYDRATE_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
  SET_REFRESHING,
} from "./AuthTypes";

export const authReducer = (
  state = { isRefreshing: false, reqQueue: [] },
  { type, payload }
) => {
  switch (type) {
    case SET_AUTH:
      let toStore = { ...state, ...payload };
      localStorage.setItem("AUTH", JSON.stringify(toStore));
      return toStore;

    case SET_REFRESHING:
      return { ...state, ...payload };

    case ADD_REQ_QUEUE:
      return { ...state, reqQueue: [...state.reqQueue, payload] };

    case CLEAR_REQ_QUEUE:
      return { ...state, reqQueue: [] };

    case HYDRATE_AUTH:
      const data = JSON.parse(localStorage.getItem("AUTH"));
      if (data) {
        return { ...state, ...data };
      } else {
        return state;
      }

    case CLEAR_AUTH:
      localStorage.removeItem("AUTH");
      return {};

    default:
      return state;
  }
};
