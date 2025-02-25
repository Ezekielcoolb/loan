import { Outlet, Navigate } from "react-router-dom";
import AdminDashboardLayout from "../../Controller/adminController";
import { useSelector } from "react-redux";


const SuperAdminPrivateRoutes = () => {
    const adminToken = localStorage.getItem("superAdminToken");

    return(
        adminToken ? <AdminDashboardLayout> <Outlet /> </AdminDashboardLayout> : <Navigate to="/superAdminLogin" />
    )
}
export default SuperAdminPrivateRoutes