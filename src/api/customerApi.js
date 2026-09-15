import api, { request } from "./axios";

// GET /admin/customers
// Supports server-side search/filter/pagination via query params.
// Expected params: { search, mobile, email, status, verification, from, to, page, limit }
// Expected shape: { items: [...], total, page, limit }
// BACKEND REQUIREMENT: pagination + filtering must be handled server-side
// for this to scale; the frontend sends these params as-is.
export function fetchCustomers(params) {
  return request(api.get("/admin/customers", { params }));
}

// GET /admin/customers/:id
// Expected shape: full customer profile including lead history and
// QR merchant history if applicable (Customer 360 view).
export function fetchCustomerById(id) {
  return request(api.get(`/admin/customers/${id}`));
}

// PATCH /admin/customers/:id/status
export function updateCustomerStatus(id, status) {
  return request(api.patch(`/admin/customers/${id}/status`, { status }));
}
