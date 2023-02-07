import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import user_management from "./modules/user_management";
import doctors from "./modules/doctors";
import patientData from "./modules/patientData";
import devices from "./modules/devices";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    userManagement: user_management,
    doctors,
    patientData,
    devices,
  },
});
