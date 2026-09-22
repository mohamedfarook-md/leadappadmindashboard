import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Layout from "../components/layout/Layout.jsx";

import AdminLogin from "../pages/auth/AdminLogin.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Customers from "../pages/customers/Customers.jsx";
import CustomerDetails from "../pages/customers/CustomerDetails.jsx";
import Leads from "../pages/leads/Leads.jsx";
import LeadDetails from "../pages/leads/LeadDetails.jsx";
import AppQRLeads from "../pages/qr/AppQRLeads.jsx";
import QRMerchantDetails from "../pages/qr/QRMerchantDetails.jsx";
import Agents from "../pages/agents/Agents.jsx";
import Companies from "../pages/companies/Companies.jsx";
import AgentDetails from "../pages/agents/AgentDetails.jsx";
import Analytics from "../pages/analytics/Analytics.jsx";
import Settings from "../pages/settings/Settings.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<CustomerDetails />} />

        <Route path="leads" element={<Leads />} />
        <Route path="leads/:id" element={<LeadDetails />} />

        <Route path="app-qr-leads" element={<AppQRLeads />} />
        <Route path="app-qr-leads/:id" element={<QRMerchantDetails />} />

        <Route path="companies" element={<Companies />} />

        <Route path="agents" element={<Agents />} />
        <Route path="agents/:id" element={<AgentDetails />} />

        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
