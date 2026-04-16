import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-attendance-portal-bm9r.onrender.com/api",
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ Handle responses & errors globally
API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.response || err.message);

    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

export default API;