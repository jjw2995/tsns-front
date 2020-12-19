import axios from "axios";
import { keepTokensFresh } from "./auth/AuthActions";
import store from "./store";

const BaseUrlAxios = (isMuliPart = false) => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "Content-Type": isMuliPart ? "multipart/form-data" : "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);
  store.dispatch(keepTokensFresh);

  // Set the AUTH token for any request
  // instance.
  instance.interceptors.request.use(function (config) {
    // const token = accessToken
    // console.log(accessToken);
    config.headers.Authorization = `Bearer ${
      store.getState().auth.accessToken
    }`;
    return config;
  });

  return instance;
};

export default BaseUrlAxios;
