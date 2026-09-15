import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import MerchantDetails from "../../components/merchants/MerchantDetails.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { fetchMerchantById } from "../../api/merchantApi";

export default function QRMerchantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMerchant = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await fetchMerchantById(id);
    if (err) {
      setError(err.message);
    } else {
      setMerchant(data?.data?.merchant || null);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadMerchant();
  }, [loadMerchant]);

  return (
    <div>
      <PageHeader
        title="QR Merchant Details"
        subtitle="Merchant onboarding progress and source verification."
        breadcrumb={<Link to="/app-qr-leads">← Back to App QR Leads</Link>}
        actions={
          <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>
            Back
          </button>
        }
      />

      {loading ? (
        <div className="page-loader"><Loader label="Loading merchant…" /></div>
      ) : error ? (
        <EmptyState
          title="Could not load merchant"
          message={error}
          action={<button type="button" className="btn-primary" onClick={loadMerchant}>Retry</button>}
        />
      ) : (
        <MerchantDetails merchant={merchant} />
      )}
    </div>
  );
}
