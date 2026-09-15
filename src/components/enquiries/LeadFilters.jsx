import { LEAD_STATUSES, SERVICE_TYPES, SOURCE_LABELS } from "../../utils/constants";

export default function LeadFilters({ filters, onChange, onReset, agents = [] }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters-bar">
      <input
        type="text"
        className="filter-input"
        placeholder="Lead ID"
        value={filters.leadId || ""}
        onChange={(e) => update("leadId", e.target.value)}
      />
      <input
        type="text"
        className="filter-input"
        placeholder="Customer / mobile"
        value={filters.customer || ""}
        onChange={(e) => update("customer", e.target.value)}
      />
      <select className="filter-select" value={filters.service || ""} onChange={(e) => update("service", e.target.value)}>
        <option value="">Service: All</option>
        {SERVICE_TYPES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select className="filter-select" value={filters.status || ""} onChange={(e) => update("status", e.target.value)}>
        <option value="">Status: All</option>
        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>{s.replace("_", " ")}</option>
        ))}
      </select>
      <select className="filter-select" value={filters.source || ""} onChange={(e) => update("source", e.target.value)}>
        <option value="">Source: All</option>
        {Object.entries(SOURCE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <select className="filter-select" value={filters.agentId || ""} onChange={(e) => update("agentId", e.target.value)}>
        <option value="">Agent: All</option>
        {agents.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>
      <input type="date" className="filter-input" value={filters.from || ""} onChange={(e) => update("from", e.target.value)} />
      <input type="date" className="filter-input" value={filters.to || ""} onChange={(e) => update("to", e.target.value)} />
      <button type="button" className="btn-ghost" onClick={onReset}>Clear</button>
    </div>
  );
}
