import {
  SET_AUTH,
  HYDRATE_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
} from "./AuthTypes";

const initialState = {
  // reqQueue: [],
  hasFetched: false,
  // isRefreshing: false,
  loggedIn: false,
  user: { _id: "", nickname: "" },
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
  console.log("in authReducer: state");
  console.log(state);
  // console.log("in authReducer: payload");
  // console.log(payload);
  if (message) {
    console.log(message);
  }
  switch (type) {
    case SET_AUTH:
      return storeAndReturn({ ...state, ...payload });
    // localStorage.setItem("AUTH", JSON.stringify({ ...state, ...payload }));
    // return { ...state, ...payload };

    case HYDRATE_AUTH:
      // Get from local storage
      return { hasFetched: true, ...JSON.parse(localStorage.getItem("AUTH")) };

    case CLEAR_AUTH:
      return storeAndReturn({});

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
