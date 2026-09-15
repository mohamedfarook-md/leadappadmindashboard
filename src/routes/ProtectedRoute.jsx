import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Loader from "../components/common/Loader.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return (
      <div className="full-page-loader">
        <Loader label="Restoring session…" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
