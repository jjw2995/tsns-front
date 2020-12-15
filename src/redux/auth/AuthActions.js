import { HYDRATE_AUTH, SET_AUTH, ERR_AUTH, CLEAR_AUTH } from "./AuthTypes";
import jwtDecode from "jwt-decode";
import BaseUrlAxios from "../AuthedAxios";

export const setAuth = ({ _id, nickname, accessToken, refreshToken }) => {
  return {
    type: SET_AUTH,
    payload:
      _id && nickname
        ? { user: { _id, nickname }, accessToken, refreshToken }
        : { accessToken, refreshToken },
  };
};
export const hydrateAuth = () => {
  return {
    type: HYDRATE_AUTH,
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

export const login = (data) => (dispatch) => {
  BaseUrlAxios()
    .post("/auth/login", data)
    .then((response) => {
      // console.log(response.data);
      dispatch(setAuth(response.data));
    })
    .catch((e) => {
      // console.log(e);
      dispatch(errAuth(e));
    });
};

export const keepTokensFresh = () => (dispatch, getState) => {
  const tNow = new Date().getMilliseconds();
  const refTok = getState().auth.refreshToken;

  const didAccTokExp = jwtDecode(getState().auth.accessToken).exp < tNow;
  const didRefTokExp = jwtDecode(refTok).exp < tNow;
  console.log("keep tokens fresh");
  if (didRefTokExp) {
    _alertAuthClear(dispatch);
  } else {
    if (didAccTokExp) {
      BaseUrlAxios()
        .post("/auth/token", { refreshToken: refTok })
        .then((r) => {
          console.log(".then of /auth/token - in keepTokensFresh");
          console.log(r.data);
          dispatch(setAuth(r.data));
        })
        .catch((e) => {
          console.log(".catch of /auth/token - in keepTokensFresh");

          console.log(e.data);
          _alertAuthClear(dispatch);
        });
    }
  }
};

const _alertAuthClear = (dispatch) => {
  alert("your auth has expired, please login again");
  dispatch(clearAuth());
};
