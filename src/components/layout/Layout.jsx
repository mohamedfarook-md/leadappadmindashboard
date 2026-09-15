import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-shell">
      <div className={`sidebar-wrapper ${mobileOpen ? "mobile-open" : ""}`}>
        <Sidebar collapsed={collapsed} onNavigate={() => setMobileOpen(false)} />
      </div>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      <div className="app-main">
        <Header
          onToggleSidebar={() => {
            if (window.innerWidth <= 1024) {
              setMobileOpen((v) => !v);
            } else {
              setCollapsed((v) => !v);
            }
          }}
        />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
