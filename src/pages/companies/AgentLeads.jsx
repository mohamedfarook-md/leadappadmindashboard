
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchLeads, assignLeadAgent } from "../../api/enquiryApi";



//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [showAssignLeads, setShowAssignLeads] = useState(false);
// const [availableLeads, setAvailableLeads] = useState([]);
//   const loadAgentLeads = async () => {
//     setLoading(true);
//     setError("");

//     const result = await fetchLeads({
//       agentId,
//       page: 1,
//       limit: 100,
//     });

//     if (result?.error) {
//       setError("Failed to load assigned leads.");
//       setLoading(false);
//       return;
//     }

//     setLeads(result?.data?.items || []);
//     setLoading(false);
//   };

  
// const loadAvailableLeads = async () => {
//   const result = await fetchLeads({
//     page: 1,
//     limit: 100,
//   });

//   if (result?.error) {
//     setError("Failed to load available leads.");
//     return;
//   }

//   const allLeads = result?.data?.items || [];

//   setAvailableLeads(
//     allLeads.filter((lead) => !lead.agentId)
//   );

//   setShowAssignLeads(true);
// };



//   useEffect(() => {
//     if (agentId) {
//       loadAgentLeads();
//     }
//   }, [agentId]);



// export default function AgentLeads() {
//   const { id, agentId } = useParams();
//   const navigate = useNavigate();

//   return (
//     <div className="company-details-page">
//       <div className="company-details-header">
//         <div>
//           <button
//             type="button"
//             className="company-back-btn"
//             onClick={() => navigate(`/companies/${id}`)}
//           >
//             ← Back to Company
//           </button>

//           <h1>Agent Leads</h1>

//           <p>
//             View leads assigned to this agent.
//           </p>
//         </div>
//       </div>

//       <div className="company-profile-card">
//         <div className="company-profile-contact">
//           <div>
//             <span>Agent ID</span>
//             <strong>{agentId}</strong>
//           </div>

//           <div>
//             <span>Total Leads</span>
//             <strong>0</strong>
//           </div>
//         </div>
//       </div>

//       <div className="company-agents-section">
       
// <div className="company-agents-section-header">
//   <div>
//     <h2>Assigned Leads</h2>
//     <p>Leads currently assigned to this agent.</p>
//   </div>

//   <button
//     type="button"
//     className="company-back-btn"
//     onClick={loadAvailableLeads}
//   >
//     + Assign Leads
//   </button>
// </div>

// {showAssignLeads && (
//   <div className="company-profile-card" style={{ marginBottom: 16 }}>
//     <div className="company-agents-section-header">
//       <div>
//         <h2>Available Leads</h2>
//         <p>Select a lead to assign to this agent.</p>
//       </div>

//       <button
//         type="button"
//         className="company-back-btn"
//         onClick={() => setShowAssignLeads(false)}
//       >
//         Close
//       </button>
//     </div>

//     {availableLeads.length === 0 ? (
//       <p>No unassigned leads available.</p>
//     ) : (
//       availableLeads.map((lead) => (
//         <div
//           key={lead.id}
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 12,
//             padding: "12px 0",
//             borderBottom: "1px solid #e2e8f0",
//           }}
//         >
//           <div>
//             <strong>{lead.customerName}</strong>
//             <div>{lead.mobile} · {lead.service}</div>
//             <small>Status: {lead.status}</small>
//           </div>

//           <button
//             type="button"
//             className="company-back-btn"
//             onClick={async () => {
//               const result = await assignLeadAgent(lead.id, agentId);

//               if (result?.error) {
//                 setError("Could not assign this lead. Please refresh and try again.");
//                 return;
//               }

//               setShowAssignLeads(false);
//               await loadAgentLeads();
//               await loadAvailableLeads();
//             }}
//           >
//             Assign
//           </button>
//         </div>
//       ))
//     )}
//   </div>
// )}


//         <div className="company-agents-table-wrapper">
//           <table className="company-agents-table">
//             <thead>
//               <tr>
//                 <th>Customer</th>
//                 <th>Mobile</th>
//                 <th>Product</th>
//                 <th>Status</th>
//                 <th>Created</th>
//               </tr>
//             </thead>

            
// <tbody>
//   {loading ? (
//     <tr>
//       <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
//         Loading leads...
//       </td>
//     </tr>
//   ) : error ? (
//     <tr>
//       <td colSpan="5" style={{ textAlign: "center", padding: "30px", color: "red" }}>
//         {error}
//       </td>
//     </tr>
//   ) : leads.length === 0 ? (
//     <tr>
//       <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
//         No leads assigned to this agent.
//       </td>
//     </tr>
//   ) : (
//     leads.map((lead) => (
//       <tr key={lead.id}>
//         <td>{lead.customerName}</td>
//         <td>{lead.mobile}</td>
//         <td>{lead.service}</td>
//         <td>{lead.status}</td>
//         <td>
//           {lead.createdAt
//             ? new Date(lead.createdAt).toLocaleDateString("en-IN")
//             : "—"}
//         </td>
//       </tr>
//     ))
//   )}
// </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }













