// Central place for enums/labels shared across the dashboard.
// Keeping these in one file means a backend contract change only needs
// updating here rather than hunting through every page.

export const LEAD_STATUSES = [
  "NEW",
  "PENDING",
  "CONTACTED",
  "IN_PROGRESS",
  "PROCESSING",
  "APPROVED",
  "COMPLETED",
  "REJECTED",
  "CANCELLED",
  "DRAFT",
];

export const STATUS_LABELS = {
  NEW: "New",
  PENDING: "Pending",
  CONTACTED: "Contacted",
  IN_PROGRESS: "In Progress",
  PROCESSING: "Processing",
  APPROVED: "Approved",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",
  DRAFT: "Draft",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  VERIFIED: "Verified",
  UNVERIFIED: "Unverified",
};

// Lead / merchant source values.
// IMPORTANT: "APP_QR" must only be used for leads/merchants that the backend
// explicitly marks as originating from the mobile app's QR flow. This value
// must never be inferred on the frontend — see api/merchantApi.js notes.
export const LEAD_SOURCES = {
  APP: "APP",
  APP_QR: "APP_QR",
  WEBSITE: "WEBSITE",
  AGENT: "AGENT",
  UNKNOWN: "UNKNOWN",
};

export const SOURCE_LABELS = {
  APP: "Mobile App",
  APP_QR: "Mobile App QR",
  WEBSITE: "Website",
  AGENT: "Agent Originated",
  UNKNOWN: "Unknown",
};

export const PAGE_SIZE = 10;

export const SERVICE_TYPES = [
  "Personal Loan",
  "Business Loan",
  "Insurance",
  "Credit Card",
  "Investment",
  "Merchant Onboarding",
  "Other",
];
