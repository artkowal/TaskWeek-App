import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:3001" : "/",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nie przekierowuj dla żądań do endpointów auth
    if (error.config.url.includes("/auth")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
