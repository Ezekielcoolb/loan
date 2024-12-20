import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const LoanRap = styled.div`
  width: 100%;
  h4 {
    font-size: 16px;
    font-weight: 600;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
  }
  th {
    font-size: 14px;
    font-weight: 500;
    color: #727789;
  }
  td {
    font-size: 13px;
    font-weight: 400;
    color: #727789;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
  .loan {
    margin: 20px;
    border-radius: 12px;
    background: #ffffff;
    padding: 15px;
  }

  .loan-header {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .loan-header h1 {
    font-size: 18px;
    font-weight: 800;
  }
  .month-navigation {
    display: flex;

    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: #030b26;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .table-container {
    margin: 15px auto;
    min-width: 760px;
    overflow-x: auto;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    border: 1px solid #d0d5dd;
  }
  table {
  }
  .custom-table thead th {
    padding: 10px;
    background-color: #f4f4f4;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #d0d5dd;
  }

  .custom-table tbody tr {
    padding: 10px;
    border: 1px solid #d0d5dd;
  }
  .custom-table tbody td {
    padding: 10px;
    border: none;
  }

  .custom-table tbody tr td input[type="checkbox"] {
    margin: 0;
  }
  .no-case {
    height: 300px;
    margin-top: 70px;
    text-align: center;
    padding: 20px;
    color: #888;
    font-style: italic;
    font-size: 14px;
    background-color: #f9f9f9;
  }
  .next-page-link {
    text-decoration: none;
    color: #636878;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pagination-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border: 1px solid #dbe0ee;
    padding: 0px 20px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .paginations {
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    margin: 0 10px;
    text-align: center;
  }
  .statement-drop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #030b260a;
    border-bottom: 0.5px solid #dbe0ee;
    height: 45px;
    padding: 0px 15px;
  }
  .statement-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
  .edit-client {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #0c1d55;
  }
  .previous-mnt {
    width: 135px !important;
  }
  .delete-client {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c1d55;
    border: 1px solid #dbe0ee;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #ffffff;
  }
  .edi-del-btn {
    display: flex;
    margin: 15px;
    gap: 10px;
  }
  .statement-table {
    width: 500px !important;
  }
  .month-label {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  .all-month-year {
    display: flex;
    gap: 15px;
  }
  .month-select {
    width: 150px;
    height: 38px;
    border: 1px solid #dbe0ee;
    border-radius: 10px;
  }
  .month-h4 {
    margin-top: 30px;
  }
`;

const mockData = [
  {
    month: "2024-12",
    officers: [
      {
        id: 1,
        name: "Officer A",
        loanGiven: 10000,
        interestRate: 0.08,
        customers: 5,
        amountPaid: 5000,
        monthlyTarget: 12000,
      },
      {
        id: 2,
        name: "Officer B",
        loanGiven: 20000,
        interestRate: 0.08,
        customers: 7,
        amountPaid: 10000,
        monthlyTarget: 16000,
      },
      // More officers for December...
    ],
  },
  {
    month: "2024-11",
    officers: [
      {
        id: 1,
        name: "Officer A",
        loanGiven: 15000,
        interestRate: 0.08,
        customers: 4,
        amountPaid: 6000,
        monthlyTarget: 13000,
      },
      {
        id: 2,
        name: "Officer B",
        loanGiven: 25000,
        interestRate: 0.08,
        customers: 6,
        amountPaid: 15000,
        monthlyTarget: 17000,
      },
      // More officers for November...
    ],
  },
  {
    month: "2024-10",
    officers: [
      {
        id: 1,
        name: "Officer A",
        loanGiven: 15000,
        interestRate: 0.08,
        customers: 4,
        amountPaid: 6000,
        monthlyTarget: 13000,
      },
      {
        id: 2,
        name: "Officer B",
        loanGiven: 25000,
        interestRate: 0.08,
        customers: 6,
        amountPaid: 15000,
        monthlyTarget: 17000,
      },
      // More officers for November...
    ],
  },
];
// Function to compute the additional fields for each officer
function calculateOfficerDetails(officers) {
  return officers.map((officer) => {
    const interest = officer.loanGiven * officer.interestRate;
    const amountToPayBack = officer.loanGiven + interest;
    const remainingBalance = amountToPayBack - officer.amountPaid;
    const cardsSold = officer.customers * 1000;
    const profit = amountToPayBack + cardsSold;
    const performance = (officer.amountPaid / officer.monthlyTarget) * 100;

    return {
      ...officer,
      interest,
      amountToPayBack,
      remainingBalance,
      cardsSold,
      profit,
      performance,
    };
  });
}

