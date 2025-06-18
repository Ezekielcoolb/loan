import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar"; // Import the calendar

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  clearUpdateSuccessMessages,
  fetchallgetRemittances,
  fetchForAdminUpdateCSO,
  fetchLoanProgress,
  fetchLoanProgressChart,
  setSelectedRemmitDate,
  updateByAdminCSO,
} from "../../redux/slices/csoSlice";
import {
  calculateDefaultingCustomers,
  calculateNoPaymentYesterday,
  fetchAllLoansByCsoId,
  fetchAllLoansByCsoIdLoanDashboardLoans,
  fetchCsoActiveLoans,
  fetchLoanAllTimeCounts,
  fetchPieRepaymentData,
  setPage,
} from "../../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MoonLoader, PulseLoader } from "react-spinners";
import { fetchRemittanceNewProgress } from "../../redux/slices/remittanceSlice";
import { fetchOutstandingProgressChart } from "../../redux/slices/otherLoanSlice";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CollectRap = styled.div`
  width: 100%;
  .cso-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    padding-right: 15px;
  }
  .cso-link-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .cso-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .cso-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
  .summary-loan p {
    border: 1px solid #d0d5dd;
    width: 200px;
    height: 100px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 10px;
    color: #727789;
    font-size: 14px;
    font-weight: 400;
  }
  .summary-loan span {
    color: #030b26;
    font-size: 16px;
    font-weight: 700;
  }
  .summary-loan {
    display: flex;
    gap: 15px;
    margin: 20px;
  }
  .page-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  .page-btn {
    width: 100px;
    height: 30px;
    color: #005e78;
    border-radius: 10px;
    border: 1px solid #005e78;
  }
  .calendar-display-icon {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 20px;
  }
  .calendar-display-icon span {
    color: #005e78;
    font-weight: 700;
    font-size: 15px;
  }
  .details-div {
    background: #ffffff;
    margin: 20px;
    padding-top: 20px;
    border-radius: 15px;
  }
  .collect-1 h4 {
    font-size: 18px;
    color: #030b26;
    font-weight: 700;
    margin: 20px;
  }
  .all-summary h4 {
    font-size: 16px;
    color: #030b26;
    font-weight: 500;
    margin: 20px;
  }
  .all-summary h6 {
    color: #727789;
    font-size: 14px;
    font-weight: 500;
  }
  .all-summary span {
    color: #005e78;
    font-weight: 700;
    font-size: 18px;
  }
  .summary-div {
    margin-left: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 50px;
  }
  .overrall-perform-outerbar {
    background: #c9c1c1;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    height: 34.56px;
    width: 350px;
  }
  .overrall-perform-innerbar {
    background: #009a49;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
  .overrall-perform-innerbar-text {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    font-weight: 500;
    font-size: 16px;
    color: black;
  }
  .overrall-perform {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .overrall-perform p {
    font-size: 24px;
    font-weight: 500;
    color: #009a49;
  }
  .calendar-display-icon {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .calendar-display-icon span {
    color: #005e78;
    font-weight: 700;
    font-size: 18px;
  }
  .counts-section h4 {
    color: #005e78;
    font-size: 18px;
    font-weight: 700;
    margin: 15px 0px;
  }
  .summary-counts p {
    box-shadow: 4px 4px 5px 0px #005e7833;
    background: #d9d9d9;
    border: 1px solid #005e78;
    width: 180px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    color: #005e78;
    font-size: 12px;
    font-weight: 700;
    padding: 10px;
    text-align: center;
  }
  .summary-counts {
    display: flex;
    gap: 5px;
  }
  .due-pay {
    background: #ffff00 !important;
  }
  .pay-count {
    background: #ffffff !important;
  }
  .all-progress {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
  }
  .link-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  .link {
    text-decoration: none;
    font-weight: 450;
    font-size: 14px;
    color: #005e78;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    padding: 5px;
    border-radius: 6px;
    height: fit-content;
    border: 1px solid #005e78;
  }
  .link.active {
    background: #000000;
    color: #ffffff;
  }
  .remmit {
    padding: 20px;
  }
  .remmit h2 {
    font-size: 20px;
    color: #030b26;
    font-weight: 700;
  }
  .date-input {
    border: 1px solid #d0d5dd;
    height: 38px;
    border-radius: 100px;
    padding: 0px 15px;
    margin-top: 20px;
  }
  .remmittance-div p {
    font-size: 16px;
    color: #030b26;
    font-weight: 450;
    margin-top: 20px;
  }
  .remmittance-div span {
    font-size: 16px;
    color: #030b26;
    font-weight: 600;
  }
  .remmittance-div img {
    width: 500px;
    margin-top: 20px;
  }
  .detail-in {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px;
    min-height: 100vh;
  }
  .detail-in button {
    color: #ffffff;
    font-weight: 500;
    height: 40px;
    background: #030b26;
    border-radius: 10px;
    border: none;
    width: 120px;
    cursor: pointer;
    font-size: 14px;
  }
  .detail-in-sub p {
    color: #727789;
    font-size: 14px;
    font-weight: 500;
  }
  .detail-in-sub h6 {
    font-size: 16px;
    color: #030b26;
    font-weight: 600;
  }
  .detail-in-sub {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 50%;
    justify-content: space-between;
  }
  .update-show-drop {
    background: #ffffff;
    border-radius: 10px;
    max-height: 500px;
    overflow-y: auto;
  }
  .update-show-drop-header h4 {
    font-size: 16px;
    color: #030b26;
    font-weight: 600;
  }
  .update-show-drop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #d0d5dd;
  }
  .update-show-drop-body input,
  .update-show-drop-body select {
    width: 300px;
    height: 40px;
    padding-left: 15px;
    border-radius: 10px;
    border: 1px solid #d0d5dd;
  }
  .update-show-drop-body button {
    color: #ffffff;
    font-weight: 500;
    height: 40px;
    background: #030b26;
    border-radius: 10px;
    border: none;
    width: 120px;
    cursor: pointer;
    font-size: 14px;
  }
  .update-show-drop-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
`;
const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
  canvas {
    max-height: 300px !important;
  }
