// src/components/LoanTable.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCustomerActiveLoans,
  nextWeek,
  previousWeek,
} from "../../redux/slices/LoanSlice";
import styled from "styled-components";
import { MoonLoader } from "react-spinners";

const CustLoanRap = styled.div`
.cust-loan-1 h1 {
 font-size: 20px;
 font-weight: 700;
 margin-left: 20px;
 margin-bottom: 20px;
}
.cust-loan-1  {
  padding-top: 20px;
  margin: 20px;
  background: #ffffff;
  border-radius: 15px;
}
.pre-next {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px;
}
.pre-next  p {
  font-weight: 700;
}
.pre-next button {
  padding: 10px 10px;
  background: #0C1D55;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
}
`;

const CustomerLoan = () => {
  const dispatch = useDispatch();
  const { loans, loading, error, currentWeekStart } = useSelector(
    (state) => state.loan
  );

  useEffect(() => {
    dispatch(fetchCustomerActiveLoans());
  }, [dispatch]);

  // Generate the current week dates
  const getWeekDates = () => {
    let weekDates = [];
    let date = new Date(currentWeekStart);
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return weekDates;
  };

  // Generate the week range text (e.g., Dec 2 - Dec 8)
  const getWeekRangeText = () => {
    const start = new Date(currentWeekStart);
    const end = new Date(currentWeekStart);
    end.setDate(start.getDate() + 6);
    const format = (date) =>
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${format(start)} - ${format(end)}`;
  };

  return (
    <CustLoanRap>
      <div className="cust-loan-1">
        <h1>Customer Loans</h1>
        {/* Week Navigation */}
        <div className="pre-next">
          <button
            onClick={() => dispatch(previousWeek())}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Previous Week
          </button>
          <p>{getWeekRangeText()}</p>
          <button
            onClick={() => dispatch(nextWeek())}
            className="px-4 py-2 bg-green-500 text-white"
          >
            Next Week
          </button>
        </div>

        {/* Loading and Error Handling */}
        {loading && <p style={{display: "flex", 
                                             flexDirection: "column", 
                                             height: "60vh",
                                             justifyContent: "center",
                                            alignItems: "center"}} > <MoonLoader /></p>}
        {error && <p>{error}</p>}

        {/* Loan Table */}
        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table" border="1">
                <thead>
                  <tr>
                    <th className="border p-2">Customer Name</th>
                    <th className="border p-2">Amount Disbursed</th>
                    <th className="border p-2">Principal + <br /> Interest</th>
                    <th className="border p-2">Start Date</th>
                    <th className="border p-2">Loan Balance</th>
                    {/* Display the week days dynamically */}
                    {getWeekDates().map((date, index) => (
                      <th key={index} className="border p-2">
                        {date.toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                        })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {loan?.customerDetails?.firstName}{" "}
                        {loan?.customerDetails?.lastName}
                      </td>
                      <td className="border p-2">
                        {loan?.loanDetails?.amountDisbursed}
                      </td>
                      <td className="border p-2">
                        {loan?.loanDetails?.amountToBePaid}
                      </td>
                      <td className="border p-2">
                        {new Date(loan.createdAt)?.toLocaleDateString()}
                      </td>
                      <td className="border p-2">
                        {loan.loanDetails.amountToBePaid -
                          loan.loanDetails.amountPaidSoFar}
                      </td>
                      {/* Payment for each day of the week */}
                      {getWeekDates().map((date, index) => {
                        const payment = loan.repaymentSchedule?.find(
                          (p) =>
                            new Date(p.date).toDateString() ===
                            date.toDateString()
                        );
                        return (
                          <td key={index} className="border p-2">
                            {payment ? payment.amountPaid : 0}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </CustLoanRap>
  );
};
export default CustomerLoan;
