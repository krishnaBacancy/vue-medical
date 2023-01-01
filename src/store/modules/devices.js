import devices from "@/api/devices";

const state = {
  devices: [],
  isLoading: false,
  assignDevices: [],
};

const getters = {
  loadingStatus(state) {
    return state.isLoading;
  },
  getDevices(state) {
    return state?.devices;
  },
  getAssignDevices(state) {
    return state?.assignDevices;
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  SET_ALL_DEVICES(state, deviceData) {
    state.devices = deviceData
      .map((device) => {
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
      })
      .reverse();
  },
  DELETE_DEVICE(state, deviceId) {
    let newData = state.devices.filter((data) => data.id !== deviceId);
    state.devices = newData;
  },
  SET_ASSIGN_DEVICES(state, devices) {
    console.log("data--", devices);
    state.assignDevices = devices;
  },
};

const actions = {
  async getAllDevices({ commit }) {
    commit("SET_LOADING_STATUS", true);
    const res = await devices.getAllDevices();
    commit("SET_ALL_DEVICES", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async deleteDevice({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await devices.deleteSingleDevice(id);
    console.log("deleted--", res.data);
    commit("DELETE_DEVICE", id);
    commit("SET_LOADING_STATUS", false);
  },
  async addDeviceData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await devices.addDeviceData(payload);
    if (res.status === 200) {
      commit("SET_ALL_DEVICES", res.data.data);
    }
    commit("SET_LOADING_STATUS", false);
  },
  async assignDeviceData(_, payload) {
    const res = await devices.checkDeviceAssignToDoctor(payload);
    console.log("res--", res.data);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
