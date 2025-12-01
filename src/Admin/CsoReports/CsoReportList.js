import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCsoReportsSummary } from "../../redux/slices/otherLoanSlice";
import styled from "styled-components";

const ReportRap = styled.div`
  padding: 20px;

  span {
    color: #112240;
    font-size: 18px;
    font-weight: 600;
  }
  label {
    color: #555;
    font-weight: 500;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  input {
    border: 1px solid #d0d5dd;
    color: #112240;
    font-weight: 600;
  }
  .month-input {
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    padding-left: 10px;
  }
  .year-input {
    width: 100px;
    height: 45px;
    border-radius: 12px;
    padding-left: 10px;
  }
  .report-upper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
  }
  .year-month {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }
  button {
    width: 100px;
    border: none;
    background: #030b26;
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    height: 45px;
    border-radius: 24px;
  }
  .btns-month {
    margin: 20px 0px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .view-btn {
    width: auto;
    padding: 0 18px;
    height: 34px;
    border-radius: 16px;
    font-size: 13px;
  }
`;

function getInitialMonthYear() {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // JS months are 0-based
    year: now.getFullYear(),
  };
}

export default function CsoReportSummaryTable() {
  const dispatch = useDispatch();
  const { csosReport, loading, error } = useSelector(
    (state) => state.otherLoan
  );
  const navigate = useNavigate();

  const [{ month, year }, setMonthYear] = useState(getInitialMonthYear());
  console.log(csosReport);

  useEffect(() => {
    dispatch(fetchCsoReportsSummary({ month, year }));
  }, [dispatch, month, year]);

  const handlePrev = () => {
    let newMonth = month - 1;
    let newYear = year;
    if (newMonth < 1) {
      newMonth = 12;
      newYear = year - 1;
    }
    setMonthYear({ month: newMonth, year: newYear });
  };

  const handleNext = () => {
    let newMonth = month + 1;
    let newYear = year;
    if (newMonth > 12) {
      newMonth = 1;
      newYear = year + 1;
    }
    setMonthYear({ month: newMonth, year: newYear });
  };

  const handleMonthChange = (e) => {
    setMonthYear({ month: Number(e.target.value), year });
  };

  const handleYearChange = (e) => {
    setMonthYear({ month, year: Number(e.target.value) });
  };

  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <ReportRap>
      <div className="find-lawyer-header">
        {/* CSO List */}
        <div className="report-upper">
          <h2>CSOs Report</h2>
          <div className="year-month">
            <label>
              Month:
              <input
                className="month-input"
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={handleMonthChange}
              />
            </label>
            <label>
              Year:
              <input
                className="year-input"
                type="number"
                min="2000"
                max="2100"
                value={year}
                onChange={handleYearChange}
                style={{ width: 80, marginLeft: 5 }}
              />
            </label>
          </div>
        </div>
        {/* CSO Stats Table */}
        <div>
          <div className="btns-month">
            <button onClick={handlePrev}> Prev</button>
            <span>
              {monthNames[month]} {year}
            </span>
            <button onClick={handleNext}>Next</button>
          </div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table">
                  {" "}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Portfolio Worth</th>
                      <th>Balance of Debt</th>
                      <th>Total Repayment</th>
                      <th>Total Disbursed</th>
                      <th>Total Loan Count</th>

                      <th>Total Interest</th>

                      <th>Total Recovery</th>
                      <th>Overshoot Value </th>
                      <th> Bonus</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {csosReport?.map((cso) => (
                      <tr key={cso.csoId}>
                        <td>{cso.name}</td>
                        <td>{cso.totalDisbursed + cso.totalInterest}</td>
                        <td>{cso.totalOverdue}</td>
                        <td>{cso.totalRepayment}</td>
                        <td>{cso.totalDisbursed}</td>
                        <td>{cso.totalLoanCount}</td>

                        <td>{cso.totalInterest}</td>

                        <td>{cso.totalRecovery}</td>
                        <td>{cso.overshootValue}</td>

                        <td>{cso.bonus}</td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={() =>
                              navigate(
                                `/admin/cso/reports/${cso.csoId}?month=${month}&year=${year}`,
                                {
                                  state: { cso, month, year },
                                }
                              )
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ReportRap>
  );
}
