import { HYDRATE_AUTH, SET_AUTH, ERR_AUTH, CLEAR_AUTH } from "./AuthTypes";
import Axios from "axios";
import Swal from "sweetalert2";

export const setOnUserLogin = ({
  _id,
  nickname,
  accessToken,
  refreshToken,
  loggedIn,
}) => {
  return {
    type: SET_AUTH,
    payload: { user: { _id, nickname }, accessToken, refreshToken, loggedIn },
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
  console.log("CLEAR UATH");
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

// Save auth info, filter out isRefreshing
export const login = (data) => (dispatch) => {
  Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, data)
    .then((r) => {
      console.log(r.data);
      dispatch(setOnUserLogin({ ...r.data, loggedIn: true }));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errAuth(e));
    });
};

export const alertAuthClear = () => {
  Swal.fire({
    icon: "error",
    title: "Session Expired",
    text: "please login again",
  });
  return clearAuth();
};
