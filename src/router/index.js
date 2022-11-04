import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/dashboard/HomeView.vue";
// import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/patient-details/:id",
    name: "patient-details",
    component: () => import("../views/dashboard/PatientDetails.vue"),
  },
  {
    path: "/login",
    name: "userlogin",
    component: () => import("../views/user/UserLogin.vue"),
    meta: { guest: true },
  },
  {
    path: "/user-management",
    name: "usermanagement",
    component: () => import("../views/userManagement/UserManagement.vue"),
  },
  {
    path: "/add-user",
    name: "adduser",
    component: () => import("../views/userManagement/AddUser.vue"),
  },
  {
    path: "/patients",
    name: "patients",
    component: () => import("../views/patients/PatientsData.vue"),
  },
  {
    path: "/patients/patient/:id",
    name: "patient-profile",
    component: () => import("../views/patients/PatientProfile.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("../views/settings/SettingsView.vue"),
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user_id");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

// router.beforeEach((to, from, next) => {
//   console.log("To--", to);
//   console.log("Store--", store);
//   if (to.name !== "userlogin" && store.getters["users/isLoggedIn"]) {
//     next({
//       path: "login",
//       replace: true,
//     });
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   console.log("To--", to);
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.getters["users/isLoggedIn"]) {
//       next();
//       return;
//     }
//     next("/login");
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.guest)) {
//     if (store.getters["users/isLoggedIn"]) {
//       next("/");
//       return;
//     }
//     next();
//   } else {
//     next();
//   }
// });

export default router;
