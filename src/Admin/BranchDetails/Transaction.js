import React from "react";

import styled from "styled-components";
import moment from "moment";

const TransactionRap = styled.div``;
const branches = [
  {
    id: 1,
    branchName: "Branch A",
    annualTarget: 2400000, // Annual target in currency
    loans: [
      {
        month: "2024-01", // January 2024
        targetCustomers: 5,
        monthTarget: 200000,
        interestRate: 0.08,
        monthDisburst: 300000,
        monthReturn: 150000,
      },
      {
        month: "2024-02", // February 2024
        targetCustomers: 7,
        monthTarget: 300000,
        interestRate: 0.1,
        monthDisburst: 250000,
        monthReturn: 200000,
      },
      {
        month: "2024-12", // December 2024
        targetCustomers: 10,
        monthTarget: 500000,
        interestRate: 0.09,
        monthDisburst: 450000,
        monthReturn: 300000,
      },
    ],
  },
];
const BranchTransaction = () => {
  const currentYear = new Date().getFullYear();
  const currentMonthIndex = new Date().getMonth(); // 0-based index, e.g., January = 0

  const renderAnnualTargetTable = (branch) => {
    // Filter loans for the current year and months up to the current month
    const filteredLoans = branch.loans.filter((loan) => {
      const loanDate = moment(loan.month, "YYYY-MM");
      return (
        loanDate.year() === currentYear && loanDate.month() <= currentMonthIndex
      );
    });

    // Calculate totals
    const totals = filteredLoans.reduce(
      (acc, loan) => {
        const interest = loan.monthDisburst * loan.interestRate;
        const balance = loan.monthDisburst - loan.monthReturn;
        acc.totalDisbursed += loan.monthDisburst;
        acc.totalProfit += loan.monthDisburst + interest;
        acc.totalPaidBack += loan.monthReturn;
        acc.totalBalance += balance;
        return acc;
      },
      { totalDisbursed: 0, totalProfit: 0, totalPaidBack: 0, totalBalance: 0 }
    );

    // Calculate overall performance
    const performancePercentage = (
      (totals.totalDisbursed / branch.annualTarget) *
      100
    ).toFixed(2);

    return (
      <div>
         {/* Summary Section */}
         <div className="summary">
          <div className="summary-div-1">
            <h4>Summary</h4>
            <p>
              Overall Performance:{" "} <br />
              <strong><span>{performancePercentage}% </span> of Annual Target</strong>
            </p>
          </div>
            <div className="inner-summary-div">
          <p className="summary-ps">
            Total Amount Disbursed:
            <span> ₦{totals.totalDisbursed.toLocaleString()} </span>
          </p>
          <p className="summary-ps">Total Profit Made: 
            <span>₦{totals.totalProfit.toLocaleString()}
          </span>
          </p>
          <p className="summary-ps">
            Total Amount Paid Back: 
            <span>₦{totals.totalPaidBack.toLocaleString()}
            </span>
          </p>
          <p className="summary-ps">
            Total Loan Balance: 
            <span> ₦{totals.totalBalance.toLocaleString()} </span>
          </p>
          </div>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>No of Loans</th>
              <th>Target (₦)</th>
              <th>
                Amount <br /> Disbursed (₦)
              </th>
              <th>Interest (₦)</th>
              <th>
                Amount <br />
                Paid Back (₦)
              </th>
              <th>
                Loan <br /> Balance (₦)
              </th>
              <th>Profit (₦)</th>
              <th>
                Target <br /> Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan, index) => {
              const interest = loan.monthDisburst * loan.interestRate;
              const balance = loan.monthDisburst - loan.monthReturn;
              const profit = loan.monthDisburst + interest;
              const isTargetMet = loan.monthDisburst >= loan.monthTarget;

              return (
                <tr key={index}>
                  <td>{moment(loan.month).format("MMMM YYYY")}</td>
                  <td>{loan.targetCustomers}</td>
                  <td style={{color: "#030b26", fontWeight: "600"}}>{loan.monthTarget.toLocaleString()}</td>
                  <td>{loan.monthDisburst.toLocaleString()}</td>
                  <td>{interest.toLocaleString()}</td>
                  <td>{loan.monthReturn.toLocaleString()}</td>
                  <td>{balance.toLocaleString()}</td>
                  <td style={{color: "#030b26", fontWeight: "600"}}>{profit.toLocaleString()}</td>
                  <td
                    style={{
                      color: isTargetMet ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {isTargetMet ? "Target Met" : "Target Not Met"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

       
      </div>
    );
  };
  return (
    <TransactionRap>
      <div>
        <div>
         
        </div>
        <div className="table-container">
          {branches.map((branch) => (
            <div key={branch.id} className="branch-target">
              <h4>{branch.branchName} Annual Transactions</h4>
              <p className="annual-target">Annual Target: <span> ₦{branch.annualTarget.toLocaleString()}</span></p>
              {renderAnnualTargetTable(branch)}
            </div>
          ))}
        </div>
      </div>
    </TransactionRap>
  );
};

export default BranchTransaction;
