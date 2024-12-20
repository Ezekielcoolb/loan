import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import generatePDF from "react-to-pdf";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const LoanRap = styled.div`
  width: 100%;
  h4 {
    font-size: 16px;
    font-weight: 700;
  }
  h5 {
    font-size: 14px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
  .loan {
    margin: 20px;
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

  .custom-table tbody tr td input[type="checkbox"] {
    margin: 0;
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

  button {
    padding: 10px 20px;
    background-color: #030b26;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .statement-detail-head {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .remaining-balance {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .statement-drop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #030b260a;
    border-bottom: 0.5px solid #dbe0ee;
    height: 45px !important;
    padding: 15px 15px;
  }
  .statement-body {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 10px;
    padding: 20px;
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
  .di {
  }
  .edi-del-btn {
    display: flex;
    margin: 15px;
    gap: 10px;
  }
  .amount {
    font-size: 18px;
    color: #0c1d55;
    font-weight: 800;
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
  .month-change-bttn {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 20px;
  }
  .mini-statement span,
  .loan-balance p {
    color: #030b26;
    font-size: 20px;
    font-weight: 700;
  }
  .mini-statement h5 {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: center;
  }
  .disburst {
    display: flex;
    justify-content: space-between;
    align-self: center;
  }
  .loan-start {
    font-size: 16px;
    color: #030b26;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .loan-start span {
    color: #030b26;
    font-size: 18px;
    font-weight: 700;
  }
  .loan-balance {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .loan {
    background: #ffffff;
    border-radius: 12px;
    padding: 20px;
  }
`;
const ITEMS_PER_PAGE = 5;

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "John Doe",
    loan: 50000,
    interestRate: 0.08,
    loanStartDate: "2024-11-20",
    payments: {
      "2024-11-20": 2500,
      "2024-11-21": 2500,
      "2024-11-22": 2500,
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    loan: 75000,
    interestRate: 0.08,
    loanStartDate: "2024-12-01",
    payments: {
      "2024-12-01": 3000,
      "2024-12-02": 3000,
    },
  },
  {
    id: 3,
    name: "Michael Johnson",
    loan: 40000,
    interestRate: 0.08,
    loanStartDate: "2024-11-26",
    payments: {
      "2024-11-26": 2000,
      "2024-11-27": 2000,
      "2024-11-28": 2000,
    },
  },
];

