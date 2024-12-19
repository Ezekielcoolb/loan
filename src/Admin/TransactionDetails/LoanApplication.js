import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const LoanSubmissionsWrapper = styled.div`
  width: 100%;
  padding: 20px;

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
  /* Styling for calendar and table */
  .calendar-container {
    margin-bottom: 20px;
  }
 
  .filter-buttons {
    margin-bottom: 20px;
  }
  .filter-buttons button {
    padding: 10px 15px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .filter-approved {
    background-color: #28a745;
    color: white;
  }
  .filter-declined {
    background-color: #dc3545;
    color: white;
  }
  .filter-all {
    background-color: #007bff;
    color: white;
  }
  .calendar-bust {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const loanApplications = [
  {
    id: 1,
    customerName: "John Doe",
    csoName: "Jane Smith",
    dateSubmitted: "2024-12-01",
    status: "approved",
    amountRequested: 50000,
    amountDisbursed: 45000,
    reason: "Approved",
  },
  {
    id: 2,
    customerName: "Mary Johnson",
    csoName: "David Brown",
    dateSubmitted: "2024-12-03",
    status: "declined",
    amountRequested: 60000,
    amountDisbursed: null,
    reason: "Insufficient credit history",
  },
  {
    id: 3,
    customerName: "Alex White",
    csoName: "Sophia Lee",
    dateSubmitted: "2024-12-05",
    status: "waiting approval",
    amountRequested: 75000,
    amountDisbursed: null,
    reason: "Waiting for approval",
  },
];

const LoanSubmissions = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredStatus, setFilteredStatus] = useState("all");

  const handleFilter = (status) => {
    setFilteredStatus(status);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredLoans = loanApplications.filter((loan) => {
    if (filteredStatus !== "all" && loan.status !== filteredStatus) {
      return false;
    }
    if (
      selectedDate &&
      moment(loan.dateSubmitted).format("YYYY-MM-DD") !==
        moment(selectedDate).format("YYYY-MM-DD")
    ) {
      return false;
    }
    return true;
  });

  return (
    <LoanSubmissionsWrapper>
      <h2>Loan Applications</h2>

      <div className="calendar-bust" style={{ marginBottom: "20px" }}>
        <div className="search-div" style={{ margin: "20px" }}>
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
        <div className="calendar-container">
          <Calendar onChange={handleDateChange} />
        </div>
      </div>
      {/* Filter buttons */}
      <div className="filter-buttons">
        <button className="filter-all" onClick={() => handleFilter("all")}>
          All
        </button>
        <button
          className="filter-approved"
          onClick={() => handleFilter("approved")}
        >
          Approved
        </button>
        <button
          className="filter-declined"
          onClick={() => handleFilter("declined")}
        >
          Declined
        </button>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>CSO Name</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Amount Requested</th>
              <th>Amount Disbursed</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.customerName}</td>
                  <td>{loan.csoName}</td>
                  <td>{moment(loan.dateSubmitted).format("MMM DD, YYYY")}</td>
                  <td
                    style={{
                      color:
                        loan.status === "approved"
                          ? "green"
                          : loan.status === "declined"
                          ? "red"
                          : "orange",
                    }}
                  >
                    {loan.status}
                  </td>
                  <td>₦{loan.amountRequested.toLocaleString()}</td>
                  <td>
                    {loan.status === "approved"
                      ? `₦${loan.amountDisbursed.toLocaleString()}`
                      : loan.status}
                  </td>
                  <td>{loan.reason}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  {selectedDate
                    ? "No applications submitted on this date"
                    : "No applications available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LoanSubmissionsWrapper>
  );
};

export default LoanSubmissions;
