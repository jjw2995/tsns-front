import { HYDRATE_AUTH, SET_AUTH, ERR_AUTH, CLEAR_AUTH } from "./AuthTypes";
import jwtDecode from "jwt-decode";
import BaseUrlAxios from "../../rest/AuthedAxios";

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
    .then((r) => {
      // console.log(r.data);
      // sessionStorage.user = JSON.stringify({
      //   _id: r._id,
      //   nickname: r.nickname,
      // });

      dispatch(setAuth(r.data));
    })
    .catch((e) => {
      // console.log(e);
      dispatch(errAuth(e));
    });
};

// TODO: something wrong with refreshing the tokens
export const keepTokensFresh = () => async (dispatch, getState) => {
  // const tNow = Date.now() / 1000;
  const refTok = getState().auth.refreshToken;
  // const accExpAt = jwtDecode(getState().auth.accessToken).exp;
  // const refExpAt = jwtDecode(refTok).exp;

  // const didAccTokExp = accExpAt < tNow;
  // const didRefTokExp = refExpAt < tNow;
  // // console.log(refTok);
  // console.log("\ndidAccTokExp? = ", didAccTokExp);
  // console.log("\ndidRefTokExp? = ", didRefTokExp);
  // console.log("keep tokens fresh");
  // if (didRefTokExp) {
  //   _alertAuthClear(dispatch);
  //   return;
  // }
  // if (didAccTokExp) {
  try {
    let res = await BaseUrlAxios().post("/auth/token", {
      refreshToken: refTok,
    });
    let data = res.data;

    dispatch(setAuth(data));
  } catch (error) {
    console.log(error);
    console.log(error.message);
    _alertAuthClear(dispatch);
  }
  // }
};

const _alertAuthClear = (dispatch) => {
  alert("your auth has expired, please login again");
  dispatch(clearAuth());
};
