
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader.jsx";
import LeadDetails from "../../components/enquiries/LeadDetails.jsx";
import AssignAgentModal from "../../components/enquiries/AssignAgentModal.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import {
  fetchLeadById,
  assignLeadAgent,
} from "../../api/enquiryApi";
import { fetchAgents } from "../../api/agentApi";

export default function LeadDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [agents, setAgents] = useState([]);
  const [assignOpen, setAssignOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const loadLead = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await fetchLeadById(id);

    if (err) {
      setError(err.message);
    } else {
      const payload = data?.data || data;
      setLead(payload);
    }

    setLoading(false);
  }, [id]);

  useEffect(() => {
    loadLead();
  }, [loadLead]);

  useEffect(() => {
    async function loadAgents() {
      const { data, error: err } = await fetchAgents({
        limit: 200,
      });

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

  async function handleAssignConfirm(agentId) {
    if (!id || !agentId) return;

    setIsSaving(true);

    const { error: err } = await assignLeadAgent(
      id,
      agentId
    );

    setIsSaving(false);

    if (!err) {
      setAssignOpen(false);
      loadLead();
    }
  }

  return (
    <div>
      <PageHeader
        title="Lead Details"
        subtitle="Full history, timeline and notes for this lead."
        breadcrumb={
          <Link to="/leads">
            ← Back to Leads
          </Link>
        }
        actions={
          <button
            type="button"
            className="btn-ghost"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        }
      />

      {loading ? (
        <div className="page-loader">
          <Loader label="Loading lead…" />
        </div>
      ) : error ? (
        <EmptyState
          title="Could not load lead"
          message={error}
          action={
            <button
              type="button"
              className="btn-primary"
              onClick={loadLead}
            >
              Retry
            </button>
          }
        />
      ) : (
        <LeadDetails
          lead={lead}
          onAssignClick={() => setAssignOpen(true)}
        />
      )}

      <AssignAgentModal
        isOpen={assignOpen}
        onClose={() => setAssignOpen(false)}
        agents={agents}
        currentAgentId={
          lead?.agentId ||
          lead?.assignedAgent?._id ||
          lead?.assignedAgent?.id ||
          null
        }
        onConfirm={handleAssignConfirm}
        isSaving={isSaving}
      />
    </div>
  );
}