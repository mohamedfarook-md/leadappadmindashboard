// import { Link } from "react-router-dom";
// import StatusBadge from "../common/StatusBadge.jsx";
// import EmptyState from "../common/EmptyState.jsx";
// import { formatDate, formatDateTime, initialsFromName } from "../../utils/formatters";

// export default function CustomerTable({ customers }) {
//   if (!customers || customers.length === 0) {
//     return <EmptyState title="No customers found" message="Try adjusting your search or filters." />;
//   }

//   return (
//     <div className="table-wrapper">
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Customer</th>
//             <th>Mobile</th>
//             <th>Email</th>
//             <th>Registered</th>
//             <th>Verification</th>
//             <th>Account</th>
//             <th>Total Leads</th>
//             <th>Last Login</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((c) => (
//             <tr key={c.id}>
//               <td>
//                 <div className="cell-with-avatar">
//                   <span className="avatar-circle">{initialsFromName(c.name)}</span>
//                   <span>{c.name || "—"}</span>
//                 </div>
//               </td>
//               <td>{c.mobile || "—"}</td>
//               <td>{c.email || "—"}</td>
//               <td>{formatDate(c.registeredAt || c.createdAt)}</td>
//               <td><StatusBadge status={c.verified ? "VERIFIED" : "UNVERIFIED"} /></td>
//               <td><StatusBadge status={c.active ? "ACTIVE" : "INACTIVE"} /></td>
//               <td>{c.totalLeads ?? 0}</td>
//               <td>{formatDateTime(c.lastLoginAt)}</td>
//               <td>
//                 <Link to={`/customers/${c.id}`} className="table-action-link">
//                   View
//                 </Link>
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

import {
  formatDate,
  formatDateTime,
  initialsFromName,
} from "../../utils/formatters";


export default function CustomerTable({ customers }) {

  if (!Array.isArray(customers) || customers.length === 0) {
    return (
      <EmptyState
        title="No customers found"
        message="Try adjusting your search or filters."
      />
    );
  }


  return (
    <div className="table-wrapper">

      <table className="data-table">

        <thead>
          <tr>
            <th>Customer</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Registered</th>
            <th>Verification</th>
            <th>Account</th>
            <th>Total Leads</th>
            <th>Last Login</th>
            <th></th>
          </tr>
        </thead>


        <tbody>

          {customers.map((customer) => {

            const customerId =
              customer._id ||
              customer.id;


            return (
              <tr
                key={customerId}
              >

                {/* Customer */}

                <td>

                  <div className="cell-with-avatar">

                    <span className="avatar-circle">
                      {initialsFromName(
                        customer.name
                      )}
                    </span>

                    <span>
                      {customer.name || "—"}
                    </span>

                  </div>

                </td>


                {/* Mobile */}

                <td>
                  {customer.mobile || "—"}
                </td>


                {/* Email */}

                <td>
                  {customer.email || "—"}
                </td>


                {/* Registered */}

                <td>
                  {formatDate(
                    customer.createdAt ||
                    customer.registeredAt
                  )}
                </td>


                {/* Verification */}

                <td>

                  <StatusBadge
                    status={
                      customer.isVerified
                        ? "VERIFIED"
                        : "UNVERIFIED"
                    }
                  />

                </td>


                {/* Account */}

                <td>

                  <StatusBadge
                    status={
                      customer.isActive
                        ? "ACTIVE"
                        : "INACTIVE"
                    }
                  />

                </td>


                {/* Total Leads */}

                <td>
                  {customer.totalLeads ?? 0}
                </td>


                {/* Last Login */}

                <td>
                  {formatDateTime(
                    customer.lastLoginAt
                  )}
                </td>


                {/* View */}

                <td>

                  {customerId ? (

                    <Link
                      to={`/customers/${customerId}`}
                      className="table-action-link"
                    >
                      View
                    </Link>

                  ) : (

                    <span className="text-muted">
                      —
                    </span>

                  )}

                </td>

              </tr>
            );

          })}

        </tbody>

      </table>

    </div>
  );
}