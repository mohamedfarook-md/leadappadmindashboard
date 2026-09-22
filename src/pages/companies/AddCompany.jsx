import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../api/companyApi";

export default function AddCompany() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    mobile: "",
    status: "active",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    const companyName = form.companyName.trim();
    const email = form.email.trim();
    const mobile = form.mobile.trim();

    if (!companyName) {
      setError("Company name is required.");
      return;
    }

    if (!email) {
      setError("Company email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!mobile) {
      setError("Mobile number is required.");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    setSaving(true);

    const { data, error: err } = await createCompany({
      companyName,
      email,
      mobile,
      status: form.status,
    });

    setSaving(false);

    if (err) {
      setError(
        err.message || "Failed to create company."
      );
      return;
    }

    setSuccess("Company created successfully.");

    setTimeout(() => {
      navigate("/companies");
    }, 700);
  }

  function handleCancel() {
    navigate("/companies");
  }

  return (
    <div className="add-company-page">

      {/* Header */}
      <div className="add-company-header">
        <div>
          <button
            type="button"
            className="add-company-back"
            onClick={handleCancel}
          >
            ← Back to Partners
          </button>

          <h1>Add Company</h1>

          <p>
            Add a new partner company to MH StepPays.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="add-company-card">

        <div className="add-company-card-header">
          <div className="add-company-card-icon">
            🏢
          </div>

          <div>
            <h2>Company Information</h2>
            <p>
              Enter the basic details of your partner
              company.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Error */}
          {error && (
            <div className="add-company-alert error">
              <span>!</span>
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="add-company-alert success">
              <span>✓</span>
              {success}
            </div>
          )}

          <div className="add-company-form-grid">

            {/* Company Name */}
            <div className="add-company-field full">
              <label htmlFor="companyName">
                Company Name
                <span>*</span>
              </label>

              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Enter company name"
                value={form.companyName}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* Email */}
            <div className="add-company-field">
              <label htmlFor="email">
                Company Email
                <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="company@example.com"
                value={form.email}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* Mobile */}
            <div className="add-company-field">
              <label htmlFor="mobile">
                Mobile Number
                <span>*</span>
              </label>

              <input
                id="mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10 digit mobile number"
                value={form.mobile}
                onChange={handleChange}
                disabled={saving}
              />
            </div>

            {/* Status */}
            <div className="add-company-field">
              <label htmlFor="status">
                Status
              </label>

              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                disabled={saving}
              >
                <option value="active">
                  Active
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

          </div>

          {/* Actions */}
          <div className="add-company-actions">

            <button
              type="button"
              className="add-company-cancel"
              onClick={handleCancel}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-company-submit"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="add-company-button-loader" />
                  Creating...
                </>
              ) : (
                <>
                  + Create Company
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}