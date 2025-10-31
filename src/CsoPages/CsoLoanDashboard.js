// src/components/LoanDashboard.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  calculateDefaultingCustomers,
  calculateLoanStatsCsoLoanDashboard,
  calculateNoPaymentYesterday,
  fetchAllLoansByCsoId,
  fetchAllLoansByCsoIdLoanDashboardLoans,
  fetchDashboardLoanCso,
  fetchLoanDashboardLoans,
} from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
import { fetchCsoOverdueLoans, fetchCsoRecoveryLoaner, fetchOutstandingLoans } from "../redux/slices/otherLoanSlice";
import CsoCollectionReportCollection from "./CsoCollectionReport";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import TopLoader from "../Preload/TopLoader";
import { MoonLoader } from "react-spinners";
import { fetchCsoByWorkId } from "../redux/slices/csoSlice";


const LoanCsoRap = styled.div`
  height: auto;

  color: #005e78;
  th,
  td,
  tr,
  table,
  thead,
  tbody {
    border: none;
    color: #005e78;
    font-size: 16px;
    text-align: start;
    background-color: transparent !important;
  }
  th {
    padding: 5px;
    font-weight: 700;
  }
  td {
    font-weight: 400;
    padding: 5px;
    white-space: nowrap;
    text-align: center;
  }
  .table-div-con {
    min-width: 600px;
    max-height: 600px;
    overflow-y: auto;
  }
  .all-loan {
    padding: 20px;
    padding-top: 10px;
    margin: auto;
    color: #005e78;
  }
  input {
    background: #daf7ff;
    padding: 20px 40px;
    width: 333px;
    height: 45px !important;
    border-style: none;
    border-radius: 20px;
  }
  .input-div {
    position: relative;
  }
  .search-input-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .home-first-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .home-first-div h2 {
    color: #005e78;
    font-size: 24px;
    font-weight: 500;
  }
  .loan-summary {
    border: 1px solid #005e78;
    border-radius: 20px;
    padding: 15px;
    margin-top: 30px;
  }
  .loan-summary h3 {
    color: #005e78;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
  }
  .summary-loan {
    display: flex !important;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  .summary-loan p {
    width: 100px;
    height: 110px;
    border-radius: 5px;
    line-height: 14px;
    padding: 15px;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease-in-out;
  }
  .summary-loan span {
    font-size: 24px !important;
    font-weight: 600;
  }
  .p-1 {
    background: #ffffff;
    color: #005e78;
  }
  .p-2 {
    background: #009a49;
    color: #ffffff;
  }
  .p-5 {
    background: #2d0a4eff;
    color: #ffffff;
  }
    .p-6 {
    background: #4d03faff;
    color: #ffffff;
  }
  .p-3 {
    background: #f8bd00;
    color: #ffffff;
  }
  .p-4 {
    background: #ff0000;
    color: #ffffff;
  }
  button {
    background: #005e78;
    color: #ffffff;
    width: 100px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 15px;
    border-style: none;
    color: #d9d9d9;
    font-size: 12px;
    font-weight: 700;
  }
  .btns {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-top: 30px;
  }
  .all-dropdown-div {
    width: 333px !important;
    padding: 15px;
    overflow-y: auto;
    padding-bottom: 80px;
    max-height: 600px;
    scrollbar-width: thin;
    scrollbar-color: #aaa transparent;
  }
  .all-dropdown-div::-webkit-scrollbar {
  width: 2px; /* smaller width */
}

.all-dropdown-div::-webkit-scrollbar-track {
  background: transparent; /* or a subtle background */
}

.all-dropdown-div::-webkit-scrollbar-thumb {
  background-color: #aaa; /* or any color that fits your UI */
  border-radius: 10px;
}
  .default-head {
    display: flex;

    justify-content: space-between;
  }
  .default-head h3 {
    font-size: 24px;
    font-weight: 900;
  }
  .no-default {
    color: #005e78;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .late-pay-text ul {
    margin-left: 20px;
  }
  .late-pay-text li {
    color: #005e78;
    font-size: 14px;
    margin-top: 10px;
    font-weight: 600;
  }
  .default-cust {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #005e78;
    font-size: 14px;
  }
  .all-dropdown-div {
    padding: 20px !important;
    width: 400px !important;
  }
  .cancle-icon {
    display: flex;
  }
  .table-header h2 {
    background: #005e78;
    color: #ffffff;
    margin: auto;
    border-radius: 10px;
    padding: 10px;
    width: fit-content;
    font-size: 16px;
    margin-top: 10px;
  }
  .total-here-now , .text-right{
    font-weight: 800 !important;
  }
  .total-here-now {
    font-size: 18px !important;
    text-align: right !important;
  }
`;

const LoanCsoDashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const {
    loans,
    totalLoans,
    fullyPaidLoan,
    csoLoanDashdordLoans,
    csoDashboardTotalLoans,
    csoDashboardActiveLoans,
    csoDashboardFullPaidLoans,
    csoFullyPaidLoansDashbord,
    csoDashboardPendingLoans,
    csoDashboardRejectedLoans,
    csoFullyPaidLoas,
    activeLoans,
    pendingLoans,
    allDashBoard,
    rejectedLoans,
    defaultingCustomers,
    noPaymentYesterday,
    allDahboardLoans,
    activeDashboardLoans,
    pendingDashboardLoans,
    rejectedDashboardLoans,
    status,
    error,
  } = useSelector((state) => state.loan);
   const { specificCso, remittancestatus, hoursLeft, minutesLeft } = useSelector(
      (state) => state.cso
    );

      const { outstandingLoans, totalOutstandingLoans, loading, items, recoveryLoans } = useSelector(state => state.otherLoan);

  // console.log(csoLoanDashdordLoans);
  console.log(items);
  
  // console.log(csoDashboardTotalLoans);
    const reportRef = useRef();


  const [showDefaultingCustomers, setShowDefaultingCustomers] = useState(false);
  const [showYesDefaultingCustomers, setShowYesDefaultingCustomers] =
    useState(false);
  const [fullyPaidShow, setFullyPaidShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);
  const [pending, setPending] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [fully, setFully] = useState(false);
   const [overdue, setOverdue] = useState(false);
    const [recovery, setRecovery] = useState(false);
  const [defaultLoans, setDefaultLoans] = useState(false);
const [allActive, setAllActive] = useState(false)


const allActiveLoans = loans?.filter(loan => loan.status === "active loan");

// console.log(items);

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString(); // only date
}


const totalLoanBalanceForActiveLoans = allActiveLoans?.reduce((total, customer) => {
  const toBePaid = customer?.loanDetails?.amountToBePaid || 0;
  const paidSoFar = customer?.loanDetails?.amountPaidSoFar || 0;
  const balance = toBePaid - paidSoFar;
  return total + balance;
}, 0);

 const workId = user.workId;
const handleRecovery = () => {
  setRecovery(true)
}
const handleOpenActiveLoans = () => {
  setAllActive(!allActive)
}
  const handleDefaultLoansShow = () => {
    setDefaultLoans(!defaultLoans);
  }
  
  const handleSubmitted = () => {
    setSubmitted(!submitted);
  };
  const handleShowFullyPaid = () => {
    setFullyPaidShow(!fullyPaidShow);
  };
    const handleShowOverdue = () => {
    setOverdue(!overdue);
  };
  const handleApproved = () => {
    setApproved(!approved);
  };
  const handleFully = () => {
    setFully(!fully);
  };
  const handlePending = () => {
    setPending(!pending);
  };

  const handleRejected = () => {
    setRejected(!rejected);
  };

  const handleAllDrop = () => {
    setSubmitted(false);
    setApproved(false);
    setPending(false);
    setRejected(false);
  };

  const csoId = user.workId;
  const min = 23

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    if (csoId) {
      dispatch(fetchCsoOverdueLoans({ csoId, min }));
    }
  }, [csoId, min, dispatch]); 
   
   useEffect(() => {
    if (csoId) {
      dispatch(fetchCsoRecoveryLoaner({ csoId, min }));
    }
  }, [csoId, min, dispatch]); 

  useEffect(() => {
    dispatch(fetchDashboardLoanCso( csoId ));
  }, [dispatch]);

  useEffect(() => {
    if (workId) dispatch(fetchCsoByWorkId(workId));
  }, [workId, dispatch]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoIdLoanDashboardLoans(csoId));
  }, [dispatch]);

  useEffect(() => {
    if (csoId) {
      dispatch(fetchLoanDashboardLoans(csoId));
    }
  }, [dispatch, csoId]);

  useEffect(() => {
    if (csoId) dispatch(fetchOutstandingLoans(csoId));
  }, [csoId, dispatch]);

  const handleDownload = async () => {
    navigate("/cso/csos-collection-report")
  }
  // useEffect(() => {
   
  //     dispatch(calculateLoanStatsCsoLoanDashboard())
    
  // }, [dispatch]);

  const handleShowDefaultingCustomers = () => {
    dispatch(calculateDefaultingCustomers());
    setShowDefaultingCustomers(true);
  };
  const handleNoPaymentYesterday = () => {
    dispatch(calculateNoPaymentYesterday());
    setShowYesDefaultingCustomers(true);
  };

  {
    status === "loading" && <p>Loading...</p>;
  }
  {
    status === "failed" && <p>Error: {error}</p>;
  }

  const renderTable = (data, title, columns) => (
    <div className="dropdown-container">
      <div className="all-dropdown-div">
        <div className="table-header">
          <Icon
            className="cancle-icon"
            onClick={handleAllDrop}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
          <h2>{title}</h2>
        </div>
        <div className="new-table-scroll">
          <div className="table-div-con">
            <table border="1">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length}>No data available</td>
                  </tr>
                ) : (
                  data.map((loan, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td key={col}>
                          {loan[col.toLowerCase()] || loan[col] || "N/A"}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );


  // 1️⃣ Get today's date in UTC (no time component)
const now = new Date();
const todayUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));

