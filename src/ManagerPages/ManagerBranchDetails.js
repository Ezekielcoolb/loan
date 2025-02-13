import React, { useEffect, useState } from "react";

import styled from "styled-components";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchCsoTransactions, fetchCustomerBranchLoans, fetchLoanBranchData } from "../redux/slices/branchLoanSlice";

const TransactionRap = styled.div`
  width: 100%;
  .cso-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    padding-right: 15px;
  }
  .cso-link-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .cso-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .cso-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
  .transaction-1 h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 20px;
  }
  .transaction-1 {
    background: #ffffff;
    margin: 20px;
    padding-top: 20px;
    border-radius: 15px;
  }
  .inner-summary-div {
    flex-wrap: wrap;
  }
  .month-year select, .month-year input {
  width: 150px;
  height: 30px;
  border: 1px solid #d0d5dd;
  padding-left: 10px;
  border-radius: 100px;
}
.month-year {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px;
}
.month-year label {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #9499ac
}
`;

const ManagerBranchDetails = () => {
  const { id } = useParams();

  const branchName = id;
  const dispatch = useDispatch();
  const { csoTransactions, data, loading, error, loans, status } = useSelector(
    (state) => state.loanBranches
  );

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [activeLink, setActiveLink] = useState("transaction");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  useEffect(() => {
    dispatch(fetchCustomerBranchLoans(branchName));
  }, [dispatch, branchName]);

  useEffect(() => {
    dispatch(
      fetchCsoTransactions({
        branchName,
        month: selectedMonth,
        year: selectedYear,
      })
    );
  }, [dispatch, branchName, selectedMonth, selectedYear]);

  useEffect(() => {
    dispatch(fetchLoanBranchData(id));
  }, [dispatch]);

  const handleDateChange = () => {
    dispatch(
      fetchCsoTransactions({
        branchName,
        month: selectedMonth,
        year: selectedYear,
      })
    );
  };

  const renderLoanData = (loan) => {
    const performance =
      loan.performance === 100 ? "100%" : `${loan.performance}%`;

    return (
      <tr key={loan.customerName}>
        <td>{loan.customerName}</td>
        <td>{loan.numberOfLoans}</td>
        <td>{loan.defaults}</td>
        <td>{loan.currentLoanBalance}</td>
        <td>{loan.amountDisbursed}</td>
        <td>{loan.amountToBePaid}</td>
        <td>{loan.amountPaidSoFar}</td>
        <td>{loan.loanStartDate}</td>
        <td>{loan.loanEndDate}</td>
        <td>{performance}</td>
      </tr>
    );
  };

  if (status === "loading") {
    return <div>Loading loan data...</div>;
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <TransactionRap>
      <div className="cso-1">
        <div className="cso-link-container">
          <Link style={{}} className="cso-link" to="/branches">
            <Icon
              icon="formkit:arrowleft"
              width="90"
              height="16"
              style={{ color: "black", cursor: "pointer" }}
            />
          </Link>
          <Link
            className={`cso-link ${
              activeLink === "transaction" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("transaction")}
          >
            Annual Transaction
          </Link>
          <Link
            className={`cso-link ${activeLink === "csos" ? "active" : ""}`}
            onClick={() => handleLinkClick("csos")}
          >
            Cso
          </Link>
          <Link
            className={`cso-link ${activeLink === "customers" ? "active" : ""}`}
            onClick={() => handleLinkClick("customers")}
          >
            Customers
          </Link>
        </div>
      </div>
      {activeLink === "transaction" && (
        <div className="transaction-1">
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && (
              <div>
                <h2>{data.branchName} Transactions</h2>

                <div className="summary">
                  <div className="summary-div-1">
                    <h4>Summary</h4>
                    <p>
                      Overall Performance: <br />
                      <strong>
                        <span>
                          {data.summary.overallPerformancePercentage}{" "}
                        </span>{" "}
                      </strong>
                    </p>
                  </div>
                  <div className="inner-summary-div">
                    <p className="summary-ps">
                      Loan Target:
                      <span> {data.summary.realLoanTarget}</span>
                    </p>
                    <p className="summary-ps">
                      Disbursement Target:
                      <span>₦{data.summary.disbursementTarget}</span>
                    </p>
                  </div>
                  <div className="inner-summary-div">
                    <p className="summary-ps">
                      Total Amount Disbursed:
                      <span> ₦{data.summary.totalDisbursed} </span>
                    </p>
                    <p className="summary-ps">
                      Total Profit Made:
                      <span>₦{data.summary.totalAmountToBePaid}</span>
                    </p>
                    <p className="summary-ps">
                      Total Amount Paid Back:
                      <span>₦{data.summary.totalAmountPaid}</span>
                    </p>
                    <p className="summary-ps">
                      Total Loan Balance:
                      <span> ₦{data.summary.loanBalance}</span>
                    </p>
                  </div>
                </div>

                {/* <div className="table-container">
                  <div className="new-table-scroll">
                    <div className="table-div-con">
                      <table className="custom-table" border="1">
                        <thead>
                          <tr>
                            <th>Month</th>
                            <th>Active Loans</th>
                            <th>Loan Target</th>
                            <th>Total Disbursed</th>
                            <th>Disbs Target</th>
                            <th>Profit</th>
                            <th>Amount Paid</th>
                            <th>Loan Balance</th>
                            <th>Target Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.monthlyStats.map((stat, index) => (
                            <tr key={index}>
                              <td>{stat.month}</td>
                              <td>{stat.numberOfLoans}</td>
                              <td>{stat.loanTarget}</td>
                              <td>{stat.totalDisbursed}</td>
                              <td>{stat.disbursementTarget}</td>
                              <td>{stat.amountToBePaid}</td>
                              <td>{stat.amountPaid}</td>
                              <td>{stat.loanBalance}</td>
                              <td
                                style={{
                                  color:
                                    stat.targetStatus === "Target Met"
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {stat.targetStatus}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      )}
      {activeLink === "csos" && (
        <div className="transaction-1">
          <h2>CSO Transactions for {branchName}</h2>

          {/* Month and Year Selector */}
          <div className="month-year" style={{ marginBottom: "20px" }}>
            <label>
              Select Month:
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Select Year:
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              />
            </label>
          </div>

          {/* CSO Transaction Table */}

          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table" border="1">
                  <thead>
                    <tr>
                      <th>Name of CSO</th>
                      <th>Number of Loans</th>
                      <th>Amount Disbursed</th>
                      <th>Amount to be Paid</th>
                      <th>Amount Paid</th>
                      <th>Loan Balance</th>
                      <th>Total Loan App Form</th>
                      <th>Monthly Loan Target</th>
                      <th>Monthly Disbursement Target</th>
                      <th>Target Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {csoTransactions.map((cso, index) => (
                      <tr key={index}>
                        <td>{cso.csoName}</td>
                        <td>{cso.numberOfLoans}</td>
                        <td>{cso.totalDisbursed}</td>
                        <td>{cso.totalAmountToBePaid}</td>
                        <td>{cso.totalAmountPaid}</td>
                        <td>{cso.loanBalance}</td>
                        <td>{cso.totalLoanAppForm}</td>
                        <td>{cso.monthlyLoanTarget}</td>
                        <td>{cso.monthlyDisbursementTarget}</td>
                        <td
                          style={{
                            color:
                              cso.targetStatus === "Target Met"
                                ? "green"
                                : "red",
                          }}
                        >
                          {cso.targetStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeLink === "customers" && (
        <div className="transaction-1">
          <h2>Customers</h2>
          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table" border="1">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Number of Loans</th>
                      <th>Defaults</th>
                      <th>Current Loan Balance</th>
                      <th>Amount Disbursed</th>
                      <th>Amount to be Paid</th>
                      <th>Amount Paid So Far</th>
                      <th>Loan Start Date</th>
                      <th>Loan End Date</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>{loans.map((loan) => renderLoanData(loan))}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </TransactionRap>
  );
};

export default ManagerBranchDetails;
