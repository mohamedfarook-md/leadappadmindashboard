import api, { request } from "./axios";

// POST /admin/auth/login
// Backend expects: { mobile, password }

export function loginAdmin(credentials) {
  return request(api.post("/admin/auth/login", credentials));
}

// GET /admin/auth/me
// Used to restore a session on page refresh from a stored token.

export function fetchCurrentAdmin() {
  return request(api.get("/admin/auth/me"));
}

// POST /admin/auth/logout
// Backend may handle logout server-side; otherwise
// client-side token removal will handle the session.

export function logoutAdmin() {
  return request(api.post("/admin/auth/logout"));
}