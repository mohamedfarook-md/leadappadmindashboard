// Centralized storage utility.
// All reads/writes to browser storage for auth data must go through here
// so the mechanism (localStorage vs sessionStorage) can be swapped in one place.

const TOKEN_KEY = "mhsp_admin_token";
const ADMIN_KEY = "mhsp_admin_profile";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage unavailable (private browsing, etc.) — fail silently
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
  } catch {
    // no-op
  }
}

export function getAdminProfile() {
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAdminProfile(profile) {
  try {
    localStorage.setItem(ADMIN_KEY, JSON.stringify(profile));
  } catch {
    // no-op
  }
}
