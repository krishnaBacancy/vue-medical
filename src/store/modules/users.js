import user from "../../api/login";

const state = {
  user: {
    id: null,
    email: null,
    password: null,
  },
  loggedIn: false,
};

const getters = {
  isLoggedIn(state) {
    const loggedOut = state.user?.email == null;
    return !loggedOut;
  },
};

const mutations = {
  setUserInfo(state, data) {
    state.user = data.data.data.userData[0];
    state.loggedIn = true;
    localStorage.setItem("email", data.data.data.userData[0].email);
  },
  removeUserInfo(state) {
    state.user = {};
    state.loggedIn = false;
    localStorage.removeItem("email");
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
