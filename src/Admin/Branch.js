import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import styled from "styled-components";
import WeeklySalesChart from "./csoMatrics/WeeklySalesChart";
import MonthlySalesChart from "./csoMatrics/MonthlySalesChart";
import YearlySalesChart from "./csoMatrics/YearlySalesChart";
import { Link } from "react-router-dom";

const BranchRap = styled.div`
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
  .table-container {
    margin: 15px 15px;
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
  .loan-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .loan-details p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
    color: #727789;
  }
  .loan-details span {
    color: #030b26;
    font-size: 18px;
    font-weight: 800;
  }
  .loan-details h4 {
    border-top: 1px solid #d0d5dd;
    padding-top: 15px;
  }
  .branch-details-div-1 {
    padding: 15px;
    width: 45%;
    border-right: 1px solid #d0d5dd;
  }
  .branch-details-div-2 {
    padding: 15px;
  }
  .client-drop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #030b260a;
    border-bottom: 0.5px solid #dbe0ee;
    height: 45px;
    padding: 15px;
  }
  .client-show-head {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .financial-matric {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .year-month-div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .year-month-link {
    text-decoration: none;
    color: #727789;
    font-size: 12px;
    font-weight: 500;
  }
  .year-month-link.active {
    color: green;
  }
  .branch-details {
    display: flex;
    border-bottom: 0.5px solid #dbe0ee;
  }
  .target-status {
    margin-top: 15px;
    padding-top: 10px;
    border-top: 0.5px solid #dbe0ee;
    color: #030b26;
    font-size: 16px;
  }
  .target-status span {
    font-size: 20px;
    font-weight: 700;
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
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }

  .client-link:hover {
    color: #555; /* Optional hover effect */
  }
  .client-link-container {
    display: flex;
    justify-content: flex-start;
  }
  .create-new-client {
    width: 128px;
    height: 38px;
    border-radius: 6px;
    background: #12d27d;
    color: #ffffff;
    text-decoration: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .client-dropdown-container {
    position: fixed;
    width: 100vw;
    min-height: 100vh;
    display: flex;

    justify-content: flex-end;

    background: rgba(0, 0, 0, 0.3); /* Semi-transparent dark background */
    backdrop-filter: blur(1px); /* Adds a blur effect */
    z-index: 9999;
    top: 0;
    left: 0;
    bottom: 0px;
  }
  .client-dropdown-container.hidden {
    display: none;
  }
  .client-all-dropdown-div {
    width: 430px;
    overflow-y: auto;
    top: 18px;
    right: 18px;
    min-height: 546px;
    margin-right: 20px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;

    background: #ffffff;
    padding-bottom: 15px;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    color: #60667a;
    flex-direction: column;
    gap: 15px;
    z-index: 1000;
  }
  .client-dropdown-header {
    display: flex;
    height: 55px;
    justify-content: space-between;
    align-items: center;
    background: #f7f7f8;
    border-bottom: 1px solid #d0d5dd;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px 15px;
  }
  .client-dropdown-div {
    padding: 15px;
    display: flex;

    flex-direction: column;
    gap: 15px;
    padding-bottom: 20px;
  }

  .client-dropdown-div input {
    width: 380px;
    height: 45px;
    border: 1px solid #dbe0ee;
    border-radius: 10px;
    margin-top: 10px;
    padding-left: 10px;
  }

  .client-small-input-div {
    padding-left: 5px;
    width: 182.5px !important;
    height: 45px;
    border-radius: 8px;
    border: 1px solid #dbe0ee;
    margin-top: 4px;
  }
  .client-input-div {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .client-create-btn {
    background: #0c1d55;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
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
  .save-cancel-div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .client-cancel-btn {
    border: 1px solid #dbe0ee;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #dbe0ee;
    background: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
  }
  .client-create-btn {
    background: #0c1d55;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
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
`;

const branches = [
  {
    id: 1,
    branchName: "Branch A",
    supervisor: "Jones James",
    email: "jacob@gmail.com",
    phone: "(406) 555-0120",
    address: "21b, Lagon",
    numberOfCso: "2",
    loan: [
      {
        currentCurrent: "5",

        monthTarget: 200000,
        interestRate: 0.08,
        monthDisburst: 300000,
        monthReturn: 150000,
      },
    ],
  },
  {
    id: 2,
    branchName: "Branch B",
    supervisor: "Sophia Smith",
    email: "sophia@gmail.com",
    phone: "(123) 555-0456",
    address: "10a, Lekki",
    numberOfCso: "3",
    loan: [
      {
        currentCurrent: "3",
        monthTarget: 250000,
        interestRate: 0.1,
        monthDisburst: 400000,
        monthReturn: 200000,
      },
    ],
  },
];

