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
import DisbursementRepayment from "../Admin/TransactionDetails/DisbursementDetail";
import LoanSubmissions from "../Admin/TransactionDetails/LoanApplication";
import AllTransactions from "../Admin/Transaction";





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
                        {path: "/loan", element: <Loan  />},
                        {path: "/branches", element: <LoanBranches  />},
                        {path: "/branchtransaction", element: <BranchTransaction  />},
                        {path: "/branchdetails", element: <BranchDetails  />},
                        {path: "/branchcso", element: <BranchCSO  />},
                        {path: "/branchcustomers", element: <BranchCustomers  />},
                        {path: "/allcustomers", element: <AllCustomerDetail  />},
                        {path: "/newloan", element: <NewLoan  />},
                        {path: "/disbursement", element: <Disbursment  />},
                     
                        {path: "/transactions", element: <AllTransactions  />},
                    ]
                },
                
            ]
        )
    )
}