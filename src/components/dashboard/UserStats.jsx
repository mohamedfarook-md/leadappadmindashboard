import StatCard from "./StatCard.jsx";

const UserIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    <path d="M4.8 20c0-3.8 3.2-6.8 7.2-6.8s7.2 3 7.2 6.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const VerifiedIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M9 12.5l2 2 4-4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 3l2.2 1.3 2.5-.2 1 2.3 2.1 1.3-.5 2.4 1 2.2-1.9 1.6.2 2.4-2.4.6-1.3 2.1-2.4-.5-2.2 1-1.6-1.9-2.4.2-.6-2.4-2.1-1.3.5-2.4-1-2.2 1.9-1.6-.2-2.4 2.4-.6L9.8 4.3 12 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const ActiveIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 12h4l2 6 4-12 2 6h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NewIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function UserStats({ summary }) {
  return (
    <section className="dashboard-section">
      <h2 className="section-heading">User Overview</h2>
      <div className="stat-grid">
        <StatCard
          title="Total Customers"
          value={summary?.totalCustomers}
          supportingText="Registered via mobile app"
          icon={UserIcon}
        />
        <StatCard
          title="Verified Users"
          value={summary?.verifiedUsers}
          supportingText="KYC / mobile verified"
          icon={VerifiedIcon}
        />
        <StatCard
          title="Active Users"
          value={summary?.activeUsers}
          supportingText="Active in last 30 days"
          icon={ActiveIcon}
        />
        <StatCard
          title="New Users Today"
          value={summary?.newUsersToday}
          supportingText="Registered today"
          icon={NewIcon}
        />
      </div>
    </section>
  );
}
