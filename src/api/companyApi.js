import api from "./axios";

function request(promise) {
  return promise
    .then((res) => ({
      data: res.data?.data ?? res.data,
      error: null,
    }))
    .catch((err) => ({
      data: null,
      error: {
        message:
          err.response?.data?.message ||
          err.message ||
          "Something went wrong",
        status: err.response?.status,
      },
    }));
}

// Get all companies
export function fetchCompanies() {
  return request(
    api.get("/admin/companies")
  );
}

// Get company by ID
export function fetchCompanyById(id) {
  return request(
    api.get(`/admin/companies/${id}`)
  );
}

// Create company
export function createCompany(payload) {
  return request(
    api.post("/admin/companies", payload)
  );
}