const LoanBranches = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [matrixOpen, setMatricOpen] = useState("yearly");
  const [activeLink, setActiveLink] = useState("branch");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [formData, setFormData] = useState({
    branchName: "",
    supervisor: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const isValid =
    formData.branchName.trim() !== "" &&
    formData.supervisor.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.address.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field dynamically
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setDropdownVisible(false);
    }
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleRowClick = (branch) => {
    setSelectedBranch(branch);
  };
  const handleMatricOpen = (links) => {
    setMatricOpen(links);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Pagination Logic
  const totalPages = Math.ceil(branches.length / rowsPerPage);
  const indexOfLastCase = currentPage * rowsPerPage;
  const indexOfFirstCase = indexOfLastCase - rowsPerPage;
  const currentBranch = branches.slice(indexOfFirstCase, indexOfLastCase);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate loan details and render table
  const renderBranchTable = () => {
    return currentBranch.map((branch) => {
      // Extract loan data
      const loan = branch.loan[0];
      const interest = loan.monthDisburst * loan.interestRate;
      const balance = loan.monthDisburst - loan.monthReturn;

      return (
        <tr key={branch.id} onClick={() => handleRowClick(branch)}>
          <td>{branch.branchName}</td>
          <td>{branch.address}</td>
          <td>{branch.supervisor}</td>
          <td>{branch.phone}</td>
          <td>{loan.monthDisburst.toLocaleString()}</td>
          <td>{interest.toFixed(2)}</td>
          <td>{loan.monthReturn.toLocaleString()}</td>
          <td>{balance.toLocaleString()}</td>
        </tr>
      );
    });
  };

  return (
    <BranchRap>
      <div className="client-1">
        <div className="client-link-container">
          <Link
            className={`client-link ${activeLink === "branch" ? "active" : ""}`}
            onClick={() => handleLinkClick("branch")}
          >
            Branch
          </Link>
        </div>
        <div>
          <Link onClick={toggleDropdown} className="create-new-client">
            Add New Branch
          </Link>
        </div>

        {/* Dropdown for Create New Case */}
        <div
          className={`client-dropdown-container ${
            dropdownVisible ? "" : "hidden"
          }`}
          style={{ marginTop: "10px" }}
        >
          <div className="client-all-dropdown-div">
            <div className="client-dropdown-header">
              <h4>Add New Branch</h4>
              <Icon
                onClick={() => setDropdownVisible(false)}
                icon="uil:times"
                width="16"
                height="16"
                style={{ color: "black", cursor: "pointer" }}
              />
            </div>

            <div className="client-dropdown-div">
              <label>
                Branch Name
                <span className="star">*</span> <br />
                <input
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.branchName}
                  name="branchName"
                />
              </label>
              <label>
                Supervisor's Name
                <span className="star">*</span> <br />
                <input
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.supervisor}
                  name="supervisor"
                />
              </label>
              <label>
                Email Address
                <span className="star">*</span> <br />
                <input
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                />
              </label>

              <label>
                Phone Number
                <span className="star">*</span> <br />
                <input
                  type="number"
                  placeholder=""
                  onChange={handleChange}
                  name="PhoneNumber"
                  value={formData.phone}
                />
              </label>

              <label>
                Address
                <input
                  type="text"
                  placeholder=""
                  onChange={handleChange}
                  name="address"
                  value={formData.address}
                />
              </label>

              <div className="client-input-div">
                <label>
                  City
                  <span className="star">*</span> <br />
                  <input
                    className="client-small-input-div"
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.city}
                    name="city"
                  />
                </label>

                <label>
                  State
                  <span className="star">*</span> <br />
                  <input
                    className="client-small-input-div"
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="state"
                    value={formData.state}
                  />
                </label>
              </div>

              <div className="client-input-div">
                <label>
                  Zip code
                  <span className="star">*</span> <br />
                  <input
                    className="client-small-input-div"
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.zipCode}
                    name="city"
                  />
                </label>

                <label>
                  Country
                  <span className="star">*</span> <br />
                  <input
                    className="client-small-input-div"
                    type="text"
                    placeholder=""
                    onChange={handleChange}
                    name="country"
                    value={formData.country}
                  />
                </label>
              </div>

              <div className="save-cancel-div">
                <Link
                  className="client-cancel-btn"
                  onClick={() => setDropdownVisible(false)}
                >
                  Cancel
                </Link>
                <Link
                  className="client-create-btn"
                  onClick={handleSubmit}
                  disabled={!isValid}
                  style={{
                    backgroundColor: isValid ? "#0c1d55" : "#727789",
                  }}
                >
                  Save
                </Link>
              </div>
            </div>
          </div>
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
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Branch Name</th>
              <th>Address</th>
              <th>Supervisor</th>
              <th>Phone</th>
              <th>
                Current <br /> Disb (P) (₦)
              </th>
              <th>Interest (₦)</th>
              <th>Paid(₦)</th>
              <th>
                Loan <br />
                Balance (₦)
              </th>
            </tr>
          </thead>
          <tbody>{renderBranchTable()}</tbody>
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
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
              )
            )}
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
        {selectedBranch && (
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

                width: "700px",

                overflowY: "auto",
              }}
            >
              <div className="">
                <div className="client-drop-header">
                  <div className="client-show-head">
                    <h4>Details for {selectedBranch.branchName}</h4>
                  </div>
                  <div>
                    <Icon
                      onClick={() => setSelectedBranch(null)}
                      icon="uil:times"
                      width="16"
                      height="16"
                      style={{ color: "black", cursor: "pointer" }}
                    />
                  </div>
                </div>

                {selectedBranch && (
                  <div className="branch-details">
                    <div className="branch-details-div-1">
                      {selectedBranch.loan.map((loan, index) => {
                        const interest = loan.monthDisburst * loan.interestRate;
                        const balance = loan.monthDisburst - loan.monthReturn;
                        const profit = loan.monthDisburst + interest;
                        const targetStatus =
                          loan.monthDisburst >= loan.monthTarget
                            ? "Target Met"
                            : "Target Not Met";

                        return (
                          <div>
                            <div key={index} className="loan-details">
                              <p>
                                Number of CSO:{" "}
                                <span>{selectedBranch.numberOfCso}</span>{" "}
                              </p>

                              <h4>Current Month Transaction</h4>

                              <p>
                                Month's Target:{" "}
                                <span>
                                  ₦{loan.monthTarget.toLocaleString()}
                                </span>{" "}
                              </p>
                              <p>
                                Number of Loan:{" "}
                                <span>{loan.currentCurrent}</span>
                              </p>
                              <p>
                                Amount Disbursed:
                                <span>
                                  {" "}
                                  ₦{loan.monthDisburst.toLocaleString()}
                                </span>
                              </p>
                              <p>
                                Interest:{" "}
                                <span>₦{interest.toLocaleString()}</span>
                              </p>
                              <p>
                                Amount Returned:
                                <span>
                                  {" "}
                                  ₦{loan.monthReturn.toLocaleString()}
                                </span>
                              </p>
                              <p>
                                Loan Balance:
                                <span> ₦{balance.toLocaleString()}</span>
                              </p>
                              <p>
                                Profit:<span> ₦{profit.toLocaleString()}</span>
                              </p>
                            </div>
                            <p className="target-status">
                              Target Status:{" "}
                              <span
                                style={{
                                  color:
                                    targetStatus === "Target Met"
                                      ? "green"
                                      : "red",
                                }}
                              >
                                {targetStatus}
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    <div className="branch-details-div-2">
                      <div className="financial-matric">
                        <h4>Financial Matrics</h4>
                        <div className="year-month-div">
                          <Link
                            className={`year-month-link ${
                              matrixOpen === "yearly" ? "active" : ""
                            }`}
                            onClick={() => handleMatricOpen("yearly")}
                          >
                            Yearly
                          </Link>
                          <Link
                            className={`year-month-link ${
                              matrixOpen === "monthly" ? "active" : ""
                            }`}
                            onClick={() => handleMatricOpen("monthly")}
                          >
                            Monthly
                          </Link>
                        </div>
                        <div>
                          {matrixOpen === "yearly" && (
                            <div>
                              <h5>Yearly Matrics</h5>
                              <YearlySalesChart />
                            </div>
                          )}
                          {matrixOpen === "monthly" && (
                            <div>
                              <h5>Monthly Matrics</h5>
                              <MonthlySalesChart />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="edi-del-btn">
                  <Link to="/branchdetails" className="edit-client">
                    See Details
                  </Link>
                  <Link
                    onClick={() => setSelectedBranch(null)}
                    className="delete-client"
                  >
                    Cancel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BranchRap>
  );
};

export default LoanBranches;
