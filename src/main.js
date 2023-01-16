import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "@/plugins/apexcharts";
import VueTelInput from "vue-tel-input";
import "vue-tel-input/dist/vue-tel-input.css";

Vue.config.productionTip = false;
Vue.use(Toast, {});
Vue.use(VueTelInput);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
