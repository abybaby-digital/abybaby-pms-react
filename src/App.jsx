import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AddUser from "./pages/admin/user/AddUser";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CompanyList from "./pages/admin/company/CompanyList";
import AddBranch from "./pages/admin/branch/AddBranch";
import BranchList from "./pages/admin/branch/BranchList";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { DialogOpenCloseProvider } from "./context/DialogOpenClose";
import AddVendor from "./pages/admin/vendor/AddVendor";
import VendorList from "./pages/admin/vendor/VendorList";

// Lazy-loaded components
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const AddCompany = React.lazy(() => import("./pages/admin/company/AddCompany"));


// const ScrollToTop = () => {
//   const location = useLocation();
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location]);

//   return null;
// };

const App = () => {
  const location = useLocation();
  console.log(location.state);

  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DialogOpenCloseProvider>
          <PrimeReactProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            {/* <ScrollToTop /> */}
            <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/company-add" element={<AddCompany />} />
                  <Route path="/company-list" element={<CompanyList />} />
                  <Route path="/vendor-add" element={<AddVendor />} />
                  <Route path="/vendor-list" element={<VendorList />} />
                  <Route path="/branch-add" element={<AddBranch />} />
                  <Route path="/branch-list" element={<BranchList />} />
                  <Route path="/user-add" element={<AddUser />} />
                </Route>
              </Routes>
            </Suspense>
          </PrimeReactProvider>
        </DialogOpenCloseProvider>

      </QueryClientProvider>
    </>
  );
};

export default App;
