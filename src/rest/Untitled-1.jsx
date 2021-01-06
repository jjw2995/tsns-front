import axios from "axios";
import jwtDecode from "jwt-decode";
import {
  addReqQueue,
  emptyReqQueue,
  setAuth,
  refreshTokens,
  alertAuthClear,
  setTokens,
} from "../redux/auth/AuthActions";
import store from "../redux/store";

// let reqQueue = [];
// let isRefreshing = false;
// const NUM_REQUEST = 1;

let isRefreshing = false;

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

  // for multiple requests

  // let isRefreshing = false;
  // let failedQueue = [];
  const processQueue = (error, token = null) => {
    store.getState().auth.reqQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    store.dispatch(emptyReqQueue());
  };

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      const originalRequest = error.config;
      console.log("failed queue");

      // queue faled requests
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            store.dispatch(addReqQueue({ resolve, reject }));
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              console.log(token);
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = store.getState().auth.refreshToken;

        return new Promise(function (resolve, reject) {
          axios
            .post(`${process.env.REACT_APP_API_ENDPOINT}/auth/token`, {
              refreshToken,
            })
            .then(({ data }) => {
              console.log(data);
              store.dispatch(setTokens(data));
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + data.token;
              originalRequest.headers["Authorization"] = "Bearer " + data.token;
              processQueue(null, data.token);
              resolve(axios(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      if (error.response.status === 400) {
        console.log("here ?????????????????");
        console.log(error.response.data);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default BaseUrlAxios;
