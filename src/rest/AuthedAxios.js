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
  // console.log(" @ refresh tokens compare @ ");
  // const accessToken = store.getState().auth.accessToken;
  // const refreshToken = store.getState().auth.refreshToken;
  const accessToken = JSON.parse(localStorage.getItem("AUTH")).accessToken;
  const refreshToken = JSON.parse(localStorage.getItem("AUTH")).refreshToken;

  // console.log(store.getState().auth.refreshToken);
  // console.log(JSON.parse(localStorage.getItem("AUTH")).refreshToken);

  // refresh token to ensure token validity
  // remove token from local storage
  // request account deletion
  //

  // // Set the AUTH token for any request instance.
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;
        originalRequest._retry = true;
        // refresh tokens
        // reRequest the one that triggered refresh tokens
        // reRequest the rest of queued requests
        console.log("");
        console.log(" # config for the request refreshing the token");
        console.log(originalRequest);

        return new Promise(function (resolve, reject) {
          // console.log(" @ in requesting RefreshTokens");
          // console.log(" redux store: ", refreshToken);
          // console.log(
          //   " localStorage: ",
          //   JSON.parse(localStorage.getItem("AUTH")).refreshToken
          // );
          axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/token`, {
              refreshToken,
            })
            .then(({ data }) => {
              store.dispatch(setOnTokenRefresh(data));
              originalRequest.headers["Authorization"] =
                "Bearer " + data.accessToken;
              processQueue(null, data.accessToken);
              resolve(instance(originalRequest));
            })
            .catch((err) => {
              console.log("");
              console.log("@@@ refresh token error @@@");
              console.log(err);
              console.log("");
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
