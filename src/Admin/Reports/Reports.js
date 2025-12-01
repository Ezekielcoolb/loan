import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportMonthlySummary,
  setMonthYear,
} from "../../redux/slices/reportSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SecondReportPage from "./SecondOperation";
import MonthlyReport from "./MonthlyReport";

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

const ReportPage = () => {
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

  const monthlyTotals = React.useMemo(() => {
    const totals = {
      csos: {},
      totalDisbursement: 0,
      totalLoanAppForm: 0,
      totalInterest: 0,
      totalExpenses: 0,
      totalProfit: 0,
    };

    filteredEntries?.forEach(({ dayData }) => {
      csos.forEach((cso) => {
        const value = dayData.csoLoans?.[cso] ?? 0;
        totals.csos[cso] = (totals.csos[cso] || 0) + value;
      });

      totals.totalDisbursement += dayData.totalDisbursement ?? 0;
      totals.totalLoanAppForm += dayData.totalLoanAppForm ?? 0;
      totals.totalInterest += dayData.totalInterest ?? 0;
      totals.totalExpenses += dayData.totalExpenses ?? 0;
    });

    totals.totalProfit = totals.totalInterest + totals.totalLoanAppForm;

    return totals;
  }, [filteredEntries, csos]);

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

  const uniqueCsos = Array.from(
    new Set(
      week1?.days.flatMap((day) =>
        day.csoLoans.map((loan) => loan.csoName.trim())
      )
    )
  );
  const uniqueCsosTwo = Array.from(
    new Set(
      week2?.days.flatMap((day) =>
        day.csoLoans.map((loan) => loan.csoName.trim())
      )
    )
  );
  const uniqueCsosThree = Array.from(
    new Set(
      week3?.days.flatMap((day) =>
        day.csoLoans.map((loan) => loan.csoName.trim())
      )
    )
  );

  const uniqueCsosFour = Array.from(
    new Set(
      week4?.days.flatMap((day) =>
        day.csoLoans.map((loan) => loan.csoName.trim())
      )
    )
  );
  const uniqueCsosFive = Array.from(
    new Set(
      week5?.days.flatMap((day) =>
        day.csoLoans.map((loan) => loan.csoName.trim())
      )
    )
  );

  const allCsoNames = new Set();

  weeklyReports?.forEach((week) => {
    week.days.forEach((day) => {
      day.csoLoans.forEach(({ csoName }) => {
        allCsoNames.add(csoName.trim());
      });
    });
  });

  const csoList = Array.from(allCsoNames);

  // Build table data per week
  const tableData = weeklyReports?.map((week) => {
    const row = { weekName: week.weekName };
    csoList.forEach((cso) => (row[cso] = 0));
    week.days.forEach((day) => {
      day.csoLoans.forEach(({ csoName, loansCount }) => {
        const name = csoName.trim();
        row[name] += loansCount;
      });
    });
    return row;
  });
  const totalRow = { weekName: "Total" };
  csoList.forEach((cso) => {
    totalRow[cso] = tableData.reduce((sum, row) => sum + row[cso], 0);
  });

  return (
    <ReportRap>
      <div className="client-1">
        <div className="client-link-container">
          <Link
            className={`client-link ${activeLink === "new" ? "active" : ""}`}
            onClick={() => handleLinkClick("new")}
          >
            Cso Reports
          </Link>
          <Link
            className={`client-link ${
              activeLink === "previous" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("previous")}
          >
            Business Reports
          </Link>
          <Link
            className={`client-link ${
              activeLink === "monthly" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("monthly")}
          >
            Monthly Reports
          </Link>
        </div>
      </div>

      <div className="find-lawyer-header">
        {activeLink === "monthly" ? "" : (
          <>
          <div className="find-lawyer-header-upper">
            <h2> Report</h2>
            <div
              style={{
                margin: "10px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <button onClick={handlePrevMonth}>Previous Month</button>
            <div>
              {new Date(currentYear, currentMonth - 1).toLocaleString(
                "default",
                {
                  month: "long",
                }
              )}{" "}
              {currentYear}
            </div>
            <button onClick={handleNextMonth}>Next Month</button>
          </div>
        </div>
      

        {status && <p>Loading...</p>}
        </>
  )}
        {activeLink === "new" && (
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
                                {uniqueCsos?.map((cso) => (
                                  <th key={cso}>{cso}</th>
                                ))}
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
                                    {uniqueCsos?.map((cso) => (
                                      <td key={cso}>{csoMap[cso] ?? 0}</td>
                                    ))}
                                  </tr>
                                );
                              })}
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
                                {uniqueCsosTwo?.map((cso) => (
                                  <th key={cso}>{cso}</th>
                                ))}
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
                                    {uniqueCsosTwo?.map((cso) => (
                                      <td key={cso}>{csoMap[cso] ?? 0}</td>
                                    ))}
                                  </tr>
                                );
                              })}
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
                                {uniqueCsosThree?.map((cso) => (
                                  <th key={cso}>{cso}</th>
                                ))}
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
                                    {uniqueCsosThree?.map((cso) => (
                                      <td key={cso}>{csoMap[cso] ?? 0}</td>
                                    ))}
                                  </tr>
                                );
                              })}
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
                                {uniqueCsosFour?.map((cso) => (
                                  <th key={cso}>{cso}</th>
                                ))}
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
                                    {uniqueCsosFour?.map((cso) => (
                                      <td key={cso}>{csoMap[cso] ?? 0}</td>
                                    ))}
                                  </tr>
                                );
                              })}
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
                                {uniqueCsosFive?.map((cso) => (
                                  <th key={cso}>{cso}</th>
                                ))}
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
                                    {uniqueCsosFive?.map((cso) => (
                                      <td key={cso}>{csoMap[cso] ?? 0}</td>
                                    ))}
                                  </tr>
                                );
                              })}
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
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2 border text-left">Week</th>
                        {csoList.map((cso) => (
                          <th key={cso} className="px-4 py-2 border text-left">
                            {cso}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData?.map((row) => (
                        <tr key={row.weekName}>
                          <td className="px-4 py-2 border">{row.weekName}</td>
                          {csoList.map((cso) => (
                            <td key={cso} className="px-4 py-2 border">
                              {row[cso]}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="font-bold bg-gray-100">
                        <td className="total">Total</td>
                        {csoList.map((cso) => (
                          <td key={cso} className="total">
                            {totalRow[cso]}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {activeLink === "previous" && <SecondReportPage />}
        {activeLink === "monthly" && <MonthlyReport />}
      </div>

      {/* Additional Monthly Totals */}
    </ReportRap>
  );
};

export default ReportPage;
