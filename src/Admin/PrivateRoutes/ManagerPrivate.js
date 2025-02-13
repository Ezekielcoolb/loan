import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ManagerDashboardLayout from "../../Controller/managerController";


const ManagerAdminPrivateRoutes = () => {
    const { token, user } = useSelector((state) => state.admin);

    return(
        token && user.assignedRole === "Manager" ? <ManagerDashboardLayout> <Outlet /> </ManagerDashboardLayout> : <Navigate to="/superAdminLogin" />
    )
}
export default ManagerAdminPrivateRoutes