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
import LoanCsoDashboard from "../CsoPages/CsoLoanDashboard";
import LoanCollections from "../CsoPages/csoCollections";
import RemittanceUpload from "../CsoPages/csoDashboard";
import CsoProfile from "../CsoPages/CsoProfile";
import CsoLoanCollection from "../Admin/csoPages/csoLoanCollection";

import GuarantorForm from "../CsoPages/GuarantorForm";
import ActiveLoans from "../Admin/test";
import LoanStats from "../Admin/test";
import GuarantorDetails from "../Admin/LoanPages/GuarantorDetails";
import DownloadLoanForm from "../Admin/DownloanLoanForm";
import GuarantorDetailsTest from "../Admin/test";
import AdminForm from "../Admin/AdminPanel";










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

                        // {path: "/testDetails", element: <TargetForm  />},
                        // {path: "/calendar/test/:id", element: <LoanCalendar  />},
                        // {path: "/branches/:id", element: <CsoDetail  />},
                        {path: "/test", element: <GuarantorDetailsTest  />},
                        // {path: "/test", element: <Notifications  />},
                        {path: "/customer/:bvn", element: <CustomerDetailsInfo />},
                        {path: "/customer/calender/:bvn", element: <AdminCalendarPage />},
                        {path: "/calendar/:id", element: <CalendarPage  />},
                        {path: "/csoDetails/:id", element: <CsoLoanCollection  />},
                        {path: "/loan/:id", element: <LoanDetails  />},
                        {path: "/transactions", element: <AllTransactions  />},
                        {path: "/settings", element: <Setting  />},
                        {path: "/guarantorDetails/:id", element: <GuarantorDetails  />},
                        {path: "/downloadLoanForm/:id", element: <DownloadLoanForm  />},
                        {path: "/admin-members", element: <AdminForm  />},
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
                        {path: "/cso/loans-dashboard", element: <LoanCsoDashboard />},
                        {path: "/cso/loans-collections", element: <LoanCollections />},
                        {path: "/cso/csos-dashboard", element: <RemittanceUpload />},
                        {path: "/cso/csos-profile", element: <CsoProfile />},
                    ]
                },


                { path:'/csoLogin', element: <CsoLogin />} ,
                { path:'/guarantor/:id', element: <GuarantorForm />} ,
                
            ]
        )
    )
}