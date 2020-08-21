import axios from "axios";
const instance = axios.create({
  baseURL: "",
  timeout: 60000,
  headers: { "Access-Control-Allow-Origin": "*" },
});
export default instance;
