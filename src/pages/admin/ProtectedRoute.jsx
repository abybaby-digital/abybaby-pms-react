import { useSelector } from "react-redux"
import Dashboard from "./Dashboard";
import { Navigate, Outlet } from "react-router-dom";
import Login from "./Login";

const ProtectedRoute = () => {

    const { isAuthenticated } = useSelector((state) => state.auth)
    console.log(isAuthenticated);

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectedRoute
