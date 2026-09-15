import api, { request } from "./axios";

// GET /admin/agents
// Expected shape: { items: [...], total, page, limit }
export function fetchAgents(params) {
  return request(api.get("/admin/agents", { params }));
}

// GET /admin/agents/:id
// Expected shape: agent profile + assigned leads + status distribution
export function fetchAgentById(id) {
  return request(api.get(`/admin/agents/${id}`));
}

// GET /admin/agents/:id/leads
export function fetchAgentLeads(id, params) {
  return request(api.get(`/admin/agents/${id}/leads`, { params }));
}
