import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { fetchAgents } from "../../api/agentApi";
import { PAGE_SIZE } from "../../utils/constants";

export default function Agents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [agents, setAgents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await fetchAgents({ search, page, limit: PAGE_SIZE });
    if (err) {
  setError(err.message);
  setAgents([]);
  setTotal(0);
} else {
  const payload = data?.data || data;

  const agentList = Array.isArray(payload?.items)
    ? payload.items
    : Array.isArray(payload?.agents)
    ? payload.agents
    : Array.isArray(payload)
    ? payload
    : [];

  setAgents(agentList);

  setTotal(
    payload?.total ??
      agentList.length
  );
}
    setLoading(false);
  }, [search, page]);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <PageHeader title="Agents" subtitle="Field and telecalling agents assigned to leads and merchant onboarding." />

      <div className="card-panel">
        <div className="toolbar-row">
          <SearchBar
            value={search}
            onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Search agent by name…"
          />
        </div>

        {loading ? (
          <div className="table-loader"><Loader label="Loading agents…" /></div>
        ) : error ? (
          <EmptyState
            title="Could not load agents"
            message={error}
            action={<button type="button" className="btn-primary" onClick={loadAgents}>Retry</button>}
          />
        ) : agents.length === 0 ? (
          <EmptyState title="No agents found" message="Add agents from your backend to see them here." />
        ) : (
          <>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Email / Mobile</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Pending</th>
                    <th>Processing</th>
                    <th>Completed</th>
                    <th>Rejected</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((a) => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>{a.email || a.mobile || "—"}</td>
                      <td><StatusBadge status={a.status || "ACTIVE"} /></td>
                      <td>{a.assigned ?? 0}</td>
                      <td>{a.pending ?? 0}</td>
                      <td>{a.processing ?? 0}</td>
                      <td>{a.completed ?? 0}</td>
                      <td>{a.rejected ?? 0}</td>
                      <td>
                        <Link to={`/agents/${a.id}`} className="table-action-link">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} totalPages={totalPages} totalItems={total} pageSize={PAGE_SIZE} onPageChange={setPage} />
          </>
        )}
      </div>
    </div>
  );
}
