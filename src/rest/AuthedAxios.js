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
      JSON.parse(localStorage.getItem("AUTH")).accessToken
    }`;
    return config;
  });

  // for multiple requests
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (!isRefreshing) {
          isRefreshing = true;
          originalRequest._retry = true;
          refreshTokenAndResolveQueue(originalRequest);
        }
        // queue faled requests
        queueFailed(originalRequest);
      }

      return Promise.reject(error);
    }
  );

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

  const queueFailed = (originalRequest) => {
    return new Promise(function (resolve, reject) {
      reqQueue.push({ resolve, reject });
    })
      .then((token) => {
        originalRequest.headers["Authorization"] = "Bearer " + token;
        return instance(originalRequest);
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(err);
      });
  };
  const refreshTokenAndResolveQueue = (originalRequest) => {
    return new Promise(function (resolve, reject) {
      axios
        .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/token`, {
          refreshToken: JSON.parse(localStorage.getItem("AUTH")).refreshToken,
        })
        .then(({ data }) => {
          store.dispatch(setOnTokenRefresh(data));
          originalRequest.headers["Authorization"] =
            "Bearer " + data.accessToken;
          // reRequest the rest of queued requests
          processQueue(null, data.accessToken);
          // reRequest the one that triggered refresh tokens
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
  };

  return instance;
};

export default BaseUrlAxios;
