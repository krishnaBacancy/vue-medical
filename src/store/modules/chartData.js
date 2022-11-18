const state = {
  ecgChartData: [],
};

const getters = {
  getEcgChartData(state) {
    return state?.ecgChartData;
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
    // state.ecgChartData = ecgData;
    Array.prototype.push.apply(state.ecgChartData, ecgData);
  },
};

const actions = {
  setEcgData({ commit }, payload) {
    commit("SET_ECG_CHART_DATA", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
