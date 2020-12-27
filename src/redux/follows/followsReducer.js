import {
  SET_FOLLOWS,
  CLEAR_FOLLOWS,
  HYDRATE_FOLLOWS,
  SET_PENDING_FOLLOWERS,
  SET_FOLLOWEES,
  SET_FOLLOWERS,
} from "./followsTypes";

const initialState = {
  followers: [],
  followees: [],
  pendingFollowers: [],
  dismissedPendingFollowers: [],
  pendingFollowees: [],
  new: false,
};

export const followsReducer = (state = initialState, { type, payload }) => {
  // const { posts, isLoading } = payload;
  // console.log("payload: ", payload);
  // const { oldPosts, oldIsLoading } = state;
  // console.log("postsReducer: ", payload);
  switch (type) {
    case SET_FOLLOWS:
      // console.log("SET_POST in postsReducer: ", payload);
      let toStore = { ...state, ...payload };
      // localStorage.setItem("FOLLOWS", JSON.stringify(toStore));
      // return toStore;
      toStore.new = toStore.pendingFollowers.length > 0 ? true : false;
      return toStore;

    // case HYDRATE_FOLLOWS:
    // const data = JSON.parse(localStorage.getItem("FOLLOWS"));

    // if (data) {
    //   return { ...state, ...data };
    // } else {
    //   return state;
    // }

    case CLEAR_FOLLOWS:
      // localStorage.removeItem("FOLLOWS");
      return {};

    default:
      return state;
  }
};
