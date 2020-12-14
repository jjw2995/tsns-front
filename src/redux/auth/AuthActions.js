import axios from "axios";
import {
  REPRIME_STORE_AUTH,
  SET_AUTH,
  ERR_AUTH,
  CLEAR_AUTH,
} from "./AuthTypes";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";

export const setAuth = ({ _id, nickname, accessToken, refreshToken }) => {
  return {
    type: SET_AUTH,
    payload: { user: { _id, nickname }, accessToken, refreshToken },
  };
};

export const reprimeAuth = () => {
  return {
    type: REPRIME_STORE_AUTH,
    payload: {},
  };
};

export const clearAuth = () => {
  return {
    type: CLEAR_AUTH,
    payload: {},
  };
};

export const errAuth = (e) => {
  // msg(JSON.stringify(e));
  return {
    type: ERR_AUTH,
    payload: e,
  };
};

export const updateLoginState = () => (dispatch, getState) => {
  try {
    // console.log("BEFORE REPRIME");
    // console.log(getState());
    dispatch(reprimeAuth());
    // console.log("updateLoginState - from getState()");
    // console.log(getState().auth);
    const isExpired =
      jwtDecode(getState().auth.refreshToken).exp <
      new Date().getMilliseconds();

    if (isExpired) {
      // console.log("CLEAR_AUTH");
      dispatch(clearAuth());
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => (dispatch) => {
  axios
    .post(process.env.REACT_APP_API_URL + "/api/auth/login", data)
    // .then((res) => res.json())
    .then((response) => {
      console.log(response.data);
      dispatch(setAuth(response.data));
    })
    .catch((e) => dispatch(errAuth(e)));
};

// export const refreshToken = () => (dispatch) => {
//   axios
//     .post(process.env.REACT_APP_API_URL + "/api/auth/login", data)
//     // .then((res) => res.json())
//     .then((response) => {
//       console.log(response.data);
//       dispatch(setAuth(response.data));
//     })
//     .catch((e) => dispatch(errAuth(e)));
// };
