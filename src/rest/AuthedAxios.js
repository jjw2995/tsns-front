import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addReqQueue,
  emptyReqQueue,
  keepTokensFresh,
  setAuth,
  setRefreshing,
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
              return instance(config);
            })
            .catch((e) => {
              console.error("refresh token expired, logging out =>", e);
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
