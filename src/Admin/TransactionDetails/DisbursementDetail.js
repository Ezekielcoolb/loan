import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch, useSelector } from "react-redux";
import {
  allLaonfTransactions,
  fetchLoansByMonth,
  setMonth,
  setYear,
} from "../../redux/slices/LoanSlice";

const DisbursementRepaymentRap = styled.div`
  width: 100%;
  padding: 20px;

  .month-summary h3, .total-month h3 {
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  .month-summary p, .total-month p {
    width: 180px;
    height: 100px;
    font-size: 16px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 10px;
    color: #727789;
  }
  .month-summary span, .total-month span {
    color: #030b26 !important;
    font-size: 20px;
    font-weight: 800;
  }
  .month-summary-1, .total-month-1  {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, 1fr)
  }
  .trans-summary {
    display: flex;
  }
  .month-summary {
    border-right: 1px solid #d0d5dd;
  }
  .month-summary, .total-month {
    padding: 30px;
  }
  .disburst {
    background: #ffffff;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .trans-summary {
    border-bottom: 1px solid #d0d5dd;
  }
  .transac h2{
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  select, input {
    width: 150px;
    height: 38px;
    border-radius: 100px;
    border: 1px solid #d0d5dd;
    padding-left: 15px;
  }
  .transac {
    margin-top: 50px;
  }
  .table-container {
    margin-top: 30px;
  }
  @media (max-width: 992px) {
.trans-summary {
  flex-direction: column;
}
.month-summary {
  border: none;
}

  }
  @media (max-width: 500px) {
  .month-summary-1, .total-month-1 {
 grid-template-columns: repeat(1, 1fr);

}
  }
`;

const DisbursementRepayment = () => {
  const dispatch = useDispatch();
  const { loans, month, year, allLoans, loading, error } = useSelector(
    (state) => state.loan
  );
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    dispatch(fetchLoansByMonth({ year, month }));
    dispatch(allLaonfTransactions());
  }, [dispatch, month, year]);

  const handleMonthChange = (e) => {
    dispatch(setMonth(Number(e.target.value)));
  };

  const handleYearChange = (e) => {
    dispatch(setYear(Number(e.target.value)));
  };

  console.log(allLoans);

  // ✅ Totals for the selected month
  const monthlyAmountDisbursed = loans?.reduce(
    (sum, loan) => sum + (loan?.loanDetails.amountDisbursed || 0),
    0
  );
  const monthlyAmountToBePaid = loans?.reduce(
    (sum, loan) => sum + (loan?.loanDetails.amountToBePaid || 0),
    0
  );
  const monthlyAmountPaid = loans?.reduce(
    (sum, loan) => sum + (loan.loanDetails.amountPaidSoFar || 0),
    0
  );
  const monthlyLoanBalance = monthlyAmountToBePaid - monthlyAmountPaid;

  // ✅ Cumulative totals for all months and years
  const totalAmountDisbursed = allLoans?.reduce(
    (sum, loan) => sum + (loan.loanDetails.amountDisbursed || 0),
    0
  );
  const totalAmountToBePaid = allLoans?.reduce(
    (sum, loan) => sum + (loan.loanDetails.amountToBePaid || 0),
    0
  );
  const totalAmountPaid = allLoans?.reduce(
    (sum, loan) => sum + (loan.loanDetails.amountPaidSoFar || 0),
    0
  );
  const totalLoanBalance = totalAmountToBePaid - totalAmountPaid;
  return (
    <DisbursementRepaymentRap>
      <div className="disburst">
        <div className="trans-summary">
          <div className="month-summary">
            <h3>
              Summary Transaction for<span style={{color: "#112240"}}> {monthNames[month - 1]}, {year} </span>
            </h3>
            <div  className="month-summary-1">
            <p>Amount Disbursed: <span>
               {monthlyAmountDisbursed?.toLocaleString()}
               </span>
               </p>
            <p>Principal + <br /> Interest: 
              <span>
                {monthlyAmountToBePaid?.toLocaleString()}
            </span>
            </p>
            <p>Actual Paid: 
              <span>
                {monthlyAmountPaid?.toLocaleString()}
            </span>
            </p>
            <p>Loan Balance: 
              <span>
                {monthlyLoanBalance?.toLocaleString()}
            </span>
            </p>
            </div>
          </div>
          <div className="total-month">
            <h3>Overall Transaction</h3>
            <div className="total-month-1">
            <p>
              Total Amount Disbursed: 
              <span>
                {totalAmountDisbursed?.toLocaleString()}
              </span>
            </p>
            <p>
              Total Principal + Interest: 
              <span>
                {totalAmountToBePaid?.toLocaleString()}
              </span>
            </p>
            <p>Total Actual Paid: 
              <span>
                {totalAmountPaid?.toLocaleString()}
            </span>
            </p>
            <p>Total Loan Balance: 
              <span>
                {totalLoanBalance?.toLocaleString()}
            </span>
            </p>
            </div>
          </div>
        </div>

        <div className="transac">
          <h2>
             Transactions for <span style={{color: "#112240"}}>{monthNames[month - 1]}, {year} </span> 
          </h2>
          <label>Month: </label>
          <select value={month} onChange={handleMonthChange}>
            {monthNames.map((name, index) => (
              <option key={index} value={index + 1}>
                {name}
              </option>
            ))}
          </select>
          <label>Year: </label>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            min="2000"
            max={new Date().getFullYear()}
          />

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}

          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table" border="1">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>CSO In Charge</th>
                      <th>Branch</th>
                      <th>Amount Disbursed</th>
                      <th>Date Disbursed</th>
                      <th>Principal + <br /> Interest</th>
                      <th>Actual Paid</th>
                      <th>Loan Balance</th>
                      <th>Loan End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans?.length > 0 ? (
                      [...loans]?.reverse().map((loan) => (
                        <tr key={loan._id}>
                          <td>
                            {loan.customerDetails.firstName}{" "}
                            {loan.customerDetails.lastName}
                          </td>
                          <td>{loan.csoName}</td>
                          <td>{loan.branch}</td>
                          <td>{loan.loanDetails.amountDisbursed}</td>
                          <td>
                            {new Date(loan.disbursedAt).toLocaleDateString()}
                          </td>
                          <td>{loan.loanDetails.amountToBePaid}</td>
                          <td>{loan.loanDetails.amountPaidSoFar}</td>
                          <td>
                            {loan.loanDetails.amountToBePaid -
                              loan.loanDetails.amountPaidSoFar}
                          </td>
                          <td>
                            {new Date(
                              loan.repaymentSchedule[
                                loan.repaymentSchedule.length - 1
                              ]?.date
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9">
                          No transactions available for this period.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DisbursementRepaymentRap>
  );
};

export default DisbursementRepayment;
