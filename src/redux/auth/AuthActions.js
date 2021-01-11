import { HYDRATE_AUTH, SET_AUTH, ERR_AUTH, CLEAR_AUTH } from "./AuthTypes";
import Swal from "sweetalert2";
import { AuthedAxios } from "../../rest/axiosTypes";

export const login = ({ _id, nickname, accessToken, refreshToken }) => {
  return {
    type: SET_AUTH,
    payload: {
      user: { _id, nickname },
      accessToken,
      refreshToken,
      loggedIn: true,
    },
    message: "login",
  };
};

export const setOnTokenRefresh = ({ refreshToken, accessToken }) => {
  return {
    type: SET_AUTH,
    payload: { refreshToken, accessToken },
    message: "refresh tokens",
  };
};

// hydrateAuth
// Get from local storage
export const hydrateAuth = (cb) => {
  return {
    type: HYDRATE_AUTH,
    payload: cb,
  };
};

// clearAuth
export const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
    payload: {},
    massage: "AUTH CLEAR",
  };
};

export const errAuth = (e) => {
  return {
    type: ERR_AUTH,
    payload: e,
  };
};

export const alertAuthClear = () => {
  Swal.fire({
    icon: "error",
    title: "Session Expired",
    text: "please login again",
  });
  return clearAuth();
};

export const deleteAccount = () => (dispatch, getState) => {
  AuthedAxios()
    .get("/users/remove")
    .then(() => {
      return Swal.fire({
        icon: "success",
        title: "Your Account Has Been Removed",
        text: "thank you for using tSNS",
      });
    })
    .then(() => {
      dispatch(clearAuth());
    })
    .catch((e) => {
      Swal.fire({
        icon: "error",
        title: "Failed To Remove Account",
        text: "please try again later",
      });
    });
};
