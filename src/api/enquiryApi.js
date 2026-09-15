import api, { request } from "./axios";

// GET /admin/leads
// Expected params: { leadId, customer, mobile, service, status, source, agentId, from, to, page, limit }
// Expected shape: { items: [...], total, page, limit }
export async function fetchLeads(params = {}) {
  const response = await request(
    api.get("/admin/leads", { params })
  );

  if (response.error) {
    return response;
  }

  const payload = response.data?.data || response.data || {};

  const enquiries = Array.isArray(payload.enquiries)
    ? payload.enquiries
    : [];

  const items = enquiries.map((lead) => ({
    id: lead._id,
    leadId: lead.enquiryId || lead._id,

    customerName:
      lead.customerDetails?.fullName ||
      lead.customerId?.name ||
      "—",

    mobile:
      lead.customerDetails?.mobile ||
      lead.customerId?.mobile ||
      "—",

    email:
      lead.customerDetails?.email ||
      lead.customerId?.email ||
      "—",

    customer: lead.customerId
      ? {
          id: lead.customerId._id,
          name: lead.customerId.name,
          mobile: lead.customerId.mobile,
          email: lead.customerId.email,
        }
      : null,

    service: lead.serviceType || "—",
    enquiryType: lead.enquiryType || "—",
    source: lead.source || "—",
    status: lead.status || "NEW",

    agentId: lead.assignedAgent?._id || null,

    agentName:
      lead.assignedAgent?.name || null,

    agent: lead.assignedAgent
      ? {
          id: lead.assignedAgent._id,
          name: lead.assignedAgent.name,
          mobile: lead.assignedAgent.mobile,
          email: lead.assignedAgent.email,
        }
      : null,

    customerId: lead.customerId?._id || lead.customerId || null,

    createdAt: lead.createdAt,
    updatedAt: lead.updatedAt,

    adminNotes: lead.adminNotes || "",
    customerDetails: lead.customerDetails || {},
    serviceDetails: lead.serviceDetails || {},
  }));

  return {
    ...response,
    data: {
      items,
      total: Number(payload.pagination?.total || 0),
      page: Number(payload.pagination?.page || 1),
      limit: Number(payload.pagination?.limit || 20),
      totalPages: Number(payload.pagination?.totalPages || 1),
    },
  };
}



// GET /admin/leads/export
// Downloads only leads added after the previous export
export async function downloadNewLeadsExcel() {
  try {
    const response = await api.get("/admin/leads/export", {
      responseType: "blob",
    });

    // Create downloadable Excel file
    const blob = new Blob(
      [response.data],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    link.setAttribute(
      "download",
      `MH-StepPays-New-Leads-${date}.xlsx`
    );

    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        "Failed to download Excel file",
    };
  }
}



// GET /admin/leads/:id
// Expected shape: full lead detail incl. timeline, customer info, notes.
export function fetchLeadById(id) {
  return request(api.get(`/admin/leads/${id}`));
}

// PATCH /admin/leads/:id/status
export function updateLeadStatus(id, status) {
  return request(api.patch(`/admin/leads/${id}/status`, { status }));
}

// PATCH /admin/leads/:id/assign
// body: { agentId }
export function assignLeadAgent(id, agentId) {
  return request(api.patch(`/admin/leads/${id}/assign`, { agentId }));
}

// POST /admin/leads/:id/notes
// body: { note }
export function addLeadNote(id, note) {
  return request(api.post(`/admin/leads/${id}/notes`, { note }));
}
