import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import EmptyState from "../common/EmptyState.jsx";
import { SOURCE_LABELS } from "../../utils/constants";
import { formatDateTime } from "../../utils/formatters";

export default function MerchantDetails({ merchant }) {
  if (!merchant) return null;

  const timeline = merchant.timeline || [];

  return (
    <div className="profile-grid">
      <div className="profile-card">
        <div className="detail-row-header">
          <h3>{merchant.merchantName || "Merchant"}</h3>
          <StatusBadge status={merchant.status} />
        </div>
        <dl className="profile-detail-list">
          <div><dt>Shop Name</dt><dd>{merchant.shopName || "—"}</dd></div>
          <div><dt>Merchant Mobile</dt><dd>{merchant.merchantMobile || "—"}</dd></div>
          <div><dt>Submitted By</dt><dd>
            {merchant.customerId ? (
              <Link to={`/customers/${merchant.customerId}`} className="table-link">
                {merchant.customerName || merchant.customer?.name}
              </Link>
            ) : (merchant.customerName || "—")}
          </dd></div>
          <div><dt>Customer Mobile</dt><dd>{merchant.customerMobile || merchant.customer?.mobile || "—"}</dd></div>
          <div><dt>Source</dt><dd><span className="badge badge-green">{SOURCE_LABELS[merchant.source] || merchant.source}</span></dd></div>
          <div><dt>Assigned Agent</dt><dd>{merchant.agentName || merchant.agent?.name || "Unassigned"}</dd></div>
          <div><dt>Onboarding Step</dt><dd>{merchant.onboardingStep || "—"}</dd></div>
          <div><dt>PAN / KYC Status</dt><dd>
            {merchant.kycStatus ? <StatusBadge status={merchant.kycStatus} /> : "Not available from backend"}
          </dd></div>
          <div><dt>Created</dt><dd>{formatDateTime(merchant.createdAt)}</dd></div>
        </dl>
      </div>

      <div className="profile-card">
        <h4 className="profile-card-title">Onboarding Timeline</h4>
        {timeline.length === 0 ? (
          <EmptyState title="No timeline yet" message="Onboarding progress updates will appear here." />
        ) : (
          <ul className="timeline-list">
            {timeline.map((event, idx) => (
              <li key={idx} className="timeline-item">
                <span className="timeline-dot" />
                <div>
                  <p className="timeline-text">{event.description || event.action}</p>
                  <span className="timeline-time">{formatDateTime(event.timestamp || event.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
