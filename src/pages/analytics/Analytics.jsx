import { useEffect, useState, useCallback } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import PageHeader from "../../components/layout/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import {
  fetchDashboardSummary,
  fetchRegistrationTrend,
  fetchServiceDistribution,
  fetchAgentPerformanceSummary,
} from "../../api/dashboardApi";
import { formatDate } from "../../utils/formatters";

const PIE_COLORS = ["#0B6B57", "#C9A227", "#53615D", "#899692", "#07503F"];

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [services, setServices] = useState([]);
  const [agentPerformance, setAgentPerformance] = useState([]);
  const [range, setRange] = useState("30d");

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    setError(null);
    const [summaryRes, trendRes, servicesRes, agentRes] = await Promise.all([
      fetchDashboardSummary(),
      fetchRegistrationTrend(range),
      fetchServiceDistribution(),
      fetchAgentPerformanceSummary(),
    ]);
    if (summaryRes.error) {
      setError(summaryRes.error.message);
    } else {
      setSummary(summaryRes.data);
    }
    setTrend(trendRes.data || []);
    setServices(servicesRes.data || []);
    setAgentPerformance(agentRes.data || []);
    setLoading(false);
  }, [range]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  if (loading) {
    return <div className="page-loader"><Loader label="Loading analytics…" /></div>;
  }

  if (error) {
    return (
      <EmptyState
        title="Could not load analytics"
        message={error}
        action={<button type="button" className="btn-primary" onClick={loadAnalytics}>Retry</button>}
      />
    );
  }

  const statusBreakdown = [
    { name: "Pending", value: summary?.pendingLeads || 0 },
    { name: "Completed", value: summary?.completedLeads || 0 },
    { name: "Rejected", value: summary?.rejectedLeads || 0 },
    { name: "Other", value: Math.max(0, (summary?.totalLeads || 0) - (summary?.pendingLeads || 0) - (summary?.completedLeads || 0) - (summary?.rejectedLeads || 0)) },
  ].filter((s) => s.value > 0);

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="Deeper insight into users, leads, App QR performance and agents."
        actions={
          <select className="filter-select" value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        }
      />

      <div className="analytics-grid">
        <section className="card-panel">
          <h2 className="section-heading">User Registrations</h2>
          <div className="analytics-kpi-row">
            <div><span>{summary?.totalCustomers ?? 0}</span><label>Total</label></div>
            <div><span>{summary?.verifiedUsers ?? 0}</span><label>Verified</label></div>
            <div><span>{summary?.activeUsers ?? 0}</span><label>Active</label></div>
          </div>
          {trend.length === 0 ? (
            <EmptyState title="No trend data" message="Registration trends will appear once users sign up." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trend}>
                <CartesianGrid stroke="#E2E8E5" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(v) => formatDate(v, { year: undefined })} tick={{ fill: "#53615D", fontSize: 12 }} axisLine={{ stroke: "#E2E8E5" }} tickLine={false} />
                <YAxis tick={{ fill: "#53615D", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip labelFormatter={(v) => formatDate(v)} contentStyle={{ borderRadius: 8, border: "1px solid #E2E8E5", fontSize: 13 }} />
                <Line type="monotone" dataKey="count" stroke="#0B6B57" strokeWidth={2.2} dot={{ r: 2.5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="card-panel">
          <h2 className="section-heading">Leads by Service</h2>
          {services.length === 0 ? (
            <EmptyState title="No service data" message="Leads by service will appear once leads exist." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={services}>
                <CartesianGrid stroke="#E2E8E5" vertical={false} />
                <XAxis dataKey="service" tick={{ fill: "#53615D", fontSize: 12 }} axisLine={{ stroke: "#E2E8E5" }} tickLine={false} />
                <YAxis tick={{ fill: "#53615D", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8E5", fontSize: 13 }} />
                <Bar dataKey="count" fill="#0B6B57" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="card-panel">
          <h2 className="section-heading">Lead Status Breakdown</h2>
          {statusBreakdown.length === 0 ? (
            <EmptyState title="No lead status data" message="Lead status breakdown will appear once leads exist." />
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={statusBreakdown} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {statusBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8E5", fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </section>

        <section className="card-panel">
          <h2 className="section-heading">App QR Performance</h2>
          <div className="analytics-kpi-row">
            <div><span>{summary?.appQrLeads ?? 0}</span><label>Total QR Leads</label></div>
            <div><span>{summary?.appQrPending ?? "—"}</span><label>Pending</label></div>
            <div><span>{summary?.appQrCompleted ?? "—"}</span><label>Completed</label></div>
          </div>
          <p className="section-note">
            Detailed daily/monthly App QR trend requires a dedicated backend endpoint
            (e.g. GET /admin/analytics/app-qr-trend). Wire it up in dashboardApi.js
            once available.
          </p>
        </section>

        <section className="card-panel analytics-grid-full">
          <h2 className="section-heading">Agent-wise Performance</h2>
          {agentPerformance.length === 0 ? (
            <EmptyState title="No agent data" message="Agent-wise performance will appear once leads are assigned." />
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={agentPerformance}>
                <CartesianGrid stroke="#E2E8E5" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#53615D", fontSize: 12 }} axisLine={{ stroke: "#E2E8E5" }} tickLine={false} />
                <YAxis tick={{ fill: "#53615D", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8E5", fontSize: 13 }} />
                <Legend />
                <Bar dataKey="assigned" fill="#899692" name="Assigned" radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="pending" fill="#C9A227" name="Pending" radius={[4, 4, 0, 0]} maxBarSize={22} />
                <Bar dataKey="completed" fill="#0B6B57" name="Completed" radius={[4, 4, 0, 0]} maxBarSize={22} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </section>
      </div>
    </div>
  );
}
