import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DisburseDashboardLayout from "../../Controller/disburseController";


const DisbursementAdminPrivateRoutes = () => {
    const officerToken = localStorage.getItem("officerToken");
    const officerAssigned = localStorage.getItem("officerAssigned");

    return(
        officerToken && officerAssigned === "Disbursement Officer" ? <DisburseDashboardLayout> <Outlet /> </DisburseDashboardLayout> : <Navigate to="/disburseLogin" />
    )
}
export default DisbursementAdminPrivateRoutes