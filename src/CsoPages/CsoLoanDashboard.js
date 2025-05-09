// src/components/LoanDashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  calculateDefaultingCustomers,
  calculateLoanStatsCsoLoanDashboard,
  calculateNoPaymentYesterday,
  fetchAllLoansByCsoId,
  fetchAllLoansByCsoIdLoanDashboardLoans,
  fetchLoanDashboardLoans,
} from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
import { fetchOutstandingLoans } from "../redux/slices/otherLoanSlice";

const LoanCsoRap = styled.div`
  height: 100vh;

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
    padding-top: 120px;
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
    justify-content: space-between;
    gap: 3px;
  }
  .summary-loan p {
    width: 78px;

    border-radius: 5px;
    line-height: 14px;
    padding: 5px;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
  }
  .summary-loan span {
    font-size: 16px;
    font-weight: 500;
  }
  .p-1 {
    background: #ffffff;
    color: #005e78;
  }
  .p-2 {
    background: #009a49;
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
  // console.log(csoLoanDashdordLoans);
  // console.log(totalLoans);
  
  // console.log(csoDashboardTotalLoans);
  

  const [showDefaultingCustomers, setShowDefaultingCustomers] = useState(false);
  const [showYesDefaultingCustomers, setShowYesDefaultingCustomers] =
    useState(false);
  const [fullyPaidShow, setFullyPaidShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);
  const [pending, setPending] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [fully, setFully] = useState(false);
  const [defaultLoans, setDefaultLoans] = useState(false);

  const { outstandingLoans, totalOutstandingLoans, loading } = useSelector(state => state.otherLoan);



console.log(outstandingLoans);


  const handleDefaultLoansShow = () => {
    setDefaultLoans(!defaultLoans);
  }
  
  const handleSubmitted = () => {
    setSubmitted(!submitted);
  };
  const handleShowFullyPaid = () => {
    setFullyPaidShow(!fullyPaidShow);
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
  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);


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
          {" "}
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
                  data.map((loan) => (
                    <tr key={loan.sn}>
                      {columns.map((col) => (
                        <td key={col}>{loan[col.toLowerCase()] || "N/A"}</td>
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

  return (
    <LoanCsoRap>
      <div className="all-loan">
        <div className="home-first-div">
          <h2>Loans</h2>
        </div>

        <div className="loan-summary">
          <h3>Loan Summary</h3>
          <div className="summary-loan">
            <p onClick={handleSubmitted} className="p-1">
              Submitted Loan Applications
              <span>{csoDashboardTotalLoans}</span>
            </p>
            <p onClick={handleApproved} className="p-2">
              Approved loans
              <span> {csoDashboardActiveLoans}</span>
            </p>
            <p onClick={handlePending} className="p-3">
              Pending Loans:
              <span> {csoDashboardPendingLoans} </span>
            </p>
            <p onClick={handleRejected} className="p-4">
              Declined Loans:
              <span> {csoDashboardRejectedLoans} </span>
            </p>
            <p onClick={handleShowFullyPaid} className="p-2">
              Fully Paid Loans:
              <span> {csoDashboardFullPaidLoans} </span>
            </p>
          </div>
          <div className="btns">
            <button onClick={handleNoPaymentYesterday}>Late Payment</button>
            <button onClick={handleDefaultLoansShow}>Defaults</button>
            <button onClick={handleShowDefaultingCustomers}>
              Past Due Loans
            </button>
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
          </div>
        </div>
        <div></div>
      </div>

      <div>
        {submitted ? (
          <>
            {renderTable(allDahboardLoans, "Submitted Loans", [
              "SN",
              "Name",
              "AmountRequested",
              "Date",
              "Status",
            ])}
          </>
        ) : (
          ""
        )}
        {approved ? (
          <>
            {renderTable(activeDashboardLoans, "Approved Loans", [
              "SN",
              "Name",
              "AmountRequested",
              "AmountApproved",
              "Date",
            ])}
          </>
        ) : (
          ""
        )}
        {pending ? (
          <>
            {renderTable(pendingDashboardLoans, "Pending Loans", [
              "SN",
              "Name",
              "AmountRequested",
              "Date",
              "Status",
            ])}
          </>
        ) : (
          ""
        )}
        {rejected ? (
          <>
            {renderTable(rejectedDashboardLoans, "Declined Loans", [
              "SN",
              "Name",
              "AmountRequested",
              "Date",
              "RejectionReason",
            ])}
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
