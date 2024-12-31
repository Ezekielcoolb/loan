import { useRoutes } from "react-router-dom";
import AdminDashboardLayout from "../Controller/adminController";
import AdminDashboard from "../Admin/AdminDashboard";
import Csos from "../Admin/Cso";
import CsoDetails from "../Admin/CsoDetails";
import Customers from "../Admin/CsoDetails/CsoCustomer";
import CustomersDetails from "../Admin/CustomersDetails";
import Loan from "../Admin/Loan";
import LoanBranches from "../Admin/Branch";
import BranchTransaction from "../Admin/BranchDetails/Transaction";
import BranchDetails from "../Admin/BranchDetail";
import BranchCSO from "../Admin/BranchDetails/csoBranch";
import BranchCustomers from "../Admin/BranchDetails/BranchCustomer";
import AllCustomerDetail from "../Admin/CustomerDetail/allCustomerDetails";
import NewLoan from "../Admin/NewLoan";
import Disbursment from "../Admin/Disburstment";

import AllTransactions from "../Admin/Transaction";
import Setting from "../Admin/Setting";
import CsoLogin from "../CsoPages/Login";
import ProtectedRoute from "../CsoPages/CsoPrivateRoute";
import CsoHome from "../CsoPages/CsoHome";


import LoanDetails from "../Admin/LoanPages/LoanDetails";
import DisbursementTable from "../Admin/test";
import CustomerGallery from "../Admin/testDetail";

import CustomerDetailsPage from "../CsoPages/CustomerDetailsPage";
import CalendarPage from "../CsoPages/CalenderPage";
import MyCalendarPage from "../Admin/TestCalendar";

import LoanCalendar from "../Admin/TestCalendar";
import PaymentPage from "../CsoPages/PaymentPage";







export default function Routess() {
    return(
        useRoutes(
            [
                {
                    path: "/",
                    element: <AdminDashboardLayout />,
                    children: [
                        {path: "/dashboard", element: <AdminDashboard />},
                        {path: "/admincso", element: <Csos />},
                        {path: "/csodetails", element: <CsoDetails />},
                        {path: "/csocustomers", element: <Customers />},
                        {path: "/customerdetails", element: <CustomersDetails  />},
                        {path: "/loan", element: <Loan  />},
                        {path: "/branches", element: <LoanBranches  />},
                        {path: "/branchtransaction", element: <BranchTransaction  />},
                        {path: "/branchdetails/:id", element: <BranchDetails  />},
                        {path: "/branchcso", element: <BranchCSO  />},
                        {path: "/branchcustomers", element: <BranchCustomers  />},
                        {path: "/allcustomers", element: <AllCustomerDetail  />},
                        {path: "/newloan", element: <NewLoan  />},
                        {path: "/disbursement", element: <Disbursment  />},

                        // {path: "/loans/:id/payment", element: <PaymentPage  />},
                        {path: "/calendar/test/:id", element: <LoanCalendar  />},
                        {path: "/test/details", element: <CustomerGallery  />},
                        {path: "/calendar/:id", element: <CalendarPage  />},

                        {path: "/loan/:id", element: <LoanDetails  />},
                        {path: "/transactions", element: <AllTransactions  />},
                        {path: "/settings", element: <Setting  />},
                    ]
                },
                {
                    path: "/cso",
                    element: <ProtectedRoute/>,
                    children: [
                        {path: "/cso" , element: <CsoHome />},
                        {path: "/cso/customer-details/:id" , element: <CustomerDetailsPage />},
                        {path: "/cso/calendar/:id", element: <CalendarPage  />},
                        {path: "/cso/loans/:id/payment", element: <PaymentPage />},
                    ]
                },


                { path:'/csoLogin', element: <CsoLogin />} ,
                
            ]
        )
    )
}