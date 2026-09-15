import api, { request } from "./axios";

// GET /admin/dashboard/summary
// Expected shape:
// {
//   totalCustomers, verifiedUsers, activeUsers, newUsersToday,
//   totalLeads, newLeadsToday, pendingLeads, appQrLeads
// }
// BACKEND REQUIREMENT: if this endpoint does not yet exist, it must be added
// to return the KPI numbers above in a single call. Do not fabricate these
// numbers on the frontend.
export function fetchDashboardSummary() {
  return request(api.get("/admin/dashboard/summary"));
}

// GET /admin/dashboard/registration-trend?range=30d
// Expected shape: [{ date: "2026-09-01", count: 12 }, ...]
export function fetchRegistrationTrend(range = "30d") {
  return request(api.get("/admin/dashboard/registration-trend", { params: { range } }));
}

// GET /admin/dashboard/service-distribution
// Expected shape: [{ service: "Personal Loan", count: 34 }, ...]
export function fetchServiceDistribution() {
  return request(api.get("/admin/dashboard/service-distribution"));
}

// GET /admin/dashboard/recent-leads?limit=8
export function fetchRecentLeads(limit = 8) {
  return request(api.get("/admin/dashboard/recent-leads", { params: { limit } }));
}

// GET /admin/dashboard/recent-registrations?limit=8
export function fetchRecentRegistrations(limit = 8) {
  return request(api.get("/admin/dashboard/recent-registrations", { params: { limit } }));
}

// GET /admin/dashboard/agent-performance
// Expected shape: [{ agentId, name, assigned, completed, pending }, ...]
export function fetchAgentPerformanceSummary() {
  return request(api.get("/admin/dashboard/agent-performance"));
}
