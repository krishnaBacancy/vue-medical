import doctors from "../../api/doctor";

const state = {
  deviceData: [],
  patientsData: [],
  singlePatientData: [],
  singleDeviceData: [],
  loading: false,
  searchTerm: "",
};

const getters = {
  loadingStatus(state) {
    return state.loading;
  },
  getPatients(state) {
    return state.deviceData;
  },
  getAllPatientsOnly(state) {
    return state?.patientsData
      ?.filter((patient) => patient.role === "Customer")
      .reverse();
  },
  getAllDoctorsOnly(state) {
    return state?.patientsData
      ?.filter((patient) => patient.role === "Doctor")
      .reverse();
  },
  getSinglePatientData(state) {
    return state?.singlePatientData;
  },
  getSingleDeviceData(state) {
    return state?.singleDeviceData;
  },
  getMacAddress(state) {
    return state?.singleDeviceData?.map((data) => {
      return data?.macAddressFramed;
    });
  },
  filteredPatients: (state) => {
    if (!state.searchTerm) return state.deviceData;
    return state.deviceData.filter((data) =>
      data.macAddressFramed.includes(state.searchTerm.trim().toUpperCase())
    );
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.loading = loadingStatus;
  },
  SET_PATIENTS_FOR_DOCTOR(state, deviceData) {
    state.deviceData = deviceData.map((data) => {
      return {
        id: data._id,
        firstName:
          data.customerfirstName?.charAt(0).toUpperCase() +
          data.customerfirstName?.slice(1),
        lastName:
          data.customerlastName?.charAt(0).toUpperCase() +
          data.customerlastName?.slice(1),
        fullName:
          data.customerfirstName?.charAt(0).toUpperCase() +
          data.customerfirstName?.slice(1) +
          " " +
          data.customerlastName?.charAt(0).toUpperCase() +
          data.customerlastName?.slice(1),
        doctorFirstName: data.doctorfirstName,
        doctorLastName: data.doctorlastName,
        macAddress: data.mac_address,
        macAddressFramed: data.mac_address_framed.toUpperCase(),
        name: data.name,
      };
    });
  },
  SET_ALL_PATIENT(state, patients) {
    state.patientsData = patients.map((patient) => {
      return {
        id: patient.userId,
        firstName:
          patient.first_Name?.charAt(0).toUpperCase() +
          patient.first_Name?.slice(1),
        licenseNo: patient.licenseno,
        lastName:
          patient.last_Name?.charAt(0).toUpperCase() +
          patient.last_Name?.slice(1),
        fullName:
          patient?.first_Name?.charAt(0).toUpperCase() +
          patient?.first_Name?.slice(1) +
          " " +
          patient?.last_Name?.charAt(0).toUpperCase() +
          patient?.last_Name?.slice(1),
        email: patient.email,
        address: patient.Address,
        aadharcard: patient.adharcard,
        gender: patient.gender,
        dob: patient.DOB,
        mobileNo: patient.mobile_no,
        gstNo: patient.GSTNO,
        roleId: patient.roleId,
        role: patient.role,
      };
    });
  },
  SET_SINGLE_PATIENT(state, patientData) {
    state.singlePatientData = patientData.map((patient) => {
      return {
        id: patient.userId,
        firstName: patient.first_Name,
        licenseNo: patient.licenseno,
        fullName:
          patient?.first_Name?.charAt(0).toUpperCase() +
          patient?.first_Name?.slice(1) +
          " " +
          patient?.last_Name?.charAt(0).toUpperCase() +
          patient?.last_Name?.slice(1),
        lastName: patient.last_Name,
        email: patient.email,
        address: patient.Address,
        aadharcard: patient.adharcard,
        gender: patient.gender,
        dob: patient.DOB,
        mobileNo: patient.mobile_no,
        gstNo: patient.GSTNO,
        roleId: patient.roleId,
        role: patient.role,
        emergencyPhone: patient.emergencyPhone,
        height: patient.height,
        weight: patient.weight,
        bloodPressure: patient?.medical_history[0]?.bloodPressure,
        diabetics: patient?.medical_history[0]?.diabetics,
        heartCondition: patient?.medical_history[0]?.heartCondition,
        obesity: patient?.medical_history[0]?.obesity,
        thyroid: patient?.medical_history[0]?.thyroid,
        familyMember1Name: patient?.family_members[0]?.familyMember1Name,
        familyMember2Name: patient?.family_members[1]?.familyMember2Name,
        familyMember1Contact: patient?.family_members[0]?.familyMember1Contact,
        familyMember2Contact: patient?.family_members[1]?.familyMember2Contact,
        familyMember1Relation:
          patient?.family_members[0]?.familyMember1Relation,
        familyMember2Relation:
          patient?.family_members[1]?.familyMember2Relation,
      };
    });
  },
  DELETE_PATIENT(state, patientId) {
    let newData = state.singlePatientData.filter(
      (data) => data.id !== patientId
    );
    state.singlePatientData = newData;
  },
  SET_SINGLE_DEVICE(state, deviceData) {
    state.singleDeviceData = deviceData.map((device) => {
      return {
        id: device._id,
        name: device.name,
        macAddress: device.mac_address,
        manufactureMonth: device.manufacture_month_year,
        macAddressFramed: device.mac_address_framed,
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
  async getPatientsForDoctor({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getAllDevicesOfDoctor(id);
    commit("SET_PATIENTS_FOR_DOCTOR", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getAllPatientsData({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getAllPatientsData(id);
    commit("SET_ALL_PATIENT", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getSinglePatient({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getSinglePatientData(id);
    commit("SET_SINGLE_PATIENT", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async getSingleDevice({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getSingleDeviceData(id);
    commit("SET_SINGLE_DEVICE", res.data.data);
    commit("SET_LOADING_STATUS", false);
  },
  async deletePatient({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.deletePatient(id);
    console.log("deleted--", res.data);
    commit("DELETE_PATIENT", id);
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
