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
  p {
    font-size: 14px;
    font-weight: 400;
  }
  .loan {
    
    
    margin: 20px;
  }

  .loan-header {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px
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
`;

// Mock Data
const mockData = [
  {
    month: "2024-12",
    officers: [
      { id: 1, name: "Officer A", loanGiven: 1000, interestRate: 0.08 },
      { id: 2, name: "Officer B", loanGiven: 2000, interestRate: 0.08 },
      { id: 3, name: "Officer C", loanGiven: 3000, interestRate: 0.08 },
      { id: 4, name: "Officer D", loanGiven: 4000, interestRate: 0.08 },
      { id: 5, name: "Officer E", loanGiven: 5000, interestRate: 0.08 },
      { id: 6, name: "Officer F", loanGiven: 6000, interestRate: 0.08 },
      { id: 7, name: "Officer G", loanGiven: 7000, interestRate: 0.08 },
      { id: 8, name: "Officer H", loanGiven: 8000, interestRate: 0.08 },
    ],
  },
  {
    month: "2024-11",
    officers: [
      { id: 1, name: "Officer A", loanGiven: 1500, interestRate: 0.08 },
      { id: 2, name: "Officer B", loanGiven: 2500, interestRate: 0.08 },
      { id: 3, name: "Officer C", loanGiven: 3500, interestRate: 0.08 },
      { id: 4, name: "Officer D", loanGiven: 4500, interestRate: 0.08 },
      { id: 5, name: "Officer E", loanGiven: 5500, interestRate: 0.08 },
      { id: 6, name: "Officer F", loanGiven: 7800, interestRate: 0.08 },
      { id: 7, name: "Officer G", loanGiven: 8300, interestRate: 0.08 },
      { id: 8, name: "Officer H", loanGiven: 9500, interestRate: 0.08 },
    ],
  },
];
const ITEMS_PER_PAGE = 5;
// Main App Component
const CsoLoan = () => {
  const [currentMonth, setCurrentMonth] = useState(moment().format("YYYY-MM"));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCso, setSelectedCso] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState([]);
  // Fetch Data for the Current Month

  const handleRowClick = (officer) => {
    const recentMonths = [
      moment().format("YYYY-MM"),
      moment().subtract(1, "months").format("YYYY-MM"),
    ];
    setSelectedCso(officer);
    setSelectedMonth(recentMonths);
  };

  const handleMonthSelection = (month) => {
    setSelectedMonth((prev) =>
      prev.includes(month) ? prev : [...prev, month]
    );
  };

  const getOfficerTransactions = (officerId, months) => {
    return mockData
      .filter((data) => months.includes(data.month))
      .flatMap((data) =>
        data.officers
          .filter((officer) => officer.id === officerId)
          .map((officer) => ({ ...officer, month: data.month }))
      );
  };

  const dataForCurrentMonth = mockData.find(
    (data) => data.month === currentMonth
  );

  const handleMonthChange = (direction) => {
    const newMonth =
      direction === "prev"
        ? moment(currentMonth).subtract(1, "months").format("YYYY-MM")
        : moment(currentMonth).add(1, "months").format("YYYY-MM");
    setCurrentMonth(newMonth);
    setCurrentPage(1);
  };
  // Pagination Logic
  const officers = dataForCurrentMonth ? dataForCurrentMonth.officers : [];
  const totalPages = Math.ceil(officers.length / ITEMS_PER_PAGE);
  const paginatedOfficers = officers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };
  return (
    <LoanRap>
      <div className="loan">
        <header className="loan-header">
          <h1 >Loan Management Dashboard</h1>
          <div className="month-navigation">
            <button onClick={() => handleMonthChange("prev")}>
              Previous Month
            </button>
            <span style={{color: "#030b26"}}>{moment(currentMonth).format("MMMM YYYY")}</span>
            <button onClick={() => handleMonthChange("next")}>
              Next Month
            </button>
          </div>
        </header>

        <main>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>CSO Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Loan Given (&#8358;)</th>
                  <th>Expected Interest (8%)</th>
                  <th>Total (&#8358;)</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOfficers.length > 0 ? (
                  paginatedOfficers.map((officer) => {
                    const interest = officer.loanGiven * officer.interestRate;
                    const total = officer.loanGiven + interest;
                    return (
                      <tr
                        key={officer.id}
                        onClick={() => handleRowClick(officer)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{officer.name}</td>
                        <td>email@example.com</td>
                        <td>000-000-0000</td>
                        <td>{officer.loanGiven.toLocaleString()}</td>
                        <td>{interest.toLocaleString()}</td>
                        <td>{total.toLocaleString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="no-case">
                      No loan was given out for the selected month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            {officers.length > ITEMS_PER_PAGE && (
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
            )}

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
                      <div>
                        <Link  className="edit-client previous-mnt"
                          onClick={() =>
                            handleMonthSelection(
                              moment(currentMonth)
                                .subtract(1, "months")
                                .format("YYYY-MM")
                            )
                          }
                        >
                          Add Previous Month
                        </Link>
                      </div>
                      <div className="statement-table">
                        <table className="custom-table">
                          <thead>
                            <tr >
                              <th>Month</th>
                              <th>Loan Given (&#8358;)</th>
                              <th>Interest</th>
                              <th>Total (&#8358;)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getOfficerTransactions(
                              selectedCso.id,
                              selectedMonth
                            ).map((transaction) => {
                              const interest =
                                transaction.loanGiven *
                                transaction.interestRate;
                              const total = transaction.loanGiven + interest;
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
                                  <td>{total.toLocaleString()}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div  className="edi-del-btn">
                        <Link className="edit-client"
                          style={{ marginTop: "20px" }}
                          onClick={() => setSelectedCso(null)}
                        >
                          Download
                        </Link>
                        <Link className="delete-client"
                          style={{ marginTop: "20px" }}
                          onClick={() => setSelectedCso(null)}
                        >
                          Share
                        </Link>
                        <Link className="delete-client"
                          style={{ marginTop: "20px" }}
                          onClick={() => setSelectedCso(null)}
                        >
                          Close
                        </Link>
                      </div>
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
