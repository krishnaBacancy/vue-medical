import users from "@/api/users";

const state = {
  userData: {},
  isLoading: false,
};

const getters = {
  loadingStatus(state) {
    return state.isLoading;
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  SET_USER(state, data) {
    state.userData = data;
  },
  SET_USER_INFO(state, data) {
    state.userData = data.data.data;
  },
};

const actions = {
  async getAllUsers({ commit }) {
    commit("SET_LOADING_STATUS", true);
    const res = await users.getAllUsers();
    console.log("res--", res);
    commit("SET_USER", res);
    commit("SET_LOADING_STATUS", false);
  },
  addUser({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    return new Promise((resolve, reject) => {
      users
        .addUser(payload)
        .then((res) => {
          if (res.status === 201) {
            commit("SET_USER_INFO", res);
            resolve(true);
            commit("SET_LOADING_STATUS", true);
          }
        })
        .catch((err) => reject(err));
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
