const state = {
  ecgChartData: [],
  ecgTempChartData: [],
  ppgChartData: [],
  ppgTempChartData: [],
  schedulerData: {},
};

const getters = {
  getSchedulerData(state) {
    return state?.schedulerData;
  },
  getEcgChartData(state) {
    return state?.ecgChartData;
  },
  getPpgChartData(state) {
    return state?.ppgChartData;
  },
  getMinEcgData(state) {
    let sumEcgData = 0;
    for (let i = 0; i < state?.ecgChartData.length; i++) {
      sumEcgData += parseInt(state?.ecgChartData[i], 10);
    }
    let ecgAvgMin = sumEcgData / state?.ecgChartData.length;
    return ecgAvgMin;
  },
};

const mutations = {
  SET_ECG_CHART_DATA(state, ecgData) {
    // if (state.ecgChartData.length >= 2000) {
    //   state.ecgChartData = state.ecgChartData.slice(
    //     Math.max(state.ecgChartData.length - 1000, 0)
    //   );
    // }
    Array.prototype.push.apply(state.ecgChartData, ecgData);
    // state.ecgChartData = state.ecgTempChartData;
    console.log("state.ecgChartData", state.ecgChartData);
  },
  SET_PPG_CHART_DATA(state, ppgData) {
    // if (state.ppgTempChartData.length >= 2000) {
    //   state.ppgTempChartData = state.ppgTempChartData.slice(
    //     Math.max(state.ppgTempChartData.length - 1000, 0)
    //   );
    // }
    Array.prototype.push.apply(state.ppgChartData, ppgData);
    // state.ppgChartData = state.ppgTempChartData;
    console.log("state.ppgChartData", state.ppgChartData);
  },
  SET_PATIENT_SCHEDULER_DATA(state, schedulerData) {
    state.schedulerData = schedulerData;
  },
  REMOVE_ECG_CHART_DATA(state) {
    state.ecgChartData = [];
  },
  REMOVE_PPG_CHART_DATA(state) {
    state.ppgChartData = [];
  },
};

const actions = {
  setEcgData({ commit }, payload) {
    commit("SET_ECG_CHART_DATA", payload);
  },
  setPpgData({ commit }, payload) {
    commit("SET_PPG_CHART_DATA", payload);
  },
  setSchedulerData({ commit }, payload) {
    commit("SET_PATIENT_SCHEDULER_DATA", payload);
  },
  clearEcgData({ commit }) {
    commit("REMOVE_ECG_CHART_DATA");
  },
  clearPpgData({ commit }) {
    commit("REMOVE_PPG_CHART_DATA");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
