import axios from "axios";
import store from "../store/index.js";
import * as types from "../store/types.js";
import router from "../router/index.js";
import Message from '../plugins/el_message/main.js';
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "http://api.github.com";
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
axios.interceptors.response.use(
  response => {
    return response;
  },
  eror => {
    if (error.response) {
      const message = err.response.message;
      Message.error(message);
      switch (error.response.status) {
        case 401:
          store.commit("types.LOGOUT");
          router.replace({
            path: "login",
            query: {
              redirect: router.currentRoute.path
            }
          });
      }
    }
    return Promise.reject(error.response.data);
  }
);
export default axios;
