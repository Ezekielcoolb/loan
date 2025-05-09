import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoanProgress,
  
} from "../redux/slices/csoSlice";
import styled from "styled-components";
import Calendar from "react-calendar"; // Import the calendar
import {
  fetchAllLoansByCsoId,
  fetchCsoActiveLoans,
  fetchLoanAllTimeCounts,
} from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import LoanProgressChart from "./csoLoanChart";
import RepaymentPieChart from "./csoPaymentPieChart";
import { Link, useNavigate } from "react-router-dom";
import { fetchRemittanceNewProgress } from "../redux/slices/remittanceSlice";
import CsoOutstandingDoughnutChart from "./csoDefaultingTargetChart";

const DashboardRap = styled.div`
  background: #d9d9d9;
  padding: 20px;
  padding-bottom: 40px;
  .overrall-perform-outerbar {
    background: #ffffff;
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
`;

const CsoDashboard = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const {  progressData, loading, error } = useSelector(
    (state) => state.cso
  );
  const { remittanceProgress} = useSelector(
    (state) => state.remittance
  );
  const {fullyPaidLoan, weekCount, todayCount, yesterdayCount, monthCount, customers } = useSelector(
    (state) => state.loan
  );

  const csoId = user.workId;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const workId = user.workId;
  const { activeLoans } = useSelector((state) => state.loan);
  const [dayPicker, setDayPicker] = useState("today");

  const handleDayPicker = (link) => {
    setDayPicker(link);
  };

  useEffect(() => {
    if (workId) {
      dispatch(fetchLoanProgress(workId));
    }
  }, [dispatch, workId]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLoanAllTimeCounts({ csoId }));
  }, [dispatch]);
  useEffect(() => {
    if (workId) {
      dispatch(fetchRemittanceNewProgress(workId)); // Fetch remittance progress for this CSO
    }
  }, [dispatch, workId]);

  useEffect(() => {
    dispatch(fetchCsoActiveLoans({ csoId, date: selectedDate.toISOString() }));
  }, [dispatch, csoId, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!progressData) return <p>No data available.</p>;

  const {
    csoName,
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
    yesterdayDisbursementProgress
  } = progressData;

  const customersWithDue = customers.filter(
    (customer) => customer.amountDue !== 0
  ).length;
  const customersWithPayments = customers.filter(
    (customer) => customer.amountPaidOnSelectedDate !== 0
  ).length;

  return (
    <DashboardRap>
      <div>
        <div className="calendar-display-icon">
          <span>{selectedDate.toDateString()}</span>{" "}
        </div>
        <div className="link-container">
          <Link
            className={`link ${dayPicker === "today" ? "active" : ""}`}
            onClick={() => handleDayPicker("today")}
          >
            Today
          </Link>
          <Link
            className={`link ${dayPicker === "yesterday" ? "active" : ""}`}
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
          <div style={{ height: "40px" }} className="overrall-perform-outerbar">
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
          <p style={{ fontWeight: "bold" }}>{overallPerformance?.toFixed(1)}%</p>
        </div>

        {/* Display counts */}
        <div className="counts-section">
          <h4>Daily Transaction</h4>
          <div className="summary-counts">
            <p className="pay-count">
              Total Collection <span>{customersWithPayments}</span>
            </p>
            <p className="due-pay">
              Pending Collection: <span>{activeLoans - customersWithPayments}</span>
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
              <div className="overrall-perform-innerbar-text">Collections</div>
            </div>
            <p style={{ fontWeight: "bold", color: "#4CAF50" }}>
              {collectionProgress?.toFixed(1)}%
            </p>
          </div>

          {dayPicker === "yearly" && (
            <>
              {/* Loan Progress Bar */}
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

              {/* Disbursement Progress Bar */}
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
              <div className="overrall-perform-innerbar-text">Remittance</div>
            </div>
            <p style={{ fontWeight: "bold", color: "#FFA500" }}>
              {remittanceProgress?.monthProgress}%
            </p>
          </div>
            </>
          )}

          {dayPicker === "monthly" && (
            <>
              {/* Monthly Loan Progress Bar */}
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
              <div className="overrall-perform-innerbar-text">Remittance</div>
            </div>
            <p style={{ fontWeight: "bold", color: "#FFA500" }}>
              {remittanceProgress?.monthProgress}%
            </p>
          </div>
            </>
          )}

          {dayPicker === "weekly"  && 
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
              <div className="overrall-perform-innerbar-text">Remittance</div>
            </div>
            <p style={{ fontWeight: "bold", color: "#FFA500" }}>
              {remittanceProgress?.weekProgress}%
            </p>
          </div>
              </>
            }
            {dayPicker==="yesterday" && 
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
              <div className="overrall-perform-innerbar-text">Remittance</div>
            </div>
            <p style={{ fontWeight: "bold", color: "#FFA500" }}>
              {remittanceProgress?.yesterdayProgress}%
            </p>
          </div>
            </>
            }
{dayPicker === "today"  && 
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
              <div className="overrall-perform-innerbar-text">Remittance</div>
            </div>
            <p style={{ fontWeight: "bold", color: "#FFA500" }}>
              {remittanceProgress?.progress}%
            </p>
          </div>
              </>
            }
         
        </div>
        <div>
          <CsoOutstandingDoughnutChart />
          {/* <RepaymentPieChart /> */}
        </div>
        <div>
          <LoanProgressChart />
        </div>
      </div>

      {/* Calendar Dropdown */}
      {showCalendar && (
        <div
          className="calendar-center"
          style={{ position: "absolute", zIndex: 10, left: "20px" }}
        >
          <Calendar onChange={handleDateChange} value={selectedDate} />
        </div>
      )}
    </DashboardRap>
  );
};

export default CsoDashboard;
