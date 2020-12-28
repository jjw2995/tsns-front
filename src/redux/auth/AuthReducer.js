import { SET_AUTH, HYDRATE_AUTH, CLEAR_AUTH } from "./AuthTypes";

export const authReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_AUTH:
      let toStore = { ...state, ...payload };
      localStorage.setItem("AUTH", JSON.stringify(toStore));
      return toStore;

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