const CustomerLoan = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("week")
  );
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerPayments, setCustomerPayments] = useState(mockCustomers);
  const [currentPage, setCurrentPage] = useState(1);

  const statementPdf = useRef();

  useEffect(() => {
    // Filter customers who have active loans within the selected week and haven't fully paid their loans
    const updatedCustomers = mockCustomers.filter((customer) => {
      const loanStart = moment(customer.loanStartDate);
      const weekEnd = currentWeekStart.clone().add(6, "days");

      // Calculate remaining balance
      const remainingBalance = calculateRemainingBalance(customer);

      // Include only customers with loans started within or before the selected week and unpaid balance
      return loanStart.isSameOrBefore(weekEnd, "day") && remainingBalance > 0;
    });

    setFilteredCustomers(updatedCustomers);
  }, [currentWeekStart]);

  const calculateRemainingBalance = (customer) => {
    const totalPaid = Object.values(customer.payments).reduce(
      (sum, payment) => sum + payment,
      0
    );
    const totalOwed = customer.loan + customer.loan * customer.interestRate;
    return totalOwed - totalPaid;
  };

  const getWeekDays = (weekStart) => {
    return Array.from({ length: 7 }, (_, i) =>
      weekStart.clone().add(i, "days").format("YYYY-MM-DD")
    );
  };

  const handleWeekChange = (direction) => {
    setCurrentWeekStart((prev) =>
      direction === "prev"
        ? prev.clone().subtract(1, "week")
        : prev.clone().add(1, "week")
    );
  };

  const weekDays = getWeekDays(currentWeekStart);

  //   pagination

  const rowsPerPage = 5;

  // Pagination Logic
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const indexOfLastCase = currentPage * rowsPerPage;
  const indexOfFirstCase = indexOfLastCase - rowsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCase,
    indexOfLastCase
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const getDailyPayments = (customer) => {
    const payments = [];
    const startDate = moment(customer.loanStartDate);
    const today = moment();

    for (
      let date = startDate.clone();
      date.isSameOrBefore(today, "day");
      date.add(1, "day")
    ) {
      const formattedDate = date.format("YYYY-MM-DD");
      payments.push({
        date: formattedDate,
        amount: customer.payments[formattedDate] || 0,
      });
    }

    return payments;
  };

  return (
    <LoanRap>
      <div className="loan">
        <header className="loan-header">
          <h1>Customer Loan Payment Dashboard</h1>
          <div className="sub-bill-1">
            <div className="controls">
              <div className="week-controls">
                <button onClick={() => handleWeekChange("prev")}>
                  Previous Week
                </button>
                <span>
                  {currentWeekStart.format("MMM DD")} -{" "}
                  {currentWeekStart
                    .clone()
                    .add(6, "days")
                    .format("MMM DD, YYYY")}
                </span>
                <button onClick={() => handleWeekChange("next")}>
                  Next Week
                </button>
              </div>
            </div>

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
          </div>
        </header>

        <main>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Amount Disb (P) (₦)</th>
                  <th>Interest (₦)</th>
                  <th>Amount + Interest (P + I) (₦)</th>
                  <th>Loan Start Date</th>
                  {weekDays.map((day) => (
                    <th key={day}>{moment(day).format("dddD")}</th>
                  ))}
                  <th>Loan Balance (₦)</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer) => {
                    const interest = customer.loan * customer.interestRate;
                    const totalOwed = customer.loan + interest;
                    const remaining = calculateRemainingBalance(customer);

                    return (
                      <tr
                        key={customer.id}
                        onClick={() => handleRowClick(customer)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{customer.name}</td>
                        <td>{customer.loan.toLocaleString()}</td>
                        <td>{interest.toLocaleString()}</td>
                        <td>{totalOwed.toLocaleString()}</td>
                        <td>
                          {moment(customer.loanStartDate).format(
                            "MMM DD, YYYY"
                          )}
                        </td>
                        {weekDays.map((day) => (
                          <td key={day}>
                            {customer.payments[day]
                              ? customer.payments[day].toLocaleString()
                              : 0}
                          </td>
                        ))}
                        <td>{remaining.toLocaleString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={weekDays.length + 5} className="no-loan">
                      No customers with active loans in this week.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="pagination-div">
              <Link
                onClick={() => handlePageChange(currentPage - 1)}
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
              <div>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <Link
                    className="paginations"
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    style={{
                      color: pageNumber === currentPage ? "#030b26" : "#727789",
                    }}
                  >
                    {pageNumber}
                  </Link>
                ))}
              </div>
              <Link
                onClick={() => handlePageChange(currentPage + 1)}
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
            {selectedCustomer && (
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
                  backdropFilter: "blur(5px)",
                }}
              >
                <div
                  ref={statementPdf}
                  style={{
                    background: "white",
                    borderRadius: "8px",
                    maxWidth: "600px",
                    width: "90%",
                    maxHeight: "550px", // Limit height to 700px

                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div className="statement-drop-header">
                    <h3>Mini Statement for {selectedCustomer.name}</h3>
                    <Icon
                      onClick={() => setSelectedCustomer(null)}
                      icon="uil:times"
                      width="16"
                      height="16"
                      style={{ color: "black", cursor: "pointer" }}
                    />
                  </div>
                  <div className="statement-body ">
                    <div
                      className="mini-statement"
                      style={{ marginBottom: "20px" }}
                    >
                      <div className="disburst">
                        <h5>
                          Amount Disb (P)
                          <span>₦{selectedCustomer.loan.toLocaleString()}</span>
                        </h5>
                        <h4>+</h4>
                        <h5>
                          Interest
                          <span>
                            ₦
                            {(
                              selectedCustomer.loan *
                              selectedCustomer.interestRate
                            ).toLocaleString()}
                          </span>
                        </h5>
                        <h4>=</h4>
                        <h5>
                          Amount + Interest (P + I)
                          <span>
                            ₦
                            {(
                              selectedCustomer.loan +
                              selectedCustomer.loan *
                                selectedCustomer.interestRate
                            ).toLocaleString()}
                          </span>
                        </h5>
                      </div>
                      <p className="loan-start">
                        Loan Start Date:
                        <span>
                          {moment(selectedCustomer.loanStartDate).format(
                            "MMM DD, YYYY"
                          )}
                        </span>
                      </p>
                    </div>

                    <h4>Payment History</h4>
                    <div
                      id="statement-content"
                      style={{
                        flexGrow: 1, // Ensures the table takes up available space
                        overflowY: "auto", // Enables vertical scrolling only for the table
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                      }}
                    >
                      <table
                        className="custom-table"
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                borderBottom: "1px solid #ccc",
                                paddingBottom: "10px",
                              }}
                            >
                              Date
                            </th>
                            <th
                              style={{
                                borderBottom: "1px solid #ccc",
                                paddingBottom: "10px",
                              }}
                            >
                              Amount Paid (₦)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getDailyPayments(selectedCustomer).map(
                            ({ date, amount }) => (
                              <tr key={date}>
                                <td style={{ padding: "5px 0" }}>
                                  {moment(date).format("ddd, MMM DD")}
                                </td>
                                <td
                                  style={{
                                    padding: "5px 0",
                                    textAlign: "right",
                                  }}
                                >
                                  {amount.toLocaleString()}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="loan-balance" style={{ marginTop: "20px" }}>
                      <h4>Loan Balance</h4>
                      <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                        ₦
                        {calculateRemainingBalance(
                          selectedCustomer
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="edi-del-btn">
                    <Link
                      className="edit-client"
                      onClick={() => {
                        generatePDF(statementPdf, {
                          filename: "ministatement",
                        });
                      }}
                    >
                      Download
                    </Link>
                    <Link
                      onClick={() => setSelectedCustomer(null)}
                      className="delete-client"
                    >
                      Cancel
                    </Link>
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

export default CustomerLoan;
