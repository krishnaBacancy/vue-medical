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
    path: "/patient-details",
    name: "patient-details",
    component: () => import("../views/dashboard/PatientDetails.vue"),
  },
  {
    path: "/login",
    name: "userlogin",
    component: () => import("../views/user/UserLogin.vue"),
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
    path: "*",
    redirect: "/login",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