`;

const ChartRapper = styled.div`
  h2 {
    color: #005e78;
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;
  }
  padding: 0px;
  margin: 0px;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;

  p {
    color: #005e78;
  }
`;

const CsoLoanCollection = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const workId = id;
  const [activeLink, setActiveLink] = useState("loans");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for selected date
  const [showCalendar, setShowCalendar] = useState(false); // State for calendar visibility
  const [totalAmountPaid, setTotalAmountPaid] = useState(0);
  const [updatecsoShow, setUpdateCsoShow] = useState(false);

  const handleUpdateCsoShow = () => {
    setUpdateCsoShow(!updatecsoShow);
  };
  const { totalOutstandingChart, defaultingTargetChart, percentageChart } =
    useSelector((state) => state.otherLoan);
  const [dayPicker, setDayPicker] = useState("today");

  const csoId = id;
  const {
    loans,
    totalLoans,
    activeLoans,
    fullyPaidLoan,
    pendingLoans,
    csoLoanDashdordLoans,
    csoDashboardTotalLoans,
    csoDashboardActiveLoans,
    csoDashboardFullPaidLoans,
    csoFullyPaidLoansDashbord,
    csoDashboardPendingLoans,
    csoDashboardRejectedLoans,
    rejectedLoans,
    defaultingCustomers,
    noPaymentYesterday,
    promptPayments,
    overduePayments,
    customers,
    page,
    totalPages,
    todayCount,
    yesterdayCount,
    monthCount,
    weekCount,
    status,
    error,
  } = useSelector((state) => state.loan);

  const {
    remmitdata,
    selectedRemiteDate,
    progressData,
    monthlyLoanCounts,
    loading,
    specifiedCso,
    updatingCsoloading,
    specifiedCsoTwo,
    updateCsoSuccessMessage,
  } = useSelector((state) => state.cso);

  const { remittanceProgress } = useSelector((state) => state.remittance);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    branch: "",
    address: "",
    status: "",
    guaratorEmail: "",
    guaratorName: "",
    guaratorPhone: "",
    guaratorAddress: "",
  });

  useEffect(() => {
    if (specifiedCso) {
      setForm({
        firstName: specifiedCso.firstName || "",
        lastName: specifiedCso.lastName || "",
        email: specifiedCso.email || "",
        phone: specifiedCso.phone || "",
        branch: specifiedCso.branch || "",
        address: specifiedCso.address || "",
        status: specifiedCso.status || "",
        guaratorEmail: specifiedCso.guaratorEmail || "",
        guaratorName: specifiedCso.guaratorName || "",
        guaratorPhone: specifiedCso.guaratorPhone || "",
        guaratorAddress: specifiedCso.guaratorAddress || "",
      });
    }
  }, [specifiedCso]);

  console.log(specifiedCso);
  console.log(updatingCsoloading);
  console.log(specifiedCso);
  console.log(updateCsoSuccessMessage);

  useEffect(() => {
    if (csoId) {
      dispatch(fetchOutstandingProgressChart(csoId));
    }
  }, [csoId, dispatch]);

  useEffect(() => {
    dispatch(fetchallgetRemittances({ workId, date: selectedRemiteDate }));
  }, [dispatch, workId, selectedRemiteDate]);

  useEffect(() => {
    dispatch(fetchLoanProgress(workId));
    dispatch(fetchRemittanceNewProgress(workId)); // Fetch remittance progress for this CSO
  }, [dispatch, workId]);

  useEffect(() => {
    if (workId) {
      dispatch(fetchForAdminUpdateCSO(workId));
    }
  }, [dispatch, workId]);

  useEffect(() => {
    dispatch(fetchLoanProgressChart(workId));
  }, [dispatch, workId]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId, page }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoIdLoanDashboardLoans(csoId));
  }, [dispatch]);

  useEffect(() => {
    // Dispatch the action to fetch loans when the component mounts or date changes
    dispatch(fetchCsoActiveLoans({ csoId, date: selectedDate.toISOString() }));
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
    // Fetch repayment data on component mount
    dispatch(fetchPieRepaymentData({ csoId }));
  }, [dispatch, csoId]);

  useEffect(() => {
    dispatch(fetchLoanAllTimeCounts({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLoanAllTimeCounts({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRemittanceNewProgress(workId)); // Fetch remittance progress for this CSO
  }, [dispatch, workId]);

  useEffect(() => {
    dispatch(fetchCsoActiveLoans({ csoId, date: selectedDate.toISOString() }));
  }, [dispatch, csoId, selectedDate]);

  // Function to format numbers with commas
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  const handleDayPicker = (link) => {
    setDayPicker(link);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
    setShowCalendar(false); // Hide calendar after selecting a date
  };

  const {
    activeLoanCount,
    loanTarget,
    loanProgress,
    amountDisbursed,
    disbursementTarget,
    disbursementProgress,
    amountPaidSoFar,
    collectionProgress,
    overallPerformance,
    loansDisbursedThisMonth, // Monthly loans disbursed
    monthlyLoanTarget, // Monthly loan target
    monthlyLoanProgress, // Monthly loan progress percentage
    amountDisbursedThisMonth,
    monthlyDisbursementTarget,
    monthlyDisbursementProgress,
    loansDisbursedThisWeek,
    weeklyLoanTarget,
    weeklyLoanProgress,
    amountDisbursedThisWeek,
    weeklyDisbursementTarget,
    weeklyDisbursementProgress,
    dailyLoanProgress,
    dailyDisbursementProgress,
    loansDisbursedYesterday,
    yesterdayDisbursementProgress,
  } = progressData || {};

  const customersWithDue = customers.filter(
    (customer) => customer.amountDue !== 0
  ).length;
  const customersWithPayments = customers.filter(
    (customer) => customer.amountPaidOnSelectedDate !== 0
  ).length;

  const handleNextPage = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  // Calculate percentages
  const total = promptPayments + overduePayments;
  const promptPercentage = ((promptPayments / total) * 100).toFixed(1); // Keep one decimal
  const overduePercentage = ((overduePayments / total) * 100).toFixed(1);

  // Prepare chart data
  const chartData = {
    labels: [
      `Prompt Payments ${promptPercentage}%`,
      `Overdue Payments ${overduePercentage}%`,
    ],
    datasets: [
      {
        data: [promptPayments, overduePayments],

        backgroundColor: ["#005E78", "#F4F0FD"], // Teal and Light Yellow
        hoverOffset: 4,
      },
    ],
  };

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Loan count",
        data: monthlyLoanCounts,
        backgroundColor: monthlyLoanCounts.map((count, index) =>
          index === 3 ? "#10B981" : "rgba(16, 185, 129, 0.3)"
        ), // Highlight April
        borderRadius: 10, // Rounded corners for bars
        barThickness: 20,
      },
      {
        label: " Loan Target",
        type: "line",
        data: Array(12).fill(monthlyLoanTarget),
        borderColor: "#1E40AF", // Deep blue for the line
        borderWidth: 3,
        tension: 0.4, // Smooth line
        pointBackgroundColor: "#1E40AF",
        pointBorderColor: "#1E40AF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: "",
      },
      tooltip: {
        backgroundColor: "#111827", // Dark tooltip background
        titleColor: "#FFFFFF",
        bodyColor: "#FFFFFF",
        padding: 10,
      },
      datalabels: {
        display: false, // Disable data labels
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Light grid lines
        },
      },
      x: {
        grid: {
          display: false, // Remove grid lines on x-axis
        },
      },
    },
  };

  const getColor = () => {
    if (percentageChart < 50) return "#4CAF50";
    if (percentageChart < 90) return "#FFC107";
    return "#F44336";
  };

  // Handle edge case: no target
  const isZeroTarget = defaultingTargetChart === 0;
  const adjustedPercentage = isZeroTarget
    ? 0
    : Math.min((totalOutstandingChart / defaultingTargetChart) * 100, 100);

  const chartNewData = {
    labels: ["Outstanding", "Remaining"],
    datasets: [
      {
        data: isZeroTarget
          ? [0, 100]
          : [adjustedPercentage, 100 - adjustedPercentage],
        backgroundColor: isZeroTarget
          ? ["#e0e0e0", "#e0e0e0"]
          : [getColor(), "#e0e0e0"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        align: "center",
        labels: {
          boxWidth: 15,
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            if (isZeroTarget) {
              return "No target set";
            }
            if (index === 0) {
              return `Outstanding: ₦${totalOutstandingChart.toLocaleString()}`;
            } else {
              const remaining = defaultingTargetChart - totalOutstandingChart;
              return `Remaining: ₦${remaining.toLocaleString()}`;
            }
          },
        },
      },
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setUpdateCsoShow(false);
    dispatch(updateByAdminCSO({ workId, updateFields: form }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!progressData)
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
  return (
    <CollectRap>
      <div className="cso-1">
        <div className="cso-link-container">
          <Link style={{}} className="cso-link" to="/admin/admincso">
            <Icon
              icon="formkit:arrowleft"
              width="90"
              height="16"
              style={{ color: "black", cursor: "pointer" }}
            />
          </Link>
          <Link
            className={`cso-link ${activeLink === "loans" ? "active" : ""}`}
            onClick={() => handleLinkClick("loans")}
          >
            Loans
          </Link>
          <Link
            className={`cso-link ${
              activeLink === "collections" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("collections")}
          >
            Collections
          </Link>
          <Link
            className={`cso-link ${activeLink === "dashboard" ? "active" : ""}`}
            onClick={() => handleLinkClick("dashboard")}
          >
            Dashboard
          </Link>
          <Link
            className={`cso-link ${
              activeLink === "remmitance" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("remmitance")}
          >
            Remmitance
          </Link>
          <Link
            className={`cso-link ${activeLink === "details" ? "active" : ""}`}
            onClick={() => handleLinkClick("details")}
          >
            Details
          </Link>
        </div>
      </div>

      <div className="details-div">
        {activeLink === "loans" && (
          <div>
            <div className="summary-loan">
              <p className="p-1">
                Submitted Loan Applications
                <span>{csoDashboardTotalLoans}</span>
              </p>
              <p className="p-2">
                Approved loans
                <span> {csoDashboardActiveLoans}</span>
              </p>
              <p className="p-2">
                Full Paid loans
                <span> {csoDashboardFullPaidLoans}</span>
              </p>
              <p className="p-3">
                Pending Loans:
                <span> {csoDashboardPendingLoans} </span>
              </p>
              <p className="p-4">
                Declined Loans:
                <span> {csoDashboardRejectedLoans} </span>
              </p>
            </div>
            <div className="table-container">
              <div className="new-table-scroll">
                <div className="table-div-con">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Branch</th>
                        <th>
                          Principal + <br /> Interest
                        </th>
                        <th>Actual Paid</th>
                        <th>Loan Balance</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan) => (
                        <tr key={loan._id}>
                          <td>
                            {loan?.customerDetails?.lastName}{" "}
                            {loan?.customerDetails?.firstName}
                          </td>
                          <td>{loan.branch}</td>
                          <td>{loan.loanDetails.amountToBePaid}</td>
                          <td>{loan.loanDetails.amountPaidSoFar}</td>
                          <td>
                            {loan.loanDetails.amountToBePaid -
                              loan.loanDetails.amountPaidSoFar}
                          </td>
                          <td>{loan.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="page-div">
                <button
                  className="page-btn"
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
        {activeLink === "collections" && (
          <>
            <div>
              <div className="collect-1">
                <h4>Daily Collections</h4>
              </div>
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
              {/* Calendar Dropdown */}
              {showCalendar && (
                <div
                  className="calendar-center"
                  style={{ position: "absolute", zIndex: 10, right: "20px" }}
                >
                  <Calendar onChange={handleDateChange} value={selectedDate} />
                </div>
              )}

              {/* Loans Table */}
              <div className="">
                <div className="table-container">
                  <div className="new-table-scroll">
                    <div className="table-div-con">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>S/N</th> {/* Serial number column header */}
                            <th>Customer Name</th>
                            <th>Amount Due</th>
                            <th>Amount Paid</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customers.map((customer, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>{" "}
                              {/* Serial number, starting from 1 */}
                              <td>{customer.customerName}</td>
                              <td>{customer.amountDue}</td>
                              <td>{customer.amountPaidOnSelectedDate}</td>
                              <td>{customer.status}</td> {/* Display status */}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="all-summary">
                <h4>Daily Summary</h4>
                <div className="summary-div">
                  <h6>Total Amount Collected:</h6>
                  <span> {formatNumberWithCommas(totalAmountPaid)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeLink === "dashboard" && (
          <>
            <div style={{ padding: "20px" }}>
              <div className="calendar-display-icon">
                <span>{selectedDate?.toDateString()}</span>{" "}
              </div>
              <div className="link-container">
                <Link
                  className={`link ${dayPicker === "today" ? "active" : ""}`}
                  onClick={() => handleDayPicker("today")}
                >
                  Today
                </Link>
                <Link
                  className={`link ${
                    dayPicker === "yesterday" ? "active" : ""
                  }`}
                  onClick={() => handleDayPicker("yesterday")}
                >
                  Yesterday
                </Link>
                <Link
                  className={`link ${dayPicker === "weekly" ? "active" : ""}`}
                  onClick={() => handleDayPicker("weekly")}
                >
                  Weekly
                </Link>
                <Link
                  className={`link ${dayPicker === "monthly" ? "active" : ""}`}
                  onClick={() => handleDayPicker("monthly")}
                >
                  Monthly
                </Link>
                <Link
                  className={`link ${dayPicker === "yearly" ? "active" : ""}`}
                  onClick={() => handleDayPicker("yearly")}
                >
                  Yearly
                </Link>
              </div>
              <div style={{ marginTop: "15px" }} className="overrall-perform">
                <div
                  style={{ height: "40px" }}
                  className="overrall-perform-outerbar"
                >
                  <div
                    className="overrall-perform-innerbar"
                    style={{
                      width: `${overallPerformance}%`,
                      transition: "width 0.3s ease",
                    }}
                  />
                  <div className="overrall-perform-innerbar-text">
                    Overall Performance
                  </div>
                </div>
                <p style={{ fontWeight: "bold" }}>
                  {overallPerformance?.toFixed(1)}%
                </p>
              </div>

              {/* Display counts */}
              <div className="counts-section">
                <h4>Daily Transaction</h4>
                <div className="summary-counts">
                  <p className="pay-count">
                    Total Collection <span>{customersWithPayments}</span>
                  </p>
                  <p className="due-pay">
                    Pending Collection:{" "}
                    <span>{activeLoans - customersWithPayments}</span>
                  </p>

                  {dayPicker === "yearly" && (
                    <p>
                      Yearly Loan count:
                      <span>{activeLoans}</span>
                    </p>
                  )}
                  {dayPicker === "today" && (
                    <p>
                      Today's Loan count:
                      <span>{todayCount}</span>
                    </p>
                  )}
                  {dayPicker === "yesterday" && (
                    <p>
                      Yesterday's Loan Count: <span>{yesterdayCount}</span>
                    </p>
                  )}
                  {dayPicker === "monthly" && (
                    <p>
                      Month's Loan count: <span>{monthCount}</span>
                    </p>
                  )}
                  {dayPicker === "weekly" && (
                    <p>
                      Week's Loan count: <span>{weekCount}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="all-progress">
                <div className="overrall-perform">
                  <div className="overrall-perform-outerbar">
                    <div
                      className="overrall-perform-innerbar"
                      style={{
                        background: "#009A49",
                        width: `${collectionProgress}%`,
                        transition: "width 0.3s ease",
                      }}
                    />
                    <div className="overrall-perform-innerbar-text">
                      Collections
                    </div>
                  </div>
                  <p style={{ fontWeight: "bold", color: "#4CAF50" }}>
                    {collectionProgress?.toFixed(1)}%
                  </p>
                </div>

                {dayPicker === "yearly" && (
                  <>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#F8BD00",
                            width: `${loanProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Count
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#F8BD00" }}>
                        {loanProgress?.toFixed(1)}%{" "}
                      </p>
                    </div>

                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#009A49",
                            width: `${disbursementProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Amount
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#009A49" }}>
                        {disbursementProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#FFA500",
                            width: `${remittanceProgress.monthProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Remittance
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#FFA500" }}>
                        {remittanceProgress?.monthProgress}%
                      </p>
                    </div>
                  </>
                )}

                {dayPicker === "monthly" && (
                  <>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#F8BD00",
                            width: `${monthlyLoanProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Count
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#F8BD00" }}>
                        {monthlyLoanProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#009A49",
                            width: `${monthlyDisbursementProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Amount
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#009A49" }}>
                        {monthlyDisbursementProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#FFA500",
                            width: `${remittanceProgress.monthProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Remittance
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#FFA500" }}>
                        {remittanceProgress?.monthProgress}%
                      </p>
                    </div>
                  </>
                )}

                {dayPicker === "weekly" && (
                  <>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#F8BD00",
                            width: `${weeklyLoanProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Count
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#F8BD00" }}>
                        {weeklyLoanProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#009A49",
                            width: `${weeklyDisbursementProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Amount
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#009A49" }}>
                        {weeklyDisbursementProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#FFA500",
                            width: `${remittanceProgress.weekProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Remittance
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#FFA500" }}>
                        {remittanceProgress?.weekProgress}%
                      </p>
                    </div>
                  </>
                )}

                {dayPicker === "yesterday" && (
                  <>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#F8BD00",
                            width: `${loansDisbursedYesterday}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Count
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#F8BD00" }}>
                        {loansDisbursedYesterday?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#009A49",
                            width: `${yesterdayDisbursementProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Amount
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#009A49" }}>
                        {yesterdayDisbursementProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#FFA500",
                            width: `${remittanceProgress.yesterdayProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Remittance
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#FFA500" }}>
                        {remittanceProgress?.yesterdayProgress}%
                      </p>
                    </div>
                  </>
                )}

                {dayPicker === "today" && (
                  <>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#F8BD00",
                            width: `${dailyLoanProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Count
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#F8BD00" }}>
                        {dailyLoanProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#009A49",
                            width: `${dailyDisbursementProgress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Loan Amount
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#009A49" }}>
                        {dailyDisbursementProgress?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="overrall-perform">
                      <div className="overrall-perform-outerbar">
                        <div
                          className="overrall-perform-innerbar"
                          style={{
                            background: "#FFA500",
                            width: `${remittanceProgress.progress}%`,
                            transition: "width 0.3s ease",
                          }}
                        />
                        <div className="overrall-perform-innerbar-text">
                          Remittance
                        </div>
                      </div>
                      <p style={{ fontWeight: "bold", color: "#FFA500" }}>
                        {remittanceProgress?.progress}%
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div style={{ maxWidth: "350px" }}>
                {/* <Pie
                  data={chartNewData}
                  options={{
                    plugins: {
                      legend: {
                        display: false, // Disable the default legend
                      },
                      datalabels: {
                        color: ["#F4F0FD", "#005E78"],
                        maxWidth: 70, // Limit the max width
                        font: {
                          size: 16,
                          weight: 700,
                        },
                        formatter: (value, context) => {
                          const label =
                            context.chart.data.labels[context.dataIndex];
                          // Split label into multiple lines if it exceeds maxWidth
                          const words = label.split(" ");
                          const firstLine = words.slice(0, 1).join(" "); // First part of the label
                          const secondLine = words.slice(1, 2).join(" "); // Remaining part
                          const thirdLine = words.slice(2).join(" ");
                          return secondLine
                            ? `${firstLine}\n${secondLine}\n${thirdLine}`
                            : firstLine;
                        },
                      },
                    },
                  }}
                /> */}
                <ChartRapper>
                  <div>
                    <h2 className="text-lg font-bold mb-2">
                      Default Limit Tracker
                    </h2>
                    <TextInfo>
                      <p>
                        Outstanding: <br /> ₦
                        {totalOutstandingChart.toLocaleString()}
                      </p>
                      <p>
                        Target: <br /> ₦{defaultingTargetChart.toLocaleString()}
                      </p>
                    </TextInfo>
                    {status === "loading" ? (
                      <p>Loading...</p>
                    ) : (
                      <FlexContainer>
                        <ChartWrapper>
                          <Doughnut
                            data={chartNewData}
                            options={chartOptions}
                          />
                        </ChartWrapper>
                      </FlexContainer>
                    )}
                  </div>
                </ChartRapper>
              </div>
              <div>
                <Bar data={data} options={options} />
              </div>
            </div>
          </>
        )}
        {activeLink === "remmitance" && (
          <>
            <div className="remmit">
              <h2 className="text-xl font-bold mb-4">Remittances</h2>

              {/* Date Picker */}
              <input
                type="date"
                value={selectedRemiteDate}
                onChange={(e) =>
                  dispatch(setSelectedRemmitDate(e.target.value))
                }
                className="date-input"
              />

              {/* Display Remittances */}
              {status === "loading" && (
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
              )}
              {status === "failed" && <p className="text-red-500">{error}</p>}
              {status === "succeeded" && remmitdata.length === 0 && (
                <p>No remittances for this date.</p>
              )}

              <div className="grid gap-4">
                {remmitdata.map((remit, index) => (
                  <div key={index} className="remmittance-div">
                    <p className="font-semibold">
                      Amount: <span> {remit.amount}</span>
                    </p>
                    {remit.image && (
                      <img
                        src={
                          remit.image?.startsWith("http")
                            ? remit.image // Cloudinary URL
                            : remit.image
                            ? `https://api.jksolutn.com${remit.image}` // Local image
                            : "fallback.jpg" // Optional fallback image
                        }
                        alt="business"
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeLink === "details" && (
          <>
            <div className="detail-in">
              <div className="detail-in-sub">
                <p>Name</p>
                <h6>
                  {specifiedCso?.lastName} {specifiedCso?.firstName}
                </h6>
              </div>
              <div className="detail-in-sub">
                <p>Email</p>
                <h6>{specifiedCso?.email} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Phone Number</p>
                <h6>{specifiedCso?.phone} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Gender</p>
                <h6>{specifiedCso?.status} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Address</p>
                <h6>{specifiedCso?.address} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Guarantor Name</p>
                <h6>{specifiedCso?.guaratorName} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Guarantor Email</p>
                <h6>{specifiedCso?.guaratorEmail} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Guarantor Address</p>
                <h6>{specifiedCso?.guaratorAddress} </h6>
              </div>
              <div className="detail-in-sub">
                <p>Guarantor Number</p>
                <h6>{specifiedCso?.guaratorPhone} </h6>
              </div>
              <button onClick={handleUpdateCsoShow}>Update Cso</button>
            </div>
          </>
        )}
      </div>

      {updatecsoShow ? (
        <>
          <div className="dropdown-container">
            <div className="update-show-drop">
              <div className="update-show-drop-header">
                <h4>Edit Profile</h4>
                <Icon
                  onClick={handleUpdateCsoShow}
                  icon="uil:times"
                  width="16"
                  height="16"
                  style={{ color: "black", cursor: "pointer" }}
                />
              </div>
              <div className="update-show-drop-body">
                <h6>Cso Information</h6>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
                <input
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="Branch"
                />
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
                <h6>Cso Guarantor Information</h6>
                <input
                  name="guaratorName"
                  value={form.guaratorName}
                  onChange={handleChange}
                  placeholder="Enter Guuarantor's Name"
                />
                <input
                  name="guaratorEmail"
                  value={form.guaratorEmail}
                  onChange={handleChange}
                  placeholder="Enter Guarantor's Email"
                />
                <input
                  name="guaratorAddress"
                  value={form.guaratorAddress}
                  onChange={handleChange}
                  placeholder="Enter Guarantor's Address"
                />
                <input
                  name="guaratorPhone"
                  value={form.guaratorPhone}
                  onChange={handleChange}
                  placeholder="Enter Guarantor's Number"
                />

                <button onClick={handleSubmit}>Save Changes</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {updateCsoSuccessMessage &&
      updateCsoSuccessMessage !== undefined &&
      updateCsoSuccessMessage !== null ? (
        <>
          <div className="dropdown-container">
            <div className="update-show-drop">
              <div className="update-show-drop-body">
                <p>{updateCsoSuccessMessage}</p>
                <button onClick={() => dispatch(clearUpdateSuccessMessages())}>
                  Exit
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      {updatingCsoloading ? (
        <div className="dropdown-container">
          <PulseLoader color="white" size={10} />
        </div>
      ) : (
        ""
      )}
    </CollectRap>
  );
};

export default CsoLoanCollection;
