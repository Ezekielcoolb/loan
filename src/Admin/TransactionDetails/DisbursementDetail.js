import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const DisbursementRepaymentRap = styled.div`
width: 100%;
padding: 20px;
  /* Wrapper for overall calendar styling */
  .react-calendar {
    width: 100%;
    max-width: 350px; /* Reduce width */
    background-color: #f9f9f9; /* Light background */
    border: 1px solid #ddd; /* Custom border */
    border-radius: 8px; /* Rounded corners */
    font-family: Arial, sans-serif;
    font-size: 14px; /* Default font size */
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  }
  .calendar-bust {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .total-dis-repay {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    padding: 20px;
    color: #727789
  }
  .total-dis-repay span {
    color: #030b26;
    font-size: 20px;
    font-weight: 800;
  }
  .amount-dis-repay {
    display: flex;
    gap: 20px;
  }
  .search-div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .search-position {
  position: absolute;
  right: 150px;
  top: 10px;
}
`;

const loans = [
  {
    id: 1,
    name: "John Doe",
    cso: "Jane Smith",
    branch: "Lagos",
    amountDisbursed: 50000,
    interest: 0.1,
    dateDisbursed: "2024-12-01",
    amountPaid: 20000,
  },
  {
    id: 2,
    name: "Mary Johnson",
    cso: "David Brown",
    branch: "Abuja",
    amountDisbursed: 100000,
    interest: 0.15,
    dateDisbursed: "2024-12-19",
    amountPaid: 50000,
  },
];
const DisbursementRepayment = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Start with null to show all loans
  const [filteredLoans, setFilteredLoans] = useState(loans);

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      // Filter loans based on the selected date
      const filtered = loans.filter(
        (loan) =>
          moment(loan.dateDisbursed).format("YYYY-MM-DD") ===
          moment(date).format("YYYY-MM-DD")
      );
      setFilteredLoans(filtered);
    } else {
      // Reset to all loans if no date is selected
      setFilteredLoans(loans);
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      // Show all loans if no specific date is selected
      setFilteredLoans(loans);
    }
  }, [selectedDate]);
  // Calculate total amounts
  const totalAmountDisbursed = filteredLoans.reduce(
    (total, loan) => total + loan.amountDisbursed,
    0
  );

  const totalAmountRepaid = filteredLoans.reduce(
    (total, loan) => total + loan.amountPaid,
    0
  );


  return (
    <DisbursementRepaymentRap>
      <div className="find-lawyer-header">
      <h2>Disbursement & Repayment</h2>

      {/* Calendar for selecting dates */}
      <div className="calendar-bust" style={{ marginBottom: "20px" }}>
        <div className="search-div" style={{ margin: "20px" }}>
             {/* Totals */}
      <div className="amount-dis-repay">
        <h4 className="total-dis-repay">Total Amount Disbursed: 
            <span>
            ₦{totalAmountDisbursed.toLocaleString()}
            </span></h4>
        <h4 className="total-dis-repay">Total Amount Repaid:
            <span>
            ₦{totalAmountRepaid.toLocaleString()}</span> </h4>
      </div>
          <div style={{ position: "relative" }}>
            <input type="text" placeholder="search" />
            <Icon
              className="search-position"
              icon="material-symbols-light:search"
              width="18"
              height="18"
              style={{ color: "#9499AC" }}
            />
          </div>
        </div>
        <Calendar onChange={handleDateChange} />
      </div>
</div>
      <div className="table-container">
      <div  className="new-table-scroll">
      <div className="table-div-con">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>CSO In Charge</th>
              <th>Branch</th>
              <th>Amount Disbursed</th>
              <th>Interest</th>
              <th>Date Disbursed</th>
              <th>Amount Paid So Far</th>
              <th>Loan Balance</th>
              <th>Loan End Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.name}</td>
                  <td>{loan.cso}</td>
                  <td>{loan.branch}</td>
                  <td>₦{loan.amountDisbursed.toLocaleString()}</td>
                  <td>{(loan.amountDisbursed * loan.interest).toFixed(2)}</td>
                  <td>{moment(loan.dateDisbursed).format("MMM DD, YYYY")}</td>
                  <td>₦{loan.amountPaid.toLocaleString()}</td>
                  <td>
                    ₦{(loan.amountDisbursed - loan.amountPaid).toLocaleString()}
                  </td>
                  <td>
                    {moment(loan.dateDisbursed)
                      .add(1, "month")
                      .format("MMM DD, YYYY")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedDate
                    ? "No loans disbursed on this date"
                    : "No loans available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </DisbursementRepaymentRap>
  );
};

export default DisbursementRepayment;
