// Lightweight axios client for future API calls
// Non-invasive: not imported anywhere yet
import axios from "axios";

// Base URL can be configured via Vite env: VITE_API_BASE
const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Attach Authorization header if a token exists (aligned with authStore localStorage usage)
http.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = token;
  } catch (_) {
    /* ignore */
  }
  return config;
});

// Pass-through success; normalize and log errors
http.interceptors.response.use(
  (res) => res,
  (err) => {
    // Centralized logging; callers can still catch and handle
    console.error("[HTTP] Error:", err?.response?.status, err?.response?.data || err?.message);
    return Promise.reject(err);
  }
);

export default http;

