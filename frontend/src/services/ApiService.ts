import axios from "axios";
import { config } from "../../config";

//TODO, use interceptors for efficient response handling and make integration easy
const ApiService = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default ApiService;
