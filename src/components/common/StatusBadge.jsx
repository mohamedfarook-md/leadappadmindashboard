import { STATUS_LABELS } from "../../utils/constants";

// Maps each status to a subtle color tone class. Keep these muted —
// this is a corporate fintech UI, not a bright SaaS dashboard.
const TONE_MAP = {
  NEW: "badge-blue",
  PENDING: "badge-amber",
  CONTACTED: "badge-blue",
  IN_PROGRESS: "badge-amber",
  PROCESSING: "badge-amber",
  APPROVED: "badge-green",
  COMPLETED: "badge-green",
  REJECTED: "badge-red",
  CANCELLED: "badge-grey",
  DRAFT: "badge-grey",
  ACTIVE: "badge-green",
  INACTIVE: "badge-grey",
  VERIFIED: "badge-green",
  UNVERIFIED: "badge-amber",
};

export default function StatusBadge({ status }) {
  if (!status) return <span className="badge badge-grey">—</span>;
  const key = String(status).toUpperCase();
  const tone = TONE_MAP[key] || "badge-grey";
  const label = STATUS_LABELS[key] || status;
  return <span className={`badge ${tone}`}>{label}</span>;
}
