import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCompanies } from "../../api/companyApi";

export default function Companies() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    setLoading(true);
    setError("");

    const { data, error: err } = await fetchCompanies();

    if (err) {
      setError(err.message || "Failed to load companies.");
      setCompanies([]);
      setLoading(false);
      return;
    }

    const payload = data?.data || data;

    const companyList = Array.isArray(payload?.companies)
      ? payload.companies
      : Array.isArray(payload)
      ? payload
      : [];

    setCompanies(companyList);
    setLoading(false);
  }

  function handleCompanyClick(company) {
    navigate(`/companies/${company._id}`);
  }

  function handleAddCompany() {
    navigate("/companies/add");
  }

  return (
    <div className="companies-page">

      {/* Header */}
      <div className="companies-header">
        <div>
          <h1>Partners</h1>
          <p>
            Manage your partner companies and their agents.
          </p>
        </div>

        <button
          type="button"
          className="companies-add-btn"
          onClick={handleAddCompany}
        >
          <span>+</span>
          Add Company
        </button>
      </div>

      {/* Stats */}
      <div className="companies-stats">
        <div className="companies-stat-card">
          <div className="companies-stat-icon">
            🏢
          </div>

          <div>
            <span>Total Companies</span>
            <strong>{companies.length}</strong>
          </div>
        </div>

        <div className="companies-stat-card">
          <div className="companies-stat-icon">
            ✓
          </div>

          <div>
            <span>Active Companies</span>
            <strong>
              {
                companies.filter(
                  (company) =>
                    company.status === "active"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="companies-stat-card">
          <div className="companies-stat-icon">
            ○
          </div>

          <div>
            <span>Inactive Companies</span>
            <strong>
              {
                companies.filter(
                  (company) =>
                    company.status === "inactive"
                ).length
              }
            </strong>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="companies-card">

        <div className="companies-card-header">
          <div>
            <h2>Partner Companies</h2>
            <p>
              Companies registered with MH StepPays
            </p>
          </div>

          <span className="companies-count">
            {companies.length} companies
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="companies-state">
            <div className="companies-loader" />
            <p>Loading companies...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="companies-state companies-error">
            <div className="companies-state-icon">!</div>

            <h3>Unable to load companies</h3>

            <p>{error}</p>

            <button
              type="button"
              onClick={loadCompanies}
              className="companies-retry-btn"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          companies.length === 0 && (
            <div className="companies-state">

              <div className="companies-empty-icon">
                🏢
              </div>

              <h3>No companies found</h3>

              <p>
                Add your first partner company to get
                started.
              </p>

              <button
                type="button"
                className="companies-empty-btn"
                onClick={handleAddCompany}
              >
                + Add Company
              </button>

            </div>
          )}

        {/* Companies Table */}
        {!loading &&
          !error &&
          companies.length > 0 && (
            <div className="companies-table-wrapper">

              <table className="companies-table">

                <thead>
                  <tr>
                    <th>COMPANY</th>
                    <th>EMAIL</th>
                    <th>MOBILE</th>
                    <th>STATUS</th>
                    <th>CREATED</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {companies.map((company) => (
                    <tr
                      key={company._id}
                      onClick={() =>
                        handleCompanyClick(company)
                      }
                      className="company-row"
                    >

                      {/* Company */}
                      <td>
                        <div className="company-info">

                          <div className="company-avatar">
                            {company.companyName
                              ?.charAt(0)
                              ?.toUpperCase() || "C"}
                          </div>

                          <div>
                            <strong>
                              {company.companyName ||
                                "Unnamed Company"}
                            </strong>

                            <span>
                              Partner Company
                            </span>
                          </div>

                        </div>
                      </td>

                      {/* Email */}
                      <td>
                        <span className="company-email">
                          {company.email || "—"}
                        </span>
                      </td>

                      {/* Mobile */}
                      <td>
                        {company.mobile || "—"}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          className={`company-status ${
                            company.status === "active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <span className="status-dot" />
                          {company.status === "active"
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      {/* Created */}
                      <td>
                        {company.createdAt
                          ? new Date(
                              company.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "—"}
                      </td>

                      {/* Arrow */}
                      <td>
                        <span className="company-arrow">
                          →
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>

            </div>
          )}

      </div>
    </div>
  );
}