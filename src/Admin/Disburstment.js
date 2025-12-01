import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  clearDisbursedMessages,
  clearDisbursementPicture,
  deleteLoan,
  disburseLoan,
  editLoanStatus,
  fetchDisbursedLoansByDate,
  fetchWaitingDisbursementLoans,
  setDisbursedSelectedDate,
  updateDisbursementPicture,
} from "../redux/slices/LoanSlice";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader, PulseLoader } from "react-spinners";
import { fetchAllTheCsos } from "../redux/slices/csoSlice";
import { fetchAllCashAtHand, fetchReport } from "../redux/slices/reportSlice";
import { uploadImages } from "../redux/slices/uploadSlice";

const NewLoanRap = styled.div`
  width: 100%;
  padding: 20px;
  .client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .upperLink {
    display: flex;
    gap: 20px;
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
  .dropdown-container {
    left: 15%;
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
  .amount-approved {
    font-weight: 700;
    font-size: 16px;
    color: #030b26;
  }

  .approve,
  .reject {
    border-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 80px;
    height: 30px;
    background: #0c1d55;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
  }
  .find-lawyer-header h2 {
    font-size: 20px;
    font-weight: 700;
  }
  .pay-green-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: lightgreen;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .all-dropdown-div {
    width: fit-content;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
  .all-dropdown-div p {
    color: #0c1d55;
    font-size: 25px;
    font-weight: 700;
    max-width: 300px;
    text-align: center;
  }
  .exist-btn {
    background: red;
    width: 150px;
    height: 55px;
    border-style: none;
    border-radius: 10px;
    cursor: pointer;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }
  form input,
  form select {
    width: 300px;
    height: 40px;
    border-radius: 15px;
    padding: 10px;
    background: #eaeaea;
  }
  form button {
    background: #005e78;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    color: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    padding: 20px;
    border-style: none;
    margin: auto;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .find-lawyer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .disbursed-cal input {
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    height: 30px;
    padding: 0px 15px;
  }
  .fiter-cso-div select {
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    height: 30px;
    padding: 0px 15px;
  }
  .all-dropdown-div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .fiter-cso-div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 1024px) {
    .dropdown-container {
      left: 0%;
      top: 60px;
    }
  }
`;

