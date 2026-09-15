import { useState, useEffect } from "react";
import Modal from "../common/Modal.jsx";

export default function AssignAgentModal({ isOpen, onClose, agents = [], currentAgentId, onConfirm, isSaving }) {
  const [selectedAgent, setSelectedAgent] = useState(currentAgentId || "");

  useEffect(() => {
    setSelectedAgent(currentAgentId || "");
  }, [currentAgentId, isOpen]);

  return (
    <Modal
      title="Assign Agent"
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
          <button
            type="button"
            className="btn-primary"
            disabled={!selectedAgent || isSaving}
            onClick={() => onConfirm(selectedAgent)}
          >
            {isSaving ? "Assigning…" : "Assign Agent"}
          </button>
        </>
      }
    >
      <label className="form-label" htmlFor="agent-select">Select an agent</label>
      <select
        id="agent-select"
        className="filter-select full-width"
        value={selectedAgent}
        onChange={(e) => setSelectedAgent(e.target.value)}
      >
        <option value="">Choose agent…</option>
        {agents.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>
      {agents.length === 0 && (
        <p className="form-hint">No agents available. Add agents from the Agents page first.</p>
      )}
    </Modal>
  );
}
