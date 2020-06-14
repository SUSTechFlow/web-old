import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
// import HomeStartScreen from "../views/HomeStartScreen.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/qwq",
  //   name: "QwQ",
  //   component: HomeStartScreen
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },

  {
    path: "/courses",
    name: "Course",
    component: () =>
      import(/* webpackChunkName: "course_list" */ "../views/courses/index.vue")
  },
  {
    path: "/courses/:cid",
    name: "Course Detail",
    component: () =>
      import(
        /* webpackChunkName: "course_detail" */ "../views/courses/detail.vue"
      )
  },
  {
    path: "/u",
    component: () => import(`@/layouts/Account.vue`),
    children: [
      {
        path: "signin",
        component: () => import("@/views/users/Signin.vue"),
        name: "signin"
      },
      {
        path: "signup",
        component: () => import("@/views/users/Signup.vue"),
        name: "signup"
      },
      {
        path: "preference",
        component: () => import("@/views/users/Preference.vue"),
        name: "preference"
      },
      {
        path: ":uid",
        component: () => import("@/views/users/Profile.vue"),
        name: "profile"
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