const Disbursment = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("new");
  const [disbursingLoanId, setDisbursingLoanId] = useState(null);
  const [cashAtHandError, setCashAtHandError] = useState(null);
  const [pictureUrl, setPictureUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [pictureDropdown, setPictureDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const [loanIdReal, setLoanIdReal] = useState("");
  const [filterCSO, setFilterCSO] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  console.log(selectedImage);

  const {
    dibursedSuccessMessage,
    editLoading,
    loans,
    disbursePictureloading,
    selectedDisburseDate,
    dailyDisburseLoans,
    disbursePictureUpload,
    disburseloading,
    loading,
  } = useSelector((state) => state.loan);

  const { urls, imageUploadloading } = useSelector((state) => state.upload);

  console.log(loans);

  const {
    error,
    cashMessage,
    expenseMessage,
    cashAtHand,
    allCashAtHand,
    cashDeteleloading,
    cashDelete,
    expressDelete,
    deleteExploading,
    expenses,
    month,
    year,
  } = useSelector((state) => state.report);

  console.log(disbursePictureUpload);

  const { list: csos } = useSelector((state) => state.cso);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (loanId) => {
    setDropdownOpen(dropdownOpen === loanId ? null : loanId);
  };

  const [isLoading, setIsLoading] = useState(false);
  console.log(dailyDisburseLoans);

  const filteredData = filterCSO
    ? dailyDisburseLoans.filter((item) => item.csoName === filterCSO)
    : dailyDisburseLoans;

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
    if (urls?.length > 0) {
      // If multiple files, you can store them as array or string (e.g., first one)
      setPictureUrl(urls[0]); // Or store all: setImageUrl(urls);
    }
  }, [urls]);

  useEffect(() => {
    if (disbursePictureUpload) {
      setPictureDropdown(false);
    }
  }, [disbursePictureUpload]);

  useEffect(() => {
    checkCashAtHand(); // Run immediately on load

    const interval = setInterval(() => {
      checkCashAtHand();
    }, 30000); // Check every 60 seconds

    return () => clearInterval(interval); // Clean up
  }, [allCashAtHand]);

  useEffect(() => {
    dispatch(fetchReport({ month, year }));
  }, [dispatch, month, year]);

  useEffect(() => {
    dispatch(fetchWaitingDisbursementLoans());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCashAtHand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllTheCsos());
  }, [dispatch]);

  const handleDisburse = (id) => {
    setDisbursingLoanId(id);
    dispatch(disburseLoan(id));
    setIsLoading(true);
    // window.location.reload();
  };

  const handleCancel = () => {
    dispatch(clearDisbursedMessages());
    window.location.reload();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this loan?")) {
      dispatch(deleteLoan(id));
    }
  };

  const handleEdit = (id) => {
    if (
      window.confirm(
        "You are about to ask cso to edit this loan. Are you sure?"
      )
    ) {
      dispatch(editLoanStatus(id));
    }
  };

  useEffect(() => {
    dispatch(fetchDisbursedLoansByDate(selectedDisburseDate));
  }, [selectedDisburseDate, dispatch]);

  const handleDateChange = (e) => {
    dispatch(setDisbursedSelectedDate(e.target.value));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  if (!allCashAtHand && loading === "loading")
    return (
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
      </p>
    );

  const handleSetLoandIdReal = (loanId) => {
    setPictureDropdown(!pictureDropdown);

    setLoanIdReal(loanId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pictureUrl) return alert("Please enter picture URL");
    dispatch(
      updateDisbursementPicture({
        id: loanIdReal,
        disbursementPicture: pictureUrl,
      })
    );
  };

  const handleOpenEdit = () => {
    setIsEdited(!isEdited);
  };

  const handleFileChange = (files) => {
    if (!files.length) return;
    dispatch(uploadImages({ files, folderName: "products" }));
  };

  const handleCloseDiburePicturePop = () => {
    setPictureUrl("");
    setPictureDropdown(false);
  };

  const handleClose = () => {
    setPictureUrl("");
    dispatch(clearDisbursementPicture());
    window.location.reload(); // Refresh the page
  };

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };

  const handleCloseSelectedImage = () => {
    setSelectedImage(null);
  };
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
        <div>
          <div className="client-1">
            <div className="client-link-container">
              <Link
                className={`client-link ${
                  activeLink === "new" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("new")}
              >
                New Disbursement
              </Link>
              <Link
                className={`client-link ${
                  activeLink === "previous" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("previous")}
              >
                Previously Disbursed
              </Link>
            </div>
          </div>
          {activeLink === "new" && (
            <div>
              <div className="find-lawyer-header">
                <h2>Loan Disbursement</h2>
              </div>
              <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Cso's Name</th>
                          <th>Amount Approved</th>
                          <th>Account Name</th>
                          <th>Account Number</th>
                          <th>Bank Name</th>
                          <th>Status</th>
                          <th>Disbursement Receipt</th>
                          <th>Action</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loans?.map((loan) => (
                          <tr key={loan?._id}>
                            <td>{`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}</td>
                            <td>{loan?.csoName}</td>
                            <td className="amount-approved">
                              {loan?.loanDetails?.amountApproved}
                            </td>
                            <td>{loan?.bankDetails?.accountName} </td>
                            <td>{loan?.bankDetails?.accountNo} </td>
                            <td>{loan?.bankDetails?.bankName} </td>
                            <td style={{ color: "green" }}>{loan?.status}</td>
                            {loan?.loanDetails?.disbursementPicture &&
                            loan?.loanDetails?.disbursementPicture !== "" ? (
                              <td>
                                <button
                                  style={{
                                    width: "150px",
                                    height: "40px",
                                  }}
                                  onClick={() =>
                                    handleSelectedImage(
                                      loan?.loanDetails?.disbursementPicture
                                    )
                                  }
                                >
                                  View
                                </button>
                              </td>
                            ) : (
                              <td>
                                <button
                                  style={{
                                    width: "150px",
                                    height: "40px",
                                  }}
                                  onClick={() => handleSetLoandIdReal(loan._id)}
                                >
                                  Upload
                                </button>
                              </td>
                            )}
                            <td>
                              <button
                                className="approve"
                                onClick={() => handleDisburse(loan._id)}
                                style={{
                                  filter: !loan?.loanDetails
                                    ?.disbursementPicture
                                    ? "blur(2px)"
                                    : "none",
                                  cursor: !loan?.loanDetails
                                    ?.disbursementPicture
                                    ? "not-allowed"
                                    : "pointer",
                                  opacity: !loan?.loanDetails
                                    ?.disbursementPicture
                                    ? 0.6
                                    : 1,
                                }}
                                disabled={
                                  !loan?.loanDetails?.disbursementPicture
                                }
                              >
                                {disbursingLoanId === loan._id ? (
                                  <PulseLoader color="white" size={10} />
                                ) : (
                                  "Disburse"
                                )}
                              </button>
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
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
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
                                  <button
                                    style={{
                                      background: "blue",
                                      color: "white",
                                      padding: "10px",
                                      border: "none",
                                      width: "100%",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleEdit(loan._id)}
                                  >
                                    Ask to Edit
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
              </div>
            </div>
          )}
          {activeLink === "previous" && (
            <div className="p-4">
              <div className="find-lawyer-header">
                <h2>Disbursed Loans</h2>
                <div className="fiter-cso-div">
                  <select
                    value={filterCSO}
                    onChange={(e) => setFilterCSO(e.target.value)}
                    className="border p-2 w-full"
                  >
                    <option value="">-- Filter by a CSO --</option>
                    {csos.map((cso) => (
                      <option
                        key={cso._id}
                        value={`${cso.firstName} ${cso.lastName}`}
                      >
                        {cso.firstName} {cso.lastName}
                      </option>
                    ))}
                  </select>
                  <div className="disbursed-cal">
                    <button
                      onClick={() => setShowCalendar((prev) => !prev)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      📅
                    </button>
                    {showCalendar && (
                      <input
                        type="date"
                        value={selectedDisburseDate}
                        onChange={handleDateChange}
                        className="border px-2 py-1 rounded"
                      />
                    )}
                    <span className="ml-2 text-gray-600">
                      {formatDate(selectedDisburseDate)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="table-container">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="custom-table">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border px-2 py-1">Customer Name</th>
                          <th className="border px-2 py-1">Amount Approved</th>
                          <th className="border px-2 py-1">Cso Name</th>
                          <th className="border px-2 py-1">Account Name</th>
                          <th className="border px-2 py-1">Bank</th>
                          <th className="border px-2 py-1">Account No</th>
                          <th>Date Disbursed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData?.map((loan, idx) => (
                          <tr key={idx} className="text-center">
                            <td className="border px-2 py-1">
                              {loan.customerDetails.firstName}{" "}
                              {loan.customerDetails.lastName}
                            </td>
                            <td className="border px-2 py-1">
                              ₦
                              {loan.loanDetails.amountApproved.toLocaleString()}
                            </td>
                            <td className="border px-2 py-1">{loan.csoName}</td>
                            <td className="border px-2 py-1">
                              {loan.bankDetails.accountName}
                            </td>
                            <td className="border px-2 py-1">
                              {loan.bankDetails.bankName}
                            </td>
                            <td className="border px-2 py-1">
                              {loan.bankDetails.accountNo}
                            </td>
                            <td>
                              {new Date(loan?.disbursedAt).toLocaleDateString(
                                "en-GB"
                              )}{" "}
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

          {dibursedSuccessMessage ? (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="pay-green-circle">
                  <Icon
                    icon="twemoji:check-mark"
                    width="40"
                    height="40"
                    style={{ color: "black" }}
                  />
                </div>
                <p>{dibursedSuccessMessage}</p>
                <button onClick={handleCancel} className="exist-btn">
                  Exit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {disbursePictureUpload ? (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="pay-green-circle">
                  <Icon
                    icon="twemoji:check-mark"
                    width="40"
                    height="40"
                    style={{ color: "black" }}
                  />
                </div>
                <p>Disbursement receipt uploaded successfully. Thanks.</p>
                <button onClick={handleClose} className="exist-btn">
                  Exit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {pictureDropdown ? (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <form onSubmit={handleSubmit}>
                  <div className="file-upload">
                    <input
                      id="fileInput"
                      type="file"
                      onChange={(e) => handleFileChange(e.target.files)}
                      className="hidden-input"
                    />
                  </div>
                  <label htmlFor="fileInput" className="custom-file-upload">
                    {pictureUrl === "" ? (
                      "Upload proof of disbursement"
                    ) : (
                      <img
                        src={
                          `https://api.jksolutn.com${pictureUrl}` // Local image
                        }
                        alt="disbursement"
                        style={{
                          objectFit: "contain",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    )}
                  </label>{" "}
                  <br />
                  <button
                    type="submit"
                    disabled={disbursePictureloading}
                    style={{
                      filter: pictureUrl === "" ? "blur(2px)" : "none",
                      cursor: pictureUrl === "" ? "not-allowed" : "pointer",
                      opacity: pictureUrl === "" ? 0.6 : 1,
                    }}
                  >
                    {disbursePictureloading ? (
                      <PulseLoader color="white" size={10} />
                    ) : (
                      "Update"
                    )}
                  </button>
                </form>
                <button
                  onClick={handleCloseDiburePicturePop}
                  className="exist-btn"
                >
                  Exit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {selectedImage ? (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <img
                  src={
                    `https://api.jksolutn.com${selectedImage}` // Local image
                  }
                  alt="disbursement"
                  style={{
                    objectFit: "contain",
                    width: "300px",
                    height: "400px",
                  }}
                />
                <button
                  onClick={handleCloseSelectedImage}
                  className="exist-btn"
                >
                  Exit
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </NewLoanRap>
  );
};

export default Disbursment;
