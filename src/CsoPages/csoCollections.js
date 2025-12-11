import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar"; // Import the calendar
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon
import {
  fetchCsoActiveLoans,
  fetchLoanAppForms,
  fetchSearchingCsoActiveLoansforCollection,
} from "../redux/slices/LoanSlice";
import { fetchGroupLeadersByCso } from "../redux/slices/groupLeaderSlice";
import "react-calendar/dist/Calendar.css"; // Import calendar styles
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import {
  fetchCsoByWorkId,
  resetUploadState,
  setRemittanceUploadReset,
  submitDailyRemittanceReport,
  uploadRemittance,
} from "../redux/slices/csoSlice";
import { MoonLoader, PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { uploadImages } from "../redux/slices/uploadSlice";
import TopLoader from "../Preload/TopLoader";

const getEffectivePreviousWorkDate = () => {
  const now = new Date();
  const todayUTC = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
  let effectiveDate = new Date(todayUTC);
  effectiveDate.setDate(effectiveDate.getDate() - 1);

  if (effectiveDate.getDay() === 6) {
    effectiveDate.setDate(effectiveDate.getDate() - 1);
  }

  if (effectiveDate.getDay() === 0) {
    effectiveDate.setDate(effectiveDate.getDate() - 2);
  }

  return effectiveDate;
};

const toDateString = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

const CollectionRap = styled.div`
  min-height: 100vh;
  padding-bottom: 20px;
  color: #005e78;
  th,
  td,
  tr,
  table,
  thead,
  tbody {
    border: none;
    color: #005e78;
    font-size: 16px;
    background-color: transparent !important;
  }
  th {
    padding: 5px;
    font-weight: 700;
  }
  td {
    font-weight: 400;
    padding: 5px;
    white-space: nowrap;
    text-align: center;
  }
  .table-div-con {
    min-width: 600px;
  }
  .calendar-display-icon {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .calendar-display-icon span {
    color: #005e78;
    font-weight: 700;
    font-size: 15px;
  }
  .collect-1 h2 {
    color: #005e78;
    font-weight: 500;
    font-size: 24px;
  }
  .collect-1 {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 15px;
    padding-top: 20px;
    padding-left: 20px;
  }
  .input-div {
    margin-bottom: 15px;
  }
  .all-summary h4 {
    color: #97b434;
    font-size: 16px;
    font-weight: 700;
  }
  .summary-div h6 {
    color: #005e78;
    font-size: 16px;
    font-weight: 700;
  }
  .summary-div span {
    color: #005e78;
    font-size: 18px;
    font-weight: 700;
  }
  .summary-div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
  .all-summary {
    margin-top: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  input {
    background: #daf7ff;
    padding: 20px 40px;
    width: 333px;
    height: 45px !important;
    border-style: none;
    border-radius: 20px;
  }
  .remmit-btn {
    background: #005e78;
    width: 143px;
    height: 45px;
    border-radius: 15px;
    border-style: none;
    color: #d9d9d9;
    font-size: 16px;
    font-weight: 700;
  }
  .remmit-div {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-left: 20px;
  }
  .remmit-div p {
    color: #005e78;
    font-size: 24px;
    font-weight: 900;
  }
  .file-upload {
    position: relative;
    display: inline-block;
    cursor: pointer;

    overflow: hidden;
  }

  .hidden-input {
    display: none;
    padding: 10px;
  }

  .custom-file-upload {
    display: block;
    height: 43px;
    width: 304px;
    background: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    text-align: center;
    color: #005e7880;

    font-size: 20px;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  .custom-file-upload:hover {
    background-color: #e8e8e8;
  }

  .custom-file-upload:active {
    background-color: #ddd;
  }
  .upload-cancel-btn,
  .upload-confirm-btn {
    background: #d9d9d9;
    width: 120px;
    height: 55px;
    border-radius: 10px;
    border-style: none;
    color: #005e78;
    font-size: 16px;
    font-weight: 500;
  }
  .upload-confirm-btn {
    background: #005e78;
    color: #ffffff;
  }
  .upload-btns {
    display: flex;
    justify-content: space-between;
  }
  .all-upload-pop {
    width: 344px;
    padding: 30px 20px;
    background: #ffffff;
    border-radius: 25px;

    box-shadow: 5px 5px 10px 0px #005e7833;

    box-shadow: -5px -5px 10px 0px #005e7833;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .prove {
    font-size: 25px;
    font-weight: 700;
    text-align: center;
  }
  .pay-dropdown p {
    color: #005e78;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
  }
  .pay-dropdown {
    width: 350px;
    padding: 30px;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 15px;
    align-items: center;
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
  .view-detail-btn {
    background: transparent;
    border: 1px solid #005e78;
    color: #005e78;
    padding: 5px 10px;
    border-radius: 100px;
  }
  .all-input {
    display: flex;
    gap: 10px;
    padding: 10px;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const ActiveLoansTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, loanAppForm, loading, error, collectionloading } =
    useSelector((state) => state.loan);
  const { options: groupLeaderOptions = [] } = useSelector(
    (state) => state.groupLeader || {}
  );
  const { specificCso, remittancestatus, hoursLeft, minutesLeft } = useSelector(
    (state) => state.cso
  );
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const csoId = user.workId;
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility
  const [totalAmountPaid, setTotalAmountPaid] = useState(0); // State for total amount paid
  const [totalAdminFee, setAdminFee] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);
  const { isUploading, uploaded, remittanceuploadedSuccess } = useSelector(
    (state) => state.cso
  );
  const [imageUrl, setImageUrl] = useState("");
  const [time, setTime] = useState(86400); // Timer starts at 24 hours in seconds
  const workId = user.workId;
  const [uploadRemmit, setUploadRemitt] = useState("");
  const [remitPop, setRemitPop] = useState(false);
  const [submissionContext, setSubmissionContext] = useState("regular");
  const [activeUploadTarget, setActiveUploadTarget] = useState("regular");
  const [pendingImageUrl, setPendingImageUrl] = useState("");
  const [pendingPaymentAmount, setPendingPaymentAmount] = useState("");
  const [remitAmount, setRemitAmount] = useState("");
  const [remitError, setRemitError] = useState("");
  const [pendingRemittanceEntry, setPendingRemittanceEntry] = useState(null);
  const [pendingRemainingAmount, setPendingRemainingAmount] = useState(0);
  const [pendingError, setPendingError] = useState("");
  const currenttoday = new Date().toDateString();
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedGroupLeaderId, setSelectedGroupLeaderId] = useState("");
  const { urls } = useSelector((state) => state.upload);
  console.log(user);

  console.log(customers);
  console.log(selectedDate);

  const lastDateString = user?.remittance[user?.remittance?.length - 1]?.date;

  // Convert it to a Date object
  const lastDate = new Date(lastDateString);

  // Format to desired format (e.g., "Tue Jun 10 2025")
  const formattedDate = lastDate?.toDateString();

  useEffect(() => {
    if (urls?.length > 0) {
      if (activeUploadTarget === "pending") {
        setPendingImageUrl(urls[0]);
      } else {
        setImageUrl(urls[0]);
      }
    }
  }, [urls, activeUploadTarget]);

  const effectiveDateObj = useMemo(() => getEffectivePreviousWorkDate(), []);
  const effectiveDateString = useMemo(
    () => toDateString(effectiveDateObj),
    [effectiveDateObj]
  );

  const filteredRemittance = useMemo(() => {
    if (!specificCso?.remittance) return [];
    return specificCso.remittance.filter((item) => {
      const itemDateString = toDateString(item.date);
      return itemDateString === effectiveDateString;
    });
  }, [specificCso, effectiveDateString]);

  const filteredRemittanceIssue = useMemo(() => {
    if (!specificCso?.remitanceIssues) return [];
    return specificCso.remitanceIssues.filter((item) => {
      const itemDateString = toDateString(item.date);
      return itemDateString === effectiveDateString;
    });
  }, [specificCso, effectiveDateString]);

  const yesterdayRemittanceEntry =
    filteredRemittance?.length > 0 ? filteredRemittance[0] : null;
  const yesterdayRemainingInfo = useMemo(() => {
    if (!yesterdayRemittanceEntry) return null;
    const expected = Number(yesterdayRemittanceEntry.amount || 0);
    const paid = Number(yesterdayRemittanceEntry.amountPaid || 0);
    const remaining = Math.max(expected - paid, 0);
    return { expected, paid, remaining };
  }, [yesterdayRemittanceEntry]);

  const hasPendingRemittance = Boolean(
    yesterdayRemainingInfo && yesterdayRemainingInfo.remaining > 0
  );

  useEffect(() => {
    if (hasPendingRemittance) {
      setRemitAmount("");
      return;
    }
    setRemitAmount((prev) => {
      const numericPrev = Number(prev);
      if (!prev || isNaN(numericPrev)) {
        return overallTotal ? String(overallTotal) : "";
      }
      if (overallTotal && numericPrev > overallTotal) {
        return String(overallTotal);
      }
      return prev;
    });
  }, [overallTotal, hasPendingRemittance]);

  useEffect(() => {
    if (
      hasPendingRemittance &&
      yesterdayRemittanceEntry &&
      yesterdayRemainingInfo
    ) {
      const entryDate = toDateString(yesterdayRemittanceEntry.date);
      const currentEntryDate = pendingRemittanceEntry
        ? toDateString(pendingRemittanceEntry.date)
        : null;
      if (
        !pendingRemittanceEntry ||
        currentEntryDate !== entryDate ||
        pendingRemainingAmount !== yesterdayRemainingInfo.remaining
      ) {
        setPendingRemittanceEntry(yesterdayRemittanceEntry);
        setPendingRemainingAmount(yesterdayRemainingInfo.remaining);
        setPendingPaymentAmount(String(yesterdayRemainingInfo.remaining));
        setPendingImageUrl("");
        setPendingError("");
      }
    } else if (!hasPendingRemittance) {
      setPendingRemittanceEntry(null);
      setPendingRemainingAmount(0);
      setPendingPaymentAmount("");
      setPendingImageUrl("");
      setPendingError("");
    }
  }, [
    hasPendingRemittance,
    pendingRemittanceEntry,
    pendingRemainingAmount,
    yesterdayRemittanceEntry,
    yesterdayRemainingInfo,
  ]);

  useEffect(() => {
    if (!uploaded) return;
    dispatch(fetchCsoByWorkId(workId));
    setIsLoading(false);
    setConfirm(false);
    if (submissionContext === "regular") {
      setImageUrl("");
    } else {
      setPendingImageUrl("");
      setPendingPaymentAmount("");
      setPendingError("");
      dispatch(setRemittanceUploadReset());
    }
    dispatch(resetUploadState());
  }, [uploaded, dispatch, workId, submissionContext]);

  useEffect(() => {
    if (csoId) {
      dispatch(fetchGroupLeadersByCso(csoId));
    }
  }, [dispatch, csoId]);
  // Timer logic
  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );

    const secondsUntilMidnight = Math.floor((nextMidnight - now) / 1000);
    setTime(secondsUntilMidnight); // Set initial time

    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1; // Decrement time
        } else {
          clearInterval(timerInterval); // Stop the timer at 0
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastUploadDate = localStorage.getItem("lastUploadDate");
    if (formattedDate) {
      setUploadRemitt(formattedDate);
    }
    if (uploaded) {
      localStorage.setItem("lastUploadDate", today);
    }

    if (formattedDate === today) {
      setTime(0); // Disable the timer for today
    }
  }, [uploaded, formattedDate]);

  useEffect(() => {
    if (workId) dispatch(fetchCsoByWorkId(workId));
  }, [workId, dispatch]);

  useEffect(() => {
    const formattedDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    // Dispatch the action to fetch loans when the component mounts or date changes
    dispatch(
      fetchCsoActiveLoans({
        csoId,
        date: formattedDate,
        groupLeaderId: selectedGroupLeaderId || undefined,
      })
    );
  }, [dispatch, csoId, selectedDate, selectedGroupLeaderId]);

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.trim() !== "") {
      dispatch(
        fetchSearchingCsoActiveLoansforCollection({
          csoId,
          date: selectedDate.toISOString(),
          name: value,
          groupLeaderId: selectedGroupLeaderId || undefined,
        })
      );
    } else {
      const formattedDate = `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
      dispatch(
        fetchCsoActiveLoans({
          csoId,
          date: formattedDate,
          groupLeaderId: selectedGroupLeaderId || undefined,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      fetchLoanAppForms({
        csoId,
        date:
          selectedDate.getFullYear() +
          "-" +
          String(selectedDate.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(selectedDate.getDate()).padStart(2, "0"),
      })
    );
  }, [dispatch, csoId, selectedDate]);

  // Calculate total amount paid for the selected date
  useEffect(() => {
    if (customers) {
      const totalPaid = customers.reduce((sum, customer) => {
        return sum + customer.amountPaidOnSelectedDate;
      }, 0);
      setTotalAmountPaid(totalPaid); // Update total amount paid
    }
  }, [customers, selectedDate]);

  useEffect(() => {
    const totalPaid = totalAdminFee + totalAmountPaid;
    setOverallTotal(totalPaid);
  }, [totalAdminFee, totalAmountPaid]);

  useEffect(() => {
    if (loanAppForm) {
      const totalPaid = loanAppForm.reduce((sum, customer) => {
        return sum + customer.amount;
      }, 0);
      setAdminFee(totalPaid); // Update total amount paid
    }
  }, [loanAppForm, selectedDate]);

  // Function to format numbers with commas
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
    setShowCalendar(false); // Hide calendar after selecting a date
  };

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error} </p>;

  const handleFileChange = (files, target = "regular") => {
    if (!files.length) return;
    setActiveUploadTarget(target);
    dispatch(uploadImages({ files, folderName: "products" }));
  };

  const parsedRemitAmount = Number(remitAmount);
  const remitAmountIsNumber =
    !isNaN(parsedRemitAmount) && parsedRemitAmount > 0;
  const remitAmountExceedsTotal =
    remitAmountIsNumber && overallTotal
      ? parsedRemitAmount > overallTotal
      : false;
  const canSubmitRegularRemittance =
    remitAmountIsNumber &&
    !remitAmountExceedsTotal &&
    !!imageUrl &&
    !isUploading &&
    !uploaded &&
    time !== 0;

  const handleUpload = () => {
    if (!remitAmountIsNumber) {
      setRemitError("Enter a valid amount");
      return;
    }
    if (remitAmountExceedsTotal) {
      setRemitError("Amount cannot exceed total collections");
      return;
    }
    if (!imageUrl) {
      setRemitError("Upload proof of payment");
      return;
    }
    setRemitError("");
    setSubmissionContext("regular");
    dispatch(
      uploadRemittance({
        amount: overallTotal,
        amountPaid: parsedRemitAmount,
        workId,
        imageUrl,
      })
    )
      .unwrap()
      .catch((err) => {
        const serverMessage =
          err?.message || err?.error || err?.response?.data?.message;
        setRemitError(serverMessage || "Unable to submit remittance");
        setIsLoading(false);
      });
    setConfirm(false);
    setIsLoading(true);
  };

  const handlePendingSubmit = () => {
    if (!pendingRemittanceEntry) return;
    if (!pendingImageUrl) {
      setPendingError("Please upload proof of payment");
      return;
    }
    setPendingError("");
    setSubmissionContext("pending");
    dispatch(
      uploadRemittance({
        amount: pendingRemittanceEntry.amount,
        amountPaid: pendingRemainingAmount,
        workId,
        imageUrl: pendingImageUrl,
        remitDate: toDateString(pendingRemittanceEntry.date),
      })
    )
      .unwrap()
      .catch((err) => {
        const serverMessage =
          err?.message || err?.error || err?.response?.data?.message;
        setPendingError(serverMessage || "Unable to submit remaining amount");
      });
  };

  const formatTime = (time) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };
  const handleRemitPop = () => {
    if (hasPendingRemittance) return;
    setRemitPop(!remitPop);
  };
  const handleConfirm = () => {
    setConfirm(true);
    setRemitPop(false);
  };
  const handleGoToCustomerPage = (id) => {
    navigate(`/cso/customer-details/${id}`);
  };
  const handleGoToPreviousLoanPage = (id) => {
    navigate(`/cso/previousLoans/${id}`);
  };

  console.log("Filtered Remittance:", filteredRemittance);
  console.log(filteredRemittanceIssue);

  return (
    <CollectionRap>
      {specificCso && customers ? (
        <>
          {hasPendingRemittance && pendingRemittanceEntry && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.65)",
                zIndex: 2000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <div
                className="all-upload-pop"
                style={{ maxWidth: "420px", width: "100%" }}
              >
                <h2 style={{ textAlign: "center" }}>
                  Pending Remittance for{" "}
                  {new Date(pendingRemittanceEntry.date).toDateString()}
                </h2>
                <p style={{ textAlign: "center" }}>
                  You must clear the remaining remittance before continuing.
                </p>
                <div
                  className="summary-div"
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <span>
                    Expected:{" "}
                    {formatNumberWithCommas(
                      yesterdayRemainingInfo?.expected || 0
                    )}
                  </span>
                  <span>
                    Paid:{" "}
                    {formatNumberWithCommas(yesterdayRemainingInfo?.paid || 0)}
                  </span>
                  <span style={{ color: "#c0392b", fontWeight: 700 }}>
                    Remaining: {formatNumberWithCommas(pendingRemainingAmount)}
                  </span>
                </div>
                <label style={{ width: "100%" }}>
                  Amount to Submit
                  <input
                    value={pendingPaymentAmount}
                    readOnly
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      background: "#f1f1f1",
                    }}
                  />
                </label>
                <div className="file-upload" style={{ width: "100%" }}>
                  <input
                    id="pendingFileInput"
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e.target.files, "pending")
                    }
                    className="hidden-input"
                  />
                  <label
                    htmlFor="pendingFileInput"
                    className="custom-file-upload"
                  >
                    {pendingImageUrl || "Upload proof of payment"}
                  </label>
                </div>
                {pendingError && (
                  <p style={{ color: "red", fontSize: "14px", margin: 0 }}>
                    {pendingError}
                  </p>
                )}
                <button
                  className="upload-confirm-btn"
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={handlePendingSubmit}
                  disabled={isUploading}
                >
                  {isUploading && submissionContext === "pending" ? (
                    <PulseLoader color="white" size={10} />
                  ) : (
                    "Submit Remaining"
                  )}
                </button>
              </div>
            </div>
          )}
          {filteredRemittance?.length > 0 ||
          filteredRemittanceIssue?.length > 0 ? (
            <div>
              <div className="collect-1">
                <h2>Collections</h2>
                <div className="calendar-display-icon">
                  <Icon
                    onClick={() => setShowCalendar((prev) => !prev)}
                    icon="bx:calendar"
                    width="18"
                    height="18"
                    style={{ color: "#005e78", cursor: "pointer" }}
                  />
                  <span>{selectedDate.toDateString()}</span>{" "}
                </div>
              </div>
              <div className="all-input">
                <select
                  value={selectedGroupLeaderId}
                  onChange={(e) => setSelectedGroupLeaderId(e.target.value)}
                  style={{
                    background: "#daf7ff",
                    paddingLeft: "10px",
                    width: "333px",
                    height: "45px",
                    border: "none",
                    borderRadius: "20px",
                    marginRight: "12px",
                  }}
                >
                  <option value="">All Groups</option>
                  {groupLeaderOptions.map((leader) => (
                    <option key={leader._id} value={leader._id}>
                      {leader.groupName ||
                        `${leader.firstName} ${leader.lastName}`}
                    </option>
                  ))}
                </select>

                <div className="input-div">
                  <input
                    value={name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search"
                  />
                  <Icon
                    className="search-input-icon"
                    icon="ic:baseline-search"
                    width="24"
                    height="24"
                    style={{ color: " #005E7880" }}
                  />
                </div>
              </div>
              {/* Calendar Dropdown */}
              {showCalendar && (
                <div
                  className="calendar-center"
                  style={{ position: "absolute", zIndex: 1000, left: "20px" }}
                >
                  <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
              )}

              {/* Loans Table */}
              <div className="">
                <div className="new-table-scroll">
                  <div className="table-div-con">
                    <table className="" border="1" cellPadding="10">
                      <thead>
                        <tr>
                          <th>S/N</th> {/* Serial number column header */}
                          <th>Customer Name</th>
                          <th>Amount Due</th>
                          <th>Amount Paid</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers
                          ?.slice()
                          .reverse()
                          .map((customer, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>{" "}
                              {/* Serial number, starting from 1 */}
                              <td
                                style={{
                                  textAlign: "left",
                                }}
                              >
                                {customer.customerName}
                              </td>
                              <td>{customer.amountDue}</td>
                              <td>{customer.amountPaidOnSelectedDate}</td>
                              {/*   <td>
                          {new Date(customer.disbursedAt).toLocaleDateString(
                            "en-CA"
                          ) ===
                          new Date(customer.selectedDate).toLocaleDateString(
                            "en-CA"
                          )
                            ? "No default yet"
                            : customer?.status}
                        </td>{" "}  */}
                              {/* Display status */}
                              <td>
                                {customer?.loanStatus === "rejected"
                                  ? "Rejected"
                                  : customer?.loanStatus === "fully paid"
                                  ? "Fully Paid"
                                  : `${customer?.status}`}
                              </td>
                              {customer?.loanStatus !== "fully paid" ? (
                                <td>
                                  <button
                                    className="view-detail-btn"
                                    onClick={() =>
                                      handleGoToCustomerPage(customer?.id)
                                    }
                                  >
                                    View Details
                                  </button>
                                </td>
                              ) : (
                                <td>No Detail</td>
                              )}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                Admin and Application Fees
              </h2>
              <div className="">
                <div className="new-table-scroll">
                  <table className="" border="1" cellPadding="10">
                    <thead>
                      <tr>
                        <th>S/N</th> {/* Serial number column header */}
                        <th>Customer Name</th>
                        <th>Admin fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loanAppForm
                        ?.slice()
                        .reverse()
                        .map((customer, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>{" "}
                            {/* Serial number, starting from 1 */}
                            <td>{customer.customerName}</td>
                            <td>{customer.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="all-summary">
                <h4>Daily Summary</h4>
                <div className="summary-div">
                  <h6>Total Amount Collected</h6>
                  <span> {formatNumberWithCommas(totalAmountPaid)}</span>
                </div>
                <div className="summary-div">
                  <h6>Total Admin and Application Fee</h6>
                  <span> {formatNumberWithCommas(totalAdminFee)}</span>
                </div>

                <div className="summary-div">
                  <h2>Overall Total =</h2>
                  <h2>
                    {formatNumberWithCommas(totalAdminFee + totalAmountPaid)}
                  </h2>
                </div>
              </div>
              <div className="remmit-div">
                <button onClick={handleRemitPop} className="remmit-btn">
                  Remittance
                </button>
                <p>{formatTime(time)}</p>
              </div>
              {remitPop ? (
                <>
                  {uploadRemmit !== currenttoday ? (
                    <div className="dropdown-container">
                      <div className="all-upload-pop">
                        <div className="summary-div">
                          <h6>Total Amount Collected</h6>
                          <span>
                            {" "}
                            {formatNumberWithCommas(totalAmountPaid)}
                          </span>
                        </div>
                        <div className="summary-div">
                          <h6>Total Admin and Application Fee</h6>
                          <span> {formatNumberWithCommas(totalAdminFee)}</span>
                        </div>
                        <div className="summary-div">
                          <h2>Overall Total =</h2>
                          <h2>
                            {formatNumberWithCommas(
                              totalAdminFee + totalAmountPaid
                            )}
                          </h2>
                        </div>
                        <div
                          className="summary-div"
                          style={{
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <label style={{ width: "100%" }}>
                            Amount submitting now
                            <input
                              type="number"
                              min="0"
                              value={remitAmount}
                              onChange={(e) => setRemitAmount(e.target.value)}
                              style={{ width: "100%", marginTop: "10px" }}
                              placeholder={formatNumberWithCommas(
                                totalAdminFee + totalAmountPaid
                              )}
                            />
                          </label>
                          {remitError && (
                            <span style={{ color: "red", fontSize: "14px" }}>
                              {remitError}
                            </span>
                          )}
                        </div>
                        <div className="file-upload">
                          <input
                            id="fileInput"
                            type="file"
                            onChange={(e) =>
                              handleFileChange(e.target.files, "regular")
                            }
                            className="hidden-input"
                          />
                          <label
                            htmlFor="fileInput"
                            className="custom-file-upload"
                          >
                            {imageUrl || "Upload proof of payment"}
                          </label>{" "}
                          <br />
                        </div>
                        <div className="upload-btns">
                          <button
                            onClick={() => setRemitPop(false)}
                            className="upload-cancel-btn"
                          >
                            Exit
                          </button>
                          <button
                            className="upload-confirm-btn"
                            onClick={handleConfirm}
                            disabled={!canSubmitRegularRemittance}
                            style={{
                              background: !canSubmitRegularRemittance
                                ? "  #749eaa"
                                : "#005e78",
                            }}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown-container">
                      <div className="all-upload-pop">
                        <h2
                          style={{
                            textAlign: "center",
                          }}
                        >
                          Collections have been remitted for today
                        </h2>
                        <button
                          onClick={() => setRemitPop(false)}
                          className="upload-cancel-btn"
                        >
                          Exit
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}

              {confirm ? (
                <div className="dropdown-container">
                  <div className="all-upload-pop">
                    <p className="prove">
                      Are you uploading a proof of payment for{" "}
                      {formatNumberWithCommas(totalAdminFee + totalAmountPaid)}
                    </p>
                    {remitError && (
                      <p
                        style={{
                          color: "red",
                          textAlign: "center",
                          marginBottom: "10px",
                        }}
                      >
                        {remitError}
                      </p>
                    )}
                    <div className="upload-btns">
                      <button
                        className="upload-confirm-btn"
                        onClick={handleUpload}
                        disabled={!canSubmitRegularRemittance}
                        style={{
                          background: !canSubmitRegularRemittance
                            ? "  #749eaa"
                            : "#005e78",
                        }}
                      >
                        {isUploading ? (
                          <PulseLoader color="white" size={10} />
                        ) : uploaded ? (
                          "Uploaded"
                        ) : (
                          "Yes"
                        )}
                      </button>
                      <button
                        onClick={() => setConfirm(false)}
                        className="upload-cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
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
                    You did not submit remittance for {effectiveDateString}.
                    Please contact the manager to resolve issue. Thanks.
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {" "}
          <MoonLoader />
        </p>
      )}
      {remittanceuploadedSuccess && submissionContext === "regular" ? (
        <div className="dropdown-container">
          <div className="pay-dropdown">
            <div className="pay-green-circle">
              <Icon
                icon="twemoji:check-mark"
                width="40"
                height="40"
                style={{ color: "black" }}
              />
            </div>
            <p>Remittance uploaded successfully</p>
            <button
              onClick={() => dispatch(setRemittanceUploadReset())}
              className="upload-cancel-btn"
            >
              Exit
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </CollectionRap>
  );
};

export default ActiveLoansTable;
