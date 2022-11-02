import doctors from "../../api/doctor";

const state = {
  doctorsData: {},
  patientsData: [],
  singlePatientData: [],
  loading: false,
};

const getters = {
  loadingStatus(state) {
    return state.loading;
  },
  getPatients(state) {
    return state.doctorsData;
  },
  getAllPatientsOnly(state) {
    return state?.patientsData?.filter(
      (patient) => patient.role === "Customer"
    );
  },
  getSinglePatientData(state) {
    return state?.singlePatientData;
  },
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.loading = loadingStatus;
  },
  SET_PATIENTS_FOR_DOCTOR(state, data) {
    state.doctorsData = data.data.data.reverse();
  },
  SET_ALL_PATIENT(state, patients) {
    state.patientsData = patients.map((patient) => {
      return {
        id: patient.userId,
        firstName: patient.first_Name,
        licenseNo: patient.licenseno,
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
      };
    });
  },
  SET_SINGLE_PATIENT(state, patientData) {
    state.singlePatientData = patientData.map((patient) => {
      return {
        id: patient.userId,
        firstName: patient.first_Name,
        licenseNo: patient.licenseno,
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
      };
    });
  },
};

const actions = {
  async getPatientsForDoctor({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getAllDevicesOfDoctor(id);
    commit("SET_PATIENTS_FOR_DOCTOR", res);
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
