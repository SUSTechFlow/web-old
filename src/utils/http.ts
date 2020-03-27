import axios from "axios";
import * as config from "@/utils/config";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: `${config.VUE_APP_API_HOST}${config.VUE_APP_API_BASE}`,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.authorization = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    console.log(response);
    const res = response.data;

    return res;
  },
  error => {
    console.log(error);
    // Message({
    //   message: error.message,
    //   type: "error",
    //   duration: 5 * 1000
    // });
    return Promise.reject(error);
  }
);

export default service;
