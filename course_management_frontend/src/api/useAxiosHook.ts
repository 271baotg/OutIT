import { useContext, useEffect } from "react";
import { axiosPrivate } from "./axios";
import AuthContext from "../auth/AuthProvider";

export const useAxiosPrivate = () => {
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const request = axiosPrivate.interceptors.request.use(
      function (config) {
        if (!config.headers[`Authorization`] && auth?.token) {
          config.headers[`Authorization`] = `Bearer ${auth.token}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    const response = axiosPrivate.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(request);
      axiosPrivate.interceptors.response.eject(response);
    };
  }, [auth]);

  return axiosPrivate;
};
