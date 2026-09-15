import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Loader from "../../components/layout/PageHeader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { fetchAgentById, fetchAgentLeads } from "../../api/agentApi";
import { formatDate, initialsFromName } from "../../utils/formatters";

export default function AgentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAgent = useCallback(async () => {
    setLoading(true);
    setError(null);
    const [{ data, error: err }, leadsRes] = await Promise.all([
      fetchAgentById(id),
      fetchAgentLeads(id, { limit: 10 }),
    ]);
    if (err) {
      setError(err.message);
    } else {
      setAgent(data);
    }
    setLeads(leadsRes.data?.items || leadsRes.data || []);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadAgent();
  }, [loadAgent]);

  if (loading) {
    return <div className="page-loader"><Loader label="Loading agent…" /></div>;
  }

  if (error) {
    return (
      <EmptyState
        title="Could not load agent"
        message={error}
        action={<button type="button" className="btn-primary" onClick={loadAgent}>Retry</button>}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Agent Profile"
        subtitle="Performance and assigned lead activity."
        breadcrumb={<Link to="/agents">← Back to Agents</Link>}
        actions={<button type="button" className="btn-ghost" onClick={() => navigate(-1)}>Back</button>}
      />

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-header">
            <span className="avatar-circle avatar-lg">{initialsFromName(agent?.name)}</span>
            <div>
              <h3>{agent?.name || "Agent"}</h3>
              <p className="profile-sub">{agent?.email || agent?.mobile || "—"}</p>
            </div>
          </div>
          <dl className="profile-detail-list">
            <div><dt>Status</dt><dd><StatusBadge status={agent?.status || "ACTIVE"} /></dd></div>
            <div><dt>Assigned Leads</dt><dd>{agent?.assigned ?? 0}</dd></div>
            <div><dt>Pending</dt><dd>{agent?.pending ?? 0}</dd></div>
            <div><dt>Processing</dt><dd>{agent?.processing ?? 0}</dd></div>
            <div><dt>Completed</dt><dd>{agent?.completed ?? 0}</dd></div>
            <div><dt>Rejected</dt><dd>{agent?.rejected ?? 0}</dd></div>
          </dl>
        </div>

        <div className="profile-card">
          <h4 className="profile-card-title">Recent Assigned Leads</h4>
          {leads.length === 0 ? (
            <EmptyState title="No leads assigned" message="Leads assigned to this agent will appear here." />
          ) : (
            <div className="table-wrapper table-wrapper-compact">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Lead ID</th>
                    <th>Customer</th>
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
                      <td><StatusBadge status={lead.status} /></td>
                      <td>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
