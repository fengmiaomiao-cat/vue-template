import Vue from "vue";
import "babel-polyfill";
import App from "./App";
import router from "./router";
import store from "./store/index.js";
import { gl_ajax } from "./api/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.prototype.$gl_ajax = gl_ajax;
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});

