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
import CustomerLoanCard from "../CsoPages/CustomerLoanCard";
import AdminSignup from "../Admin/AdminLogins/AdminSignUp";
import SuperAdminLogin from "../Admin/AdminLogins/SuperAdminLogin";
import SuperAdminPrivateRoutes from "../Admin/PrivateRoutes/SuperAdminPrivate";
import AdminLogin from "../Admin/AdminLogins/MangerLogin";
import DisbursementAdminPrivateRoutes from "../Admin/PrivateRoutes/AdminPrivate";
import ManagerAdminPrivateRoutes from "../Admin/PrivateRoutes/ManagerPrivate";
import ManagerLogin from "../Admin/AdminLogins/AdminLogin";
import DisbureseCustomers from "../DisbursementOfficer/DisburseCustomer";
import DisburseCustomerDetails from "../DisbursementOfficer/DisburseCustomerDetails";
import DisburseCustomerCard from "../DisbursementOfficer/DisburseCustomerCard";
import DisburseLoanForm from "../DisbursementOfficer/DisburseLoanForm";
import DisburseSetting from "../DisbursementOfficer/DisburseSetting";
import ManagerCsos from "../ManagerPages/ManagerCso";
import ManagerCsoDetails from "../ManagerPages/ManagerCsoDetails";
import ManagerNewLoan from "../ManagerPages/ManagerNewLoan";
import ManagerLoanDetails from "../ManagerPages/ManagerLoanDetails";
import ManagerGuarantorDetails from "../ManagerPages/ManagerGuarantorDetails";
import ManagerCustomers from "../ManagerPages/ManagerCustomer";
import ManagerCustomerDetails from "../ManagerPages/ManagerCustomerDetails";
import ManagerCustomerCard from "../ManagerPages/ManagerCustomerCard";
import ManagerLoanForm from "../ManagerPages/ManagerLoanForm";
import ManagerBranches from "../ManagerPages/ManagerBranches";
import ManagerBranchDetails from "../ManagerPages/ManagerBranchDetails";
import ManagerSetting from "../ManagerPages/ManagerSetting";
import Home from "../GuestPage/Home";
import MonthRemittanceTable from "../Admin/test";
import MinimalApplicationForm from "../CsoPages/MinimalLoanForm";
import PreviousLoans from "../CsoPages/PreviousLoansPage";










