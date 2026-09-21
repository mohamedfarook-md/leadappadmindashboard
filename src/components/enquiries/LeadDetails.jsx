// import StatusBadge from "../common/StatusBadge.jsx";
// import EmptyState from "../common/EmptyState.jsx";
// import { SOURCE_LABELS } from "../../utils/constants";
// import { formatDateTime } from "../../utils/formatters";
// import { Link } from "react-router-dom";

// export default function LeadDetails({ lead, onAssignClick }) {
//   if (!lead) return null;

//   const timeline = lead.timeline || [];

//   return (
//     <div className="profile-grid">
//       <div className="profile-card">
//         <div className="detail-row-header">
//           <h3>Lead {lead.leadId || lead.id}</h3>
//           <StatusBadge status={lead.status} />
//         </div>
//         <dl className="profile-detail-list">
//           <div><dt>Customer</dt><dd>
//             {lead.customerId ? (
//               <Link to={`/customers/${lead.customerId}`} className="table-link">
//                 {lead.customerName || lead.customer?.name}
//               </Link>
//             ) : (lead.customerName || "—")}
//           </dd></div>
//           <div><dt>Mobile</dt><dd>{lead.mobile || lead.customer?.mobile || "—"}</dd></div>
//           <div><dt>Service</dt><dd>{lead.service || "—"}</dd></div>
//           <div><dt>Source</dt><dd>{SOURCE_LABELS[lead.source] || lead.source || "—"}</dd></div>
//           <div><dt>Assigned Agent</dt><dd>
//             {lead.agentName || lead.agent?.name || "Unassigned"}{" "}
//             <button type="button" className="table-action-link" onClick={onAssignClick}>Reassign</button>
//           </dd></div>
//           <div><dt>Created</dt><dd>{formatDateTime(lead.createdAt)}</dd></div>
//           <div><dt>Updated</dt><dd>{formatDateTime(lead.updatedAt)}</dd></div>
//         </dl>
//       </div>

//       <div className="profile-card">
//         <h4 className="profile-card-title">Timeline</h4>
//         {timeline.length === 0 ? (
//           <EmptyState title="No activity yet" message="Status changes and updates will appear here." />
//         ) : (
//           <ul className="timeline-list">
//             {timeline.map((event, idx) => (
//               <li key={idx} className="timeline-item">
//                 <span className="timeline-dot" />
//                 <div>
//                   <p className="timeline-text">{event.description || event.action}</p>
//                   <span className="timeline-time">{formatDateTime(event.timestamp || event.createdAt)}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className="profile-card">
//         <h4 className="profile-card-title">Notes</h4>
//         {(!lead.notes || lead.notes.length === 0) ? (
//           <EmptyState title="No notes" message="Admin and agent notes will appear here." />
//         ) : (
//           <ul className="notes-list">
//             {lead.notes.map((n, idx) => (
//               <li key={idx} className="notes-item">
//                 <p>{n.text || n.note}</p>
//                 <span className="notes-meta">{n.author || "Admin"} · {formatDateTime(n.createdAt)}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }
























// import StatusBadge from "../common/StatusBadge.jsx";
// import EmptyState from "../common/EmptyState.jsx";
// import { SOURCE_LABELS } from "../../utils/constants";
// import { formatDateTime } from "../../utils/formatters";
// import { Link } from "react-router-dom";

// export default function LeadDetails({ lead, onAssignClick }) {
//   if (!lead) return null;

//   const customer = lead.customerId || {};
//   const assignedAgent = lead.assignedAgent || {};
//   const customerDetails = lead.customerDetails || {};
//   const serviceDetails = lead.serviceDetails || {};

//   return (
//     <div className="profile-grid">

//       {/* =====================================================
//           ENQUIRY DETAILS
//       ====================================================== */}
//       <div className="profile-card">
//         <div className="detail-row-header">
//           <h3>
//             Lead {lead.enquiryId || lead._id}
//           </h3>

//           <StatusBadge status={lead.status} />
//         </div>

//         <dl className="profile-detail-list">

//           <div>
//             <dt>Enquiry ID</dt>
//             <dd>{lead.enquiryId || "—"}</dd>
//           </div>

//           <div>
//             <dt>Service Type</dt>
//             <dd>{lead.serviceType || "—"}</dd>
//           </div>

