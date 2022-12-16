import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/dashboard/HomeView.vue";

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
    path: "/devices",
    name: "devices",
    component: () => import("../views/admin/DeviceList.vue"),
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
    path: "/add-new-patient",
    name: "add-patient",
    component: () => import("../views/patients/AddPatient.vue"),
  },
  {
    path: "/patients/patient/:id",
    name: "patient-profile",
    component: () => import("../views/patients/PatientProfile.vue"),
  },
  {
    path: "/edit-patient/:id",
    name: "edit-patient",
    component: () => import("../views/patients/EditPatient.vue"),
  },
  {
    path: "/live-device",
    name: "live-device",
    component: () => import("../views/live/LivePage.vue"),
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
  linkExactActiveClass: "exactActiveLink",
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

export default router;
