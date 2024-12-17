import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const BranchCustomerRap = styled.div`
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
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-content {
    background: white;

    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  .modal-content table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;
  }

  .modal-content table th,
  .modal-content table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .modal-content table td {
    color: #030b26;
    font-weight: 500;
  }
  button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .client-drop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #030b260a;
    border-bottom: 0.5px solid #dbe0ee;
    height: 45px;
    padding: 0px 15px;
  }
`;

const branches = [
  {
    id: 1,
    branchName: "Branch A",
    customers: [
      {
        id: 101,
        name: "John Doe",
        loans: [
          {
            loanAmount: 100000,
            interestRate: 0.1,
            amountPaid: 50000,
            startDate: "2024-11-10", // Loan passed deadline, unpaid
            cso: "Officer A",
          },
          {
            loanAmount: 150000,
            interestRate: 0.08,
            amountPaid: 162000,
            startDate: "2024-08-01",
            cso: "Officer A",
          },
          {
            loanAmount: 200000,
            interestRate: 0.09,
            amountPaid: 180000,
            startDate: "2024-10-01",
            cso: "Officer B",
          },
        ],
      },
      {
        id: 102,
        name: "Jane Smith",
        loans: [
          {
            loanAmount: 150000,
            interestRate: 0.08,
            amountPaid: 162000,
            startDate: "2024-11-15", // Fully paid
            cso: "Officer B",
          },
        ],
      },
      {
        id: 103,
        name: "Alice Johnson",
        loans: [
          {
            loanAmount: 200000,
            interestRate: 0.09,
            amountPaid: 0,
            startDate: "2024-12-02", // Loan not reached deadline
            cso: "Officer C",
          },
        ],
      },
    ],
  },
];

const BranchCustomers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const calculateCustomerDetails = (customer) => {
    const today = moment();
    let defaults = 0;

    const loanDetails = customer.loans.map((loan) => {
      const interest = loan.loanAmount * loan.interestRate;
      const totalAmount = loan.loanAmount + interest;
      const balance = totalAmount - loan.amountPaid;
      const endDate = moment(loan.startDate).add(1, "month");

      let status;
      if (balance === 0) {
        status = "No Open Loan";
      } else if (today.isAfter(endDate) && balance > 0) {
        status = "Defaulting";
        defaults += 1; // Count this loan as a default
      } else {
        status = "Not Defaulting Yet";
      }

      return {
        ...loan,
        interest,
        balance,
        totalAmount,
        endDate,
        status,
      };
    });

    const performance =
      customer.loans.length > 0
        ? ((customer.loans.length - defaults) / customer.loans.length) * 100
        : 0;

    return { loanDetails, defaults, performance };
  };
  const handleRowClick = (customer) => {
    const customerDetails = calculateCustomerDetails(customer);
    setSelectedCustomer({ ...customer, ...customerDetails });
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };
  const renderCustomerTable = (branch) => {
    return branch.customers.map((customer) => {
      const { loanDetails, performance } = calculateCustomerDetails(customer);
      const currentLoan = loanDetails[loanDetails.length - 1]; // Latest loan

      return (
        <tr
          key={customer.id}
          onClick={() => handleRowClick(customer)}
          style={{ cursor: "pointer" }}
        >
          <td>{customer.name}</td>
          <td>{customer.loans.length}</td>
          <td>
            {loanDetails.filter((loan) => loan.status === "Defaulting").length}
          </td>
          <td>{currentLoan.loanAmount.toLocaleString()}</td>
          <td>{currentLoan.interest.toLocaleString()}</td>
          <td>{currentLoan.amountPaid.toLocaleString()}</td>
          <td>{currentLoan.balance.toLocaleString()}</td>
          <td>{moment(currentLoan.startDate).format("YYYY-MM-DD")}</td>
          <td>{moment(currentLoan.endDate).format("YYYY-MM-DD")}</td>
          <td
            style={{
              color:
                currentLoan.status === "Defaulting"
                  ? "red"
                  : currentLoan.status === "Not Defaulting Yet"
                  ? "blue"
                  : "green",
              fontWeight: "bold",
            }}
          >
            {currentLoan.status}
          </td>
          <td style={{ color: "#030b26", fontWeight: "700" }}>
            {performance.toFixed(2)}%
          </td>
        </tr>
      );
    });
  };

  return (
    <BranchCustomerRap>
      <div>
        {branches.map((branch) => (
          <div key={branch.id}>
            <h4 style={{ padding: "15px" }}>{branch.branchName} customers</h4>

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
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Loans</th>
                    <th>
                      No of <br /> Defaults
                    </th>
                    <th>
                      Current <br />
                      Laon (₦)
                    </th>
                    <th>Interest (₦)</th>
                    <th>
                      Amount <br /> Paid (₦)
                    </th>
                    <th>
                      Loan <br /> Balance (₦)
                    </th>
                    <th>
                      Start <br /> Date
                    </th>
                    <th>
                      End <br /> Date
                    </th>
                    <th>
                      Loan <br /> Status
                    </th>
                    <th>Performance (%)</th>
                  </tr>
                </thead>
                <tbody>{renderCustomerTable(branch)}</tbody>
              </table>

              {showModal && selectedCustomer && (
                <div className="modal">
                  <div className="modal-content">
                    <div className="client-drop-header">
                      <h2>Details for {selectedCustomer.name}</h2>
                      <Icon
                        onClick={closeModal}
                        icon="uil:times"
                        width="16"
                        height="16"
                        style={{ color: "black", cursor: "pointer" }}
                      />
                    </div>
                    <div style={{ padding: "20px" }}>
                      <table>
                        <thead>
                          <tr>
                            <th>Loan Amount (₦)</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>CSO</th>
                            <th>Default Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCustomer.loanDetails.map((loan, index) => (
                            <tr key={index}>
                              <td style={{ fontSize: "16px" }}>
                                {loan.loanAmount.toLocaleString()}
                              </td>
                              <td>
                                {moment(loan.startDate).format("YYYY-MM-DD")}
                              </td>
                              <td>
                                {moment(loan.endDate).format("YYYY-MM-DD")}
                              </td>
                              <td>{loan.cso}</td>
                              <td style={{ color: "blue" }}>{loan.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p>
                        <strong>Performance:</strong>{" "}
                        <span
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            color: "green",
                          }}
                        >
                          {selectedCustomer.performance.toFixed(2)}%
                        </span>
                      </p>
                      <button onClick={closeModal}>Close</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </BranchCustomerRap>
  );
};

export default BranchCustomers;