//           <div>
//             <dt>Enquiry Type</dt>
//             <dd>{lead.enquiryType || "—"}</dd>
//           </div>

//           <div>
//             <dt>Status</dt>
//             <dd>
//               <StatusBadge status={lead.status} />
//             </dd>
//           </div>

//           <div>
//             <dt>Source</dt>
//             <dd>
//               {SOURCE_LABELS[lead.source] ||
//                 lead.source ||
//                 "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Created At</dt>
//             <dd>
//               {formatDateTime(lead.createdAt)}
//             </dd>
//           </div>

//           <div>
//             <dt>Updated At</dt>
//             <dd>
//               {formatDateTime(lead.updatedAt)}
//             </dd>
//           </div>

//         </dl>
//       </div>

//       {/* =====================================================
//           CUSTOMER ACCOUNT DETAILS
//       ====================================================== */}
//       <div className="profile-card">
//         <h4 className="profile-card-title">
//           Customer Account
//         </h4>

//         <dl className="profile-detail-list">

//           <div>
//             <dt>Name</dt>
//             <dd>
//               {customer._id ? (
//                 <Link
//                   to={`/customers/${customer._id}`}
//                   className="table-link"
//                 >
//                   {customer.name || "—"}
//                 </Link>
//               ) : (
//                 customer.name || "—"
//               )}
//             </dd>
//           </div>

//           <div>
//             <dt>Mobile</dt>
//             <dd>
//               {customer.mobile || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Email</dt>
//             <dd>
//               {customer.email || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Customer Role</dt>
//             <dd>
//               {customer.role || "—"}
//             </dd>
//           </div>

//         </dl>
//       </div>

//       {/* =====================================================
//           CUSTOMER DETAILS FROM ENQUIRY
//       ====================================================== */}
//       <div className="profile-card">
//         <h4 className="profile-card-title">
//           Customer Details
//         </h4>

//         <dl className="profile-detail-list">

//           <div>
//             <dt>Full Name</dt>
//             <dd>
//               {customerDetails.fullName || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Mobile</dt>
//             <dd>
//               {customerDetails.mobile || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Email</dt>
//             <dd>
//               {customerDetails.email || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Date of Birth</dt>
//             <dd>
//               {customerDetails.dob || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Age</dt>
//             <dd>
//               {customerDetails.age !== null &&
//               customerDetails.age !== undefined
//                 ? customerDetails.age
//                 : "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Gender</dt>
//             <dd>
//               {customerDetails.gender || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>City</dt>
//             <dd>
//               {customerDetails.city || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>State</dt>
//             <dd>
//               {customerDetails.state || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Pincode</dt>
//             <dd>
//               {customerDetails.pincode || "—"}
//             </dd>
//           </div>

//         </dl>
//       </div>

//       {/* =====================================================
//           SERVICE DETAILS
//       ====================================================== */}
//       <div className="profile-card">
//         <h4 className="profile-card-title">
//           Service Details
//         </h4>

//         {Object.keys(serviceDetails).length === 0 ? (
//           <EmptyState
//             title="No service details"
//             message="No additional service details were submitted."
//           />
//         ) : (
//           <dl className="profile-detail-list">

//             {Object.entries(serviceDetails).map(
//               ([key, value]) => (
//                 <div key={key}>
//                   <dt>
//                     {key}
//                   </dt>

//                   <dd>
//                     {value !== null &&
//                     value !== undefined &&
//                     value !== ""
//                       ? typeof value === "object"
//                         ? JSON.stringify(value)
//                         : String(value)
//                       : "—"}
//                   </dd>
//                 </div>
//               )
//             )}

//           </dl>
//         )}
//       </div>

//       {/* =====================================================
//           ASSIGNED AGENT
//       ====================================================== */}
//       <div className="profile-card">
//         <h4 className="profile-card-title">
//           Assigned Agent
//         </h4>

//         <dl className="profile-detail-list">

//           <div>
//             <dt>Name</dt>
//             <dd>
//               {assignedAgent.name || "Unassigned"}
//             </dd>
//           </div>

//           <div>
//             <dt>Mobile</dt>
//             <dd>
//               {assignedAgent.mobile || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Email</dt>
//             <dd>
//               {assignedAgent.email || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Role</dt>
//             <dd>
//               {assignedAgent.role || "—"}
//             </dd>
//           </div>

