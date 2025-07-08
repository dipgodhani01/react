// src/utils/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // Always send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
