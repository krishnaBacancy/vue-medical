import devices from "@/api/devices";

const state = {
  devices: [],
  isLoading: false,
};

const getters = {
  loadingStatus(state) {
    return state.isLoading;
  },
  getDevices(state) {
    return state?.devices.reverse();
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  SET_ALL_DEVICES(state, deviceData) {
    state.devices = deviceData.map((device) => {
      return {
        id: device._id,
        name: device.name,
        macAddress: device.mac_address,
        manufactureMonth: device.manufacture_month_year,
        macAddressFramed: device.mac_address_framed.toUpperCase(),
        doctorFirstName: device.doctorfirstName,
        doctorLastName: device.doctorlastName,
        customerFirstName: device.customerfirstName,
        customerLastName: device.customerlastName,
        adminId: device.adminId,
        doctorId: device.doctorId,
        customerId: device.customerId,
      };
    });
  },
};

const actions = {
  async getAllDevices({ commit }) {
    commit("SET_LOADING_STATUS", true);
    const res = await devices.getAllDevices();
    commit("SET_ALL_DEVICES", res.data.data);
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
