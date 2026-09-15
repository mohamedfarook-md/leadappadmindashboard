import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { SOURCE_LABELS } from "../../utils/constants";
import { formatDate } from "../../utils/formatters";

export default function LeadTable({ leads, onAssign }) {
  if (!leads || leads.length === 0) {
    return <EmptyState title="No leads found" message="Try adjusting your search or filters." />;
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Lead ID</th>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Service</th>
            <th>Source</th>
            <th>Assigned Agent</th>
            <th>Status</th>
            <th>Created</th>
            <th></th>
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
              <td>{lead.mobile || lead.customer?.mobile || "—"}</td>
              <td>{lead.service || "—"}</td>
              <td>{SOURCE_LABELS[lead.source] || lead.source || "—"}</td>
              <td>{lead.agentName || lead.agent?.name || "Unassigned"}</td>
              <td><StatusBadge status={lead.status} /></td>
              <td>{formatDate(lead.createdAt)}</td>
              <td>
                <div className="row-actions">
                  <Link to={`/leads/${lead.id || lead.leadId}`} className="table-action-link">
                    View
                  </Link>
                  <button type="button" className="table-action-link" onClick={() => onAssign?.(lead)}>
                    Assign
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
