import { useEffect, useState, useCallback } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import QRLeadFilters from "../../components/merchants/QRLeadFilters.jsx";
import QRLeadTable from "../../components/merchants/QRLeadTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { fetchAppQrLeads } from "../../api/merchantApi";
import { fetchAgents } from "../../api/agentApi";
import { PAGE_SIZE } from "../../utils/constants";

export default function AppQRLeads() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [merchants, setMerchants] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agents, setAgents] = useState([]);

  const loadMerchants = useCallback(async () => {
    setLoading(true);
    setError(null);
    // fetchAppQrLeads always forces source=APP_QR — website merchants can
    // never leak into this view regardless of the filters passed in.
    const { data, error: err } = await fetchAppQrLeads({
      merchant: search,
      ...filters,
      page,
      limit: PAGE_SIZE,
    });
    if (err) {
      setError(err.message);
      setMerchants([]);
      setTotal(0);
    }  else {
  const result = data?.data || {};

  setMerchants(result?.items || []);
  setTotal(result?.total || 0);
}
    setLoading(false);
  }, [search, filters, page]);

  useEffect(() => {
    loadMerchants();
  }, [loadMerchants]);

  useEffect(() => {
    async function loadAgents() {
      const { data } = await fetchAgents({ limit: 200 });
      setAgents(data?.items || data || []);
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

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <PageHeader
        title="App QR Leads"
        subtitle="Merchant leads generated exclusively through the mobile app's QR flow."
      />

      <div className="card-panel">
        <div className="toolbar-row">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by merchant name…"
          />
        </div>
        <QRLeadFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => handleFilterChange({})}
          agents={agents}
        />

        {loading ? (
          <div className="table-loader"><Loader label="Loading App QR leads…" /></div>
        ) : error ? (
          <EmptyState
            title="Could not load App QR leads"
            message={error}
            action={<button type="button" className="btn-primary" onClick={loadMerchants}>Retry</button>}
          />
        ) : (
          <>
            <QRLeadTable merchants={merchants} />
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
    </div>
  );
}
