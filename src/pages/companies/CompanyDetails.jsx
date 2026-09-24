import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchCompanyById,
  fetchCompanyAgents,
  updateCompany,
} from "../../api/companyApi";

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
  loadCompany();
  loadAgents();
}, [id]);

  async function loadCompany() {
    setLoading(true);
    setError("");

    const { data, error: err } = await fetchCompanyById(id);

    if (err) {
      setError(err.message || "Failed to load company.");
      setLoading(false);
      return;
    }

    setCompany(data);
    setLoading(false);
  }


  async function loadAgents() {
  if (!id) return;

  setAgentsLoading(true);

  const { data, error: err } = await fetchCompanyAgents(id);

  if (err) {
    console.error("Failed to load company agents:", err);
    setAgents([]);
    setAgentsLoading(false);
    return;
  }

  const agentList = Array.isArray(data?.agents)
    ? data.agents
    : Array.isArray(data)
    ? data
    : [];

  setAgents(agentList);
  setAgentsLoading(false);
}
  

  
  if (loading) {
    return (
      <div className="company-details-page">
        <div className="company-details-state">
          Loading company details...
        </div>
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="company-details-page">
        <div className="company-details-state">
          <h3>Company not found</h3>
          <p>{error || "Unable to load company details."}</p>

          <button
            type="button"
            onClick={() => navigate("/companies")}
          >
            ← Back to Partners
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
            onClick={() => navigate("/companies")}
          >
            ← Back to Partners
          </button>

          <h1>Company Details</h1>

          <p>
            View company information and manage agents.
          </p>
        </div>

      <button
  type="button"
  className="company-edit-btn"
  onClick={() => setIsEditing(true)}
>
  Edit Company
</button>
      </div>

{isEditing && (
  <div className="company-profile-card">
    <div className="company-profile-contact">

      <div>
        <span>Company Name</span>
        <input
          type="text"
          value={company.companyName || ""}
          onChange={(e) =>
            setCompany({
              ...company,
              companyName: e.target.value,
            })
          }
        />
      </div>

      <div>
        <span>Email</span>
        <input
          type="email"
          value={company.email || ""}
          onChange={(e) =>
            setCompany({
              ...company,
              email: e.target.value,
            })
          }
        />
      </div>

      <div>
        <span>Mobile</span>
        <input
          type="text"
          value={company.mobile || ""}
          onChange={(e) =>
            setCompany({
              ...company,
              mobile: e.target.value,
            })
          }
        />
      </div>

      <div>
        <span>Status</span>
        <select
          value={company.status || "active"}
          onChange={(e) =>
            setCompany({
              ...company,
              status: e.target.value,
            })
          }
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

    </div>

    <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
      <button
        type="button"
        className="company-edit-btn"
        onClick={() => setIsEditing(false)}
      >
        Cancel
      </button>

      <button
  type="button"
  className="add-agent-btn"
  onClick={async () => {
    const { data, error: err } = await updateCompany(id, {
      companyName: company.companyName,
      email: company.email,
      mobile: company.mobile,
      status: company.status,
    });

    if (err) {
      alert(err.message || "Failed to update company.");
      return;
    }

    setCompany(data);
    setIsEditing(false);
    alert("Company updated successfully.");
  }}
>
  Save Changes
</button>
    </div>
  </div>
)}
      {/* Company Information */}
      <div className="company-profile-card">

        <div className="company-profile-main">

          <div className="company-profile-icon">
            🏢
          </div>

          <div>
            <h2>{company.companyName}</h2>

            <span
              className={`company-profile-status ${
                company.status === "active"
                  ? "active"
                  : "inactive"
              }`}
            >
              <span className="status-dot" />
              {company.status === "active"
                ? "Active"
                : "Inactive"}
            </span>
          </div>

        </div>

        <div className="company-profile-contact">

          <div>
            <span>Email</span>
            <strong>{company.email || "—"}</strong>
          </div>

          <div>
            <span>Mobile</span>
            <strong>{company.mobile || "—"}</strong>
          </div>

          <div>
            <span>Created On</span>
            <strong>
              {company.createdAt
                ? new Date(
                    company.createdAt
                  ).toLocaleDateString("en-IN")
                : "—"}
            </strong>
          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="company-details-stats">

        <div className="company-details-stat">
          <span>👥</span>
          <div>
            <strong>{agents.length}</strong>
<small>Total Agents</small>
          </div>
        </div>

        <div className="company-details-stat">
          <span>📊</span>
          <div>
            <strong>0</strong>
            <small>Total Leads</small>
          </div>
        </div>

        <div className="company-details-stat">
  <span>✓</span>
  <div>
    <strong>
      {agents.filter((agent) => agent.isActive).length}
    </strong>
    <small>Active Agents</small>
  </div>
</div>

      </div>

      {/* Agents */}
      <div className="company-agents-card">

        <div className="company-agents-header">

          <div>
            <h2>Agents</h2>
            <p>
              Manage agents under this company.
            </p>
          </div>

       <button
  type="button"
  className="add-agent-btn"
  onClick={() => navigate(`/companies/${id}/agents/add`)}
>
  + Add Agent
</button>

        </div>

        {agentsLoading ? (
  <div className="company-agents-empty">
    <div className="company-agents-empty-icon">⏳</div>
    <h3>Loading agents...</h3>
    <p>Please wait while we load the agents.</p>
  </div>
) : agents.length === 0 ? (
  <div className="company-agents-empty">
    <div className="company-agents-empty-icon">👥</div>
    <h3>No agents added yet</h3>
    <p>
      Add agents to this company to start assigning leads.
    </p>

   <button
  type="button"
  className="add-agent-empty-btn"
  onClick={() => navigate(`/companies/${id}/agents/add`)}
>
  + Add Agent
</button>
  </div>
) : (
  <div className="company-agents-table-wrapper">
  <table className="company-agents-table">
    <thead>
      <tr>
        <th>Agent Name</th>
        <th>Total Leads</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {agents.map((agent) => (
        <tr key={agent._id}>

          {/* Agent Name */}
          <td>
            <div className="company-agent-table-name">
              <div className="company-agent-avatar">
                {agent.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              <strong>
                {agent.name || "Unnamed Agent"}
              </strong>
            </div>
          </td>

          {/* Total Leads */}
          <td>
            <strong>
              {agent.totalLeads ?? 0}
            </strong>
          </td>

          {/* Status */}
          <td>
            <span
              className={`company-agent-status ${
                agent.isActive ? "active" : "inactive"
              }`}
            >
              <span className="status-dot" />

              {agent.isActive
                ? "Active"
                : "Inactive"}
            </span>
          </td>

          {/* Actions */}
          <td>
            <div className="company-agent-actions">

              <button
                type="button"
                className="company-agent-profile-btn"
                onClick={() =>
                  navigate(
                    `/companies/${id}/agents/${agent._id}`
                  )
                }
              >
                View Profile
              </button>

              <button
                type="button"
                className="company-agent-leads-btn"
                onClick={() =>
                  navigate(
                    `/companies/${id}/agents/${agent._id}/leads`
                  )
                }
              >
                View Leads
              </button>

            </div>
          </td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
)}

      </div>

    </div>
  );
}