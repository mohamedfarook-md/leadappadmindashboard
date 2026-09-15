import { useEffect, useState, useCallback } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import LeadFilters from "../../components/enquiries/LeadFilters.jsx";
import LeadTable from "../../components/enquiries/LeadTable.jsx";
import AssignAgentModal from "../../components/enquiries/AssignAgentModal.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import {
  fetchLeads,
  assignLeadAgent,
  downloadNewLeadsExcel,
} from "../../api/enquiryApi";
import { fetchAgents } from "../../api/agentApi";
import { PAGE_SIZE } from "../../utils/constants";

export default function Leads() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [leads, setLeads] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [agents, setAgents] = useState([]);
  const [assignTarget, setAssignTarget] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadLeads = useCallback(async () => {
  setLoading(true);
  setError(null);

  const { data, error: err } = await fetchLeads({
    search,
    ...filters,
    page,
    limit: PAGE_SIZE,
  });

  if (err) {
    setError(err.message);
    setLeads([]);
    setTotal(0);
  } else {
    const payload = data?.data || data;

    const items = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.enquiries)
        ? payload.enquiries
        : Array.isArray(payload)
          ? payload
          : [];

    const totalCount = Number(
      payload?.total ??
      payload?.pagination?.total ??
      items.length
    );

    setLeads(items);
    setTotal(totalCount);
  }

  setLoading(false);
}, [search, filters, page]);
  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

useEffect(() => {
  async function loadAgents() {
    const { data, error: err } = await fetchAgents({ limit: 200 });

    if (err) {
      setAgents([]);
      return;
    }

    const payload = data?.data || data;

    if (Array.isArray(payload?.agents)) {
      setAgents(payload.agents);
    } else if (Array.isArray(payload?.items)) {
      setAgents(payload.items);
    } else if (Array.isArray(payload)) {
      setAgents(payload);
    } else {
      setAgents([]);
    }
  }

  loadAgents();
}, []);

  function handleFilterChange(next) {
    setFilters(next);
    setPage(1);
  }

  function handleSearch(value) {
    setSearch(value);
    setPage(1);
  }

  async function handleAssignConfirm(agentId) {
    if (!assignTarget) return;
    setIsSaving(true);
    const leadId = assignTarget.id || assignTarget.leadId;
    const { error: err } = await assignLeadAgent(leadId, agentId);
    setIsSaving(false);
    if (!err) {
      setAssignTarget(null);
      loadLeads();
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
     <PageHeader
  title="Lead Management"
  subtitle="All leads generated across the MH StepPays mobile app."
  actions={
    <button
      type="button"
      className="btn-primary"
      onClick={async () => {
        const result = await downloadNewLeadsExcel();

        if (!result.success) {
          alert(result.error);
        }
      }}
    >
      Download Excel
    </button>
  }
/>

      <div className="card-panel">
        <div className="toolbar-row">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by customer or mobile…"
          />
        </div>
        <LeadFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => handleFilterChange({})}
          agents={agents}
        />

        {loading ? (
          <div className="table-loader"><Loader label="Loading leads…" /></div>
        ) : error ? (
          <EmptyState
            title="Could not load leads"
            message={error}
            action={<button type="button" className="btn-primary" onClick={loadLeads}>Retry</button>}
          />
        ) : (
          <>
            <LeadTable leads={leads} onAssign={setAssignTarget} />
            <Pagination
              page={page}
              totalPages={totalPages}
              totalItems={total}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <AssignAgentModal
        isOpen={Boolean(assignTarget)}
        onClose={() => setAssignTarget(null)}
        agents={agents}
        currentAgentId={assignTarget?.agentId}
        onConfirm={handleAssignConfirm}
        isSaving={isSaving}
      />
    </div>
  );
}
