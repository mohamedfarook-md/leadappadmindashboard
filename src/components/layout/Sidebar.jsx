import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="3" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="13" y="11" width="8" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="14" width="8" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    to: "/customers",
    label: "Customers",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20c0-3.6 3.1-6.4 7-6.4s7 2.8 7 6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/leads",
    label: "Lead Management",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/app-qr-leads",
    label: "App QR Leads",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/agents",
    label: "Agents",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M2.8 19c0-2.9 2.4-5 5.2-5s5.2 2.1 5.2 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12.8 19c0-2.9 2.3-5 5.2-5 1 0 1.9.25 2.7.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    to: "/settings",
    label: "Settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M19.4 13.5a1.7 1.7 0 000 -3l1-1.7-1.7-1.7-1.7 1a1.7 1.7 0 01-3-1V5h-2.4v2a1.7 1.7 0 01-3 1l-1.7-1L5.2 8.8l1 1.7a1.7 1.7 0 010 3l-1 1.7 1.7 1.7 1.7-1a1.7 1.7 0 013 1v2h2.4v-2a1.7 1.7 0 013-1l1.7 1 1.7-1.7z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Sidebar({ collapsed, onNavigate }) {
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-brand">
        <img src="/logo.png" alt="MH StepPays" className="sidebar-logo" />
        {!collapsed && (
          <div className="sidebar-brand-text">
            <span className="sidebar-brand-name">MH StepPays</span>
            <span className="sidebar-brand-sub">Admin Portal</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {!collapsed && <span className="sidebar-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <p>MH StepPays Admin</p>
          <span>v1.0.0</span>
        </div>
      )}
    </aside>
  );
}
