import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCompanyAgent } from "../../api/companyApi";

export default function AddAgent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSaveAgent() {
    if (!name.trim()) {
      alert("Please enter agent name.");
      return;
    }

    if (!mobile.trim()) {
      alert("Please enter mobile number.");
      return;
    }

    if (!id) {
      alert("Company ID is missing.");
      return;
    }

    setSaving(true);

    const { data, error: err } = await createCompanyAgent(id, {
      name: name.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      isActive: true,
    });

    if (err) {
      alert(err.message || "Failed to create agent.");
      setSaving(false);
      return;
    }

    console.log("Agent created:", data);

    alert("Agent created successfully.");

    navigate(`/companies/${id}`);
  }

  return (
    <div className="add-agent-page">

      {/* Header */}
      <div className="company-details-header">

        <div>
          <button
            type="button"
            className="company-back-btn"
            onClick={() => navigate(`/companies/${id}`)}
          >
            ← Back to Company
          </button>

          <h1>Add Agent</h1>

          <p>
            Add a new agent under this company.
          </p>
        </div>

      </div>

      {/* Add Agent Form */}
      <div className="add-agent-form-card">

        <div className="add-agent-form-grid">

          {/* Agent Name */}
          <div className="add-agent-form-group">
            <label>Agent Name</label>

            <input
              type="text"
              placeholder="Enter agent name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={saving}
            />
          </div>

          {/* Email */}
          <div className="add-agent-form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter agent email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={saving}
            />
          </div>

          {/* Mobile */}
          <div className="add-agent-form-group">
            <label>Mobile</label>

            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={saving}
            />
          </div>

        </div>

        {/* Actions */}
        <div className="add-agent-form-actions">

          <button
            type="button"
            className="add-agent-cancel-btn"
            onClick={() => navigate(`/companies/${id}`)}
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="button"
            className="add-agent-save-btn"
            onClick={handleSaveAgent}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Agent"}
          </button>

        </div>

      </div>

    </div>
  );
}