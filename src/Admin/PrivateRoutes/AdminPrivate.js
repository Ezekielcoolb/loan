import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisburseDashboardLayout from "../../Controller/disburseController";


const DisbursementAdminPrivateRoutes = () => {
    const { token, user } = useSelector((state) => state.admin);

    return(
        token && user.assignedRole === "Disbursement Officer" ? <DisburseDashboardLayout> <Outlet /> </DisburseDashboardLayout> : <Navigate to="/superAdminLogin" />
    )
}
export default DisbursementAdminPrivateRoutes