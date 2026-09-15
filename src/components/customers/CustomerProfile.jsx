// import StatusBadge from "../common/StatusBadge.jsx";
// import EmptyState from "../common/EmptyState.jsx";
// import { formatDate, formatDateTime, initialsFromName } from "../../utils/formatters";
// import { Link } from "react-router-dom";

// export default function CustomerProfile({ customer }) {
//   if (!customer) return null;

//   const leads = customer.leads || [];
//   const qrHistory = customer.qrMerchants || [];

//   return (
//     <div className="profile-grid">
//       <div className="profile-card">
//         <div className="profile-header">
//           <span className="avatar-circle avatar-lg">{initialsFromName(customer.name)}</span>
//           <div>
//             <h3>{customer.name || "Unnamed Customer"}</h3>
//             <p className="profile-sub">{customer.mobile} {customer.email ? `· ${customer.email}` : ""}</p>
//           </div>
//         </div>
//         <dl className="profile-detail-list">
//           <div><dt>Registration Date</dt><dd>{formatDate(customer.registeredAt || customer.createdAt)}</dd></div>
//           <div><dt>Last Login</dt><dd>{formatDateTime(customer.lastLoginAt)}</dd></div>
//           <div><dt>Verification</dt><dd><StatusBadge status={customer.verified ? "VERIFIED" : "UNVERIFIED"} /></dd></div>
//           <div><dt>Account Status</dt><dd><StatusBadge status={customer.active ? "ACTIVE" : "INACTIVE"} /></dd></div>
//           <div><dt>Total Leads</dt><dd>{customer.totalLeads ?? leads.length}</dd></div>
//         </dl>
//       </div>

//       <div className="profile-card">
//         <h4 className="profile-card-title">Lead History &amp; Services Requested</h4>
//         {leads.length === 0 ? (
//           <EmptyState title="No leads yet" message="This customer has not generated any leads." />
//         ) : (
//           <div className="table-wrapper table-wrapper-compact">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Lead ID</th>
//                   <th>Service</th>
//                   <th>Status</th>
//                   <th>Created</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leads.map((lead) => (
//                   <tr key={lead.id || lead.leadId}>
//                     <td>
//                       <Link to={`/leads/${lead.id || lead.leadId}`} className="table-link">
//                         {lead.leadId || lead.id}
//                       </Link>
//                     </td>
//                     <td>{lead.service || "—"}</td>
//                     <td><StatusBadge status={lead.status} /></td>
//                     <td>{formatDate(lead.createdAt)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {qrHistory.length > 0 && (
//         <div className="profile-card">
//           <h4 className="profile-card-title">QR Merchant History</h4>
//           <div className="table-wrapper table-wrapper-compact">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Merchant</th>
//                   <th>Status</th>
//                   <th>Source</th>
//                   <th>Created</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {qrHistory.map((m) => (
//                   <tr key={m.id}>
//                     <td>
//                       <Link to={`/app-qr-leads/${m.id}`} className="table-link">
//                         {m.merchantName || m.shopName || m.id}
//                       </Link>
//                     </td>
//                     <td><StatusBadge status={m.status} /></td>
//                     <td>{m.source || "—"}</td>
//                     <td>{formatDate(m.createdAt)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import StatusBadge from "../common/StatusBadge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import {
  formatDate,
  formatDateTime,
  initialsFromName,
} from "../../utils/formatters";
import { Link } from "react-router-dom";