// 2️⃣ Calculate "effective yesterday" (adjusted for weekends)
let effectiveDate = new Date(todayUTC);
effectiveDate.setDate(effectiveDate.getDate() - 1); // Normal yesterday

// If Saturday → move back to Friday
if (effectiveDate.getDay() === 6) {
  effectiveDate.setDate(effectiveDate.getDate() - 1);
}

// If Sunday → move back to Friday
if (effectiveDate.getDay() === 0) {
  effectiveDate.setDate(effectiveDate.getDate() - 2);
}

// 3️⃣ Format effective date as YYYY-MM-DD (to match item.date)
const effectiveDateString = effectiveDate.toISOString().slice(0, 10);
console.log(effectiveDateString); // e.g., "2023-10-01"

// 4️⃣ Filter remittance items where date matches
const filteredRemittance = specificCso?.remittance?.filter(item => {
  const itemDateString = new Date(item.date).toISOString().slice(0, 10);
  return itemDateString === effectiveDateString;
});

const filteredRemittanceIssue = specificCso?.remitanceIssues?.filter(item => {
  const itemDateString = new Date(item.date).toISOString().slice(0, 10);
  return itemDateString === effectiveDateString;
});

console.log("Filtered Remittance:", filteredRemittance);
console.log(filteredRemittanceIssue);

  return (
    <LoanCsoRap>
         {specificCso  ? (<>
      {filteredRemittance?.length > 0 || filteredRemittanceIssue?.length > 0 ? (


      <div className="all-loan">
        <div className="home-first-div">
          <h2>Loans</h2>
        </div>

        <div className="loan-summary">
          <h3>Loan Summary</h3>
          <div className="summary-loan">
            <p onClick={handleSubmitted} className="p-1">
              Submitted Loan Applications
              <span>{allDashBoard?.total}</span>
            </p>
            <p onClick={handleOpenActiveLoans} className="p-2">
              Active loans
              <span> {allDashBoard?.counts?.active}</span>
            </p>
            <p onClick={handlePending} className="p-3">
              Pending Loans:
              <span> {allDashBoard?.counts?.pending} </span>
            </p>
            <p onClick={handleRejected} className="p-4">
              Declined Loans:
              <span> {allDashBoard?.counts?.rejected} </span>
            </p>
            <p onClick={handleShowFullyPaid} className="p-5">
              Fully Paid Loans:
              <span> {allDashBoard?.counts?.fullyPaid} </span>
            </p>
            <p onClick={handleShowOverdue} className="p-6">
              Overdue Loans:
              <span> {items?.length} </span>
            </p>
          </div>
          <div className="btns">
            <button style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px"
            }} onClick={handleRecovery} >Recovery Loans

              <span style={{
                fontWeight: "900",
                fontSize: "25px",
                color:"red"
              }}> {recoveryLoans?.length} </span>
            </button>
            <button onClick={handleDefaultLoansShow}>Defaults</button>
            <div>
      <button onClick={handleDownload}> Download Report</button>

      {/* Hidden container for the report */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <CsoCollectionReportCollection ref={reportRef} />
      </div>
    </div>

            {/* <button onClick={handleShowDefaultingCustomers}>
              Past Due Loans
            </button> */}
          </div>

          {showDefaultingCustomers && defaultingCustomers?.length > 0 && (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Defaulted Loans</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => setShowDefaultingCustomers(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="late-pay-text">
                  <ul>
                    {defaultingCustomers?.map((customer, index) => (
                      <li key={index}>
                        <div className="default-cust">
                          <p>
                            {customer?.customerDetails?.firstName}{" "}
                            {customer?.customerDetails?.lastName}
                          </p>
                          <p>
                            {customer?.loanDetails?.amountToBePaid -
                              customer?.loanDetails?.amountPaidSoFar}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {showDefaultingCustomers && defaultingCustomers?.length === 0 && (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Defaulted Loans</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => setShowDefaultingCustomers(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                </div>
                <p className="no-default">No Defaulted Loans Found.</p>
              </div>
            </div>
          )}
          {/* List of customers who didn't make payment yesterday */}
          <div>
            {showYesDefaultingCustomers && noPaymentYesterday?.length > 0 && (
              <div className="dropdown-container">
                <div className="all-dropdown-div">
                  <div className="default-head">
                    <h3>Late Payment </h3>
                    <div className="cancel-btn">
                      <Icon
                        onClick={() => setShowYesDefaultingCustomers(false)}
                        icon="stash:times-circle"
                        width="24"
                        height="24"
                        style={{ color: "#005e78", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div className="late-pay-text">
                    <ul>
                      {noPaymentYesterday.map((loan, index) => (
                        <li key={index}>
                          <strong>{loan.customerName}</strong> - N
                          {loan.amountOwingUntilYesterday.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {showYesDefaultingCustomers && noPaymentYesterday?.length === 0 && (
              <div className="dropdown-container">
                <div className="all-dropdown-div">
                  <div className="default-head">
                    <h3>Late Payment Loans</h3>
                    <div className="cancel-btn">
                      <Icon
                        onClick={() => setShowYesDefaultingCustomers(false)}
                        icon="stash:times-circle"
                        width="24"
                        height="24"
                        style={{ color: "#005e78", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <p className="no-default">No Late Payment Found.</p>
                </div>
              </div>
            )}

            {fullyPaidShow ? (
              <div className="dropdown-container">
                <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Fully Paid Loans</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => handleShowFullyPaid(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                  </div>
                  <div className="new-table-scroll">
                    <table className="" border="1" cellPadding="10">
                      <thead>
                        <tr>
                          <th>S/N</th> {/* Serial number column header */}
                          <th>Customer Name</th>
                          <th>Loan Amount</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Defaulted</th>
                          <th>Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csoFullyPaidLoansDashbord && csoFullyPaidLoansDashbord?.length > 0 ? (
                          <>
                            {csoFullyPaidLoansDashbord?.map((customer, index) => {
                              const repaymentSchedule =
                                customer?.repaymentSchedule || [];
                              const sortedSchedule = [
                                ...repaymentSchedule,
                              ].sort(
                                (a, b) => new Date(a.date) - new Date(b.date)
                              );
                              const startDate =
                                sortedSchedule.length > 0
                                  ? new Date(
                                      sortedSchedule[0].date
                                    ).toLocaleDateString("en-GB")
                                  : "N/A";
                              const lastDate =
                                sortedSchedule.length > 0
                                  ? new Date(
                                      sortedSchedule[
                                        sortedSchedule.length - 1
                                      ].date
                                    ).toLocaleDateString("en-GB")
                                  : "N/A";
                              const pendingCount = repaymentSchedule.filter(
                                (p) => p.status === "pending"
                              ).length;
                              const days = 22;
                              const performance =
                                ((days - (pendingCount - 1)) / days) * 100;
                              const repaymentPercentage =
                                performance < 0 ? 100 : Math.round(performance);

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {customer?.customerDetails?.firstName}{" "}
                                    {customer?.customerDetails?.lastName}
                                  </td>
                                  <td>
                                    {customer?.loanDetails?.amountApproved}
                                  </td>
                                  <td>{startDate}</td>
                                  <td>{lastDate}</td>
                                  <td>{pendingCount - 1}</td>
                                  <td>{repaymentPercentage}%</td>
                                </tr>
                              );
                            })}
                          </>
                        ) : (
                          <tr>
                            <td colSpan="5">No fully paid loans</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

           {overdue ? (
  <div className="dropdown-container">
    <div className="all-dropdown-div">
      <div className="default-head">
        <h3>Overdue Loans</h3>
        <div className="cancel-btn">
          <Icon
            onClick={() => handleShowOverdue(false)}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="new-table-scroll">
        {(() => {
          // 🔹 Compute totals
          let totalLoanBalance = 0;
          let totalBalancePenalty = 0;

          items?.forEach((loan) => {
            const amountToBePaid =
              loan.amountToBePaid ?? loan.loanDetails?.amountToBePaid ?? 0;
            const amountPaid =
              loan.amountPaid ?? loan.loanDetails?.amountPaidSoFar ?? 0;

            const loanBalance =
              typeof amountToBePaid === "number" &&
              typeof amountPaid === "number"
                ? amountToBePaid - amountPaid
                : 0;

            const penalty =
              typeof loan.penalty === "number" ? loan.penalty : 0;

            totalLoanBalance += loanBalance;
            totalBalancePenalty += loanBalance + penalty;
          });

          return (
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Customer</th>
                  <th style={{whiteSpace: "nowrap"}}>Loan Amount </th>
                  <th style={{whiteSpace: "nowrap"}}>Amount Paid</th>
                  <th style={{whiteSpace: "nowrap"}}>Loan Balance</th>
                  <th style={{whiteSpace: "nowrap"}}>Start Date</th>
                  <th style={{whiteSpace: "nowrap"}}>End Date </th>
                  <th style={{whiteSpace: "nowrap"}}>No. of Days  Overdue</th>
                  <th style={{whiteSpace: "nowrap"}}>Penalty</th>
                  <th style={{whiteSpace: "nowrap"}}>Balance + Penalty</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((loan, idx) => {
                  const fullName = `${loan.customerDetails?.firstName || ""} ${
                    loan.customerDetails?.lastName || ""
                  }`.trim();
                  const amountToBePaid =
                    loan.amountToBePaid ?? loan.loanDetails?.amountToBePaid ?? "-";
                  const amountPaid =
                    loan.amountPaid ?? loan.loanDetails?.amountPaidSoFar ?? 0;
                  const loanBalance =
                    typeof amountToBePaid === "number" &&
                    typeof amountPaid === "number"
                      ? amountToBePaid - amountPaid
                      : "-";

                  return (
                    <tr key={loan._id}>
                      <td>{idx + 1}</td>
                      <td>{fullName || "-"}</td>
                      <td>
                        {typeof amountToBePaid === "number"
                          ? amountToBePaid.toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {typeof amountPaid === "number"
                          ? amountPaid.toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {typeof loanBalance === "number"
                          ? loanBalance.toLocaleString()
                          : "-"}
                      </td>
                      <td>{formatDate(loan.startDate)}</td>
                      <td>{formatDate(loan.endDate)}</td>
                      <td>{loan.overdueCount}</td>
                      <td>
                        {typeof loan.penalty === "number"
                          ? loan.penalty.toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {typeof loanBalance === "number" &&
                        typeof loan.penalty === "number"
                          ? (loanBalance + loan.penalty).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* 🔹 Totals Row */}
              <tfoot>
                <tr>
                  <td colSpan="4"></td>
                  <td>
                    <strong>
                      {totalLoanBalance.toLocaleString()}
                    </strong>
                  </td>
                  <td colSpan="3"></td>
                  <td></td>
                  <td>
                    <strong>
                      {totalBalancePenalty.toLocaleString()}
                    </strong>
                  </td>
                </tr>
              </tfoot>
            </table>
          );
        })()}
      </div>
    </div>
  </div>
) : (
  ""
)}


           {recovery ? (
  <div className="dropdown-container">
    <div className="all-dropdown-div">
      <div className="default-head">
        <h3>Recovery Loans</h3>
        <div className="cancel-btn">
          <Icon
            onClick={() => setRecovery(false)}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
        </div>
      </div>
      <div className="new-table-scroll">
        {(() => {
          // 🔹 Compute totals
          let totalLoanBalance = 0;
          let totalBalancePenalty = 0;

          recoveryLoans?.forEach((loan) => {
            const amountToBePaid =
               loan.loanDetails?.amountToBePaid ?? 0;
            const amountPaid =
             loan.loanDetails?.amountPaidSoFar ?? 0;

            const loanBalance =
              typeof amountToBePaid === "number" &&
              typeof amountPaid === "number"
                ? amountToBePaid - amountPaid
                : 0;

            const penalty =
              typeof loan.penalty === "number" ? loan.penalty : 0;

            totalLoanBalance += loanBalance;
            totalBalancePenalty += loanBalance + penalty;
          });

          return (
            <table className="table">
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Customer</th>
                  <th style={{whiteSpace: "nowrap"}}>Loan Amount </th>
                  <th style={{whiteSpace: "nowrap"}}>Amount Paid</th>
                  <th style={{whiteSpace: "nowrap"}}>Loan Balance</th>
                  <th style={{whiteSpace: "nowrap"}}>Start Date</th>
                  {/* <th style={{whiteSpace: "nowrap"}}>End Date </th>
                  <th style={{whiteSpace: "nowrap"}}>No. of Days  Overdue</th>
                  <th style={{whiteSpace: "nowrap"}}>Penalty</th>
                  <th style={{whiteSpace: "nowrap"}}>Balance + Penalty</th> */}
                </tr>
              </thead>
              <tbody>
                {recoveryLoans?.map((loan, idx) => {
                  const fullName = `${loan.customerDetails?.firstName || ""} ${
                    loan.customerDetails?.lastName || ""
                  }`.trim();
                  const amountToBePaid =
                    loan.loanDetails?.amountToBePaid ?? "-";
                  const amountPaid =
                    loan.loanDetails?.amountPaidSoFar ?? 0;
                  const loanBalance =
                    typeof amountToBePaid === "number" &&
                    typeof amountPaid === "number"
                      ? amountToBePaid - amountPaid
                      : "-";

                  return (
                    <tr key={loan._id}>
                      <td>{idx + 1}</td>
                      <td>{fullName || "-"}</td>
                      <td>
                        {typeof amountToBePaid === "number"
                          ? amountToBePaid.toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {typeof amountPaid === "number"
                          ? amountPaid.toLocaleString()
                          : "-"}
                      </td>
                      <td>
                        {typeof loanBalance === "number"
                          ? loanBalance.toLocaleString()
                          : "-"}
                      </td>
                      <td>{formatDate(loan.disbursedAt)}</td>
                      
                     
                      
                      
                    </tr>
                  );
                })}
              </tbody>

              {/* 🔹 Totals Row */}
              <tfoot>
                <tr>
                  <td style={{
                    fontSize: "20px"
                  }}>Total</td>
                  <td colSpan="3">

                  </td>
                  <td style={{
                    fontSize: "20px"
                  }}>
                    <strong >
                      {totalLoanBalance.toLocaleString()}
                    </strong>
                  </td>
                  <td colSpan="3"></td>
                  
                </tr>
              </tfoot>
            </table>
          );
        })()}
      </div>
    </div>
  </div>
) : (
  ""
)}
              {defaultLoans ? (
              <div className="dropdown-container">
                <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Default Customers</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => handleDefaultLoansShow(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                  </div>
                  <div className="new-table-scroll">
                    <table className="" border="1" cellPadding="10">
                      <thead>
                        <tr>
                          <th>S/N</th> {/* Serial number column header */}
                          <th>Customer Name</th>
                          <th>Default Amount</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {outstandingLoans && outstandingLoans?.length > 0 ? (
                          <>
                            {outstandingLoans?.map((customer, index) => {
                              

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {customer?.customer}
                                  </td>
                                  <td style={{
                                    textAlign: "right",
                                  }}>
                                    {customer?.outstanding}
                                  </td>
                                 
                                 
                                </tr>
                              );
                            })}
                            <tr className="">
              <td colSpan="2" className=" text-right">Total</td>
              <td className="total-here-now">₦{totalOutstandingLoans.toLocaleString()}</td>
            </tr>
                          </>
                        ) : (
                          <tr>
                            <td colSpan="5">No defaults loans</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
{allActive ? (
   <div className="dropdown-container">
                <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Active Loans</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => setAllActive(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                  </div>
                  <div className="new-table-scroll">
                    <table className="" border="1" cellPadding="10">
                      <thead>
                        <tr>
                          <th>S/N</th> {/* Serial number column header */}
                          <th>Customer Name</th>
                          <th style={{
                            whiteSpace: "nowrap",
                            textAlign: "center"
                          }}>Principal + <br />
                          Interest</th>
                          <th style={{
                            whiteSpace: "nowrap"
                          }}>Total Paid</th>
                          <th style={{
                            whiteSpace: "nowrap"
                          }}>Loan Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allActiveLoans && allActiveLoans?.length > 0 ? (
                          <>
                            {allActiveLoans?.map((customer, index) => {
                              

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {customer?.customerDetails?.lastName}  {customer?.customerDetails?.firstName}
                                  </td>
                                  <td style={{
                                    textAlign: "right",
                                  }}>
                                    {customer?.loanDetails?.amountToBePaid}
                                  </td>
                                  <td style={{
                                    textAlign: "right",
                                  }}>
                                    {customer?.loanDetails?.amountPaidSoFar}
                                  </td>
                                  
                                 <td style={{
                                    textAlign: "right",
                                  }}>
                                    {customer?.loanDetails?.amountToBePaid - customer?.loanDetails?.amountPaidSoFar}
                                  </td>
                                 
                                </tr>
                              );
                            })}
                            <tr className="">
              <td colSpan="4" className=" text-right">Total Loan Balance</td>
              <td className="total-here-now">₦{totalLoanBalanceForActiveLoans?.toLocaleString()}</td>
            </tr>
                          </>
                        ) : (
                          <tr>
                            <td colSpan="5">No defaults loans</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
): ""}

          </div>
        </div>
        <div></div>
      </div>
):
    (<>
        <div className="dropdown-container">
          <div className="all-dropdown-div">
            <p style={{
              color: "red",
              fontSize: "20px",
              fontWeight: "600",
              margin: "20px",
              maxWidth: "500px"
            }}> You did not submit remittance for {effectiveDateString}. Please  contact the manager to resolve issue. Thanks.</p>
          </div>
        </div>
        </>)
      
}
</>) :  ( <p style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}}> <MoonLoader /></p>)}
      <div>
        {submitted ? (
          <>
            <div className="dropdown-container">
      <div className="all-dropdown-div">
        <div className="table-header">
          <Icon
            className="cancle-icon"
            onClick={handleAllDrop}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
          <h2>Submitted Loans</h2>
        </div>
        <div className="new-table-scroll">
          <div className="table-div-con">
            <table border="1">
              <thead>
                  <tr>
                          <th>S/N</th> {/* Serial number column header */}
                          <th>Customer Name</th>
                          <th style={{
                            whiteSpace: "nowrap",
                            textAlign: "center"
                          }}>Amount Requested</th>
                          <th style={{
                            whiteSpace: "nowrap"
                          }}>Amount Approved</th>
                          <th style={{
                            whiteSpace: "nowrap"
                          }}>Status</th>
                        </tr>
              </thead>
               <tbody>
                        {allDashBoard?.allLoans && allDashBoard?.allLoans?.length > 0 ? (
                          <>
                            {allDashBoard?.allLoans?.map((customer, index) => {
                              

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.customerDetails?.lastName}  {customer?.customerDetails?.firstName}
                                  </td>
                                  <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.loanDetails?.amountRequested}
                                  </td>
                                  <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.loanDetails?.amountApproved}
                                  </td>
                                  
                                         <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.status}
                                  </td>
                                 
                                </tr>
                              );
                            })}
              
                          </>
                        ) : (
                          <tr>
                            <td colSpan="5">No  loans submitted</td>
                          </tr>
                        )}
                      </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </>
        ) : (
          ""
        )}
        {/* {approved ? (
          <>
                  <div className="dropdown-container">
      <div className="all-dropdown-div">
        <div className="table-header">
          <Icon
            className="cancle-icon"
            onClick={handleAllDrop}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
          <h2>Active Loans</h2>
        </div>
        <div className="new-table-scroll">
          <div className="table-div-con">
            <table border="1">
              <thead>
                  <tr>
                          <th>S/N</th> 
                          <th>Customer Name</th>
                          <th style={{
                            whiteSpace: "nowrap",
                            textAlign: "center"
                          }}>Amount Requested</th>
                          <th style={{
                            whiteSpace: "nowrap"
                          }}>Amount Approved</th>
                          
                        </tr>
              </thead>
               <tbody>
                        {allDashBoard?.loans?.active && allDashBoard?.loans?.active?.length > 0 ? (
                          <>
                            {allDashBoard?.loans?.active?.map((customer, index) => {
                              

                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.customerDetails?.lastName}  {customer?.customerDetails?.firstName}
                                  </td>
                                  <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.loanDetails?.amountRequested}
                                  </td>
                                  <td style={{
                                    textAlign: "left",
                                  }}>
                                    {customer?.loanDetails?.amountApproved}
                                  </td>
                                  
                                
                                 
                                </tr>
                              );
                            })}
            
                          </>
                        ) : (
                          <tr>
                            <td colSpan="5">No active loans</td>
                          </tr>
                        )}
                      </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
          </>
        ) : (
          ""
        )} */}
        {pending ? (
          <>
                        <div className="dropdown-container">
      <div className="all-dropdown-div">
        <div className="table-header">
          <Icon
            className="cancle-icon"
            onClick={handleAllDrop}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
          <h2>Pending Loans</h2>
        </div>
        <div className="new-table-scroll">
          <div className="table-div-con">
           <table border="1">
  <thead>
    <tr>
      <th>S/N</th> {/* Serial number column header */}
      <th>Customer Name</th>
      <th
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        Amount Requested
      </th>
      <th
        style={{
          whiteSpace: "nowrap",
        }}
      >
        Date
      </th>
    </tr>
  </thead>
  <tbody>
    {allDashBoard?.loans?.pending &&
    allDashBoard?.loans?.pending?.length > 0 ? (
      <>
        {allDashBoard?.loans?.pending?.map((customer, index) => {
          // Format createdAt -> DD/MM/YYYY
          const formattedDate = new Date(
            customer?.createdAt
          ).toLocaleDateString("en-GB"); // en-GB gives dd/mm/yyyy

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: "left" }}>
                {customer?.customerDetails?.lastName}{" "}
                {customer?.customerDetails?.firstName}
              </td>
              <td style={{ textAlign: "left" }}>
                {customer?.loanDetails?.amountRequested}
              </td>
              <td style={{ textAlign: "left" }}>{formattedDate}</td>
            </tr>
          );
        })}
      </>
    ) : (
      <tr>
        <td colSpan="5">No pending loans</td>
      </tr>
    )}
  </tbody>
</table>

          </div>
        </div>
      </div>
    </div>
          </>
        ) : (
          ""
        )}
        {rejected ? (
          <>
                              <div className="dropdown-container">
      <div className="all-dropdown-div">
        <div className="table-header">
          <Icon
            className="cancle-icon"
            onClick={handleAllDrop}
            icon="stash:times-circle"
            width="24"
            height="24"
            style={{ color: "#005e78", cursor: "pointer" }}
          />
          <h2>Declined Loans</h2>
        </div>
        <div className="new-table-scroll">
          <div className="table-div-con">
           <table border="1">
  <thead>
    <tr>
      <th>S/N</th> {/* Serial number column header */}
      <th>Customer Name</th>
      <th
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        Amount Requested
      </th>
        <th
        style={{
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        Rejection Reason
      </th>
      <th
        style={{
          whiteSpace: "nowrap",
        }}
      >
        Date
      </th>
    </tr>
  </thead>
  <tbody>
    {allDashBoard?.loans?.pending &&
    allDashBoard?.loans?.pending?.length > 0 ? (
      <>
        {allDashBoard?.loans?.pending?.map((customer, index) => {
          // Format createdAt -> DD/MM/YYYY
          const formattedDate = new Date(
            customer?.createdAt
          ).toLocaleDateString("en-GB"); // en-GB gives dd/mm/yyyy

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td style={{ textAlign: "left" }}>
                {customer?.customerDetails?.lastName}{" "}
                {customer?.customerDetails?.firstName}
              </td>
              <td style={{ textAlign: "left" }}>
                {customer?.loanDetails?.amountRequested}
              </td>
               <td style={{ textAlign: "left" }}>
                {customer?.rejectionReason}
              </td>
              <td style={{ textAlign: "left" }}>{formattedDate}</td>
            </tr>
          );
        })}
      </>
    ) : (
      <tr>
        <td colSpan="5">No declined loans</td>
      </tr>
    )}
  </tbody>
</table>

          </div>
        </div>
      </div>
    </div>
          </>
        ) : (
          ""
        )}
        {/* {fully ? (
          <>
            {renderTable(csoFullyPaidLoansDashbord, "Fully Paid Loans", [
              "SN",
              "Name",
              "AmountRequested",
              "Date",
              "RejectionReason",
            ])}
          </>
        ) : (
          ""
        )} */}
      </div>
    </LoanCsoRap>
  );
};

export default LoanCsoDashboard;
