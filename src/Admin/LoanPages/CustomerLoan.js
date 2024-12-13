import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
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
`;
const ITEMS_PER_PAGE = 5;
const mockCustomers = [
  {
    id: 1,
    name: "Customer A",
    loan: 10000,
    interestRate: 0.08,
    payments: {
      "2024-12-11": 500,
      "2024-12-12": 300,
      "2024-12-13": 200,
    },
  },
  {
    id: 2,
    name: "Customer B",
    loan: 15000,
    interestRate: 0.08,
    payments: {
      "2024-12-10": 400,
      "2024-12-12": 500,
      "2024-12-13": 300,
    },
  },
];

const CustomerLoan = () => {
  const [selectedWeek, setSelectedWeek] = useState(moment().startOf("week"));
  const [customerPayments, setCustomerPayments] = useState(mockCustomers);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewingWeek, setViewingWeek] = useState("current");

  const getCurrentWeekDays = () => {
    const startOfWeek = moment(selectedWeek).startOf("week");
    return Array.from({ length: 7 }, (_, i) =>
      startOfWeek.clone().add(i, "days").format("YYYY-MM-DD")
    );
  };

 

  const handleWeekChange = (direction) => {
    setSelectedWeek((prev) =>
      direction === "prev"
        ? moment(prev).subtract(1, "weeks")
        : moment(prev).add(1, "weeks")
    );
  };

  const weekDays = getCurrentWeekDays();

  // Calculate pagination
  const totalPages = Math.ceil(customerPayments.length / ITEMS_PER_PAGE);
  const paginatedData = customerPayments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const calculateRemainingBalance = (customer) => {
    const totalPaid = Object.values(customer.payments).reduce(
      (sum, payment) => sum + payment,
      0
    );
    const interest = customer.loan * customer.interestRate;
    const totalOwed = customer.loan + interest;
    return totalOwed - totalPaid;
  };
  // Helper to calculate the start and end of a week
  const getWeekRange = (weekType) => {
    const today = moment();
    if (weekType === "current") {
      return {
        start: today.clone().startOf("week"),
        end: today.clone().endOf("week"),
      };
    } else if (weekType === "previous") {
      return {
        start: today.clone().subtract(1, "week").startOf("week"),
        end: today.clone().subtract(1, "week").endOf("week"),
      };
    }
  };

 

  const getPaymentsForMonth = (payments) => {
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    return Object.entries(payments).reduce((acc, [date, amount]) => {
      const paymentDate = moment(date);
      if (paymentDate.isBetween(startOfMonth, endOfMonth, "day", "[]")) {
        acc[date] = amount;
      }
      return acc;
    }, {});
  };

  return (
    <LoanRap>
      <div className="loan">
        <header className="loan-header">
          <h1>Customer Loan Payment Dashboard</h1>
          <div className="month-change-bttn">
            <button onClick={() => handleWeekChange("prev")}>
              Previous Week
            </button>
            <span>
              {moment(selectedWeek).startOf("week").format("MMM DD")} -
              {moment(selectedWeek).endOf("week").format("MMM DD, YYYY")}
            </span>
            <button onClick={() => handleWeekChange("next")}>Next Week</button>
          </div>
        </header>

        <main>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Loan (₦)</th>
                  <th>Interest (₦)</th>
                  <th>Total Amount (₦)</th>
                  {weekDays.map((day) => (
                    <th key={day}>{moment(day).format("ddd")}</th>
                  ))}
                  <th>Remaining (₦)</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((customer) => {
                    const interest = customer.loan * customer.interestRate;
                    const total = customer.loan + interest;
                    const totalPaid = weekDays.reduce(
                      (sum, day) => sum + (customer.payments[day] || 0),
                      0
                    );
                    const remaining = total - totalPaid;

                    return (
                      <tr
                        key={customer.id}
                        onClick={() => handleRowClick(customer)}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{customer.name}</td>
                        <td>{customer.loan.toLocaleString()}</td>
                        <td>{interest.toLocaleString()}</td>
                        <td>{total.toLocaleString()}</td>
                        {weekDays.map((day) => (
                          <td key={day}>{customer.payments[day] || 0}</td>
                        ))}
                        <td>{remaining.toLocaleString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={weekDays.length + 5} className="no-case">
                      No loan was given out for the selected month.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
              <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      className="paginations"
                      key={page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                     
                    </Link>
                  )
                )}
              </div>
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
                }}
              >
                <div
                  style={{
                    background: "white",
                    borderRadius: "8px",

                    maxWidth: "600px",
                    width: "90%",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    <div className="statement-drop-header">
                      <h4>
                        Mini Statement for{" "}
                        <span style={{ color: "green" }}>
                          {" "}
                          {selectedCustomer.name}
                        </span>
                      </h4>
                      <Icon
                        onClick={() => setSelectedCustomer(null)}
                        icon="uil:times"
                        width="16"
                        height="16"
                        style={{ color: "black", cursor: "pointer" }}
                      />
                    </div>
                    <div className="statement-body">
                      <div className="statement-detail-head">
                        <p>
                          Current Loan Amount:{" "}
                          <span className="amount">
                            {" "}
                            ₦{selectedCustomer.loan.toLocaleString()}{" "}
                          </span>{" "}
                        </p>{" "}
                        <p>+</p>
                        <p>
                          Interest:{" "}
                          <span className="amount">
                            {" "}
                            ₦
                            {(
                              selectedCustomer.loan *
                              selectedCustomer.interestRate
                            ).toLocaleString()}
                          </span>
                        </p>{" "}
                        <p>=</p>
                        <p>
                          Total Expected Payment:{" "}
                          <span className="amount">
                            {" "}
                            ₦
                            {(
                              selectedCustomer.loan +
                              selectedCustomer.loan *
                                selectedCustomer.interestRate
                            ).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <h5>Payments for the Month</h5>
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Amount Paid (₦)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(
                            getPaymentsForMonth(selectedCustomer.payments)
                          ).map(([date, amount]) => (
                            <tr key={date}>
                              <td>{moment(date).format("YYYY-MM-DD")}</td>
                              <td>{amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="remaining-balance">
                        <h5>Remaining Amount to be Paid</h5>
                        <p className="amount">
                          ₦
                          {calculateRemainingBalance(
                            selectedCustomer
                          ).toLocaleString()}
                        </p>
                      </div>
                      <Link
                        className="delete-client"
                        onClick={() => setSelectedCustomer(null)}
                      >
                        Close
                      </Link>
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

export default CustomerLoan;