//           <div>
//             <dt>Action</dt>
//             <dd>
//               <button
//                 type="button"
//                 className="table-action-link"
//                 onClick={onAssignClick}
//               >
//                 {assignedAgent._id
//                   ? "Reassign"
//                   : "Assign Agent"}
//               </button>
//             </dd>
//           </div>

//         </dl>
//       </div>

//       {/* =====================================================
//           ADMIN NOTES
//       ====================================================== */}
//       <div className="profile-card">
//         <h4 className="profile-card-title">
//           Admin Notes
//         </h4>

//         {lead.adminNotes ? (
//           <div className="notes-item">
//             <p>{lead.adminNotes}</p>
//           </div>
//         ) : (
//           <EmptyState
//             title="No admin notes"
//             message="No admin notes have been added to this enquiry."
//           />
//         )}
//       </div>

//       {/* =====================================================
//           RAW MONGODB ENQUIRY DATA
//       ====================================================== */}
//       <div className="profile-card">
//         <h4 className="profile-card-title">
//           Enquiry Data
//         </h4>

//         <pre
//           style={{
//             whiteSpace: "pre-wrap",
//             wordBreak: "break-word",
//             margin: 0,
//             fontSize: "13px",
//             lineHeight: "1.6",
//             overflowX: "auto",
//           }}
//         >
//           {JSON.stringify(lead, null, 2)}
//         </pre>
//       </div>

//     </div>
//   );
// }



















































import StatusBadge from "../common/StatusBadge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { SOURCE_LABELS } from "../../utils/constants";
import { formatDateTime } from "../../utils/formatters";
import { Link } from "react-router-dom";

function formatLabel(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function renderValue(value) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "—";
  }

  if (typeof value === "object") {
    return Object.entries(value).map(([key, val]) => (
      <div key={key} style={{ marginBottom: "6px" }}>
        <strong>{formatLabel(key)}:</strong>{" "}
        {renderValue(val)}
      </div>
    ));
  }

  return String(value);
}

