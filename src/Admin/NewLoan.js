import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteLoan,
  fetchWaitingLoans,
  setPages,
} from "../redux/slices/LoanSlice";
import { MoonLoader } from "react-spinners";
import { fetchAllCashAtHand, fetchReport } from "../redux/slices/reportSlice";

const NewLoanRap = styled.div`
  .pagination {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
    padding-bottom: 20px;
  }
  .dropdown-container {
    left: 15%;
  }
  .exit-link {
    text-decoration: none;
    color: red;
    font-weight: 700;
    border: 1px solid red;
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 10px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
  }
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
    color: #727789;
  }
  .left-drop-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 50%;
    padding: 0px 15px;
    border-right: 1px solid #d0d5dd;
  }
  .left-drop-div p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #030b26;
    font-weight: 700;
    font-size: 14px;
  }
  .right-drop-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .right-drop-div h4 {
    color: #030b26;
  }
  .left-drop-div span {
    font-size: 14px;
    font-weight: 400;
    color: #727789;
  }
  .customer-pic {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: rgb(222, 225, 235);
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .verify-btn {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 100px;
    height: 30px;
    background: #0c1d55;
    padding: 10px;
    border-radius: 10px;
  }
  .dropdown-div {
    display: flex !important;
    padding: 0px !important;
  }
  .flex-verify {
    display: flex;
    gap: 10px;
  }
  .flex-verify p {
    max-width: 120px;
    font-size: 12px;
  }
  .edit-client {
    height: 30px;
    width: 90px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: green;
  }
  .reject-btn {
    background-color: red !important;
  }
  .delete-client {
    height: 30px;
    width: 86px;
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
    border-top: 1px solid #dbe0ee;
    padding-top: 15px;
  }
  .approve-can-btn {
    display: flex;

    gap: 10px;
  }
  .amount-approved input {
    border-style: none;
    background: rgb(234, 234, 239);
    height: 35px;
    width: 250px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .approve,
  .reject {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 150px;
    height: 40px;
    background: #0c1d55;
    padding: 10px;
    border-radius: 10px;
  }
  .approve-cancel {
    width: 150px;
    height: 40px;
  }
  .reject {
    background: red;
  }
  .perform-action {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .perform-action div {
    display: flex;
    gap: 20px;
  }
  .new-loan {
    margin: 20px;
  }
  .all-dropdown-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .new-loan h2 {
    font-size: 20px;
    font-weight: 700;
  }
  @media (max-width: 1024px) {
    .dropdown-container {
      left: 0%;
      top: 60px;
    }
  }
`;

const NewLoan = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [cashAtHandError, setCashAtHandError] = useState(null);
  console.log(cashAtHandError);

  const toggleDropdown = (loanId) => {
    setDropdownOpen(dropdownOpen === loanId ? null : loanId);
  };

  const dispatch = useDispatch();
  const { loans, loading, totalPages, currentPage } = useSelector(
    (state) => state.loan
  );

  const {
    error,
    cashMessage,
    expenseMessage,

    allCashAtHand,
    cashDeteleloading,
    cashDelete,
    expressDelete,
    deleteExploading,
    expenses,
    month,
    year,
  } = useSelector((state) => state.report);

  console.log(allCashAtHand);

  const checkCashAtHand = () => {
    // ✅ Only check when allCashAtHand is available
    if (!allCashAtHand || allCashAtHand.length === 0) return;

    const now = new Date();
    const currentHour = now.getHours(); // local hour
    const currentDay = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    if (currentHour >= 4) {
      const utcNow = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );

      const checkDate = new Date(utcNow);

      if (currentDay === 6) {
        checkDate.setUTCDate(checkDate.getUTCDate() - 1);
      } else if (currentDay === 0) {
        checkDate.setUTCDate(checkDate.getUTCDate() - 2);
      } else if (currentDay === 1) {
        checkDate.setUTCDate(checkDate.getUTCDate() - 3);
      } else {
        checkDate.setUTCDate(checkDate.getUTCDate() - 1);
      }

      const formattedDate = checkDate.toISOString().split("T")[0];

      const found = allCashAtHand?.some((item) => item.date === formattedDate);

      if (!found) {
        setCashAtHandError(
          `❌ Missing cash at hand for ${formattedDate}. Please submit cash at hand to proceed with action on this page. Thanks!`
        );
      } else {
        setCashAtHandError(null);
      }
    } else {
      setCashAtHandError(null);
    }
  };

  useEffect(() => {
    checkCashAtHand(); // Run immediately

    const interval = setInterval(() => {
      checkCashAtHand();
    }, 3000); // Check every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [allCashAtHand]); // Re-check if cashAtHand changes

  useEffect(() => {
    dispatch(fetchWaitingLoans({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchAllCashAtHand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchReport({ month, year }));
  }, [dispatch, month, year]);

  const handlePageChange = (page) => {
    dispatch(setPages(page));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setPages(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setPages(currentPage + 1));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      dispatch(deleteLoan(id));
    }
  };

  if (!allCashAtHand && loading === "loading") return;
  <p
    style={{
      display: "flex",
      flexDirection: "column",
      height: "90vh",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {" "}
    <MoonLoader />
  </p>;
  // if (loading === "failed") return <p>Error loading loans</p>;

  return (
    <NewLoanRap>
      {cashAtHandError ? (
        <>
          <div className="dropdown-container">
            <div className="all-dropdown-div">
              <p
                style={{
                  color: "red",
                  fontSize: "20px",
                  fontWeight: "600",
                  margin: "20px",
                  maxWidth: "500px",
                }}
              >
                {" "}
                {cashAtHandError}
              </p>
              <Link to="/admin/operations" className="exit-link">
                Exit
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="new-loan">
          <div className="find-lawyer-header">
            <h2>Loan Requests</h2>
          </div>

          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Loan Requested</th>
                      <th>Business Name</th>
                      <th>Estimated Value</th>
                      <th>CSO in Charged</th>
                      <th>Branch Associated</th>
                      <th>Status</th>
                      <th>Action</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans
                      ?.slice()
                      .reverse()
                      .map((loan) => (
                        <tr key={loan?._id}>
                          <td>{`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}</td>
                          <td>{loan?.loanDetails?.amountRequested}</td>
                          <td>{loan?.businessDetails?.businessName}</td>
                          <td>{loan?.businessDetails?.estimatedValue}</td>
                          <td>{loan?.csoName}</td>
                          <td>{loan?.branch}</td>
                          <td style={{ color: "green" }}>{loan?.status}</td>
                          <td>
                            <Link to={`/admin/loan/${loan._id}`}>
                              View Details
                            </Link>
                          </td>
                          <td style={{ position: "relative" }}>
                            <button
                              style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                              }}
                              onClick={() => toggleDropdown(loan._id)}
                            >
                              &#8226;&#8226;&#8226;
                            </button>

                            {dropdownOpen === loan._id && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "100%",
                                  right: 0,
                                  background: "white",
                                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  borderRadius: "5px",
                                  padding: "5px",
                                  zIndex: 10,
                                }}
                              >
                                <button
                                  style={{
                                    background: "red",
                                    color: "white",
                                    padding: "10px",
                                    border: "none",
                                    width: "100%",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleDelete(loan._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>

              <div>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    disabled={currentPage === index + 1}
                    style={{
                      fontWeight: currentPage === index + 1 ? "bold" : "normal",
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </NewLoanRap>
  );
};

export default NewLoan;
