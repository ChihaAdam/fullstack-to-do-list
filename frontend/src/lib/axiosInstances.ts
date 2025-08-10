import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) throw new Error("no api url provided");

export const api = axios.create({
  baseURL: API_URL,
  headers:{'Content-Type':'application/json'},
  withCredentials:true,
  timeout:15000
});