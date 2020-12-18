import axios from "axios";
import { useSelector } from "react-redux";

const BaseUrlAxios = (accessToken = "", isMuliPart = false) => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
      "Content-Type": isMuliPart ? "multipart/form-data" : "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  // instance.
  instance.interceptors.request.use(function (config) {
    // const token = accessToken
    // console.log(accessToken);
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  return instance;
};

export default BaseUrlAxios;

// const HTTPRequest = (path, body, method = 'POST',
//                       authorizedToken = null,dispatch,actionCreator) => {

// let accessToken;
// try {
//   accessToken = localStorage.getItem("AUTH").accessToken;
// } catch (error) {
//   console.log("여기농?");
//   // console.log(error);
//   accessToken = null;
// }
// console.log(accessToken);
//
//

// export const UnauthedAxios = () => {
//   const defaultOptions = {
//     baseURL: process.env.REACT_APP_API_ENDPOINT,
//     // method: ,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   //   const accessToken = useSelector((state) => state.auth.accessToken);
//   const accessToken = localStorage.getItem("AUTH").accessToken;

//   // Create instance
//   let instance = axios.create(defaultOptions);

//   // Set the AUTH token for any request
//   // instance.interceptors.request.use(function (config) {
//   //   // const token = accessToken
//   //   config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
//   //   return config;
//   // });

//   return instance;
// };
