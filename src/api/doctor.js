import client from "./index";

export default {
  getAllDevicesOfDoctor: (params) =>
    client.get(`/devices/viewdevicesofdoctor/${params}`),
  getAllPatientsData: (params) => client.get(`/users?doctorId=${params}`),
  getSinglePatientData: (params) =>
    client.get(`/users/useroperation/${params}`),
  getSingleDeviceData: (params) =>
    client.get(`/devices/viewsingledevicedetails/${params}`),
};
