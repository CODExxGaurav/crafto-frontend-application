import axios from "axios";

const API_BASE_URL = "https://assignment.stage.crafto.app";

const Axios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
