import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextValue.js";
import { getMe } from "../lib/api.js";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("auth");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  function saveAuth(data) {
    localStorage.setItem("auth", JSON.stringify(data));
    setAuth(data);
  }

  function logout() {
    localStorage.removeItem("auth");
    setAuth(null);
  }

  useEffect(() => {
    if (auth?.token) {
      getMe()
        .then((userData) => {
          setAuth((prev) => {
            if (!prev) return null;
            const updated = { ...prev, user: { ...prev.user, ...userData } };
            localStorage.setItem("auth", JSON.stringify(updated));
            return updated;
          });
        })
        .catch((err) => {
          // If token is invalid or expired
          if (err.message && (err.message.includes("token") || err.message.includes("required") || err.message.includes("401"))) {
            logout();
          }
        });
    }
  }, [auth?.token]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        user: auth?.user || null,
        token: auth?.token || null,
        isAuthenticated: Boolean(auth?.token),
        saveAuth,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
