import axios from "axios";

const BASE_URL = "http://194.233.69.96:8989/api/v1";
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