// Apply calculations to each month's officers
const processedData = mockData.map((monthData) => {
  return {
    ...monthData,
    officers: calculateOfficerDetails(monthData.officers),
  };
});
const ITEMS_PER_PAGE = 5;
// Main App Component
const CsoLoan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCso, setSelectedCso] = useState(null);
  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // getMonth returns 0-based index (0 = January)
  const currentYear = currentDate.getFullYear();

  // Format current month in "YYYY-MM" format
  const formattedCurrentMonth = `${currentYear}-${
    currentMonth < 10 ? `0${currentMonth}` : currentMonth
  }`;

  // Manage selected month and year state (default to current month and year)
  const [selectedMonth, setSelectedMonth] = useState(formattedCurrentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const handleMonthSelection = (month) => {
    setSelectedMonth((prev) =>
      prev.includes(month) ? prev : [...prev, month]
    );
  };

  const getOfficerTransactions = (csoId) => {
    return mockData.flatMap((data) =>
      data.officers
        .filter((officer) => officer.id === csoId)
        .map((officer) => ({
          ...officer,
          month: data.month, // Include the month for each transaction
        }))
    );
  };
  // Handle clicking on a row to select CSO
  const handleRowClick = (cso) => {
    setSelectedCso(cso);
  };

  // Calculate overall performance for the CSO (simplified logic)
  const calculatePerformance = (cso) => {
    const totalAmountPaid = cso.amountPaid;
    const totalTarget = cso.monthlyTarget * 12; // Assuming 12 months of data for simplicity
    const performance = (totalAmountPaid / totalTarget) * 100;
    return performance.toFixed(2);
  };

  const dataForCurrentMonth = mockData.find(
    (data) => data.month === currentMonth
  );

  // Handle month change
  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
  };

  // Handle year change
  const handleYearChange = (e) => {
    const newYear = e.target.value;
    setSelectedYear(newYear);
  };

  // Pagination Logic
  const officers = dataForCurrentMonth ? dataForCurrentMonth.officers : [];
  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const paginatedprocessedData = processedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };
  // Find the selected month data
  const selectedData = paginatedprocessedData.find(
    (monthData) => monthData.month === selectedMonth
  );

  // If no data for the selected month, show "No Transactions"
  const renderTable = () => {
    if (!selectedData || selectedData.officers.length === 0) {
      return (
        <tr>
          <td colSpan="11">No Transactions for this month</td>
        </tr>
      );
    }
    return selectedData.officers.map((officer) => (
      <tr key={officer.id} onClick={() => handleRowClick(officer)}>
        <td>{officer.name}</td>
        <td>{officer.customers}</td>
        <td>{officer.loanGiven}</td>
        <td>{officer.interest.toFixed(2)}</td>
        <td>{officer.amountToPayBack.toFixed(2)}</td>
        <td>{officer.amountPaid}</td>
        <td>{officer.remainingBalance.toFixed(2)}</td>
        <td>{officer.cardsSold}</td>
        <td>{officer.profit.toFixed(2)}</td>
        <td>{officer.monthlyTarget}</td>
        <td>{officer.performance.toFixed(2)}</td>
      </tr>
    ));
  };
  return (
    <LoanRap>
      <div className="loan">
        <header className="loan-header">
          <h1>Loan Management Dashboard</h1>
        </header>
        {/* Month and Year Selection */}
        <div className="all-month-year">
          <label className="month-label">
            Select Month:
            <select
              className="month-select"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {processedData.map((monthData, index) => (
                <option key={index} value={monthData.month}>
                  {monthData.month}
                </option>
              ))}
            </select>
          </label>

          <label className="month-label">
            Select Year:
            <select
              className="month-select"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {processedData.map((monthData, index) => (
                <option key={index} value={monthData.month.slice(0, 4)}>
                  {monthData.month.slice(0, 4)}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Display table for the selected month */}
        <h4 className="month-h4">
          Transactions for {selectedMonth} ({selectedYear})
        </h4>

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
        <main>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>CSO Name</th>
                  <th>New Loan</th>
                  <th>Amount Disb (P)</th>
                  <th>Interest</th>
                  <th>Amount Disb + I (P+I)</th>
                  <th>Payment</th>
                  <th>Loan Balance</th>
                  <th>Cards $ Others</th>
                  <th>Profit</th>
                  <th>Monthly Target</th>
                  <th>Performance (%)</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>

            {/* Pagination Controls */}

            <div className="pagination-div">
              <Link
                onClick={() => handlePageChange(-1)}
                disabled={currentPage === 1}
                className="next-page-link"
              >
                <Icon
                  icon="formkit:arrowleft"
                  width="18"
                  height="18"
                  style={{ color: "#636878" }}
                />
                Previous
              </Link>
              <Link
                onClick={() => handlePageChange(1)}
                disabled={currentPage === totalPages}
                className="next-page-link"
              >
                Next
                <Icon
                  icon="formkit:arrowright"
                  width="18"
                  height="18"
                  style={{ color: "#636878" }}
                />
              </Link>
            </div>

            {selectedCso && (
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    width: "560px",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    <div className="statement-drop-header">
                      <h4>
                        Statement of Account for
                        <span style={{ color: "green" }}>
                          {" "}
                          {selectedCso.name}
                        </span>
                      </h4>
                      <Icon
                        onClick={() => setSelectedCso(null)}
                        icon="uil:times"
                        width="16"
                        height="16"
                        style={{ color: "black", cursor: "pointer" }}
                      />
                    </div>

                    <div className="statement-body">
                      <div className="statement-table">
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Month</th>
                              <th>Loan Given (&#8358;)</th>
                              <th>Interest</th>
                              <th>Amount Paid (&#8358;)</th>
                              <th>Balance (&#8358;)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getOfficerTransactions(selectedCso.id).map(
                              (transaction) => {
                                const interest =
                                  transaction.loanGiven *
                                  transaction.interestRate;
                                const total = transaction.loanGiven + interest;
                                const balance = total - transaction.amountPaid;
                                return (
                                  <tr key={transaction.month}>
                                    <td>
                                      {moment(transaction.month).format(
                                        "MMMM YYYY"
                                      )}
                                    </td>
                                    <td>
                                      {transaction.loanGiven.toLocaleString()}
                                    </td>
                                    <td>{interest.toLocaleString()}</td>
                                    <td>
                                      {transaction.amountPaid.toLocaleString()}
                                    </td>
                                    <td>{balance.toLocaleString()}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                      <h5>
                        Overall Performance:{" "}
                        {selectedCso.performance.toFixed(2)}%
                      </h5>
                      <div className="edi-del-btn">
                        <Link
                          className="edit-client"
                          style={{ marginTop: "20px" }}
                          onClick={() => setSelectedCso(null)}
                        >
                          Download
                        </Link>
                        <Link
                          className="delete-client"
                          style={{ marginTop: "20px" }}
                          onClick={() => setSelectedCso(null)}
                        >
                          Share
                        </Link>
                        <Link
                          className="delete-client"
                          style={{ marginTop: "20px" }}
                          onClick={() => setSelectedCso(null)}
                        >
                          Close
                        </Link>
                      </div>

                      {/* Overall Performance Percentage */}
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </LoanRap>
  );
};

export default CsoLoan;
