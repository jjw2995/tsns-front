import axios from "axios";
import { alertAuthClear, setOnTokenRefresh } from "../redux/auth/AuthActions";
import store from "../redux/store";

const defaultOptions = (isMuliPart) => {
  return {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "Content-Type": isMuliPart ? "multipart/form-data" : "application/json",
    },
  };
};

const setHeaderAccToken = (request, accTok) => {
  request.headers["Authorization"] = "Bearer " + accTok;
};

let isRefreshing = false;
let reqQueue = [];

export const AuthedAxios = (isMuliPart = false) => {
  // Create instance
  let instance = axios.create(defaultOptions(isMuliPart));

  // // Set the AUTH token for any request instance.
  instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("AUTH")).accessToken
    }`;
    return config;
  });

  //
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const { config, response } = error;

      if (response.status === 401 && !config._retry) {
        // if no refresh req made
        if (!isRefreshing) {
          isRefreshing = true;
          config._retry = true;
          return refreshTokenAndResolveQueue(config);
        } else {
          // queue faled requests
          return queueFailed(config);
        }
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
        // TODO: test with accTok timeout 10000ms
        setHeaderAccToken(originalRequest, token);

        return instance(originalRequest);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
  const refreshTokenAndResolveQueue = (originalRequest) => {
    return new Promise(function (resolve, reject) {
      BaseUrlAxios()
        .post("/auth/token", {
          refreshToken: JSON.parse(localStorage.getItem("AUTH")).refreshToken,
        })
        .then(({ data }) => {
          store.dispatch(setOnTokenRefresh(data));
          setHeaderAccToken(originalRequest, data.accessToken);

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

export const BaseUrlAxios = (isMuliPart = false) => {
  let instance = axios.create(defaultOptions(isMuliPart));

  return instance;
};
