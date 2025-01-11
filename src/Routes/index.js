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


import CustomerDetailsPage from "../CsoPages/CustomerDetailsPage";
import CalendarPage from "../CsoPages/CalenderPage";


import LoanCalendar from "../Admin/TestCalendar";
import PaymentPage from "../CsoPages/PaymentPage";




import CustomerDetailsInfo from "../Admin/CustomerDetail/allCustomerDetails";
import AdminCalendarPage from "../Admin/CustomerDetail/CustomerDailyTrans";









export default function Routess() {
    return(
        useRoutes(
            [
                {
                    path: "/",
                    element: <AdminDashboardLayout />,
                    children: [
                        {path: "/", element: <AdminDashboard />},
                        {path: "/admincso", element: <Csos />},
                        {path: "/csodetails", element: <CsoDetails />},
                        {path: "/csocustomers", element: <Customers />},
                        {path: "/customerdetails", element: <CustomersDetails  />},
                        {path: "/loan", element: <Loan  />},
                        {path: "/branches", element: <LoanBranches  />},
                        {path: "/branches/:id", element: <BranchTransaction  />},
                        {path: "/branchdetails/:id", element: <BranchDetails  />},
                        {path: "/branchcso", element: <BranchCSO  />},
                       
                        {path: "/allcustomers", element: <AllCustomerDetail  />},
                        {path: "/newloan", element: <NewLoan  />},
                        {path: "/disbursement", element: <Disbursment  />},

                        // {path: "/loans/:id/payment", element: <PaymentPage  />},
                        {path: "/calendar/test/:id", element: <LoanCalendar  />},
                        // {path: "/branches/:id", element: <CsoDetail  />},
                        // {path: "/test/details", element: <LoanDoughnutChart  />},
                        // {path: "/test", element: <DisbursementChart  />},
                        {path: "/customer/:bvn", element: <CustomerDetailsInfo />},
                        {path: "/customer/calender/:bvn", element: <AdminCalendarPage />},
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