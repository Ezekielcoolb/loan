import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import TopLoader from "../Preload/TopLoader";
const OutstandingDoughnutChart = lazy(() => import("../CsoPages/csoTest"));
const NewCustomerDetailsInfo = lazy(() =>
  import("../Admin/LoanPages/NewLoanCustomerDetails")
);
const NewAdminCalendarPage = lazy(() =>
  import("../Admin/LoanPages/NewLoanCalendarCard")
);
const Operations = lazy(() => import("../Admin/Reports/Operation"));
const AdminReport = lazy(() => import("../Admin/Reports/Reports"));
const HolidayList = lazy(() => import("../Admin/Holidays/Holidays"));
const CsoCollectionReportCollection = lazy(() =>
  import("../CsoPages/CsoCollectionReport")
);
const SolutionCsos = lazy(() => import("../Solutions/SolutionCso"));
const SolutionCsoDetails = lazy(() =>
  import("../Solutions/SolutionCsoDetails")
);
const SolutionLoanDetails = lazy(() =>
  import("../Solutions/SolutionLoanDetail")
);
const SolutionCustomerCard = lazy(() =>
  import("../Solutions/SolutionCustomerCard")
);
const SolutionCustomerDetails = lazy(() =>
  import("../Solutions/SolutionCustomerDetails")
);
const SolutionNewLoan = lazy(() => import("../Solutions/SolutionNewLoan"));
const SolutionLoanForm = lazy(() => import("../Solutions/SolutionLoanForm"));
const SolutionGuarantorDetails = lazy(() =>
  import("../Solutions/SolutionGuarantorDetails")
);
const SolutionNewCustomerDetailsInfo = lazy(() =>
  import("../Solutions/SolutionNewLoanDetails")
);
const SolutionNewLoanCard = lazy(() =>
  import("../Solutions/SolutionNewLoanCard")
);
const SolutionAdminPrivateRoutes = lazy(() =>
  import("../Admin/PrivateRoutes/SolutionPrivate")
);
const SolutionLogin = lazy(() => import("../Admin/AdminLogins/SolutionLogin"));
const SolutionCustomers = lazy(() => import("../Solutions/SolutionCustomers"));
const SolutionOperations = lazy(() => import("../Solutions/SolutionOperation"));
const ManagerNewCustomerDetailsInfo = lazy(() =>
  import("../ManagerPages/ManagerNewCustomerInfo")
);
const ManagerNewLoanCard = lazy(() =>
  import("../ManagerPages/ManagerNewLoanCard")
);
const EditApplicationForm = lazy(() => import("../CsoPages/EditLoanForm"));
const CsoReportSummaryTable = lazy(() =>
  import("../Admin/CsoReports/CsoReportList")
);
const CsoReportWallet = lazy(() =>
  import("../Admin/CsoReports/CsoReportWallet")
);
const ManagerGroupLeader = lazy(() =>
  import("../ManagerPages/ManagerGroupLeader")
);
const MonthlyReport = lazy(() => import("../Admin/Reports/MonthlyReport"));
const GroupLeader = lazy(() => import("../Admin/GroupLeader"));

