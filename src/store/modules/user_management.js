import users from "@/api/users";

const state = {
  userData: {},
  users: [],
  isLoading: false,
};

const getters = {
  loadingStatus(state) {
    return state.isLoading;
  },
  getUsersData(state) {
    return state?.users;
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  SET_USER(state, usersData) {
    state.users = usersData.map((user) => {
      return {
        id: user.userId,
        firstName: user.first_Name,
        licenseNo: user.licenseno,
        lastName: user.last_Name,
        email: user.email,
        address: user.Address,
        aadharcard: user.adharcard,
        gender: user.gender,
        dob: user.DOB,
        mobileNo: user.mobile_no,
        gstNo: user.GSTNO,
        roleId: user.roleId,
        role: user.role,
      };
    });
  },
  SET_USER_INFO(state, data) {
    state.userData = data.data.data;
  },
};

const actions = {
  async getAllUsers({ commit }) {
    commit("SET_LOADING_STATUS", true);
    const res = await users.getAllUsers();
    commit("SET_USER", res.data.data);
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
