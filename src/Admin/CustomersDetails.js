import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomersSummary,
  fetchPendingLoans,
  fetchRejectedCustomers,
} from "../redux/slices/LoanSlice";
import { MoonLoader } from "react-spinners";

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
  .link {
    width: 78px;
    height: 36px;
    text-decoration: none;
    display: flex;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    color: #030b26;
    font-size: 14px;
    font-weight: 450;
    border-right: 1px solid #d0d5dd;
  }
  .link.active {
    background: #d0d5dd;
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
  .find-lawyer-header h4 {
    font-size: 20px;
    font-weight: 700;
  }
  .custom-1 {
    margin: 20px;
  }
`;

const CustomersDetails = () => {
  const [activeLink, setActiveLink] = useState("customer");
  const [activatedLink, setActivatedLink] = useState("active");

  const dispatch = useDispatch();
  const { rejectedCustomers, pendingLoans, summaries, loading, error } =
    useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchCustomersSummary());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPendingLoans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRejectedCustomers());
  }, [dispatch]);

  if (loading) return <p style={{display: "flex", 
    flexDirection: "column", 
    height: "90vh",
    justifyContent: "center",
   alignItems: "center"}} > <MoonLoader /></p>;;
  if (error) return <p>Error loading customers: {error}</p>;
  console.log(rejectedCustomers);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleActivatedLink = (links) => {
    setActivatedLink(links);
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
      <div className="custom-1">
        <div className="find-lawyer-header">
          <h4 style={{ marginBottom: "15px" }}> List of Customers</h4>
          <div className="sub-bill-1">
            <div className="status-btn" style={{ marginBottom: "20px" }}>
              <Link
                className={`link ${activatedLink === "active" ? "active" : ""}`}
                onClick={() => handleActivatedLink("active")}
              >
                Active
              </Link>
              <Link
                className={`link ${
                  activatedLink === "pending" ? "active" : ""
                }`}
                onClick={() => handleActivatedLink("pending")}
              >
                Pending
              </Link>
              <Link
                className={`link ${
                  activatedLink === "decline" ? "active" : ""
                }`}
                onClick={() => handleActivatedLink("decline")}
              >
                Decline
              </Link>
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
        <div>
          {activatedLink === "active" && (
            <div className="table-container">
              <div className="new-table-scroll">
                <div className="table-div-con">
                  <table className="custom-table" border="1">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>No. of Loans</th>
                        <th>Defaults</th>
                        <th>Current Loan</th>
                        <th>
                          Principal + <br /> Interest
                        </th>
                        <th>Actual Paid</th>
                        <th>Loan Balance</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th> Loan Status</th>
                        <th>Performance</th>
                        <th>Action</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {summaries.map((summary, index) => (
                        <tr key={index}>
                          <td>{summary.name}</td>
                          <td>{summary.noOfLoansCollected}</td>
                          <td>{summary.noOfDefaults}</td>

                          <td>{summary.currentLoan?.amountDisbursed}</td>
                          <td>{summary.currentLoan?.amountToBePaid}</td>
                          <td>{summary.currentLoan?.amountPaidSoFar}</td>
                          <td>
                            {summary.currentLoan?.amountToBePaid -
                              summary.currentLoan?.amountPaidSoFar}
                          </td>
                          <td>{summary.currentLoan?.startDate}</td>
                          <td>{summary.currentLoan?.endDate}</td>
                          <td
                            style={{
                              color:
                                summary.currentLoan?.currentLoanStatus ===
                                "Not defaulting yet"
                                  ? "green"
                                  : summary.currentLoan?.currentLoanStatus ===
                                    "Defaulting"
                                  ? "red"
                                  : "blue",
                            }}
                          >
                            {summary.currentLoan?.currentLoanStatus}
                          </td>
                          <td
                            style={{
                              color: "#030b26",
                              fontWeight: "700",
                            }}
                          >
                            {summary.performance}%
                          </td>
                          <td>
                            <Link to={`/customer/${summary.bvn}`}>
                              View Details
                            </Link>
                          </td>
     
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activatedLink === "pending" && (
            <div style={{ background: "white" }}>
              <h4>Pending Loans</h4>
              <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table" border="1">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount Requested</th>
                          <th>Amount Approved</th>
                          <th>Date Requested</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingLoans.map((loan, index) => (
                          <tr key={index}>
                            <td>{loan.name}</td>
                            <td>{loan.amountRequested}</td>
                            <td>{loan.amountApproved}</td>
                            <td>{loan.dateRequested}</td>
                            <td>{loan.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activatedLink === "decline" && (
            <div style={{ background: "white" }}>
              <h4>Declined Loans</h4>
              <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table" border="1">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Amount Requested</th>
                          <th>Date Created</th>
                          <th>Reason for Rejection</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejectedCustomers.map((customer, index) => (
                          <tr key={index}>
                            <td>
                              {customer.customerDetails.firstName}{" "}
                              {customer.customerDetails.lastName}
                            </td>
                            <td>{customer.loanDetails.amountRequested}</td>
                            <td>
                              {new Date(customer.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </td>
                            <td style={{ color: "red" }}>
                              {customer.rejectionReason}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BranchCustomerRap>
  );
};

export default CustomersDetails;
