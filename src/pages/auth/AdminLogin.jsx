// import { useState } from "react";
// import { Navigate, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext.jsx";

// export default function AdminLogin() {
//   const { isAuthenticated, isRestoring, login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   if (!isRestoring && isAuthenticated) {
//     const redirectTo = location.state?.from || "/dashboard";
//     return <Navigate to={redirectTo} replace />;
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError("");

//     if (!email.trim() || !password.trim()) {
//       setError("Please enter your email/mobile and password.");
//       return;
//     }

//     setIsSubmitting(true);
//     const result = await login({ email: email.trim(), password });
//     setIsSubmitting(false);

//     if (!result.success) {
//       setError(result.message || "Invalid credentials. Please try again.");
//       return;
//     }
//     navigate("/dashboard", { replace: true });
//   }

//   return (
//     <div className="login-screen">
//       <div className="login-panel">
//         <div className="login-brand">
//           <img src="/logo.png" alt="MH StepPays" />
//           <div>
//             <h1>MH StepPays</h1>
//             <span>Admin Portal</span>
//           </div>
//         </div>

//         <h2 className="login-heading">Sign in to your account</h2>
//         <p className="login-subheading">Enter your administrator credentials to continue.</p>

//         <form className="login-form" onSubmit={handleSubmit}>
//           {error && <div className="form-error-banner">{error}</div>}

//           <label className="form-label" htmlFor="email">Email or Mobile</label>
//           <input
//             id="email"
//             type="text"
//             className="form-input"
//             autoComplete="username"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="admin@mhsteppays.in"
//           />

//           <label className="form-label" htmlFor="password">Password</label>
//           <input
//             id="password"
//             type="password"
//             className="form-input"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//           />

//           <button type="submit" className="btn-primary btn-block" disabled={isSubmitting}>
//             {isSubmitting ? "Signing in…" : "Sign In"}
//           </button>
//         </form>
//       </div>
//       <div className="login-side-panel">
//         <div className="login-side-content">
//           <h3>Operations, at a glance.</h3>
//           <p>
//             Track customer registrations, leads, mobile app QR merchants,
//             and agent performance from a single, secure dashboard.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminLogin() {
  const { isAuthenticated, isRestoring, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isRestoring && isAuthenticated) {
    const redirectTo = location.state?.from || "/dashboard";
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    const result = await login({
      email: cleanEmail,
      password,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || "Invalid credentials. Please try again.");
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="login-screen">
      <div className="login-panel">
        <div className="login-brand">
          <img src="/logo.png" alt="MH StepPays" />

          <div>
            <h1>MH StepPays</h1>
            <span>Admin Portal</span>
          </div>
        </div>

        <h2 className="login-heading">
          Sign in to your account
        </h2>

        <p className="login-subheading">
          Enter your administrator credentials to continue.
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error-banner">
              {error}
            </div>
          )}

          <label className="form-label" htmlFor="email">
            Email Address
          </label>

          <input
            id="email"
            type="email"
            className="form-input"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@mhsteppays.in"
          />

          <label className="form-label" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            className="form-input"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="btn-primary btn-block"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>

      <div className="login-side-panel">
        <div className="login-side-content">
          <h3>Operations, at a glance.</h3>

          <p>
            Track customer registrations, leads, mobile app QR merchants,
            and agent performance from a single, secure dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}