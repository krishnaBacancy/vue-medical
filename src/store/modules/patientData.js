import patient from "@/api/patient";

const state = {
  patientAlgoData: null,
  loading: false,
  bodyTemp: null,
  bloodOxygen: null,
  patientSteps: null,
};

const getters = {
  loadingStatus(state) {
    return state.loading;
  },
  getPatientData(state) {
    return state.patientData;
  },
  getBodyTempGraphData(state) {
    return state.bodyTemp;
  },
  getBloodOxygenGraphData(state) {
    return state.bloodOxygen;
  },
  getPatientSteps(state) {
    return state.patientSteps;
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.loading = loadingStatus;
  },
  SET_PATIENT_ALGO_DATA(state, patientData) {
    state.patientAlgoData = patientData;
  },
  SET_PATIENT_BODY_TEMP_GRAPHS(state, bodyTemp) {
    state.bodyTemp = bodyTemp;
  },
  SET_PATIENT_BLOOD_OXYGEN_GRAPHS(state, bloodOxygen) {
    state.bloodOxygen = bloodOxygen;
  },
  SET_PATIENT_STEPS_GRAPH(state, steps) {
    state.patientSteps = steps;
  },
};

const actions = {
  async getPatientAlgoData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getPatientAlgoData(payload);
    console.log("res---", res.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getPatientBodyTempData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getBodyTempGraph(payload);
    console.log("temp---", res.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getPatientBloodOxygenData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getBloodOxygenGraph(payload);
    console.log("spo2----", res.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getPatientStepsData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getStepGraph(payload);
    console.log("steps--", res.data);
    commit("SET_LOADING_STATUS", false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
