// import { LEAD_STATUSES } from "../../utils/constants";

// export default function QRLeadFilters({ filters, onChange, onReset, agents = [] }) {
//   function update(key, value) {
//     onChange({ ...filters, [key]: value });
//   }

//   return (
//     <div className="filters-bar">
//       <input
//         type="text"
//         className="filter-input"
//         placeholder="Merchant name"
//         value={filters.merchant || ""}
//         onChange={(e) => update("merchant", e.target.value)}
//       />
//       <input
//         type="text"
//         className="filter-input"
//         placeholder="Mobile"
//         value={filters.mobile || ""}
//         onChange={(e) => update("mobile", e.target.value)}
//       />
//       <input
//         type="text"
//         className="filter-input"
//         placeholder="App customer"
//         value={filters.customer || ""}
//         onChange={(e) => update("customer", e.target.value)}
//       />
//       <select className="filter-select" value={filters.status || ""} onChange={(e) => update("status", e.target.value)}>
//         <option value="">Status: All</option>
//         {LEAD_STATUSES.map((s) => (
//           <option key={s} value={s}>{s.replace("_", " ")}</option>
//         ))}
//       </select>
//       <select className="filter-select" value={filters.agentId || ""} onChange={(e) => update("agentId", e.target.value)}>
//         <option value="">Agent: All</option>
//         {agents.map((a) => (
//           <option key={a.id} value={a.id}>{a.name}</option>
//         ))}
//       </select>
//       <input type="date" className="filter-input" value={filters.from || ""} onChange={(e) => update("from", e.target.value)} />
//       <input type="date" className="filter-input" value={filters.to || ""} onChange={(e) => update("to", e.target.value)} />
//       <button type="button" className="btn-ghost" onClick={onReset}>Clear</button>
//     </div>
//   );
// }











import { LEAD_STATUSES } from "../../utils/constants";

export default function QRLeadFilters({
  filters,
  onChange,
  onReset,
  agents = [],
}) {
  const agentList = Array.isArray(agents) ? agents : [];

  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="filters-bar">
      <input
        type="text"
        className="filter-input"
        placeholder="Merchant name"
        value={filters.merchant || ""}
        onChange={(e) => update("merchant", e.target.value)}
      />

      <input
        type="text"
        className="filter-input"
        placeholder="Mobile"
        value={filters.mobile || ""}
        onChange={(e) => update("mobile", e.target.value)}
      />

      <input
        type="text"
        className="filter-input"
        placeholder="App customer"
        value={filters.customer || ""}
        onChange={(e) => update("customer", e.target.value)}
      />

      <select
        className="filter-select"
        value={filters.status || ""}
        onChange={(e) => update("status", e.target.value)}
      >
        <option value="">Status: All</option>

        {LEAD_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s.replace("_", " ")}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={filters.agentId || ""}
        onChange={(e) => update("agentId", e.target.value)}
      >
        <option value="">Agent: All</option>

        {agentList.map((a) => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
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

      <button
        type="button"
        className="btn-ghost"
        onClick={onReset}
      >
        Clear
      </button>
    </div>
  );
}