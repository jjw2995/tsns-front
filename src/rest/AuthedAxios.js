import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
  addReqQueue,
  emptyReqQueue,
  keepTokensFresh,
  setAuth,
  setRefreshing,
  alertAuthClear,
} from "../redux/auth/AuthActions";
import store from "../redux/store";

const BaseUrlAxios = (isMuliPart = false) => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "Content-Type": isMuliPart ? "multipart/form-data" : "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);
  // store.dispatch(keepTokensFresh);

  // // Set the AUTH token for any request instance.
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      store.getState().auth.accessToken
    }`;
    return config;
  });

  instance.interceptors.response.use(
    (res) => {
      if (store.getState().auth && store.getState().auth.accessToken) {
        const tNowInSec = Date.now() / 1000 + 300;
        const accExpAt = jwtDecode(store.getState().auth.accessToken).exp;
        // console.log(tNowInSec, " tNow + 5m");
        // console.log(accExpAt, " accTok expires at");
        console.log(accExpAt < tNowInSec);
        console.log(store.getState().auth.isRefreshing);
        console.log(
          accExpAt < tNowInSec && !store.getState().auth.isRefreshing
        );

        if (accExpAt < tNowInSec && !store.getState().auth.isRefreshing) {
          store.dispatch(setRefreshing(true));
          console.log("in refresh");
          instance
            .post("/auth/token", {
              refreshToken: store.getState().auth.refreshToken,
            })
            .then((r) => {
              store.dispatch(setAuth(r.data));
              store.dispatch(setRefreshing(false));
            })
            .catch((e) => {
              console.error("refresh token expired, logging out =>", e);
            })
            .finally(() => {
              store.dispatch(setRefreshing(false));
            });

          // refresh token and retry queued requests
        }
      }

      return res;
    },
    (error) => {
      const { config, response } = error;

      if (response.status === 401) {
        if (!store.getState().auth.isRefreshing) {
          store.dispatch(setRefreshing(true));
          instance
            .post("/auth/token", {
              refreshToken: store.getState().auth.refreshToken,
            })
            .then((r) => {
              store.dispatch(setAuth(r.data));
              let accessToken = r.data.accessToken;
              config.headers.Authorization = `Bearer ${accessToken}`;

              let requests = store.getState().auth.reqQueue;

              // console.log("before request callbacks");
              requests.forEach((cb) => {
                // don't know why but queued requests becomes null
                if (cb) {
                  cb(accessToken);
                }
              });
              // throw Error();
              return instance(config);
            })
            .catch((e) => {
              console.error("refresh token expired, logging out =>", e);
              store.dispatch(alertAuthClear());
            })
            .finally(() => {
              store.dispatch(setRefreshing(false));
              store.dispatch(emptyReqQueue());
            });

          // refresh token and retry queued requests
        } else {
          return new Promise((resolve) => {
            store.dispatch(
              addReqQueue((accessToken) => {
                config.headers.Authorization = `Bearer ${accessToken}`;
                resolve(instance(config));
              })
            );
          });
        }
      }
    }
  );

  return instance;
};

export default BaseUrlAxios;
