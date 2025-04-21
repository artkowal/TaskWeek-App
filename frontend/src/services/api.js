import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    // Nie przekierowuj dla żądań do endpointów auth
    if (url === "/auth/check" || url === "/auth/logout") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
