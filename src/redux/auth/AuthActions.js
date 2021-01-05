import {
  HYDRATE_AUTH,
  SET_AUTH,
  ERR_AUTH,
  CLEAR_AUTH,
  ADD_REQ_QUEUE,
  CLEAR_REQ_QUEUE,
  REFRESH_TOKEN,
} from "./AuthTypes";
import BaseUrlAxios from "../../rest/AuthedAxios";

const filterFieldsLoginOrRefreshToken = ({
  _id,
  nickname,
  accessToken,
  refreshToken,
}) => {
  return _id && nickname
    ? { user: { _id, nickname }, accessToken, refreshToken }
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

export const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    payload: filterFieldsLoginOrRefreshToken(auth),
  };
};

export const setRefreshing = (auth) => {
  return {
    type: REFRESH_TOKEN,
    payload: filterFieldsLoginOrRefreshToken(auth),
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
  return {
    type: CLEAR_AUTH,
    payload: {},
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
  BaseUrlAxios()
    .post("/auth/login", data)
    .then((r) => {
      console.log(r.data);
      dispatch(setAuth(r.data));
    })
    .catch((e) => {
      console.log(e);
      dispatch(errAuth(e));
    });
};

// Save auth info, filter out isRefreshing +
// Set isRefreshing true, save auth info, set isRefreshing false
export const refreshToken = () => (dispatch, getState) => {
  dispatch(setRefreshing(true));
  let refreshToken = getState().auth.refreshToken;
  if (refreshToken) {
    BaseUrlAxios()
      .post("/auth/token", { refreshToken })
      .then((r) => {
        console.log(r.data);
        dispatch(setAuth(r.data));
      })
      .catch((e) => {
        console.log(e);
        dispatch(errAuth(e));
      })
      .finally(() => {
        dispatch(setRefreshing(false));
      });
  } else {
    // clearAuth and to landingPage
    // maybe I need to setRefreshing to false as well ???
    console.log("refreshToken @AuthActions, no refreshToken, logout");
  }
};

export const queueWhileRefreshing = (req) => (dispatch, getState) => {};

export const alertAuthClear = () => {
  alert("your auth has expired, please login again");
  return clearAuth();
};

// export const refreshToken = (data) => (dispatch,getState) => {

// // TODO: something wrong with refreshing the tokens
// export const keepTokensFresh = () => async (dispatch, getState) => {
//   // const tNow = Date.now() / 1000;
//   const refTok = getState().auth.refreshToken;
//   // const accExpAt = jwtDecode(getState().auth.accessToken).exp;
//   // const refExpAt = jwtDecode(refTok).exp;

//   // const didAccTokExp = accExpAt < tNow;
//   // const didRefTokExp = refExpAt < tNow;
//   // if (didRefTokExp) {
//   //   _alertAuthClear(dispatch);
//   //   return;
//   // }
//   // if (didAccTokExp) {
//   try {
//     let res = await BaseUrlAxios().post("/auth/token", {
//       refreshToken: refTok,
//     });

//     dispatch(setAuth(res.data));
//   } catch (error) {
//     console.log(error.message);
//     _alertAuthClear(dispatch);
//   }
//   // }
// };
