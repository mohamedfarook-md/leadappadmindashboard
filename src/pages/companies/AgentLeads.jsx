import { useNavigate, useParams } from "react-router-dom";

export default function AgentLeads() {
  const { id, agentId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="company-details-page">
      <div className="company-details-header">
        <div>
          <button
            type="button"
            className="company-back-btn"
            onClick={() => navigate(`/companies/${id}`)}
          >
            ← Back to Company
          </button>

          <h1>Agent Leads</h1>

          <p>
            View leads assigned to this agent.
          </p>
        </div>
      </div>

      <div className="company-profile-card">
        <div className="company-profile-contact">
          <div>
            <span>Agent ID</span>
            <strong>{agentId}</strong>
          </div>

          <div>
            <span>Total Leads</span>
            <strong>0</strong>
          </div>
        </div>
      </div>

      <div className="company-agents-section">
        <div className="company-agents-section-header">
          <div>
            <h2>Assigned Leads</h2>
            <p>Leads currently assigned to this agent.</p>
          </div>
        </div>

        <div className="company-agents-table-wrapper">
          <table className="company-agents-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Product</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="5">
                  <div
                    style={{
                      padding: "40px 20px",
                      textAlign: "center",
                      color: "#64748b",
                    }}
                  >
                    No leads assigned to this agent.
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}