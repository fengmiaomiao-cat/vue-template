import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import * as types from "../store/types";
Vue.use(VueRouter);

const routes = [{
    path: '',
    redirect: '/login'
  }, {
    path: "/",
    component: resolve => require(["@/views/Home"], resolve),
    children: [{
      path: '/admin',
      name: 'admin',
      component: resolve => require(["@/views/index"], resolve)
    }]
  },
  {
    path: "/login",
    name: "Login",
    component: resolve => require(["@/views/Login"], resolve)
  }
];

// 页面刷新时，重新赋值token
if (window.sessionStorage.getItem("token")) {
  store.commit(types.LOGIN, window.sessionStorage.getItem("token"));
}

const router = new VueRouter({
  mode: "history",
  routes
});

//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    store.commit(types.LOGOUT);
    next();
  } else {
    const token = sessionStorage.getItem("token");
    if (!token) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  }
});
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.token) {
//       next();
//     } else {
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath
//         }
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
