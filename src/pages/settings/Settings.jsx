import { useAuth } from "../../context/AuthContext.jsx";
import PageHeader from "../../components/layout/PageHeader.jsx";
import { initialsFromName } from "../../utils/formatters";

export default function Settings() {
  const { admin, logout } = useAuth();

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your administrator account." />

      <div className="card-panel settings-panel">
        <div className="profile-header">
          <span className="avatar-circle avatar-lg">{initialsFromName(admin?.name)}</span>
          <div>
            <h3>{admin?.name || "Admin User"}</h3>
            <p className="profile-sub">{admin?.email || admin?.mobile || "—"}</p>
          </div>
        </div>

        <dl className="profile-detail-list">
          <div><dt>Role</dt><dd>{admin?.role || "Administrator"}</dd></div>
          <div><dt>Email</dt><dd>{admin?.email || "—"}</dd></div>
          <div><dt>Mobile</dt><dd>{admin?.mobile || "—"}</dd></div>
        </dl>

        <div className="settings-actions">
          <button type="button" className="btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>

        <p className="section-note">
          Profile editing, password change, and role management require the
          corresponding backend endpoints under /admin/auth/*. This screen is
          wired to reflect data from GET /admin/auth/me and will light up
          further actions once those endpoints are available.
        </p>
      </div>
    </div>
  );
}