export default function LeadDetails({
  lead,
  onAssignClick,
  onStatusUpdate,
  isStatusSaving,
}) {
  if (!lead) return null;

  const customer = lead.customerId || {};
  const assignedAgent = lead.assignedAgent || {};
  const customerDetails = lead.customerDetails || {};
  const serviceDetails = lead.serviceDetails || {};

  return (
    <div className="profile-grid">

      {/* =====================================================
          ENQUIRY DETAILS
      ====================================================== */}
      <div className="profile-card">
        <div className="detail-row-header">
          <h3>
            Lead {lead.enquiryId || lead._id}
          </h3>

          <StatusBadge status={lead.status} />
        </div>

        <dl className="profile-detail-list">

          <div>
            <dt>Enquiry ID</dt>
            <dd>{lead.enquiryId || "—"}</dd>
          </div>

          <div>
            <dt>Service Type</dt>
            <dd>{lead.serviceType || "—"}</dd>
          </div>

          <div>
            <dt>Enquiry Type</dt>
            <dd>{lead.enquiryType || "—"}</dd>
          </div>

          <div>
  <dt>Status</dt>

  <dd>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <StatusBadge status={lead.status} />

      <select
        value={lead.status || "NEW"}
        onChange={(e) => onStatusUpdate(e.target.value)}
        disabled={isStatusSaving}
        style={{
          padding: "7px 10px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          background: "#fff",
          cursor: isStatusSaving ? "not-allowed" : "pointer",
        }}
      >
        <option value="NEW">New</option>
        <option value="CONTACTED">Contacted</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DOCUMENT_PENDING">
          Document Pending
        </option>
        <option value="SUBMITTED">Submitted</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
        <option value="CLOSED">Closed</option>
      </select>

      {isStatusSaving && (
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          Updating...
        </span>
      )}
    </div>
  </dd>
</div>

          <div>
            <dt>Source</dt>
            <dd>
              {SOURCE_LABELS[lead.source] ||
                lead.source ||
                "—"}
            </dd>
          </div>

          <div>
            <dt>Created At</dt>
            <dd>
              {formatDateTime(lead.createdAt)}
            </dd>
          </div>

          <div>
            <dt>Updated At</dt>
            <dd>
              {formatDateTime(lead.updatedAt)}
            </dd>
          </div>

        </dl>
      </div>

      {/* =====================================================
          CUSTOMER ACCOUNT
      ====================================================== */}
      <div className="profile-card">
        <h4 className="profile-card-title">
          Customer Account
        </h4>

        <dl className="profile-detail-list">

          <div>
            <dt>Name</dt>
            <dd>
              {customer._id ? (
                <Link
                  to={`/customers/${customer._id}`}
                  className="table-link"
                >
                  {customer.name || "—"}
                </Link>
              ) : (
                customer.name || "—"
              )}
            </dd>
          </div>

          <div>
            <dt>Mobile</dt>
            <dd>{customer.mobile || "—"}</dd>
          </div>

          <div>
            <dt>Email</dt>
            <dd>{customer.email || "—"}</dd>
          </div>

          <div>
            <dt>Role</dt>
            <dd>{customer.role || "—"}</dd>
          </div>

        </dl>
      </div>

      {/* =====================================================
          CUSTOMER DETAILS
      ====================================================== */}
      <div className="profile-card">
        <h4 className="profile-card-title">
          Customer Details
        </h4>

        <dl className="profile-detail-list">

          <div>
            <dt>Full Name</dt>
            <dd>{customerDetails.fullName || "—"}</dd>
          </div>

          <div>
            <dt>Mobile</dt>
            <dd>{customerDetails.mobile || "—"}</dd>
          </div>

          <div>
            <dt>Email</dt>
            <dd>{customerDetails.email || "—"}</dd>
          </div>

          <div>
            <dt>Date of Birth</dt>
            <dd>{customerDetails.dob || "—"}</dd>
          </div>

          <div>
            <dt>Age</dt>
            <dd>
              {customerDetails.age !== null &&
              customerDetails.age !== undefined
                ? customerDetails.age
                : "—"}
            </dd>
          </div>

          <div>
            <dt>Gender</dt>
            <dd>{customerDetails.gender || "—"}</dd>
          </div>

          <div>
            <dt>City</dt>
            <dd>{customerDetails.city || "—"}</dd>
          </div>

          <div>
            <dt>State</dt>
            <dd>{customerDetails.state || "—"}</dd>
          </div>

          <div>
            <dt>Pincode</dt>
            <dd>{customerDetails.pincode || "—"}</dd>
          </div>

        </dl>
      </div>

      {/* =====================================================
          SERVICE DETAILS
      ====================================================== */}
      <div className="profile-card">
        <h4 className="profile-card-title">
          Service Details
        </h4>

        {Object.keys(serviceDetails).length === 0 ? (
          <EmptyState
            title="No service details"
            message="No additional service details were submitted."
          />
        ) : (
          <dl className="profile-detail-list">

            {Object.entries(serviceDetails).map(
              ([key, value]) => (
                <div key={key}>
                  <dt>{formatLabel(key)}</dt>
                  <dd>{renderValue(value)}</dd>
                </div>
              )
            )}

          </dl>
        )}
      </div>

      {/* =====================================================
          ASSIGNED AGENT
      ====================================================== */}
      <div className="profile-card">
        <h4 className="profile-card-title">
          Assigned Agent
        </h4>

        <dl className="profile-detail-list">

          <div>
            <dt>Name</dt>
            <dd>
              {assignedAgent.name || "Unassigned"}
            </dd>
          </div>

          <div>
            <dt>Mobile</dt>
            <dd>{assignedAgent.mobile || "—"}</dd>
          </div>

          <div>
            <dt>Email</dt>
            <dd>{assignedAgent.email || "—"}</dd>
          </div>

          <div>
            <dt>Role</dt>
            <dd>{assignedAgent.role || "—"}</dd>
          </div>

          <div>
            <dt>Action</dt>
            <dd>
              <button
                type="button"
                className="table-action-link"
                onClick={onAssignClick}
              >
                {assignedAgent._id
                  ? "Reassign"
                  : "Assign Agent"}
              </button>
            </dd>
          </div>

        </dl>
      </div>

      {/* =====================================================
          ADMIN NOTES
      ====================================================== */}
      <div className="profile-card">
        <h4 className="profile-card-title">
          Admin Notes
        </h4>

        {lead.adminNotes ? (
          <div className="notes-item">
            <p>{lead.adminNotes}</p>
          </div>
        ) : (
          <EmptyState
            title="No admin notes"
            message="No admin notes have been added to this enquiry."
          />
        )}
      </div>

    </div>
  );
}