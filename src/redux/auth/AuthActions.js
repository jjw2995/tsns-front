import {
  HYDRATE_AUTH,
  SET_AUTH,
  ERR_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
} from "./AuthTypes";
import BaseUrlAxios from "../../rest/AuthedAxios";
import Axios from "axios";

const filterFieldsLoginOrRefreshToken = ({
  _id,
  nickname,
  accessToken,
  refreshToken,
  loggedIn,
}) => {
  return _id && nickname
    ? { user: { _id, nickname }, accessToken, refreshToken, loggedIn }
    : { accessToken, refreshToken };
};

// export const setAuth = ({ _id, nickname, accessToken, refreshToken }) => {
//   return {
//     type: SET_AUTH,
//     payload:
//       _id && nickname
//         ? { user: { _id, nickname }, accessToken, refreshToken }
//         : { accessToken, refreshToken },
//   };
// };

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

export const setIsRefreshing = (isRefreshing) => {
  return {
    type: SET_AUTH,
    payload: isRefreshing,
    message: `setting isRefreshing === ${isRefreshing}`,
  };
};

export const addReqQueue = (item) => {
  return {
    type: ADD_REQ_QUEUE,
    payload: item,
  };
};

// clearReqQueue
export const emptyReqQueue = () => {
  return {
    type: CLEAR_REQ_QUEUE,
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
  alert("your auth has expired, please login again");
  return clearAuth();
};
