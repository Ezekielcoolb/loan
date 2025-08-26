import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportMonthlySummary,
  setMonthYear,
} from "../../redux/slices/reportSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ReportRap = styled.div`
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
  .find-lawyer-header-upper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .find-lawyer-header-upper button {
    color: #030b26;
    border: 1px solid #030b26;
    height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    background-color: transparent;
  }
  .weeks-days {
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 20px 0px;
  }

  .week-paragraph {
    color: #030b26;
    font-weight: 600;
    cursor: pointer;
    font-size: 16px;
  }
  .week-paragraph.active {
    color: #727789;
  }
  .total {
    color: #030b26;
    font-weight: 600;
    font-size: 16px;
  }
`;

// ...existing code...

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  /* Try removing min-width or set to unset */
  min-width: unset;
`;

const TableWrapper = styled.div`
  min-width: 100%;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  min-width: max-content; /* Ensures table grows with content */
  border: 1px solid #ccc;

  th,
  td {
    padding: 8px 12px;
    border: 1px solid #ccc;
    text-align: center;
    white-space: nowrap;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;
// ...existing code...

const SecondReportPage = () => {
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("new");
  const [openweek, setOpenweek] = useState("week1");
  const { data, status, error, currentMonth, currentYear } = useSelector(
    (state) => state.report
  );
  console.log(data);

  const handleWeekOpen = (link) => {
    setOpenweek(link);
  };
  useEffect(() => {
    dispatch(
      fetchReportMonthlySummary({ month: currentMonth, year: currentYear })
    );
  }, [dispatch, currentMonth, currentYear]);

  const handlePrevMonth = () => {
    let month = currentMonth - 1;
    let year = currentYear;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
    dispatch(setMonthYear({ month, year }));
  };

  const handleNextMonth = () => {
    let month = currentMonth + 1;
    let year = currentYear;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    dispatch(setMonthYear({ month, year }));
  };

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayEntries = data?.days ? Object.entries(data.days) : [];

  const filteredEntries = dayEntries
    .map(([dateStr, dayData]) => ({
      date: new Date(dateStr),
      dateStr,
      dayData,
    }))
    .filter(({ date }) => {
      const day = date.getDay();
      return day >= 1 && day <= 5; // Monday to Friday only
    })
    .sort((a, b) => a.date - b.date);

  const csos = React.useMemo(() => {
    const set = new Set();
    filteredEntries.forEach(({ dayData }) => {
      Object.keys(dayData.csoLoans || {}).forEach((cso) => set.add(cso));
    });
    return Array.from(set);
  }, [filteredEntries]);

  const weeks = React.useMemo(() => {
    const weekdays = dayEntries
      .map(([dateStr, dayData]) => {
        const date = new Date(dateStr);
        const day = date.getDay();
        if (day === 0 || day === 6) return null; // Skip weekends
        return { date, dateStr, dayData };
      })
      .filter(Boolean)
      .sort((a, b) => a.date - b.date);

    const groupedWeeks = [];
    let currentWeek = [];

    weekdays.forEach(({ date, dateStr, dayData }, idx) => {
      const day = date.getDay();
      currentWeek.push({ date, dateStr, dayData });

      const isLastItem = idx === weekdays.length - 1;
      if (day === 5 || isLastItem) {
        groupedWeeks.push(currentWeek);
        currentWeek = [];
      }
    });

    return groupedWeeks;
  }, [dayEntries]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const weeklyReports = data?.weeklyReports;
  console.log(weeklyReports);
  const week1 = weeklyReports?.find((week) => week.weekName === "Week 1");
  const week2 = weeklyReports?.find((week) => week.weekName === "Week 2");
  const week3 = weeklyReports?.find((week) => week.weekName === "Week 3");
  const week4 = weeklyReports?.find((week) => week.weekName === "Week 4");
  const week5 = weeklyReports?.find((week) => week.weekName === "Week 5");

  const monthlyTotals = {
    totalDisbursement: 0,
    totalInterest: 0,
    totalExpenses: 0,
    totalLoanAppForm: 0,
    profit: 0,
  };

  weeklyReports?.forEach((week) => {
    week?.days?.forEach((day) => {
      monthlyTotals.totalDisbursement += day.totalDisbursement || 0;
      monthlyTotals.totalInterest += day.totalInterest || 0;
      monthlyTotals.totalExpenses += day.totalExpenses || 0;
      monthlyTotals.totalLoanAppForm += day.totalLoanAppForm || 0;
      monthlyTotals.profit += day.profit || 0;
    });
  });

  return (
    <ReportRap>
      <div className="find-lawyer-header">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}

        <>
          <div className="weeks-days">
            <p
              className={`week-paragraph ${
                openweek === "week1" ? "active" : ""
              }`}
              onClick={() => handleWeekOpen("week1")}
            >
              Week 1
            </p>
            <p
              className={`week-paragraph ${
                openweek === "week2" ? "active" : ""
              }`}
              onClick={() => handleWeekOpen("week2")}
            >
              Week 2
            </p>
            <p
              className={`week-paragraph ${
                openweek === "week3" ? "active" : ""
              }`}
              onClick={() => handleWeekOpen("week3")}
            >
              Week 3
            </p>
            <p
              className={`week-paragraph ${
                openweek === "week4" ? "active" : ""
              }`}
              onClick={() => handleWeekOpen("week4")}
            >
              Week 4
            </p>
            <p
              className={`week-paragraph ${
                openweek === "week5" ? "active" : ""
              }`}
              onClick={() => handleWeekOpen("week5")}
            >
              Week 5
            </p>
          </div>
          {status === "succeeded" && (
            <>
              {openweek === "week1" && (
                <>
                  {week1 && (
                    <div className="table-container">
                      <div className="new-table-scroll">
                        <div className="table-div-con"></div>
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day</th>
                              <th>New Loan</th>
                              <th>Card & Others</th>
                              <th>Interst On Loan</th>
                              <th>Total Expenses</th>
                              <th>Profit</th>
                              <th>Total Loan Balance</th>
                              <th>Cash At Hand</th>
                              <th>Growth</th>
                            </tr>
                          </thead>
                          <tbody>
                            {week1?.days.map((day) => {
                              const dateObj = new Date(day.date);
                              const csoMap = {};
                              day.csoLoans.forEach(
                                ({ csoName, loansCount }) => {
                                  csoMap[csoName.trim()] = loansCount;
                                }
                              );

                              return (
                                <tr key={day.date}>
                                  <td>{day.date}</td>
                                  <td>
                                    {(() => {
                                      const utcDate = new Date(
                                        `${day.date}T00:00:00Z`
                                      );
                                      const dayOfWeek = utcDate.getUTCDay(); // always consistent
                                      return daysOfWeek[dayOfWeek];
                                    })()}
                                  </td>
                                  <td>{day?.totalDisbursement}</td>
                                  <td>{day?.totalLoanAppForm}</td>
                                  <td>{day?.totalInterest}</td>
                                  <td>{day?.totalExpenses}</td>
                                  <td>{day?.profit}</td>
                                  <td>{day?.totalLoanBalance}</td>
                                  <td>{day?.totalCashAtHand}</td>
                                  <td>{day?.growth}</td>
                                </tr>
                              );
                            })}

                            {/* Totals Row */}
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <td colSpan={2}>Total</td>
                              <td>
                                {week1?.days?.reduce(
                                  (sum, d) => sum + (d.totalDisbursement || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week1?.days?.reduce(
                                  (sum, d) => sum + (d.totalLoanAppForm || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week1?.days?.reduce(
                                  (sum, d) => sum + (d.totalInterest || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week1?.days?.reduce(
                                  (sum, d) => sum + (d.totalExpenses || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week1?.days?.reduce(
                                  (sum, d) => sum + (d.profit || 0),
                                  0
                                )}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {openweek === "week2" && (
                <>
                  {week2 && (
                    <div className="table-container">
                      <div className="new-table-scroll">
                        <div className="table-div-con"></div>
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day</th>
                              <th>New Loan</th>
                              <th>Card & Others</th>
                              <th>Interst On Loan</th>
                              <th>Total Expenses</th>
                              <th>Profit</th>
                              <th>Total Loan Balance</th>
                              <th>Cash At Hand</th>
                              <th>Growth</th>
                            </tr>
                          </thead>
                          <tbody>
                            {week2?.days.map((day) => {
                              const dateObj = new Date(day.date);
                              const csoMap = {};
                              day.csoLoans.forEach(
                                ({ csoName, loansCount }) => {
                                  csoMap[csoName.trim()] = loansCount;
                                }
                              );

                              return (
                                <tr key={day.date}>
                                  <td>{day.date}</td>
                                  <td>{daysOfWeek[dateObj.getDay()]}</td>
                                  <td>{day?.totalDisbursement}</td>
                                  <td>{day?.totalLoanAppForm}</td>
                                  <td>{day?.totalInterest}</td>
                                  <td>{day?.totalExpenses}</td>
                                  <td>{day?.profit}</td>
                                  <td>{day?.totalLoanBalance}</td>
                                  <td>{day?.totalCashAtHand}</td>
                                  <td>{day?.growth}</td>
                                </tr>
                              );
                            })}
                            {/* Totals Row */}
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <td colSpan={2}>Total</td>
                              <td>
                                {week2?.days?.reduce(
                                  (sum, d) => sum + (d.totalDisbursement || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week2?.days?.reduce(
                                  (sum, d) => sum + (d.totalLoanAppForm || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week2?.days?.reduce(
                                  (sum, d) => sum + (d.totalInterest || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week2?.days?.reduce(
                                  (sum, d) => sum + (d.totalExpenses || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week2?.days?.reduce(
                                  (sum, d) => sum + (d.profit || 0),
                                  0
                                )}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {openweek === "week3" && (
                <>
                  {week3 && (
                    <div className="table-container">
                      <div className="new-table-scroll">
                        <div className="table-div-con"></div>
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day</th>
                              <th>New Loan</th>
                              <th>Card & Others</th>
                              <th>Interst On Loan</th>
                              <th>Total Expenses</th>
                              <th>Profit</th>
                              <th>Total Loan Balance</th>
                              <th>Cash At Hand</th>
                              <th>Growth</th>
                            </tr>
                          </thead>
                          <tbody>
                            {week3?.days.map((day) => {
                              const dateObj = new Date(day.date);
                              const csoMap = {};
                              day.csoLoans.forEach(
                                ({ csoName, loansCount }) => {
                                  csoMap[csoName.trim()] = loansCount;
                                }
                              );

                              return (
                                <tr key={day.date}>
                                  <td>{day.date}</td>
                                  <td>{daysOfWeek[dateObj.getDay()]}</td>
                                  <td>{day?.totalDisbursement}</td>
                                  <td>{day?.totalLoanAppForm}</td>
                                  <td>{day?.totalInterest}</td>
                                  <td>{day?.totalExpenses}</td>
                                  <td>{day?.profit}</td>
                                  <td>{day?.totalLoanBalance}</td>
                                  <td>{day?.totalCashAtHand}</td>
                                  <td>{day?.growth}</td>
                                </tr>
                              );
                            })}
                            {/* Totals Row */}
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <td colSpan={2}>Total</td>
                              <td>
                                {week3?.days?.reduce(
                                  (sum, d) => sum + (d.totalDisbursement || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week3?.days?.reduce(
                                  (sum, d) => sum + (d.totalLoanAppForm || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week3?.days?.reduce(
                                  (sum, d) => sum + (d.totalInterest || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week3?.days?.reduce(
                                  (sum, d) => sum + (d.totalExpenses || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week3?.days?.reduce(
                                  (sum, d) => sum + (d.profit || 0),
                                  0
                                )}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}

              {openweek === "week4" && (
                <>
                  {week4 && (
                    <div className="table-container">
                      <div className="new-table-scroll">
                        <div className="table-div-con"></div>
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day</th>
                              <th>New Loan</th>
                              <th>Card & Others</th>
                              <th>Interst On Loan</th>
                              <th>Total Expenses</th>
                              <th>Profit</th>
                              <th>Total Loan Balance</th>
                              <th>Cash At Hand</th>
                              <th>Growth</th>
                            </tr>
                          </thead>
                          <tbody>
                            {week4?.days.map((day) => {
                              const dateObj = new Date(day.date);
                              const csoMap = {};
                              day.csoLoans.forEach(
                                ({ csoName, loansCount }) => {
                                  csoMap[csoName.trim()] = loansCount;
                                }
                              );

                              return (
                                <tr key={day.date}>
                                  <td>{day.date}</td>
                                  <td>{daysOfWeek[dateObj.getDay()]}</td>
                                  <td>{day?.totalDisbursement}</td>
                                  <td>{day?.totalLoanAppForm}</td>
                                  <td>{day?.totalInterest}</td>
                                  <td>{day?.totalExpenses}</td>
                                  <td>{day?.profit}</td>
                                  <td>{day?.totalLoanBalance}</td>
                                  <td>{day?.totalCashAtHand}</td>
                                  <td>{day?.growth}</td>
                                </tr>
                              );
                            })}
                            {/* Totals Row */}
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <td colSpan={2}>Total</td>
                              <td>
                                {week4?.days?.reduce(
                                  (sum, d) => sum + (d.totalDisbursement || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week4?.days?.reduce(
                                  (sum, d) => sum + (d.totalLoanAppForm || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week4?.days?.reduce(
                                  (sum, d) => sum + (d.totalInterest || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week4?.days?.reduce(
                                  (sum, d) => sum + (d.totalExpenses || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week4?.days?.reduce(
                                  (sum, d) => sum + (d.profit || 0),
                                  0
                                )}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
              {openweek === "week5" && (
                <>
                  {week5 && (
                    <div className="table-container">
                      <div className="new-table-scroll">
                        <div className="table-div-con"></div>
                        <table className="custom-table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Day</th>
                              <th>New Loan</th>
                              <th>Card & Others</th>
                              <th>Interst On Loan</th>
                              <th>Total Expenses</th>
                              <th>Profit</th>
                              <th>Total Loan Balance</th>
                              <th>Cash At Hand</th>
                              <th>Growth</th>
                            </tr>
                          </thead>
                          <tbody>
                            {week5?.days.map((day) => {
                              const dateObj = new Date(day.date);
                              const csoMap = {};
                              day.csoLoans.forEach(
                                ({ csoName, loansCount }) => {
                                  csoMap[csoName.trim()] = loansCount;
                                }
                              );

                              return (
                                <tr key={day.date}>
                                  <td>{day.date}</td>
                                  <td>{daysOfWeek[dateObj.getDay()]}</td>
                                  <td>{day?.totalDisbursement}</td>
                                  <td>{day?.totalLoanAppForm}</td>
                                  <td>{day?.totalInterest}</td>
                                  <td>{day?.totalExpenses}</td>
                                  <td>{day?.profit}</td>
                                  <td>{day?.totalLoanBalance}</td>
                                  <td>{day?.totalCashAtHand}</td>
                                  <td>{day?.growth}</td>
                                </tr>
                              );
                            })}
                            {/* Totals Row */}
                            <tr
                              style={{
                                fontWeight: "bold",
                                backgroundColor: "#f1f1f1",
                              }}
                            >
                              <td colSpan={2}>Total</td>
                              <td>
                                {week5?.days?.reduce(
                                  (sum, d) => sum + (d.totalDisbursement || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week5?.days?.reduce(
                                  (sum, d) => sum + (d.totalLoanAppForm || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week5?.days?.reduce(
                                  (sum, d) => sum + (d.totalInterest || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week5?.days?.reduce(
                                  (sum, d) => sum + (d.totalExpenses || 0),
                                  0
                                )}
                              </td>
                              <td>
                                {week5?.days?.reduce(
                                  (sum, d) => sum + (d.profit || 0),
                                  0
                                )}
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Monthly Summary Table */}
          <h3
            style={{
              marginTop: "20px",
            }}
          >
             {new Date(currentYear, currentMonth - 1).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )}{" "}
              {currentYear} Summary
          </h3>
          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 border">Total Disbursement</th>
                      <th className="px-4 py-2 border">Total Interest</th>
                      <th className="px-4 py-2 border">Total Expenses</th>
                      <th className="px-4 py-2 border">Card & Others</th>
                      <th className="px-4 py-2 border">Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">
                        {monthlyTotals.totalDisbursement.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">
                        {monthlyTotals.totalInterest.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">
                        {monthlyTotals.totalExpenses.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border">
                        {monthlyTotals.totalLoanAppForm.toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border font-bold">
                        {monthlyTotals.profit.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      </div>

      {/* Additional Monthly Totals */}
    </ReportRap>
  );
};

export default SecondReportPage;
