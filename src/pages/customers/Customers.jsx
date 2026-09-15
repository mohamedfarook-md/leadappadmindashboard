// import { useEffect, useState, useCallback } from "react";
// import PageHeader from "../../components/layout/PageHeader.jsx";
// import SearchBar from "../../components/common/SearchBar.jsx";
// import CustomerFilters from "../../components/customers/CustomerFilters.jsx";
// import CustomerTable from "../../components/customers/CustomerTable.jsx";
// import Pagination from "../../components/common/Pagination.jsx";
// import Loader from "../../components/common/Loader.jsx";
// import EmptyState from "../../components/common/EmptyState.jsx";
// import { fetchCustomers } from "../../api/customerApi";
// import { PAGE_SIZE } from "../../utils/constants";

// export default function Customers() {
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({});
//   const [page, setPage] = useState(1);

//   const [customers, setCustomers] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const loadCustomers = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     const { data, error: err } = await fetchCustomers({
//       search,
//       ...filters,
//       page,
//       limit: PAGE_SIZE,
//     });
//     if (err) {
//       setError(err.message);
//       setCustomers([]);
//       setTotal(0);
//     } else {
//       setCustomers(data?.items || data || []);
//       setTotal(data?.total ?? (data?.items || data || []).length);
//     }
//     setLoading(false);
//   }, [search, filters, page]);

//   useEffect(() => {
//     loadCustomers();
//   }, [loadCustomers]);

//   function handleFilterChange(next) {
//     setFilters(next);
//     setPage(1);
//   }

//   function handleSearch(value) {
//     setSearch(value);
//     setPage(1);
//   }

//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   return (
//     <div>
//       <PageHeader
//         title="Customers"
//         subtitle="Every user who has registered through the MH StepPays mobile app."
//       />

//       <div className="card-panel">
//         <div className="toolbar-row">
//           <SearchBar
//             value={search}
//             onChange={handleSearch}
//             placeholder="Search by name, mobile or email…"
//           />
//         </div>
//         <CustomerFilters
//           filters={filters}
//           onChange={handleFilterChange}
//           onReset={() => handleFilterChange({})}
//         />

//         {loading ? (
//           <div className="table-loader"><Loader label="Loading customers…" /></div>
//         ) : error ? (
//           <EmptyState
//             title="Could not load customers"
//             message={error}
//             action={<button type="button" className="btn-primary" onClick={loadCustomers}>Retry</button>}
//           />
//         ) : (
//           <>
//             <CustomerTable customers={customers} />
//             <Pagination
//               page={page}
//               totalPages={totalPages}
//               totalItems={total}
//               pageSize={PAGE_SIZE}
//               onPageChange={setPage}
//             />
//           </>
//         )}
//       </div>
//     </div>
//   );
// }













































import { useEffect, useState, useCallback } from "react";

import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/common/SearchBar.jsx";
import CustomerFilters from "../../components/customers/CustomerFilters.jsx";
import CustomerTable from "../../components/customers/CustomerTable.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import Loader from "../../components/common/Loader.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";

import { fetchCustomers } from "../../api/customerApi";
import { PAGE_SIZE } from "../../utils/constants";


export default function Customers() {

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // ======================================================
  // LOAD CUSTOMERS
  // ======================================================

  const loadCustomers = useCallback(async () => {

    setLoading(true);
    setError(null);

    try {

      const response = await fetchCustomers({
        search,
        ...filters,
        page,
        limit: PAGE_SIZE,
      });


      // ==================================================
      // API ERROR
      // ==================================================

      if (response.error) {

        setError(
          response.error.message ||
          "Unable to load customers."
        );

        setCustomers([]);
        setTotal(0);

        return;
      }


      // ==================================================
      // BACKEND RESPONSE
      //
      // response.data =
      // {
      //   success: true,
      //   message: "...",
      //   data: {
      //     items: [],
      //     total: 7,
      //     page: 1,
      //     limit: 10
      //   }
      // }
      // ==================================================

      const backendResponse =
        response.data;

      const customerData =
        backendResponse?.data;


      // ==================================================
      // CUSTOMER ITEMS
      // ==================================================

      const items =
        Array.isArray(customerData?.items)
          ? customerData.items
          : [];


      // ==================================================
      // TOTAL
      // ==================================================

      const customerTotal =
        Number(customerData?.total) || 0;


      setCustomers(items);
      setTotal(customerTotal);


    } catch (err) {

      console.error(
        "CUSTOMERS LOAD ERROR:",
        err
      );

      setError(
        err?.message ||
        "Unable to load customers."
      );

      setCustomers([]);
      setTotal(0);

    } finally {

      setLoading(false);

    }

  }, [search, filters, page]);


  // ======================================================
  // INITIAL LOAD
  // ======================================================

  useEffect(() => {

    loadCustomers();

  }, [loadCustomers]);


  // ======================================================
  // FILTER CHANGE
  // ======================================================

  function handleFilterChange(next) {

    setFilters(next);
    setPage(1);

  }


  // ======================================================
  // SEARCH
  // ======================================================

  function handleSearch(value) {

    setSearch(value);
    setPage(1);

  }


  // ======================================================
  // PAGINATION
  // ======================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(total / PAGE_SIZE)
    );


  // ======================================================
  // UI
  // ======================================================

  return (

    <div>

      <PageHeader
        title="Customers"
        subtitle="Every user who has registered through the MH StepPays mobile app."
      />


      <div className="card-panel">


        {/* ==================================================
            SEARCH
        ================================================== */}

        <div className="toolbar-row">

          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search by name, mobile or email…"
          />

        </div>


        {/* ==================================================
            FILTERS
        ================================================== */}

        <CustomerFilters
          filters={filters}
          onChange={handleFilterChange}
          onReset={() => handleFilterChange({})}
        />


        {/* ==================================================
            LOADING
        ================================================== */}

        {loading ? (

          <div className="table-loader">

            <Loader
              label="Loading customers…"
            />

          </div>


        ) : error ? (


          /* ==================================================
             ERROR
          ================================================== */

          <EmptyState
            title="Could not load customers"
            message={error}
            action={
              <button
                type="button"
                className="btn-primary"
                onClick={loadCustomers}
              >
                Retry
              </button>
            }
          />


        ) : (


          /* ==================================================
             CUSTOMER DATA
          ================================================== */

          <>

            <CustomerTable
              customers={customers}
            />


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