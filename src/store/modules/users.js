import user from "../../api/login";

const state = {
  user: {
    id: null,
    email: null,
    password: null,
  },
  roleId: null,
  loggedIn: false,
};

const getters = {
  isLoggedIn(state) {
    const loggedOut = state.user.id == null;
    return !loggedOut;
  },
  getRole(state) {
    return state?.user[0]?.role;
  },
};

const mutations = {
  setUserInfo(state, data) {
    state.user = data.data.data;
    state.loggedIn = true;
    localStorage.setItem("user_id", data.data?.data[0]?.userId);
  },
  removeUserInfo(state) {
    state.user = {};
    state.loggedIn = false;
    localStorage.removeItem("user_id");
  },
};

const actions = {
  loginUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      user
        .loginApi(payload)
        .then((res) => {
          if (res.status === 200) {
            commit("setUserInfo", res);
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  },
  logoutUser({ commit }) {
    commit("removeUserInfo");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
