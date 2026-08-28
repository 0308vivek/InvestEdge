import axios from "axios";

const LOGIN_URL = `${process.env.REACT_APP_LANDING_URL || "http://localhost:3001"}/login`;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3002",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestUrl = error.config?.url || "";
    const isSessionCheck = requestUrl.includes("/auth/me");
    if (error.response?.status === 401 && !isSessionCheck) {
      window.location.href = LOGIN_URL;
    }
    return Promise.reject(error);
  },
);

export default api;
