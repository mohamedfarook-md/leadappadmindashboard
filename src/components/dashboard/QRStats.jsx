import StatCard from "./StatCard.jsx";

const QRIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function QRStats({ summary }) {
  return (
    <section className="dashboard-section">
      <h2 className="section-heading">App QR Overview</h2>
      <div className="stat-grid stat-grid-1">
        <StatCard
          title="App QR Leads"
          value={summary?.appQrLeads}
          supportingText="Mobile app QR merchant leads only"
          icon={QRIcon}
        />
      </div>
      <p className="section-note">
        This figure includes only merchant leads the backend has explicitly marked
        as mobile-app QR originated. Website merchant leads are excluded.
      </p>
    </section>
  );
}
