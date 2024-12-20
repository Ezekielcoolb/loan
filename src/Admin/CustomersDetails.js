import React, { useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

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
  .client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .client-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .client-link:hover {
    color: #555; /* Optional hover effect */
  }
  .client-link-container {
    display: flex;
    justify-content: flex-start;
  }
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
  .status-link {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #727789;
    height: 36px;
    width: 78px;
    font-weight: 500;
    font-size: 14px;

    line-height: 18px;

    border-right: 1px solid #d0d5dd;
  }
  .status-btn {
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    width: 234px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
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
  .search-div {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .search-position {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .search-div input {
    width: 259px !important;
    height: 38px !important;
    padding: 0px 10px;
    border-radius: 8px !important;
    border: 1px solid #dbe0ee !important;
  }

  .search-div p {
    color: #9499ac;
    font-weight: 600;
    font-size: 14px;
  }
  .sub-bill-1 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
  }
`;

const customers = [
  {
    id: 1,
    branchName: "Branch A",
    status: "active",
    customers: [
      {
        id: 101,
        name: "John Doe",
        status: "active",
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
        status: "active",
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
        status: "active",
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
      {
        id: 104,
        name: "Pack Johnson",
        status: "inactive",
        loans: [
          {
            loanAmount: 0,
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

const CustomersDetails = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeLink, setActiveLink] = useState("customer");
  const [filter, setFilter] = useState("all");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

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

  const filteredCustomers = customers.map((branch) => {
    const filteredBranchCustomers = branch.customers.filter((customer) => {
      return filter === "all" || customer.status === filter;
    });
    return { ...branch, customers: filteredBranchCustomers };
  });

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
  //   pagination

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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

  return (
    <BranchCustomerRap>
      <div className="client-1">
        <div className="client-link-container">
          <Link
            className={`client-link ${
              activeLink === "customer" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("customer")}
          >
            Customers
          </Link>
        </div>
      </div>

      {activeLink === "customer" && (
        <div style={{ padding: "20px" }}>
          {currentCustomers.map((branch) => (
            <div key={branch.id}>
              <div className="find-lawyer-header">
              <h4 style={{ marginBottom: "15px" }}> List of Customers</h4>
              <div className="sub-bill-1">
                <div className="status-btn" style={{ marginBottom: "20px" }}>
                  {["all", "active", "inactive"].map((status) => (
                    <Link
                      className="status-link"
                      key={status}
                      onClick={() => setFilter(status)}
                      style={{
                        backgroundColor:
                          filter === status ? "#030B260D" : "#ffffff",
                        color: filter === status ? "#030b26" : "#727789",
                      }}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Link>
                  ))}
                </div>
                <div className="search-div" style={{ marginBottom: "20px" }}>
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
</div>
              <div className="table-container">
              <div  className="new-table-scroll">
              <div className="table-div-con">
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
                </div>
                </div>
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
                          color:
                            pageNumber === currentPage ? "#030b26" : "#727789",
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
                        <div className="edi-del-btn">
                          <Link to="/allcustomers" className="edit-client">
                            See Details
                          </Link>
                          <button
                            className="delete-client"
                            onClick={closeModal}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </BranchCustomerRap>
  );
};

export default CustomersDetails;
