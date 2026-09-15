// import { useEffect, useState, useCallback } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import PageHeader from "../../components/layout/PageHeader.jsx";
// import CustomerProfile from "../../components/customers/CustomerProfile.jsx";
// import Loader from "../../components/common/Loader.jsx";
// import EmptyState from "../../components/common/EmptyState.jsx";
// import { fetchCustomerById } from "../../api/customerApi";

// export default function CustomerDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadCustomer = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     const { data, error: err } = await fetchCustomerById(id);
//     if (err) {
//       setError(err.message);
//     } else {
//       setCustomer(data);
//     }
//     setLoading(false);
//   }, [id]);

//   useEffect(() => {
//     loadCustomer();
//   }, [loadCustomer]);

//   return (
//     <div>
//       <PageHeader
//         title="Customer 360"
//         subtitle="Complete profile and activity history for this customer."
//         breadcrumb={<Link to="/customers">← Back to Customers</Link>}
//         actions={
//           <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>
//             Back
//           </button>
//         }
//       />

//       {loading ? (
//         <div className="page-loader"><Loader label="Loading customer…" /></div>
//       ) : error ? (
//         <EmptyState
//           title="Could not load customer"
//           message={error}
//           action={<button type="button" className="btn-primary" onClick={loadCustomer}>Retry</button>}
//         />
//       ) : (
//         <CustomerProfile customer={customer} />
//       )}
//     </div>
//   );
// }




















import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import PageHeader from "../../components/layout/PageHeader.jsx";
import CustomerProfile from "../../components/customers/CustomerProfile.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

import { fetchCustomerById } from "../../api/customerApi";


export default function CustomerDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // ======================================================
  // LOAD CUSTOMER
  // ======================================================

  const loadCustomer = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {

      if (!id) {
        setError("Customer ID is missing.");
        return;
      }


      const response =
        await fetchCustomerById(id);


      // ==================================================
      // API ERROR
      // ==================================================

      if (response.error) {

        setError(
          response.error.message ||
          "Unable to load customer."
        );

        return;
      }


      // ==================================================
      // BACKEND RESPONSE
      //
      // response.data =
      //
      // {
      //   success: true,
      //   message: "...",
      //   data: {
      //     customer: {...},
      //     leads: [...]
      //   }
      // }
      // ==================================================

      const backendResponse =
        response.data;

      const customerData =
        backendResponse?.data?.customer;

      const leads =
        Array.isArray(
          backendResponse?.data?.leads
        )
          ? backendResponse.data.leads
          : [];


      // ==================================================
      // CUSTOMER NOT FOUND
      // ==================================================

      if (!customerData) {

        setError(
          "Customer details were not found."
        );

        return;
      }


      // ==================================================
      // NORMALIZE CUSTOMER DATA
      //
      // CustomerProfile can directly use:
      //
      // customer.name
      // customer.mobile
      // customer.email
      // customer.isVerified
      // customer.isActive
      // customer.createdAt
      // customer.lastLoginAt
      // customer.leads
      // ==================================================

      setCustomer({
        ...customerData,

        leads,

        totalLeads: leads.length,

        id:
          customerData._id ||
          customerData.id,
      });


    } catch (err) {

      console.error(
        "CUSTOMER DETAILS LOAD ERROR:",
        err
      );

      setError(
        err?.message ||
        "Unable to load customer."
      );

    } finally {

      setLoading(false);

    }

  }, [id]);


  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {

    loadCustomer();

  }, [loadCustomer]);


  // ======================================================
  // UI
  // ======================================================

  return (

    <div>

      <PageHeader
        title="Customer 360"
        subtitle="Complete profile and activity history for this customer."

        breadcrumb={
          <Link to="/customers">
            ← Back to Customers
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


      {/* ==================================================
          LOADING
      ================================================== */}

      {loading ? (

        <div className="page-loader">

          <Loader
            label="Loading customer…"
          />

        </div>


      ) : error ? (


        /* ==================================================
           ERROR
        ================================================== */

        <EmptyState
          title="Could not load customer"
          message={error}

          action={

            <button
              type="button"
              className="btn-primary"
              onClick={loadCustomer}
            >
              Retry
            </button>

          }
        />


      ) : (


        /* ==================================================
           CUSTOMER PROFILE
        ================================================== */

        <CustomerProfile
          customer={customer}
        />

      )}

    </div>

  );
}