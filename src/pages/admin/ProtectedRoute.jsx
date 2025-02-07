import { useSelector } from "react-redux"
import Dashboard from "./Dashboard";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = () => {

    const { isAuthenticated } = useSelector((state) => state.auth)
    console.log(isAuthenticated);
    // const location = useLocation();
    // console.log(location.pathname);

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute
