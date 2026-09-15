import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { initialsFromName } from "../../utils/formatters";

export default function Header({ onToggleSidebar }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const adminName = admin?.name || admin?.fullName || "Admin User";
  const adminRole = admin?.role || "Administrator";

  return (
    <header className="app-header">
      <button
        type="button"
        className="header-toggle"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <div className="header-title">
        <span>MH StepPays</span>
        <span className="header-title-divider">/</span>
        <span className="header-title-muted">Admin Dashboard</span>
      </div>

      <div className="header-actions" ref={menuRef}>
        <button
          type="button"
          className="header-profile"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="header-avatar">{initialsFromName(adminName)}</span>
          <span className="header-profile-text">
            <span className="header-profile-name">{adminName}</span>
            <span className="header-profile-role">{adminRole}</span>
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {menuOpen && (
          <div className="header-dropdown">
            <button type="button" onClick={() => navigate("/settings")}>
              Settings
            </button>
            <button type="button" className="header-dropdown-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
