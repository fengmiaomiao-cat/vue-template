import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import * as types from "../store/types";
import HelloWorld from "../components/HelloWorld";
import Login from "../components/Login.vue";
import Logout from "../components/Logout.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "/",
    component: HelloWorld
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout
  }
];

// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem("token")) {
  store.commit(types.LOGIN, window.sessionStorage.getItem("token"));
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

export default router;
