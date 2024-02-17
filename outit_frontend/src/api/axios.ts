import axios from "axios";
import { APP_BASE_URL } from "../utils/ApiConfig";

export const baseURL = "http://103.188.82.123:8080";
const instance = axios.create({
  baseURL: `${baseURL}`,
});

export const axiosPrivate = axios.create({
  baseURL: `${baseURL}`,
});

// axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response.data;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default instance;
