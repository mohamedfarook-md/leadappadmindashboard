import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  fetchCurrentAdmin,
  loginAdmin,
  logoutAdmin,
} from "../api/authApi";

import {
  getToken,
  setToken,
  clearToken,
  getAdminProfile,
  setAdminProfile,
} from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(getAdminProfile());
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getToken())
  );
  const [isRestoring, setIsRestoring] = useState(true);

  // ======================================================
  // RESTORE ADMIN SESSION
  // ======================================================

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const token = getToken();

      if (!token) {
        setIsRestoring(false);
        return;
      }

      const { data, error } = await fetchCurrentAdmin();

      if (cancelled) return;

      if (error) {
        clearToken();
        setIsAuthenticated(false);
        setAdmin(null);
      } else {
        // Backend may return:
        // { admin: {...} }
        // or directly the profile object

        const profile =
          data?.admin ||
          data?.user ||
          data?.data?.admin ||
          data?.data?.user ||
          data?.data ||
          data;

        setAdmin(profile);
        setAdminProfile(profile);
        setIsAuthenticated(true);
      }

      setIsRestoring(false);
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // ======================================================
  // ADMIN LOGIN
  // ======================================================

  const login = useCallback(async (credentials) => {
    const { data, error } = await loginAdmin(credentials);

    // API error
    if (error) {
      return {
        success: false,
        message: error.message || "Login failed. Please try again.",
      };
    }

    // Backend response can be:
    //
    // {
    //   success: true,
    //   message: "...",
    //   data: {
    //     token: "...",
    //     user: {...}
    //   }
    // }
    //
    // OR:
    //
    // {
    //   token: "...",
    //   user: {...}
    // }

    const responseData = data?.data || data;

    const token = responseData?.token;

    const profile =
      responseData?.user ||
      responseData?.admin ||
      data?.user ||
      data?.admin ||
      null;

    // Token missing
    if (!token) {
      return {
        success: false,
        message: "Login response did not include a token.",
      };
    }

    // Save JWT
    setToken(token);

    // Save admin profile
    if (profile) {
      setAdminProfile(profile);
    }

    setAdmin(profile);
    setIsAuthenticated(true);

    return {
      success: true,
    };
  }, []);

  // ======================================================
  // ADMIN LOGOUT
  // ======================================================

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      // Even if backend logout fails,
      // clear the local session.
      console.warn("Admin logout request failed:", error);
    }

    clearToken();
    setAdmin(null);
    setIsAuthenticated(false);
  }, []);

  // ======================================================
  // CONTEXT
  // ======================================================

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        isRestoring,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ======================================================
// USE AUTH
// ======================================================

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return ctx;
}