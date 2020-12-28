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
  switch (type) {
    case SET_FOLLOWS:
      let toStore = { ...state, ...payload };
      toStore.new = toStore.pendingFollowers.length > 0 ? true : false;
      return toStore;

    case CLEAR_FOLLOWS:
      return {};

    default:
      return state;
  }
};