export default function Routess() {
    return(
        useRoutes(
            [
                {path: "/", element: <Home />},
                {
                    path: "/admin",
                    element: <SuperAdminPrivateRoutes />,
                    children: [
                        {path: "/admin", element: <AdminDashboard />},
                        {path: "/admin/admincso", element: <Csos />},
                        {path: "/admin/csodetails", element: <CsoDetails />},
                        {path: "/admin/csocustomers", element: <Customers />},
                        {path: "/admin/customerdetails", element: <CustomersDetails  />},
                        {path: "/admin/loan", element: <Loan  />},
                        {path: "/admin/branches", element: <LoanBranches  />},
                        {path: "/admin/branches/:id", element: <BranchTransaction  />},
                        {path: "/admin/branchdetails/:id", element: <BranchDetails  />},
                        {path: "/admin/branchcso", element: <BranchCSO  />},
                       
                        {path: "/admin/admin/allcustomers", element: <AllCustomerDetail  />},
                        {path: "/admin/newloan", element: <NewLoan  />},
                        {path: "/admin/disbursement", element: <Disbursment  />},

                        // {path: "/testDetails", element: <TargetForm  />},
                        // {path: "/calendar/test/:id", element: <LoanCalendar  />},
                        // {path: "/branches/:id", element: <CsoDetail  />},
                        {path: "/admin/test", element: <MonthRemittanceTable  />},
                        // {path: "/test", element: <Notifications  />},
                        {path: "/admin/customer/:bvn", element: <CustomerDetailsInfo />},
                        {path: "/admin/customer/calender/:bvn", element: <AdminCalendarPage />},
                        {path: "/admin/calendar/:id", element: <CalendarPage  />},
                        {path: "/admin/csoDetails/:id", element: <CsoLoanCollection  />},
                        {path: "/admin/loan/:id", element: <LoanDetails  />},
                        {path: "/admin/transactions", element: <AllTransactions  />},
                        {path: "/admin/settings", element: <Setting  />},
                        {path: "/admin/guarantorDetails/:id", element: <GuarantorDetails  />},
                        {path: "/admin/downloadLoanForm/:id", element: <DownloadLoanForm  />},
                        {path: "/admin/admin-members", element: <AdminForm  />},
                    ]
                },
                {
                    path: "/cso",
                    element: <ProtectedRoute/>,
                    children: [
                        {path: "/cso" , element: <CsoHome />},
                        {path: "/cso/customer-details/:id" , element: <CustomerDetailsPage />},
                        {path: "/cso/minimalApplication/:id", element: <MinimalApplicationForm  />},
                        {path: "/cso/calendar/:id", element: <CalendarPage  />},
                        {path: "/cso/loans/:id/payment", element: <PaymentPage />},
                        {path: "/cso/loans-dashboard", element: <LoanCsoDashboard />},
                        {path: "/cso/loans-collections", element: <LoanCollections />},
                        {path: "/cso/csos-dashboard", element: <RemittanceUpload />},
                        {path: "/cso/csos-profile", element: <CsoProfile />},
                        {path: "/cso/previousLoans/:id", element: <PreviousLoans />},
                    ]
                },
                {
                    path: "/officer",
                    element: <DisbursementAdminPrivateRoutes/>,
                    children: [
                        {path: "/officer/disbursement", element: <Disbursment  />},
                        {path: "/officer/loan", element: <Loan  />},
                        {path: "/officer/customer", element: <DisbureseCustomers  />},
                        {path: "/officer/transactions", element: <AllTransactions  />},
                        {path: "/officer/customer/:bvn", element: <DisburseCustomerDetails />},
                        {path: "/officer/customer/calender/:bvn", element: <DisburseCustomerCard />},
                        {path: "/officer/downloadLoanForm/:id", element: <DisburseLoanForm  />},
                        {path: "/officer/settings", element: <DisburseSetting  />},
                       
                    ]
                },
                {
                    path: "/manager",
                    element: <ManagerAdminPrivateRoutes />,
                    children: [
                        {path: "/manager", element: <AdminDashboard />},
                        {path: "/manager/admincso", element: <ManagerCsos />},
                        {path: "/manager/csodetails", element: <CsoDetails />},
                        {path: "/manager/csocustomers", element: <Customers />},
                        {path: "/manager/customerdetails", element: <ManagerCustomers  />},
                        {path: "/manager/loan", element: <Loan  />},
                        {path: "/manager/branches", element: <ManagerBranches  />},
                        {path: "/manager/branches/:id", element: <ManagerBranchDetails  />},
                        {path: "/manager/branchdetails/:id", element: <BranchDetails  />},
                        {path: "/manager/branchcso", element: <BranchCSO  />},
                       
                        {path: "/manager/allcustomers", element: <AllCustomerDetail  />},
                        {path: "/manager/newloan", element: <ManagerNewLoan  />},

                        // {path: "/testDetails", element: <TargetForm  />},
                        // {path: "/calendar/test/:id", element: <LoanCalendar  />},
                        // {path: "/branches/:id", element: <CsoDetail  />},
                        {path: "/manager/test", element: <GuarantorDetailsTest  />},
                        // {path: "/test", element: <Notifications  />},
                        {path: "/manager/customer/:bvn", element: <ManagerCustomerDetails />},
                        {path: "/manager/customer/calender/:bvn", element: <ManagerCustomerCard />},
                        {path: "/manager/calendar/:id", element: <CalendarPage  />},
                        {path: "/manager/csoDetails/:id", element: <ManagerCsoDetails  />},
                        {path: "/manager/loan/:id", element: <ManagerLoanDetails  />},
                        {path: "/manager/transactions", element: <AllTransactions  />},
                        {path: "/manager/settings", element: <ManagerSetting  />},
                        {path: "/manager/guarantorDetails/:id", element: <ManagerGuarantorDetails  />},
                        {path: "/manager/downloadLoanForm/:id", element: <ManagerLoanForm  />},
                        {path: "/manager/admin-members", element: <AdminForm  />},
                    ]
                },
                
                { path:'/disburseLogin', element: <AdminLogin />} ,
                { path:'/managerLogin', element: <ManagerLogin />} ,
                { path:'/superAdminLogin', element: <SuperAdminLogin />} ,
                { path:'/csoLogin', element: <CsoLogin />} ,
                { path:'/adminSignUp', element: <AdminSignup />} ,
                { path:'/guarantor/:id', element: <GuarantorForm />} ,
                {path: "/customerLoanCard/:id", element: <CustomerLoanCard  />},
            ]
        )
    )
}