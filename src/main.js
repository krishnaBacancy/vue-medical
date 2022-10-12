import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;
Vue.use(Toast, {});

// let localRoleId = localStorage.role_id;
// let cookieExists = localRoleId !== undefined && localRoleId !== null;
// if (cookieExists) {
//   const roleId = localStorage.getItem("role_id");
//   const roleIdExists = roleId !== undefined && roleId !== null;
//   if (roleIdExists) {
//     store.dispatch("users/loginUser", { roleId });
//   }
// }

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
