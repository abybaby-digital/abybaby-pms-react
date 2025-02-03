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
import AddClient from "./pages/admin/client/AddClient";
import ClientList from "./pages/admin/client/ClientList";
import AddProject from "./pages/admin/project/AddProject";
import ProjectList from "./pages/admin/project/ProjectList";
import AddRole from "./pages/admin/role-management/AddRole";
import RoleList from "./pages/admin/role-management/RoleList";
import UserList from "./pages/admin/user/UserList";
import AddPaymentReceived from "./pages/admin/payment-received/AddPaymentReceived";
import PaymentReceivedList from "./pages/admin/payment-received/PaymentReceivedList";

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
                  <Route path="/client-add" element={<AddClient />} />
                  <Route path="/client-list" element={<ClientList />} />
                  <Route path="/project-add" element={<AddProject />} />
                  <Route path="/project-list" element={<ProjectList />} />
                  <Route path="/user-add" element={<AddUser />} />
                  <Route path="/user-list" element={<UserList />} />
                  <Route path="/role-add" element={<AddRole />} />
                  <Route path="/role-list" element={<RoleList />} />
                  <Route path="/payment-receipt-add" element={<AddPaymentReceived />} />
                  <Route path="/payment-receipt-list" element={<PaymentReceivedList />} />
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
