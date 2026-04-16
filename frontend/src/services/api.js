import axios from "axios";

// ✅ Create Axios instance
const API = axios.create({
  baseURL: "https://employee-attendance-portal-bm9r.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional: prevents long hanging requests
});

// ✅ Attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Handle responses & errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.response?.data || err.message);

    // 🔐 Handle Unauthorized (token expired / invalid)
    if (err.response?.status === 401) {
      localStorage.removeItem("token");

      // Avoid redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  }
);

export default API;