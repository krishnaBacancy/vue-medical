import users from "@/api/users";

const state = {
  userData: {},
  isLoading: false,
};

const getters = {};

const mutations = {
  SET_USER(state, data) {
    state.userData = data;
  },
  SET_USER_INFO(state, data) {
    state.userData = data.data.data;
  },
};

const actions = {
  async getAllUsers({ commit }) {
    const res = await users.getAllUsers();
    console.log("res--", res);
    commit("SET_USER", res);
  },
  addUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      users
        .addUser(payload)
        .then((res) => {
          if (res.status === 201) {
            commit("SET_USER_INFO", res);
            resolve(true);
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
