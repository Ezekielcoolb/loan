import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoanMonthlyMatrics,
  fetchLoanMonthlySummary,
} from "../../redux/slices/LoanSlice";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;

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

  .find-lawyer-header {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-x: auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #030b26;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  button {
    padding: 6px 12px;
    border: 1px solid #030b26;
    border-radius: 4px;
    background: #fff;
    color: #030b26;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover:not(:disabled) {
      background: #030b26;
      color: #fff;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &.active {
      background: #030b26;
      color: #fff;
    }
  }

  span {
    font-weight: 600;
    font-size: 16px;
    color: #030b26;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
`;

const DataTable = styled.table`
  border-collapse: collapse;
  width: max-content;
  min-width: 100%;
  border: 1px solid #d0d5dd;

  th,
  td {
    padding: 10px 12px;
    text-align: right;
    font-size: 13px;
    font-weight: 400;
    color: #727789;
    white-space: nowrap;
  }

  th:first-child,
  td:first-child {
    text-align: left;
  }

  thead th {
    background-color: #f4f4f4;
    font-weight: 600;
    font-size: 14px;
    border: 1px solid #d0d5dd;
  }

  tfoot td {
    font-weight: 600;
    background: #f1f1f4;
  }
`;

const StatusMessage = styled.div`
  padding: 16px;
  border-radius: 6px;
  background: ${({ $variant }) =>
    $variant === "error" ? "#fee2e2" : "#e0f2fe"};
  color: ${({ $variant }) => ($variant === "error" ? "#b91c1c" : "#0369a1")};
  border: 1px solid
    ${({ $variant }) => ($variant === "error" ? "#fca5a5" : "#bae6fd")};
`;

const formatAmount = (value) => {
  const numericValue = Number(value) || 0;
  return `₦${numericValue.toLocaleString("en-NG")}`;
};

const MonthlyReport = () => {
  const [activeLink, setActiveLink] = useState("new");
  const dispatch = useDispatch();
  const {
    monthlySummary,
    monthlySummaryStatus,
    monthlySummaryError,
    monthlySummaryYear,
    monthlySummaryMatrics,
    monthlySummaryMatricsStatus,
    monthlySummaryMatricsError,
    monthlySummaryMatricsYear,
  } = useSelector((state) => state.loan);

  console.log(monthlySummary);
  const [selectedYear, setSelectedYear] = useState(
    monthlySummaryYear || new Date().getFullYear()
  );
  const [range, setRange] = useState("lastSix");

  useEffect(() => {
    if (
      monthlySummaryStatus !== true &&
      monthlySummary.length > 0 &&
      monthlySummaryYear === selectedYear
    ) {
      return;
    }

    dispatch(fetchLoanMonthlySummary(selectedYear));
  }, [
    dispatch,
    selectedYear,
    monthlySummaryStatus,
    monthlySummary.length,
    monthlySummaryYear,
  ]);

  useEffect(() => {
    if (
      monthlySummaryMatricsStatus !== true &&
      monthlySummaryMatrics.length > 0 &&
      monthlySummaryMatricsYear === selectedYear
    ) {
      return;
    }

    dispatch(fetchLoanMonthlyMatrics(selectedYear));
  }, [
    dispatch,
    selectedYear,
    monthlySummaryMatricsStatus,
    monthlySummaryMatrics.length,
    monthlySummaryMatricsYear,
  ]);

  console.log(monthlySummaryMatrics);

  const loading = monthlySummaryStatus === true;
  const error = monthlySummaryError;
  const metricsLoading = monthlySummaryMatricsStatus === true;
  const metricsError = monthlySummaryMatricsError;

  const filteredData = useMemo(() => {
    if (!Array.isArray(monthlySummary) || monthlySummary.length === 0) {
      return [];
    }

    if (range === "fullYear") {
      return monthlySummary;
    }

    const now = new Date();
    const isCurrentYear = selectedYear === now.getFullYear();
    const lastMonthIndex = isCurrentYear ? now.getMonth() : 11;

    if (range === "lastSix") {
      const startIndex = Math.max(0, lastMonthIndex - 5);
      return monthlySummary.slice(startIndex, lastMonthIndex + 1);
    }

    if (range === "prevSix") {
      const endIndex = Math.max(-1, lastMonthIndex - 6);
      const startIndex = Math.max(0, endIndex - 5);
      return monthlySummary.slice(startIndex, endIndex + 1);
    }

    return monthlySummary;
  }, [monthlySummary, range, selectedYear]);

  const metricsByMonth = useMemo(() => {
    if (!Array.isArray(monthlySummaryMatrics)) {
      return {};
    }

    return monthlySummaryMatrics.reduce((acc, item) => {
      const key =
        item?.monthIndex !== undefined && item?.monthIndex !== null
          ? item.monthIndex
          : item?.month;
      if (key !== undefined && key !== null) {
        acc[key.toString()] = item;
      }
      return acc;
    }, {});
  }, [monthlySummaryMatrics]);

  const displayYear = loading
    ? selectedYear
    : monthlySummaryYear || selectedYear;

  const summaryTotals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        acc.amountDisbursed += Number(item.amountDisbursed) || 0;
        acc.loanAppForm += Number(item.loanAppForm) || 0;
        acc.totalPayment += Number(item.totalPayment) || 0;
        acc.expenses += Number(item.expenses) || 0;
        acc.interest += Number(item.interest) || 0;
        acc.loanCount += Number(item.loanCount) || 0;
        acc.profit += Number(item.profit) || 0;
        acc.overdueTotal += Number(item.overdueTotal) || 0;
        acc.recoveryTotal += Number(item.recoveryTotal) || 0;
        acc.overshootTotal += Number(item.overshootTotal) || 0;
        return acc;
      },
      {
        amountDisbursed: 0,
        loanAppForm: 0,
        totalPayment: 0,
        expenses: 0,
        interest: 0,
        loanCount: 0,
        profit: 0,
        overdueTotal: 0,
        recoveryTotal: 0,
        overshootTotal: 0,
      }
    );
  }, [filteredData]);

  const metricsTotals = useMemo(() => {
    return filteredData.reduce(
      (acc, item) => {
        const key = (item.monthIndex ?? item.month ?? "").toString();
        const metricsEntry = metricsByMonth[key];
        acc.cashAtHand += Number(metricsEntry?.cashAtHand) || 0;
        acc.loanBalance += Number(metricsEntry?.loanBalance) || 0;
        acc.growth += Number(metricsEntry?.growth) || 0;
        return acc;
      },
      {
        cashAtHand: 0,
        loanBalance: 0,
        growth: 0,
      }
    );
  }, [filteredData, metricsByMonth]);

  const handlePrevYear = () => setSelectedYear((prev) => prev - 1);
  const handleNextYear = () => setSelectedYear((prev) => prev + 1);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <Container>
      <div className="find-lawyer-header">
        <Header>
          <h2>Monthly Loan Summary</h2>

          <ControlGroup>
            <button onClick={handlePrevYear} disabled={loading}>
              Previous Year
            </button>
            <span>{displayYear}</span>
            <button onClick={handleNextYear} disabled={loading}>
              Next Year
            </button>
          </ControlGroup>
        </Header>

        <div className="client-link-container">
          <Link
            className={`client-link ${activeLink === "new" ? "active" : ""}`}
            onClick={() => handleLinkClick("new")}
          >
            Section One
          </Link>
          <Link
            className={`client-link ${
              activeLink === "previous" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("previous")}
          >
            Section Two
          </Link>
        </div>

        {loading && <StatusMessage>Loading monthly data...</StatusMessage>}
        {!loading && error && (
          <StatusMessage $variant="error">{error}</StatusMessage>
        )}

        {!loading && !error && (
          <>
            <ControlGroup>
              <button
                onClick={() => setRange("lastSix")}
                className={range === "lastSix" ? "active" : ""}
              >
                Last 6 Months
              </button>
              <button
                onClick={() => setRange("prevSix")}
                className={range === "prevSix" ? "active" : ""}
              >
                Previous 6 Months
              </button>
              <button
                onClick={() => setRange("fullYear")}
                className={range === "fullYear" ? "active" : ""}
              >
                Full Year
              </button>
            </ControlGroup>
            {activeLink === "new" && (
              <TableWrapper>
                <DataTable>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Loan Count</th>
                      <th>Disbursement</th>
                      <th>Total Repayment</th>
                      <th>Interest</th>
                      <th>Cash &amp; Others</th>

                      <th>Expenses</th>
                      <th>Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.monthIndex || item.month}>
                        <td>{item.month}</td>
                        <td>{Number(item.loanCount) || 0}</td>
                        <td>{formatAmount(item.amountDisbursed)}</td>
                        <td>{formatAmount(item.totalPayment)}</td>
                        <td>{formatAmount(item.interest)}</td>
                        <td>{formatAmount(item.loanAppForm)}</td>

                        <td>{formatAmount(item.expenses)}</td>
                        <td>{formatAmount(item.profit)}</td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={7}>No data available for this year.</td>
                      </tr>
                    )}
                  </tbody>
                  {filteredData.length > 0 && (
                    <tfoot>
                      <tr>
                        <td>Total</td>
                        <td>{summaryTotals.loanCount}</td>
                        <td>{formatAmount(summaryTotals.amountDisbursed)}</td>
                        <td>{formatAmount(summaryTotals.totalPayment)}</td>
                        <td>{formatAmount(summaryTotals.interest)}</td>
                        <td>{formatAmount(summaryTotals.loanAppForm)}</td>

                        <td>{formatAmount(summaryTotals.expenses)}</td>
                        {/* <td></td> */}
                        <td>{formatAmount(summaryTotals.profit)}</td>
                      </tr>
                    </tfoot>
                  )}
                </DataTable>
              </TableWrapper>
            )}
            {activeLink === "previous" && (
              <>
                <TableWrapper>
                  <DataTable>
                    <thead>
                      <tr>
                        <th>Month</th>

                        <th>Balance of Debt</th>
                        <th>Total Recovery</th>
                        <th>Overtarget Bonus</th>
                        <th>Cash at Hand</th>
                        <th>Loan Balance</th>
                        <th>Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item) => {
                        const key = (
                          item.monthIndex ??
                          item.month ??
                          ""
                        ).toString();
                        const metricsEntry = metricsByMonth[key] || {};

                        return (
                          <tr key={item.monthIndex || item.month}>
                            <td>{item.month}</td>

                            <td>{formatAmount(item.overdueTotal)}</td>
                            <td>{formatAmount(item.recoveryTotal)}</td>
                            <td>{formatAmount(item.overshootTotal)}</td>

                            <td>{formatAmount(metricsEntry.cashAtHand)}</td>
                            <td>{formatAmount(metricsEntry.loanBalance)}</td>
                            <td>{formatAmount(metricsEntry.growth)}</td>
                          </tr>
                        );
                      })}
                      {filteredData.length === 0 && (
                        <tr>
                          <td colSpan={7}>No data available for this year.</td>
                        </tr>
                      )}
                    </tbody>
                    {filteredData.length > 0 && (
                      <tfoot>
                        <tr>
                          <td>Total</td>
                          {/* <td>{formatAmount(summaryTotals.overdueTotal)}</td>
                          <td>{formatAmount(summaryTotals.recoveryTotal)}</td>
                          <td>{formatAmount(summaryTotals.overshootTotal)}</td>
                          <td>{formatAmount(metricsTotals.cashAtHand)}</td>
                          <td>{formatAmount(metricsTotals.loanBalance)}</td>
                          <td>{formatAmount(metricsTotals.growth)}</td> */}
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tfoot>
                    )}
                  </DataTable>
                </TableWrapper>
              </>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default MonthlyReport;
