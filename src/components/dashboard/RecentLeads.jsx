import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { formatDateTime } from "../../utils/formatters";

export default function RecentLeads({ leads }) {
  if (!leads || leads.length === 0) {
    return <EmptyState title="No recent leads" message="New leads will show up here as they come in." />;
  }

  return (
    <div className="table-wrapper table-wrapper-compact">
      <table className="data-table">
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Status</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id || lead.leadId}>
              <td>
                <Link to={`/leads/${lead.id || lead.leadId}`} className="table-link">
                  {lead.leadId || lead.id}
                </Link>
              </td>
              <td>{lead.customerName || lead.customer?.name || "—"}</td>
              <td>{lead.service || "—"}</td>
              <td><StatusBadge status={lead.status} /></td>
              <td>{formatDateTime(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