export default function CustomerProfile({ customer }) {

  if (!customer) {
    return null;
  }


  // ======================================================
  // CUSTOMER DATA
  // ======================================================

  const leads = Array.isArray(customer.leads)
    ? customer.leads
    : [];

  const qrHistory = Array.isArray(customer.qrMerchants)
    ? customer.qrMerchants
    : [];


  // ======================================================
  // UI
  // ======================================================

  return (

    <div className="profile-grid">


      {/* ==================================================
          CUSTOMER PROFILE
      ================================================== */}

      <div className="profile-card">

        <div className="profile-header">

          <span className="avatar-circle avatar-lg">
            {initialsFromName(customer.name)}
          </span>

          <div>

            <h3>
              {customer.name || "Unnamed Customer"}
            </h3>

            <p className="profile-sub">

              {customer.mobile || "—"}

              {customer.email
                ? ` · ${customer.email}`
                : ""}

            </p>

          </div>

        </div>


        <dl className="profile-detail-list">


          {/* Registration */}

          <div>

            <dt>
              Registration Date
            </dt>

            <dd>
              {formatDate(
                customer.createdAt ||
                customer.registeredAt
              )}
            </dd>

          </div>


          {/* Last Login */}

          <div>

            <dt>
              Last Login
            </dt>

            <dd>
              {formatDateTime(
                customer.lastLoginAt
              )}
            </dd>

          </div>


          {/* Verification */}

          <div>

            <dt>
              Verification
            </dt>

            <dd>

              <StatusBadge
                status={
                  customer.isVerified
                    ? "VERIFIED"
                    : "UNVERIFIED"
                }
              />

            </dd>

          </div>


          {/* Account Status */}

          <div>

            <dt>
              Account Status
            </dt>

            <dd>

              <StatusBadge
                status={
                  customer.isActive
                    ? "ACTIVE"
                    : "INACTIVE"
                }
              />

            </dd>

          </div>


          {/* Total Leads */}

          <div>

            <dt>
              Total Leads
            </dt>

            <dd>
              {customer.totalLeads ?? leads.length}
            </dd>

          </div>

        </dl>

      </div>


      {/* ==================================================
          LEAD HISTORY
      ================================================== */}

      <div className="profile-card">

        <h4 className="profile-card-title">
          Lead History &amp; Services Requested
        </h4>


        {leads.length === 0 ? (

          <EmptyState
            title="No leads yet"
            message="This customer has not generated any leads."
          />

        ) : (

          <div className="table-wrapper table-wrapper-compact">

            <table className="data-table">

              <thead>

                <tr>

                  <th>
                    Lead ID
                  </th>

                  <th>
                    Service
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Created
                  </th>

                </tr>

              </thead>


              <tbody>

                {leads.map((lead) => {


                  // Backend Enquiry fields
                  const leadId =
                    lead.enquiryId ||
                    lead.leadId ||
                    lead._id ||
                    lead.id;


                  const leadMongoId =
                    lead._id ||
                    lead.id;


                  const service =
                    lead.serviceType ||
                    lead.service ||
                    "—";


                  return (

                    <tr
                      key={leadMongoId || leadId}
                    >


                      {/* Lead ID */}

                      <td>

                        {leadMongoId ? (

                          <Link
                            to={`/leads/${leadMongoId}`}
                            className="table-link"
                          >
                            {leadId || "View Lead"}
                          </Link>

                        ) : (

                          <span>
                            {leadId || "—"}
                          </span>

                        )}

                      </td>


                      {/* Service */}

                      <td>
                        {service}
                      </td>


                      {/* Status */}

                      <td>

                        <StatusBadge
                          status={
                            lead.status || "NEW"
                          }
                        />

                      </td>


                      {/* Created */}

                      <td>

                        {formatDate(
                          lead.createdAt
                        )}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ==================================================
          QR MERCHANT HISTORY
      ================================================== */}

      {qrHistory.length > 0 && (

        <div className="profile-card">

          <h4 className="profile-card-title">
            QR Merchant History
          </h4>


          <div className="table-wrapper table-wrapper-compact">

            <table className="data-table">

              <thead>

                <tr>

                  <th>
                    Merchant
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Source
                  </th>

                  <th>
                    Created
                  </th>

                </tr>

              </thead>


              <tbody>

                {qrHistory.map((merchant) => {

                  const merchantId =
                    merchant._id ||
                    merchant.id;


                  return (

                    <tr
                      key={merchantId}
                    >

                      <td>

                        {merchantId ? (

                          <Link
                            to={`/app-qr-leads/${merchantId}`}
                            className="table-link"
                          >
                            {
                              merchant.merchantName ||
                              merchant.shopName ||
                              merchantId
                            }
                          </Link>

                        ) : (

                          <span>
                            {merchant.merchantName ||
                              merchant.shopName ||
                              "—"}
                          </span>

                        )}

                      </td>


                      <td>

                        <StatusBadge
                          status={
                            merchant.status ||
                            "DRAFT"
                          }
                        />

                      </td>


                      <td>
                        {merchant.source || "—"}
                      </td>


                      <td>
                        {formatDate(
                          merchant.createdAt
                        )}
                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>

  );
}