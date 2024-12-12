import { useRoutes } from "react-router-dom";
import AdminDashboardLayout from "../Controller/adminController";
import AdminDashboard from "../Admin/AdminDashboard";
import Csos from "../Admin/Cso";
import CsoDetails from "../Admin/CsoDetails";
import Customers from "../Admin/CsoDetails/CsoCustomer";
import CustomersDetails from "../Admin/CustomersDetails";





export default function Routess() {
    return(
        useRoutes(
            [
                {
                    path: "/",
                    element: <AdminDashboardLayout />,
                    children: [
                        {path: "/dashboard", element: <AdminDashboard />},
                        {path: "/cso", element: <Csos />},
                        {path: "/csodetails", element: <CsoDetails />},
                        {path: "/csocustomers", element: <Customers />},
                        {path: "/customerdetails", element: <CustomersDetails  />},
                    ]
                },
                
            ]
        )
    )
}