import devices from "@/api/devices";

const state = {
  devices: [],
  isLoading: false,
  assignDevicesOfDoctor: [],
  assignDevicesOfPatient: [],
};

const getters = {
  loadingStatus(state) {
    return state.isLoading;
  },
  getDevices(state) {
    return state?.devices;
  },
  getAssignDevicesOfDoctor(state) {
    return state?.assignDevicesOfDoctor;
  },
  getAssignDevicesOfPatient(state) {
    return state?.assignDevicesOfPatient;
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.isLoading = loadingStatus;
  },
  SET_ALL_DEVICES(state, deviceData) {
    state.devices = deviceData
      ?.map((device) => {
        return {
          id: device._id,
          name: device.name,
          macAddress: device.mac_address,
          manufactureMonth: device.manufacture_month_year,
          macAddressFramed: device.mac_address_framed.toUpperCase(),
          doctorFirstName: device.docterfirstName,
          doctorLastName: device.docterlastName,
          doctorFullName:
            device.docterfirstName?.charAt(0).toUpperCase() +
            device.docterfirstName?.slice(1) +
            " " +
            device.docterlastName?.charAt(0).toUpperCase() +
            device.docterlastName?.slice(1),
          fullName:
            device.customerfirstName?.charAt(0).toUpperCase() +
            device.customerfirstName?.slice(1) +
            " " +
            device.customerlastName?.charAt(0).toUpperCase() +
            device.customerlastName?.slice(1),
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
  SET_ASSIGN_DEVICES_DOCTOR(state, devices) {
    console.log("data doctor--", devices);
    state.assignDevicesOfDoctor = devices;
  },
  SET_ASSIGN_DEVICES_PATIENT(state, devices) {
    console.log("data patient", devices);
    state.assignDevicesOfPatient = devices;
  },
};

const actions = {
  async getAllDevices({ commit }) {
    commit("SET_LOADING_STATUS", true);
    const res = await devices.getAllDevices();
    if (res.status === 200) {
      commit("SET_ALL_DEVICES", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async deleteDevice({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await devices.deleteSingleDevice(id);
    if (res.status === 200) {
      console.log("deleted--", res.data);
      commit("DELETE_DEVICE", id);
      commit("SET_LOADING_STATUS", false);
    }
  },
  addDeviceData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    return new Promise((resolve, reject) => {
      devices
        .addDeviceData(payload)
        .then((res) => {
          if (res.status === 201) {
            commit("SET_ALL_DEVICES", res.data.data);
            resolve(true);
            commit("SET_LOADING_STATUS", false);
          }
        })
        .catch((err) => reject(err));
    });
  },
  async checkAssignDevicesToDoctor({ commit }, payload) {
    const res = await devices.checkDeviceAssignToDoctor(payload);
    if (res.status === 200) {
      console.log("res--", res.data);
      commit("SET_ASSIGN_DEVICES_DOCTOR", res.data.data);
    }
  },
  async assignDeviceToDoctor(_, payload) {
    const res = await devices.deviceAssignToDoctor(payload);
    if (res.status === 200) {
      console.log("doctor--", res.data);
    }
  },
  async checkAssignDevicesToPatient({ commit }, payload) {
    const res = await devices.checkDeviceAssignToCustomer(payload);
    if (res.status === 200) {
      console.log("res--", res.data.data);
      commit("SET_ASSIGN_DEVICES_PATIENT", res.data.data);
    }
  },
  async assignDeviceToPatient(_, payload) {
    const res = await devices.deviceAssignToCustomer(payload);
    if (res.status === 200) {
      console.log("assign--", res.data);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
