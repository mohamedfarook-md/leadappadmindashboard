export default function CustomerFilters({ filters, onChange, onReset }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters-bar">
      <input
        type="text"
        className="filter-input"
        placeholder="Mobile number"
        value={filters.mobile || ""}
        onChange={(e) => update("mobile", e.target.value)}
      />
      <input
        type="text"
        className="filter-input"
        placeholder="Email"
        value={filters.email || ""}
        onChange={(e) => update("email", e.target.value)}
      />
      <select
        className="filter-select"
        value={filters.status || ""}
        onChange={(e) => update("status", e.target.value)}
      >
        <option value="">Account: All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <select
        className="filter-select"
        value={filters.verification || ""}
        onChange={(e) => update("verification", e.target.value)}
      >
        <option value="">Verification: All</option>
        <option value="verified">Verified</option>
        <option value="unverified">Unverified</option>
      </select>
      <input
        type="date"
        className="filter-input"
        value={filters.from || ""}
        onChange={(e) => update("from", e.target.value)}
      />
      <input
        type="date"
        className="filter-input"
        value={filters.to || ""}
        onChange={(e) => update("to", e.target.value)}
      />
      <button type="button" className="btn-ghost" onClick={onReset}>
        Clear
      </button>
    </div>
  );
}
