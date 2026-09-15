// import { useEffect, useState } from "react";
// import PageHeader from "../../components/layout/PageHeader.jsx";
// import UserStats from "../../components/dashboard/UserStats.jsx";
// import LeadStats from "../../components/dashboard/LeadStats.jsx";
// import QRStats from "../../components/dashboard/QRStats.jsx";
// import RegistrationChart from "../../components/dashboard/RegistrationChart.jsx";
// import ServiceChart from "../../components/dashboard/ServiceChart.jsx";
// import RecentLeads from "../../components/dashboard/RecentLeads.jsx";
// import Loader from "../../components/common/Loader.jsx";
// import EmptyState from "../../components/common/EmptyState.jsx";
// import StatusBadge from "../../components/common/StatusBadge.jsx";
// import {
//   fetchDashboardSummary,
//   fetchRegistrationTrend,
//   fetchServiceDistribution,
//   fetchRecentLeads,
//   fetchRecentRegistrations,
//   fetchAgentPerformanceSummary,
// } from "../../api/dashboardApi";
// import { formatDate } from "../../utils/formatters";

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [trend, setTrend] = useState([]);
//   const [services, setServices] = useState([]);
//   const [recentLeads, setRecentLeads] = useState([]);
//   const [recentRegistrations, setRecentRegistrations] = useState([]);
//   const [agentPerformance, setAgentPerformance] = useState([]);

//   async function loadDashboard() {
//     setLoading(true);
//     setError(null);

//     const [
//       summaryRes,
//       trendRes,
//       servicesRes,
//       recentLeadsRes,
//       recentRegRes,
//       agentRes,
//     ] = await Promise.all([
//       fetchDashboardSummary(),
//       fetchRegistrationTrend(),
//       fetchServiceDistribution(),
//       fetchRecentLeads(),
//       fetchRecentRegistrations(),
//       fetchAgentPerformanceSummary(),
//     ]);

//     if (summaryRes.error) {
//       setError(summaryRes.error.message);
//     } else {
//       setSummary(summaryRes.data);
//     }

//     setTrend(trendRes.data || []);
//     setServices(servicesRes.data || []);
//     setRecentLeads(recentLeadsRes.data?.items || recentLeadsRes.data || []);
//     setRecentRegistrations(recentRegRes.data?.items || recentRegRes.data || []);
//     setAgentPerformance(agentRes.data || []);

//     setLoading(false);
//   }

//   useEffect(() => {
//     loadDashboard();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (loading) {
//     return (
//       <div className="page-loader">
//         <Loader label="Loading dashboard…" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <EmptyState
//         title="Could not load dashboard"
//         message={error}
//         action={
//           <button type="button" className="btn-primary" onClick={loadDashboard}>
//             Retry
//           </button>
//         }
//       />
//     );
//   }

//   return (
//     <div className="dashboard-page">
//       <PageHeader
//         title="Executive Dashboard"
//         subtitle="Overview of customers, leads, and mobile app QR merchant activity."
//       />

//       <UserStats summary={summary} />
//       <LeadStats summary={summary} />
//       <QRStats summary={summary} />

//       <div className="dashboard-grid-2">
//         <section className="dashboard-section card-panel">
//           <h2 className="section-heading">Registration Trend</h2>
//           <RegistrationChart data={trend} />
//         </section>
//         <section className="dashboard-section card-panel">
//           <h2 className="section-heading">Lead / Service Distribution</h2>
//           <ServiceChart data={services} />
//         </section>
//       </div>

//       <div className="dashboard-grid-2">
//         <section className="dashboard-section card-panel">
//           <h2 className="section-heading">Recent Leads</h2>
//           <RecentLeads leads={recentLeads} />
//         </section>

//         <section className="dashboard-section card-panel">
//           <h2 className="section-heading">Recent Registrations</h2>
//           {recentRegistrations.length === 0 ? (
//             <EmptyState title="No recent registrations" message="New sign-ups will appear here." />
//           ) : (
//             <div className="table-wrapper table-wrapper-compact">
//               <table className="data-table">
//                 <thead>
//                   <tr>
//                     <th>Customer</th>
//                     <th>Mobile</th>
//                     <th>Registered</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {recentRegistrations.map((c) => (
//                     <tr key={c.id}>
//                       <td>{c.name || "—"}</td>
//                       <td>{c.mobile || "—"}</td>
//                       <td>{formatDate(c.registeredAt || c.createdAt)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </section>
//       </div>

