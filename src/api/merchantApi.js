// import api, { request } from "./axios";
// import { LEAD_SOURCES } from "../utils/constants";

// // ---------------------------------------------------------------------------
// // IMPORTANT BUSINESS RULE
// // ---------------------------------------------------------------------------
// // "App QR Leads" must only ever show merchant leads whose source was
// // explicitly reported by the backend as LEAD_SOURCES.APP_QR (mobile-app
// // originated). Website-originated merchants and agent-originated merchants
// // must never appear on this page.
// //
// // This file does NOT infer source on the frontend. It expects the backend
// // to expose a `source` field on every merchant/QR record. If the backend
// // does not yet expose that field reliably, the endpoint below must be
// // extended server-side before this page can be trusted in production —
// // see the "source" query param and the note in QRLeadFilters.
// // ---------------------------------------------------------------------------

// // GET /admin/merchants/qr-leads?source=APP_QR
// // Expected params: { merchant, mobile, customer, status, agentId, from, to, page, limit }
// // The `source` param is always forced to APP_QR by this function so a future
// // bug elsewhere cannot accidentally widen the query to other sources.
// // Expected shape: { items: [...], total, page, limit }
// export function fetchAppQrLeads(params) {
//   return request(
//     api.get("/admin/merchants/qr-leads", {
//       params: { ...params, source: LEAD_SOURCES.APP_QR },
//     })
//   );
// }

// // GET /admin/merchants/:id
// // Expected shape: merchant detail incl. submitting customer, source,
// // assigned agent, onboarding progress, timeline, and PAN/KYC status
// // where the backend supports it.
// export function fetchMerchantById(id) {
//   return request(api.get(`/admin/merchants/${id}`));
// }

// // PATCH /admin/merchants/:id/status
// export function updateMerchantStatus(id, status) {
//   return request(api.patch(`/admin/merchants/${id}/status`, { status }));
// }

// // PATCH /admin/merchants/:id/assign
// export function assignMerchantAgent(id, agentId) {
//   return request(api.patch(`/admin/merchants/${id}/assign`, { agentId }));
// }


























import api, { request, qrApi } from "./axios";

// ---------------------------------------------------------------------------
// App QR Leads
// ---------------------------------------------------------------------------
// App QR Leads are fetched from the existing QR backend.
// The QR backend endpoint itself is responsible for returning only
// customer-created / mobile-app QR leads.
//
// QR Backend:
// https://apimhsteppayshub.in/api
//
// Existing customer/website backend remains unchanged:
// https://api.apisteppays.in/api
// ---------------------------------------------------------------------------

// GET /admin/merchants/qr-leads
export function fetchAppQrLeads(params) {
  return request(
    qrApi.get("/admin/merchants/qr-leads", {
      params,
    })
  );
}

// ---------------------------------------------------------------------------
// Merchant Details
// ---------------------------------------------------------------------------

// GET /admin/merchants/:id
// export function fetchMerchantById(id) {
//   return request(api.get(`/admin/merchants/${id}`));
// }

export function fetchMerchantById(id) {
  return request(
    qrApi.get(`/admin/merchants/${id}/onboarding`)
  );
}

// ---------------------------------------------------------------------------
// Merchant Status
// ---------------------------------------------------------------------------

// PATCH /admin/merchants/:id/status
export function updateMerchantStatus(id, status) {
  return request(
    api.patch(`/admin/merchants/${id}/status`, { status })
  );
}

// ---------------------------------------------------------------------------
// Merchant Agent Assignment
// ---------------------------------------------------------------------------

// PATCH /admin/merchants/:id/assign
export function assignMerchantAgent(id, agentId) {
  return request(
    api.patch(`/admin/merchants/${id}/assign`, { agentId })
  );
}