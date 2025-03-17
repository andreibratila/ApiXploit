import { API_URL } from "@/config";
import axios from "axios";

const backendApi = axios.create({
  baseURL: API_URL,
});

export default backendApi;
