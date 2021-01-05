import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  addReqQueue,
  emptyReqQueue,
  setAuth,
  refreshToken,
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
      // if (accessToken expired && !isRefreshing), refresh token
      if (store.getState().auth && store.getState().auth.accessToken) {
        const tRefresh = Date.now() / 1000 + 300;
        const accExpAt = jwtDecode(store.getState().auth.accessToken).exp;

        if (accExpAt < tRefresh && !store.getState().auth.isRefreshing) {
          store.dispatch(refreshToken());
          // instance
          //   .post("/auth/token", {
          //     refreshToken: store.getState().auth.refreshToken,
          //   })
          //   .then((r) => {
          //     store.dispatch(setAuth(r.data));
          //     store.dispatch(refreshToken(false));
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //     console.error("refresh token expired, logging out =>", e);
          //   })
          //   .finally(() => {
          //     store.dispatch(refreshToken(false));
          //   });

          // refresh token and retry queued requests
        }
      }

      return res;
    },
    (error) => {
      const { config, response } = error;
      console.log(store.getState().auth);
      if (response.status === 401) {
        console.log("begining of in error interceptor");
        if (!store.getState().auth.isRefreshing) {
          store.dispatch(refreshToken(true));
          console.log("!isRefreshing");

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
              return instance(config);
            })
            .catch((e) => {
              console.log("in error of api/token");
              console.log(e);
              console.error("refresh token expired, logging out =>", e);
              store.dispatch(alertAuthClear());
            })
            .finally(() => {
              store.dispatch(refreshToken(false));
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
