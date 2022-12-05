import client from "./index";

export default {
  getAllDevices: () => client.get("/devices/viewalldevices/"),
};
