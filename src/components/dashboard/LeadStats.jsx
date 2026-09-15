import StatCard from "./StatCard.jsx";

const LeadIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h10M4 18h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const NewLeadIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PendingIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    <path d="M12 7v5l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function LeadStats({ summary }) {
  return (
    <section className="dashboard-section">
      <h2 className="section-heading">Lead Overview</h2>
      <div className="stat-grid stat-grid-3">
        <StatCard
          title="Total Leads"
          value={summary?.totalLeads}
          supportingText="All-time generated leads"
          icon={LeadIcon}
        />
        <StatCard
          title="New Leads Today"
          value={summary?.newLeadsToday}
          supportingText="Generated in last 24 hours"
          icon={NewLeadIcon}
        />
        <StatCard
          title="Pending Leads"
          value={summary?.pendingLeads}
          supportingText="Awaiting agent action"
          icon={PendingIcon}
        />
      </div>
    </section>
  );
}
