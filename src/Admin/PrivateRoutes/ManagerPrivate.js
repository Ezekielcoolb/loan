import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ManagerDashboardLayout from "../../Controller/managerController";


const ManagerAdminPrivateRoutes = () => {
    const managerToken = localStorage.getItem("managerToken");
    const managerAssigned = localStorage.getItem("managerAssigned");

    return(
        managerToken && managerAssigned === "Manager" ? <ManagerDashboardLayout> <Outlet /> </ManagerDashboardLayout> : <Navigate to="/managerLogin" />
    )
}
export default ManagerAdminPrivateRoutes