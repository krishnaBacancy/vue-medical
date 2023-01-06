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
  getEcgTempChartData(state) {
    return state.ecgTempChartData;
  },
  getPpgChartData(state) {
    return state?.ppgChartData;
  },
  getPpgTempChartData(state) {
    return state?.ppgTempChartData;
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
    // if (state.ecgTempChartData.length >= 2000) {
    //   state.ecgTempChartData = state.ecgTempChartData.slice(
    //     Math.max(state.ecgTempChartData.length - 1000, 0)
    //   );
    // }
    Array.prototype.push.apply(state.ecgChartData, ecgData);
    state.ecgTempChartData = ecgData;
    // state.ecgChartData = state.ecgTempChartData;
    // console.log("state.ecgChartData", state.ecgChartData);
  },
  SET_PPG_CHART_DATA(state, ppgData) {
    // if (state.ppgTempChartData.length >= 2000) {
    //   state.ppgTempChartData = state.ppgTempChartData.slice(
    //     Math.max(state.ppgTempChartData.length - 1000, 0)
    //   );
    // }
    Array.prototype.push.apply(state.ppgChartData, ppgData);
    state.ppgTempChartData = ppgData;
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
  REMOVE_DISPLAYED_ECG_DATA(state, count) {
    state.ecgTempChartData.splice(0, count);
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
  removeDisplayedEcgData({ commit }, payload) {
    commit("REMOVE_DISPLAYED_ECG_DATA", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