//       <section className="dashboard-section card-panel">
//         <h2 className="section-heading">Agent Performance Summary</h2>
//         {agentPerformance.length === 0 ? (
//           <EmptyState title="No agent activity yet" message="Agent performance will appear once leads are assigned." />
//         ) : (
//           <div className="table-wrapper table-wrapper-compact">
//             <table className="data-table">
//               <thead>
//                 <tr>
//                   <th>Agent</th>
//                   <th>Assigned</th>
//                   <th>Pending</th>
//                   <th>Completed</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {agentPerformance.map((a) => (
//                   <tr key={a.agentId || a.id}>
//                     <td>{a.name}</td>
//                     <td>{a.assigned ?? 0}</td>
//                     <td>{a.pending ?? 0}</td>
//                     <td>{a.completed ?? 0}</td>
//                     <td><StatusBadge status={a.status || "ACTIVE"} /></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }






























import { useEffect, useState } from "react";

import PageHeader from "../../components/layout/PageHeader.jsx";
import UserStats from "../../components/dashboard/UserStats.jsx";
import LeadStats from "../../components/dashboard/LeadStats.jsx";
import QRStats from "../../components/dashboard/QRStats.jsx";
import RegistrationChart from "../../components/dashboard/RegistrationChart.jsx";
import ServiceChart from "../../components/dashboard/ServiceChart.jsx";
import RecentLeads from "../../components/dashboard/RecentLeads.jsx";

import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";

import {
  fetchDashboardSummary,
  fetchRegistrationTrend,
  fetchServiceDistribution,
  fetchRecentLeads,
  fetchRecentRegistrations,
  fetchAgentPerformanceSummary,
} from "../../api/dashboardApi";

import { formatDate } from "../../utils/formatters";


// ======================================================
// GET ACTUAL API DATA
// Backend response:
// {
//   success: true,
//   message: "...",
//   data: {...}
// }
//
// axios request() returns:
// {
//   data: backendResponse,
//   error: null
// }
// ======================================================

function unwrap(response) {
  return response?.data?.data ?? null;
}