const AdminDashboardLayout = lazy(() =>
  import("../Controller/adminController")
);
const AdminDashboard = lazy(() => import("../Admin/AdminDashboard"));
const Csos = lazy(() => import("../Admin/Cso"));
const CsoDetails = lazy(() => import("../Admin/CsoDetails"));
const Customers = lazy(() => import("../Admin/CsoDetails/CsoCustomer"));
const CustomersDetails = lazy(() => import("../Admin/CustomersDetails"));
const Loan = lazy(() => import("../Admin/Loan"));
const LoanBranches = lazy(() => import("../Admin/Branch"));
const BranchTransaction = lazy(() =>
  import("../Admin/BranchDetails/Transaction")
);
const BranchDetails = lazy(() => import("../Admin/BranchDetail"));
const BranchCSO = lazy(() => import("../Admin/BranchDetails/csoBranch"));
const BranchCustomers = lazy(() =>
  import("../Admin/BranchDetails/BranchCustomer")
);
const AllCustomerDetail = lazy(() =>
  import("../Admin/CustomerDetail/allCustomerDetails")
);
const NewLoan = lazy(() => import("../Admin/NewLoan"));
const Disbursment = lazy(() => import("../Admin/Disburstment"));
const AllTransactions = lazy(() => import("../Admin/Transaction"));
const Setting = lazy(() => import("../Admin/Setting"));
const CsoLogin = lazy(() => import("../CsoPages/Login"));
const ProtectedRoute = lazy(() => import("../CsoPages/CsoPrivateRoute"));
const CsoHome = lazy(() => import("../CsoPages/CsoHome"));
const LoanDetails = lazy(() => import("../Admin/LoanPages/LoanDetails"));
const CustomerDetailsPage = lazy(() =>
  import("../CsoPages/CustomerDetailsPage")
);
const CalendarPage = lazy(() => import("../CsoPages/CalenderPage"));
const LoanCalendar = lazy(() => import("../Admin/TestCalendar"));
const PaymentPage = lazy(() => import("../CsoPages/PaymentPage"));
const CustomerDetailsInfo = lazy(() =>
  import("../Admin/CustomerDetail/allCustomerDetails")
);
const AdminCalendarPage = lazy(() =>
  import("../Admin/CustomerDetail/CustomerDailyTrans")
);
const LoanCsoDashboard = lazy(() => import("../CsoPages/CsoLoanDashboard"));
const LoanCollections = lazy(() => import("../CsoPages/csoCollections"));
const RemittanceUpload = lazy(() => import("../CsoPages/csoDashboard"));
const CsoProfile = lazy(() => import("../CsoPages/CsoProfile"));
const CsoLoanCollection = lazy(() =>
  import("../Admin/csoPages/csoLoanCollection")
);
const GuarantorForm = lazy(() => import("../CsoPages/GuarantorForm"));
const ActiveLoans = lazy(() => import("../Admin/test"));
const LoanStats = lazy(() => import("../Admin/test"));
const GuarantorDetails = lazy(() =>
  import("../Admin/LoanPages/GuarantorDetails")
);
const DownloadLoanForm = lazy(() => import("../Admin/DownloanLoanForm"));
const GuarantorDetailsTest = lazy(() => import("../Admin/test"));
const AdminForm = lazy(() => import("../Admin/AdminPanel"));
const CustomerLoanCard = lazy(() => import("../CsoPages/CustomerLoanCard"));
const AdminSignup = lazy(() => import("../Admin/AdminLogins/AdminSignUp"));
const SuperAdminLogin = lazy(() =>
  import("../Admin/AdminLogins/SuperAdminLogin")
);
const SuperAdminPrivateRoutes = lazy(() =>
  import("../Admin/PrivateRoutes/SuperAdminPrivate")
);
const AdminLogin = lazy(() => import("../Admin/AdminLogins/MangerLogin"));
const DisbursementAdminPrivateRoutes = lazy(() =>
  import("../Admin/PrivateRoutes/AdminPrivate")
);
const ManagerAdminPrivateRoutes = lazy(() =>
  import("../Admin/PrivateRoutes/ManagerPrivate")
);
const ManagerLogin = lazy(() => import("../Admin/AdminLogins/AdminLogin"));
const DisbureseCustomers = lazy(() =>
  import("../DisbursementOfficer/DisburseCustomer")
);
const DisburseCustomerDetails = lazy(() =>
  import("../DisbursementOfficer/DisburseCustomerDetails")
);
const DisburseCustomerCard = lazy(() =>
  import("../DisbursementOfficer/DisburseCustomerCard")
);
const DisburseLoanForm = lazy(() =>
  import("../DisbursementOfficer/DisburseLoanForm")
);
const DisburseSetting = lazy(() =>
  import("../DisbursementOfficer/DisburseSetting")
);
const ManagerCsos = lazy(() => import("../ManagerPages/ManagerCso"));
const ManagerCsoDetails = lazy(() =>
  import("../ManagerPages/ManagerCsoDetails")
);
const ManagerNewLoan = lazy(() => import("../ManagerPages/ManagerNewLoan"));
const ManagerLoanDetails = lazy(() =>
  import("../ManagerPages/ManagerLoanDetails")
);
const ManagerGuarantorDetails = lazy(() =>
  import("../ManagerPages/ManagerGuarantorDetails")
);
const ManagerCustomers = lazy(() => import("../ManagerPages/ManagerCustomer"));
const ManagerCustomerDetails = lazy(() =>
  import("../ManagerPages/ManagerCustomerDetails")
);
const ManagerCustomerCard = lazy(() =>
  import("../ManagerPages/ManagerCustomerCard")
);
const ManagerLoanForm = lazy(() => import("../ManagerPages/ManagerLoanForm"));
const ManagerBranches = lazy(() => import("../ManagerPages/ManagerBranches"));
const ManagerBranchDetails = lazy(() =>
  import("../ManagerPages/ManagerBranchDetails")
);
const ManagerSetting = lazy(() => import("../ManagerPages/ManagerSetting"));
const Home = lazy(() => import("../GuestPage/Home"));
const MonthRemittanceTable = lazy(() => import("../Admin/test"));
const MinimalApplicationForm = lazy(() =>
  import("../CsoPages/MinimalLoanForm")
);
const PreviousLoans = lazy(() => import("../CsoPages/PreviousLoansPage"));

