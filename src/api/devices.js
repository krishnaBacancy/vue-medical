import client from "./index";

export default {
  getAllDevices: () => client.get("/devices/viewalldevices/"),
  deleteSingleDevice: (params) =>
    client.delete(`/devices/removesingledevice?vehicleId=${params}`),
  //add device(Admin)
  addDeviceData: (params) => client.post("/devices/", params),
};