export default function Dashboard() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [services, setServices] = useState([]);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [agentPerformance, setAgentPerformance] = useState([]);


  // ======================================================
  // LOAD DASHBOARD
  // ======================================================

  const loadDashboard = async () => {

    setLoading(true);
    setError(null);

    try {

      const [
        summaryRes,
        trendRes,
        servicesRes,
        recentLeadsRes,
        recentRegRes,
        agentRes,
      ] = await Promise.all([
        fetchDashboardSummary(),
        fetchRegistrationTrend(),
        fetchServiceDistribution(),
        fetchRecentLeads(),
        fetchRecentRegistrations(),
        fetchAgentPerformanceSummary(),
      ]);


      // ==================================================
      // SUMMARY
      // ==================================================

      if (summaryRes.error) {

        setError(
          summaryRes.error.message ||
          "Unable to load dashboard summary."
        );

        return;
      }

      const summaryData =
        unwrap(summaryRes);

      setSummary(summaryData || {});


      // ==================================================
      // REGISTRATION TREND
      // ==================================================

      if (!trendRes.error) {

        const trendData =
          unwrap(trendRes);

        setTrend(
          Array.isArray(trendData)
            ? trendData
            : []
        );
      }


      // ==================================================
      // SERVICE DISTRIBUTION
      // ==================================================

      if (!servicesRes.error) {

        const serviceData =
          unwrap(servicesRes);

        setServices(
          Array.isArray(serviceData)
            ? serviceData
            : []
        );
      }


      // ==================================================
      // RECENT LEADS
      // ==================================================

      if (!recentLeadsRes.error) {

        const recentLeadData =
          unwrap(recentLeadsRes);

        setRecentLeads(
          Array.isArray(recentLeadData?.items)
            ? recentLeadData.items
            : []
        );
      }


      // ==================================================
      // RECENT REGISTRATIONS
      // ==================================================

      if (!recentRegRes.error) {

        const recentRegistrationData =
          unwrap(recentRegRes);

        setRecentRegistrations(
          Array.isArray(
            recentRegistrationData?.items
          )
            ? recentRegistrationData.items
            : []
        );
      }


      // ==================================================
      // AGENT PERFORMANCE
      // ==================================================

      if (!agentRes.error) {

        const agentData =
          unwrap(agentRes);

        setAgentPerformance(
          Array.isArray(agentData)
            ? agentData
            : []
        );
      }

    } catch (err) {

      console.error(
        "Dashboard load error:",
        err
      );

      setError(
        err?.message ||
        "Unable to load dashboard data."
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {

    loadDashboard();

  }, []);


  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (
      <div className="page-loader">
        <Loader label="Loading dashboard…" />
      </div>
    );

  }


  // ======================================================
  // ERROR
  // ======================================================

  if (error) {

    return (
      <EmptyState
        title="Could not load dashboard"
        message={error}
        action={
          <button
            type="button"
            className="btn-primary"
            onClick={loadDashboard}
          >
            Retry
          </button>
        }
      />
    );

  }


  // ======================================================
  // DASHBOARD
  // ======================================================

  return (

    <div className="dashboard-page">

      <PageHeader
        title="Executive Dashboard"
        subtitle="Overview of customers, leads, and mobile app QR merchant activity."
      />


      {/* ==================================================
          USER OVERVIEW
      ================================================== */}

      <UserStats
        summary={summary}
      />


      {/* ==================================================
          LEAD OVERVIEW
      ================================================== */}

      <LeadStats
        summary={summary}
      />


      {/* ==================================================
          QR OVERVIEW
      ================================================== */}

      <QRStats
        summary={summary}
      />


      {/* ==================================================
          CHARTS
      ================================================== */}

      <div className="dashboard-grid-2">

        <section className="dashboard-section card-panel">

          <h2 className="section-heading">
            Registration Trend
          </h2>

          <RegistrationChart
            data={trend}
          />

        </section>


        <section className="dashboard-section card-panel">

          <h2 className="section-heading">
            Lead / Service Distribution
          </h2>

          <ServiceChart
            data={services}
          />

        </section>

      </div>


      {/* ==================================================
          RECENT DATA
      ================================================== */}

      <div className="dashboard-grid-2">


        {/* Recent Leads */}

        <section className="dashboard-section card-panel">

          <h2 className="section-heading">
            Recent Leads
          </h2>

          <RecentLeads
            leads={recentLeads}
          />

        </section>


        {/* Recent Registrations */}

        <section className="dashboard-section card-panel">

          <h2 className="section-heading">
            Recent Registrations
          </h2>


          {recentRegistrations.length === 0 ? (

            <EmptyState
              title="No recent registrations"
              message="New sign-ups will appear here."
            />

          ) : (

            <div className="table-wrapper table-wrapper-compact">

              <table className="data-table">

                <thead>

                  <tr>
                    <th>Customer</th>
                    <th>Mobile</th>
                    <th>Registered</th>
                  </tr>

                </thead>


                <tbody>

                  {recentRegistrations.map(
                    (customer) => (

                      <tr
                        key={
                          customer.id ||
                          customer._id ||
                          customer.mobile
                        }
                      >

                        <td>
                          {customer.name || "—"}
                        </td>

                        <td>
                          {customer.mobile || "—"}
                        </td>

                        <td>
                          {formatDate(
                            customer.registeredAt ||
                            customer.createdAt
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </section>

      </div>


      {/* ==================================================
          AGENT PERFORMANCE
      ================================================== */}

      <section className="dashboard-section card-panel">

        <h2 className="section-heading">
          Agent Performance Summary
        </h2>


        {agentPerformance.length === 0 ? (

          <EmptyState
            title="No agent activity yet"
            message="Agent performance will appear once leads are assigned."
          />

        ) : (

          <div className="table-wrapper table-wrapper-compact">

            <table className="data-table">

              <thead>

                <tr>
                  <th>Agent</th>
                  <th>Assigned</th>
                  <th>Pending</th>
                  <th>Completed</th>
                  <th>Status</th>
                </tr>

              </thead>


              <tbody>

                {agentPerformance.map(
                  (agent) => (

                    <tr
                      key={
                        agent.agentId ||
                        agent.id ||
                        agent._id
                      }
                    >

                      <td>
                        {agent.name || "—"}
                      </td>

                      <td>
                        {agent.assigned ?? 0}
                      </td>

                      <td>
                        {agent.pending ?? 0}
                      </td>

                      <td>
                        {agent.completed ?? 0}
                      </td>

                      <td>
                        <StatusBadge
                          status={
                            agent.status ||
                            "ACTIVE"
                          }
                        />
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </section>

    </div>

  );
}