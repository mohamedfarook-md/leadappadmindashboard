import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCompanyAgents } from "../../api/companyApi";

export default function AgentProfile() {
  const { id, agentId } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgent();
  }, [id, agentId]);

  async function loadAgent() {
    setLoading(true);

    const { data, error: err } = await fetchCompanyAgents(id);

    if (err) {
      console.error("Failed to load agent:", err);
      setAgent(null);
      setLoading(false);
      return;
    }

    const agentList = Array.isArray(data?.agents)
      ? data.agents
      : Array.isArray(data)
      ? data
      : [];

    const selectedAgent = agentList.find(
      (item) => item._id === agentId
    );

    setAgent(selectedAgent || null);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="company-details-page">
        <div className="company-details-state">
          Loading agent profile...
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="company-details-page">
        <div className="company-details-state">
          <h3>Agent not found</h3>

          <button
            type="button"
            className="company-back-btn"
            onClick={() => navigate(`/companies/${id}`)}
          >
            ← Back to Company
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="company-details-page">

      {/* Header */}
      <div className="company-details-header">

        <div>
          <button
            type="button"
            className="company-back-btn"
            onClick={() => navigate(`/companies/${id}`)}
          >
            ← Back to Company
          </button>

          <h1>Agent Profile</h1>

          <p>
            View agent information and lead activity.
          </p>
        </div>

      </div>

      {/* Agent Profile */}
      <div className="company-profile-card">

        <div className="company-profile-main">

          <div className="company-profile-icon">
            {agent.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div>
            <h2>{agent.name}</h2>

            <span
              className={`company-profile-status ${
                agent.isActive
                  ? "active"
                  : "inactive"
              }`}
            >
              <span className="status-dot" />

              {agent.isActive
                ? "Active"
                : "Inactive"}
            </span>
          </div>

        </div>

        <div className="company-profile-contact">

          <div>
            <span>Email</span>

            <strong>
              {agent.email || "—"}
            </strong>
          </div>

          <div>
            <span>Mobile</span>

            <strong>
              {agent.mobile || "—"}
            </strong>
          </div>

          <div>
            <span>Total Leads</span>

            <strong>
              {agent.totalLeads ?? 0}
            </strong>
          </div>

        </div>

      </div>

    </div>
  );
}