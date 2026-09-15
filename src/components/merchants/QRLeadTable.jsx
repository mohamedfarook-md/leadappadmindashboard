// import { Link } from "react-router-dom";
// import StatusBadge from "../common/StatusBadge.jsx";
// import EmptyState from "../common/EmptyState.jsx";
// import { SOURCE_LABELS } from "../../utils/constants";
// import { formatDate } from "../../utils/formatters";

// export default function QRLeadTable({ merchants }) {
//   if (!merchants || merchants.length === 0) {
//     return <EmptyState title="No App QR leads found" message="Mobile app QR merchant leads will appear here." />;
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Merchant Name</th>
//             <th>Shop Name</th>
//             <th>Merchant Mobile</th>
//             <th>App Customer</th>
//             <th>Customer Mobile</th>
//             <th>Source</th>
//             <th>Assigned Agent</th>
//             <th>Status</th>
//             <th>Onboarding Step</th>
//             <th>Created</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {merchants.map((m) => (
//             <tr key={m.id}>
//               <td>{m.merchantName || "—"}</td>
//               <td>{m.shopName || "—"}</td>
//               <td>{m.merchantMobile || "—"}</td>
//               <td>{m.customerName || m.customer?.name || "—"}</td>
//               <td>{m.customerMobile || m.customer?.mobile || "—"}</td>
//               <td>
//                 <span className="badge badge-green">{SOURCE_LABELS[m.source] || m.source || "App QR"}</span>
//               </td>
//               <td>{m.agentName || m.agent?.name || "Unassigned"}</td>
//               <td><StatusBadge status={m.status} /></td>
//               <td>{m.onboardingStep || "—"}</td>
//               <td>{formatDate(m.createdAt)}</td>
//               <td>
//                 <Link to={`/app-qr-leads/${m.id}`} className="table-action-link">View</Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }













































import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { formatDate } from "../../utils/formatters";

export default function QRLeadTable({ merchants }) {
  if (!merchants || merchants.length === 0) {
    return (
      <EmptyState
        title="No App QR leads found"
        message="Mobile app QR merchant leads will appear here."
      />
    );
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Merchant Name</th>
            <th>Shop Name</th>
            <th>Merchant Mobile</th>
            <th>App Customer</th>
            <th>Customer Mobile</th>
            <th>Source</th>
            <th>Assigned Agent</th>
            <th>Status</th>
            <th>Onboarding Step</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {merchants.map((m) => (
            <tr key={m._id}>
              <td>{m.merchantName || "—"}</td>

              <td>{m.shopName || "—"}</td>

              <td>{m.mobile || "—"}</td>

              <td>{m.customerId?.name || "—"}</td>

              <td>{m.customerId?.mobile || "—"}</td>

              <td>
                <span className="badge badge-green">
                  App QR
                </span>
              </td>

              <td>
                {m.assignedAgent?.fullName ||
                  m.assignedAgent?.name ||
                  "Unassigned"}
              </td>

              <td>
                <StatusBadge status={m.status} />
              </td>

              <td>{m.onboardingStep || "—"}</td>

              <td>{formatDate(m.createdAt)}</td>

              <td>
                <Link
                  to={`/app-qr-leads/${m._id}`}
                  className="table-action-link"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}