import axios from 'axios';
const api = axios.create({
  baseURL: "https://dev-radar-backend.herokuapp.com",
});

export default api;