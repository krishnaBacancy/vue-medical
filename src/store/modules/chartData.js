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
    if (state.ecgTempChartData.length >= 2000) {
      state.ecgTempChartData = state.ecgTempChartData.slice(
        Math.max(state.ecgTempChartData.length - 1000, 0)
      );
    }
    Array.prototype.push.apply(state.ecgTempChartData, ecgData);
    state.ecgChartData = state.ecgTempChartData;
  },
  SET_PPG_CHART_DATA(state, ppgData) {
    if (state.ppgTempChartData.length >= 2000) {
      state.ppgTempChartData = state.ppgTempChartData.slice(
        Math.max(state.ppgTempChartData.length - 1000, 0)
      );
    }
    Array.prototype.push.apply(state.ppgTempChartData, ppgData);
    state.ppgChartData = state.ppgTempChartData;
  },
  SET_PATIENT_SCHEDULER_DATA(state, schedulerData) {
    state.schedulerData = schedulerData;
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
