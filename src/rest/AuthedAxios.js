import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  // addReqQueue,
  // emptyReqQueue,
  // setAuth,
  // refreshTokens,
  alertAuthClear,
  clearAuth,
  setOnTokenRefresh,
  // setIsRefreshing,
  // clearAuth,
} from "../redux/auth/AuthActions";
import store from "../redux/store";

// const NUM_REQUEST = 1;

let isRefreshing = false;
let reqQueue = [];
const BaseUrlAxios = (isMuliPart = false) => {
  console.log(store.getState().auth.accessToken);
  console.log(JSON.parse(localStorage.getItem("AUTH")).accessToken);
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
      // store.getState().auth.accessToken
      JSON.parse(localStorage.getItem("AUTH")).accessToken
    }`;
    return config;
  });

  // for multiple requests

  const processQueue = (error, token = null) => {
    console.log("in processQueue");
    console.log(reqQueue);
    // store.getState().auth.reqQueue.forEach((prom) => {
    reqQueue.forEach((prom) => {
      // console.log(prom);
      if (error) {
        // window.alert("login again");
        store.dispatch(alertAuthClear());
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    // store.dispatch(emptyReqQueue());
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
        //
        if (isRefreshing) {
          // if (store.getState().auth.isRefreshing) {
          return new Promise(function (resolve, reject) {
            //
            reqQueue.push({ resolve, reject });
            // store.dispatch(addReqQueue({ resolve, reject }));
          })
            .then((token) => {
              console.log("resolving queued requests");

              originalRequest.headers["Authorization"] = "Bearer " + token;
              // console.log(token);
              return instance(originalRequest);
            })
            .catch((err) => {
              store.dispatch(alertAuthClear());
              return Promise.reject(err);
            });
        }

        //
        isRefreshing = true;
        // store.dispatch(setIsRefreshing(true));
        originalRequest._retry = true;

        const refreshToken = store.getState().auth.refreshToken;

        return new Promise(function (resolve, reject) {
          axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/token`, {
              refreshToken,
            })
            .then(({ data }) => {
              store.dispatch(setOnTokenRefresh(data));
              console.log("refreshing Token");
              originalRequest.headers["Authorization"] = "Bearer " + data.token;
              processQueue(null, data.token);
              resolve(instance(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              //
              // store.dispatch(setIsRefreshing(false));
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
