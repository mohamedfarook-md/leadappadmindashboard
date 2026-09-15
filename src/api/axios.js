import axios from "axios";
import { getToken, clearToken } from "../utils/storage";

// All API calls in this project must go through this instance.
// Never hard-code the production URL inside a component — the base URL
// always comes from the VITE_API_BASE_URL environment variable.
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    "VITE_API_BASE_URL is not set. Configure it in .env before calling the backend."
  );
}

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the admin JWT to every outgoing request.
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Centralized 401 handling: clear the session and bounce to login.
// Individual pages should not need to handle expired-token logic themselves.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearToken();
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Shared request wrapper so every api/*.js file returns a consistent,
// defensive shape ({ data, error }) instead of throwing raw Axios errors
// into components. Components should never need to read error.response
// directly — see utils/formatters or the relevant page for display logic.
export async function request(promise) {
  try {
    const response = await promise;
    return { data: response.data, error: null };
  } catch (err) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      (err?.code === "ERR_NETWORK"
        ? "Unable to reach the server. Please check your connection."
        : "Something went wrong. Please try again.");
    return {
      data: null,
      error: {
        message,
        status: err?.response?.status || null,
      },
    };
  }
}


// QR Backend API
// Keep this separate from the existing customer backend API.
const QR_API_BASE_URL = "https://apimhsteppayshub.in/api";

export const qrApi = axios.create({
  baseURL: QR_API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the same admin JWT to QR backend requests.
qrApi.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);




export default api;
