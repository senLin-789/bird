import axios from "axios";
import { message } from "ant-design-vue";

export const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("err" + error);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          message.error("请求参数错误");
          break;
        case 401:
          message.error("请先登录");
          break;
        case 403:
          message.error("权限不足");
          break;
        case 404:
          message.error("请求地址不存在");
          break;
        case 500:
          message.error("服务器错误");
          break;
        default:
          message.error("其他错误");
          break;
      }
    }
    return Promise.reject(error);
  }
);
