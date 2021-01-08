import axios from "axios";
import { alertAuthClear, setOnTokenRefresh } from "../redux/auth/AuthActions";
import store from "../redux/store";

let isRefreshing = false;
let reqQueue = [];
const BaseUrlAxios = (isMuliPart = false) => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "Content-Type": isMuliPart ? "multipart/form-data" : "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // // Set the AUTH token for any request instance.
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      store.getState().auth.accessToken
    }`;
    return config;
  });

  // for multiple requests

  const processQueue = (error, token = null) => {
    reqQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    reqQueue = [];
  };

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      // queue faled requests
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            reqQueue.push({ resolve, reject });
          })
            .then((token) => {
              console.log("resolving queued requests");

              originalRequest.headers["Authorization"] = "Bearer " + token;
              // console.log(token);
              return instance(originalRequest);
            })
            .catch((err) => {
              console.log(store);
              store.dispatch(alertAuthClear());
              window.location.reload();
              return Promise.reject(err);
            });
        }

        //
        isRefreshing = true;
        originalRequest._retry = true;

        const refreshToken = store.getState().auth.refreshToken;

        return new Promise(function (resolve, reject) {
          axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/token`, {
              refreshToken,
            })
            .then(({ data }) => {
              store.dispatch(setOnTokenRefresh(data));
              originalRequest.headers["Authorization"] = "Bearer " + data.token;
              processQueue(null, data.token);
              resolve(instance(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              store.dispatch(alertAuthClear());
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default BaseUrlAxios;