import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchLeads,
  assignLeadAgent,
  unassignLeadAgent,
} from "../../api/enquiryApi";

export default function AgentLeads() {
  const { id, agentId } = useParams();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAssignLeads, setShowAssignLeads] = useState(false);
  const [availableLeads, setAvailableLeads] = useState([]);
  const [assigningId, setAssigningId] = useState("");

  
const [unassigningId, setUnassigningId] = useState("");

const handleUnassignLead = async (leadId) => {
  const confirmed = window.confirm(
    "Are you sure you want to unassign this lead?"
  );

  if (!confirmed) return;

  setUnassigningId(leadId);
  setError("");

  try {
    const result = await unassignLeadAgent(leadId);

    if (result?.error) {
      setError("Could not unassign lead. Please try again.");
      return;
    }

    await loadAgentLeads();
  } catch {
    setError("Could not unassign lead. Please try again.");
  } finally {
    setUnassigningId("");
  }
};


  const loadAgentLeads = async () => {
    setLoading(true);
    setError("");

    const result = await fetchLeads({
      agentId,
      page: 1,
      limit: 100,
    });

    if (result?.error) {
      setError("Failed to load assigned leads.");
      setLoading(false);
      return;
    }

    setLeads(result?.data?.items || []);
    setLoading(false);
  };

  const loadAvailableLeads = async () => {
    setError("");

    const result = await fetchLeads({
      page: 1,
      limit: 100,
    });

    if (result?.error) {
      setError("Failed to load available leads.");
      return;
    }

    const allLeads = result?.data?.items || [];

    setAvailableLeads(allLeads.filter((lead) => !lead.agentId));
    setShowAssignLeads(true);
  };

  const handleAssignLead = async (leadId) => {
    setAssigningId(leadId);
    setError("");

    try {
      const result = await assignLeadAgent(leadId, agentId);

      if (result?.error) {
        setError("Could not assign lead. Please refresh and try again.");
        return;
      }

     await loadAgentLeads();

const refreshResult = await fetchLeads({
  page: 1,
  limit: 100,
});

if (!refreshResult?.error) {
  const allLeads = refreshResult?.data?.items || [];

  setAvailableLeads(
    allLeads.filter((lead) => !lead.agentId)
  );
}

setShowAssignLeads(true);
    } catch {
      setError("Could not assign lead. Please try again.");
    } finally {
      setAssigningId("");
    }
  };

  useEffect(() => {
    if (agentId) {
      loadAgentLeads();
    }
  }, [agentId]);

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
          <p>View leads assigned to this agent.</p>
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
            <strong>{leads.length}</strong>
          </div>
        </div>
      </div>

      <div className="company-agents-section">
        <div className="company-agents-section-header">
          <div>
            <h2>Assigned Leads</h2>
            <p>Leads currently assigned to this agent.</p>
          </div>

          <button
            type="button"
            className="company-back-btn"
            onClick={loadAvailableLeads}
          >
            + Assign Leads
          </button>
        </div>

        {error && (
          <p style={{ color: "#dc2626", padding: "8px 0" }}>{error}</p>
        )}

        {showAssignLeads && (
          <div className="company-profile-card" style={{ marginBottom: 16 }}>
            <div className="company-agents-section-header">
              <div>
                <h2>Available Leads</h2>
                <p>Select an unassigned lead.</p>
              </div>

              <button
                type="button"
                className="company-back-btn"
                onClick={() => setShowAssignLeads(false)}
              >
                Close
              </button>
            </div>

            {availableLeads.length === 0 ? (
              <p>No unassigned leads available in the loaded results.</p>
            ) : (
              availableLeads.map((lead) => (
                <div
                  key={lead.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div>
                    <strong>{lead.customerName}</strong>
                    <div>{lead.mobile} · {lead.service}</div>
                    <small>Status: {lead.status}</small>
                  </div>

                  <button
                    type="button"
                    className="company-back-btn"
                    disabled={assigningId === lead.id}
                    onClick={() => handleAssignLead(lead.id)}
                  >
                    {assigningId === lead.id ? "Assigning..." : "Assign"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        <div className="company-agents-table-wrapper">
          <table className="company-agents-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Mobile</th>
                <th>Product</th>
                <th>Status</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 30 }}>
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 30 }}>
                    No leads assigned to this agent.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.customerName}</td>
                    <td>{lead.mobile}</td>
                    <td>{lead.service}</td>
                    <td>{lead.status}</td>
                    <td>
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    
<td>
  <button
    type="button"
    className="company-back-btn"
    disabled={unassigningId === lead.id}
    onClick={() => handleUnassignLead(lead.id)}
  >
    {unassigningId === lead.id ? "Unassigning..." : "Unassign"}
  </button>
</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
