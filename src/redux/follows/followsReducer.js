import { SET_FOLLOWS, CLEAR_FOLLOWS } from "./followsTypes";

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
