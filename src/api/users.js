import client from "./index";

export default {
  getAllUsersRoleWise: () => client.get("/users/fetchuserrolewise"),
};