export default function Routess() {
  return (
    <Suspense fallback={<TopLoader />}>
      {useRoutes([
        { path: "/", element: <Home /> },
        {
          path: "/admin",
          element: <SuperAdminPrivateRoutes />,
          children: [
            { path: "/admin", element: <AdminDashboard /> },
            { path: "/admin/admincso", element: <Csos /> },
            { path: "/admin/csodetails", element: <CsoDetails /> },
            { path: "/admin/csocustomers", element: <Customers /> },
            { path: "/admin/customerdetails", element: <CustomersDetails /> },
            { path: "/admin/loan", element: <Loan /> },
            { path: "/admin/branches", element: <LoanBranches /> },
            { path: "/admin/branches/:id", element: <BranchTransaction /> },
            { path: "/admin/branchdetails/:id", element: <BranchDetails /> },
            { path: "/admin/branchcso", element: <BranchCSO /> },
            {
              path: "/admin/admin/allcustomers",
              element: <AllCustomerDetail />,
            },
            { path: "/admin/newloan", element: <NewLoan /> },
            { path: "/admin/disbursement", element: <Disbursment /> },
            { path: "/admin/test", element: <MonthRemittanceTable /> },
            { path: "/admin/holidays", element: <HolidayList /> },
            { path: "/admin/group-leaders", element: <GroupLeader /> },
            { path: "/admin/customer/:bvn", element: <CustomerDetailsInfo /> },
            {
              path: "/admin/new-customer/:bvn",
              element: <NewCustomerDetailsInfo />,
            },
            {
              path: "/admin/customer/calender/:id",
              element: <AdminCalendarPage />,
            },
            {
              path: "/admin/new-loan-customer/calender/:id",
              element: <NewAdminCalendarPage />,
            },
            { path: "/admin/calendar/:id", element: <CalendarPage /> },
            { path: "/admin/csoDetails/:id", element: <CsoLoanCollection /> },
            { path: "/admin/loan/:id", element: <LoanDetails /> },
            { path: "/admin/transactions", element: <AllTransactions /> },
            { path: "/admin/settings", element: <Setting /> },
            {
              path: "/admin/guarantorDetails/:id",
              element: <GuarantorDetails />,
            },
            {
              path: "/admin/downloadLoanForm/:id",
              element: <DownloadLoanForm />,
            },
            { path: "/admin/admin-members", element: <AdminForm /> },
            { path: "/admin/operations", element: <Operations /> },
            { path: "/admin/reports", element: <AdminReport /> },
            { path: "/admin/reports/monthly", element: <MonthlyReport /> },
            { path: "/admin/cso/reports", element: <CsoReportSummaryTable /> },
            { path: "/admin/cso/reports/:csoId", element: <CsoReportWallet /> },
          ],
        },
        {
          path: "/cso",
          element: <ProtectedRoute />,
          children: [
            { path: "/cso", element: <CsoHome /> },
            {
              path: "/cso/customer-details/:id",
              element: <CustomerDetailsPage />,
            },
            {
              path: "/cso/minimalApplication/:id",
              element: <MinimalApplicationForm />,
            },
            {
              path: "/cso/editApplication/:id",
              element: <EditApplicationForm />,
            },
            { path: "/cso/calendar/:id", element: <CalendarPage /> },
            { path: "/cso/loans/:id/payment", element: <PaymentPage /> },
            { path: "/cso/loans-dashboard", element: <LoanCsoDashboard /> },
            { path: "/cso/loans-collections", element: <LoanCollections /> },
            { path: "/cso/csos-dashboard", element: <RemittanceUpload /> },
            { path: "/cso/csos-profile", element: <CsoProfile /> },
            {
              path: "/cso/csos-collection-report",
              element: <CsoCollectionReportCollection />,
            },

            // { path: "/cso/csos-test", element: <CsoCollectionReportCollection /> },
            { path: "/cso/previousLoans/:id", element: <PreviousLoans /> },
          ],
        },
        {
          path: "/officer",
          element: <DisbursementAdminPrivateRoutes />,
          children: [
            { path: "/officer/disbursement", element: <Disbursment /> },
            { path: "/officer/loan", element: <Loan /> },
            { path: "/officer/customer", element: <DisbureseCustomers /> },
            { path: "/officer/transactions", element: <AllTransactions /> },
            {
              path: "/officer/customer/:bvn",
              element: <DisburseCustomerDetails />,
            },
            {
              path: "/officer/customer/calender/:bvn",
              element: <DisburseCustomerCard />,
            },
            {
              path: "/officer/downloadLoanForm/:id",
              element: <DisburseLoanForm />,
            },
            { path: "/officer/settings", element: <DisburseSetting /> },
          ],
        },
        {
          path: "/manager",
          element: <ManagerAdminPrivateRoutes />,
          children: [
            { path: "/manager", element: <AdminDashboard /> },
            { path: "/manager/admincso", element: <ManagerCsos /> },
            { path: "/manager/csodetails", element: <CsoDetails /> },
            { path: "/manager/csocustomers", element: <Customers /> },
            { path: "/manager/customerdetails", element: <ManagerCustomers /> },
            { path: "/manager/loan", element: <Loan /> },
            { path: "/manager/branches", element: <ManagerBranches /> },
            {
              path: "/manager/branches/:id",
              element: <ManagerBranchDetails />,
            },
            { path: "/manager/branchdetails/:id", element: <BranchDetails /> },
            { path: "/manager/branchcso", element: <BranchCSO /> },
            { path: "/manager/allcustomers", element: <AllCustomerDetail /> },
            { path: "/manager/newloan", element: <ManagerNewLoan /> },
            { path: "/manager/test", element: <GuarantorDetailsTest /> },
            { path: "/manager/group-leader", element: <ManagerGroupLeader /> },
            {
              path: "/manager/customer/:bvn",
              element: <ManagerCustomerDetails />,
            },
            {
              path: "/manager/new-customer/:bvn",
              element: <ManagerNewCustomerDetailsInfo />,
            },
            {
              path: "/manager/new-loan-customer/calender/:id",
              element: <ManagerNewLoanCard />,
            },
            { path: "/manager/disbursement", element: <Disbursment /> },
            { path: "/manager/group-leaders", element: <ManagerGroupLeader /> },

            {
              path: "/manager/customer/calender/:id",
              element: <ManagerCustomerCard />,
            },
            { path: "/manager/calendar/:id", element: <CalendarPage /> },
            { path: "/manager/csoDetails/:id", element: <ManagerCsoDetails /> },
            { path: "/manager/loan/:id", element: <ManagerLoanDetails /> },
            { path: "/manager/transactions", element: <AllTransactions /> },
            { path: "/manager/settings", element: <ManagerSetting /> },
            {
              path: "/manager/guarantorDetails/:id",
              element: <ManagerGuarantorDetails />,
            },
            {
              path: "/manager/downloadLoanForm/:id",
              element: <ManagerLoanForm />,
            },
            { path: "/manager/admin-members", element: <AdminForm /> },
            { path: "/manager/operations", element: <Operations /> },
            { path: "/manager/reports", element: <AdminReport /> },
          ],
        },
        {
          path: "/solution",
          element: <SolutionAdminPrivateRoutes />,
          children: [
            { path: "/solution", element: <AdminDashboard /> },
            { path: "/solution/admincso", element: <SolutionCsos /> },
            {
              path: "/solution/customerdetails",
              element: <SolutionCustomers />,
            },
            { path: "/solution/loan", element: <Loan /> },
            {
              path: "/solution/new-customer/:bvn",
              element: <SolutionNewCustomerDetailsInfo />,
            },
            { path: "/solution/newloan", element: <SolutionNewLoan /> },
            {
              path: "/solution/new-loan-customer/calender/:id",
              element: <SolutionNewLoanCard />,
            },
            {
              path: "/solution/customer/:bvn",
              element: <SolutionCustomerDetails />,
            },
            {
              path: "/solution/customer/calender/:bvn",
              element: <SolutionCustomerCard />,
            },
            {
              path: "/solution/csoDetails/:id",
              element: <SolutionCsoDetails />,
            },
            { path: "/solution/loan/:id", element: <SolutionLoanDetails /> },
            { path: "/solution/transactions", element: <AllTransactions /> },
            {
              path: "/solution/guarantorDetails/:id",
              element: <SolutionGuarantorDetails />,
            },
            {
              path: "/solution/downloadLoanForm/:id",
              element: <SolutionLoanForm />,
            },
            { path: "/solution/operations", element: <SolutionOperations /> },
            { path: "/solution/reports", element: <AdminReport /> },
          ],
        },
        { path: "/disburseLogin", element: <AdminLogin /> },
        { path: "/managerLogin", element: <ManagerLogin /> },
        { path: "/solutionLogin", element: <SolutionLogin /> },
        { path: "/superAdminLogin", element: <SuperAdminLogin /> },
        { path: "/csoLogin", element: <CsoLogin /> },
        { path: "/adminSignUp", element: <AdminSignup /> },
        { path: "/guarantor/:id", element: <GuarantorForm /> },
        { path: "/customerLoanCard/:id", element: <CustomerLoanCard /> },
      ])}
    </Suspense>
  );
}
