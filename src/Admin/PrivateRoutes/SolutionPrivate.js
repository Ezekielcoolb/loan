import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SolutionDashboardLayout from "../../Controller/solutionController";


const SolutionAdminPrivateRoutes = () => {
    const solutionToken = localStorage.getItem("solutionToken");
    const solutionAssigned = localStorage.getItem("solutionAssigned");

    return(
        solutionToken && solutionAssigned === "Support/Reconciliation Officer" ? <SolutionDashboardLayout> <Outlet /> </SolutionDashboardLayout> : <Navigate to="/solutionLogin" />
    )
}
export default SolutionAdminPrivateRoutes