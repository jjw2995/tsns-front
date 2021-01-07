import {
  SET_AUTH,
  HYDRATE_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
} from "./AuthTypes";

const initialState = {
  // reqQueue: [],
  // isRefreshing: false,
  hasFetched: false,
  loggedIn: false,
  accessToken: null,
  refreshToken: null,
  user: { _id: null, nickname: null },
};

export const authReducer = (
  state = initialState,
  { type, payload, message }
) => {
  function storeAndReturn(toStore) {
    localStorage.setItem(
      "AUTH",
      JSON.stringify({ ...toStore, hasFetched: true })
    );
    return toStore;
  }
  let toStore = { ...state, ...payload };
  console.log("@ authReducer, state: ", state);
  console.log("@ authReducer, payload: ", payload);
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
// case ADD_REQ_QUEUE:
//   localStorage.setItem(
//     "AUTH",
//     JSON.stringify({ ...state, reqQueue: [...state.reqQueue, payload] })
//   );
//   return { ...state, reqQueue: [...state.reqQueue, payload] };

// case CLEAR_REQ_QUEUE:
//   localStorage.setItem("AUTH", JSON.stringify({ ...state, reqQueue: [] }));
//   return { ...state, reqQueue: [] };
// Save auth info, filter out isRefreshing
// Set isRefreshing true, save auth info, set isRefreshing false
// Get from local storage
