import axios from "axios";
const api = axios.create({
  baseURL: "https://devradar0.herokuapp.com",
});

export default api;
