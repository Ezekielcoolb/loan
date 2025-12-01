import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  fetchCsoReportsSummary,
  fetchCsoReportsSummarySingle,
} from "../../redux/slices/otherLoanSlice";
import { updateCsoOverShootPayment } from "../../redux/slices/csoSlice";

const WalletRap = styled.div`
  min-height: 100vh;
  background: #f5f7fb;
  padding: 32px 40px 60px;
  color: #112240;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .back-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .back-button {
    background: #ffffff;
    border: 1px solid #d0d5dd;
    color: #030b26;
    font-weight: 600;
    padding: 0 18px;
    height: 36px;
    border-radius: 18px;
    cursor: pointer;
  }
  .back-button:hover {
    background: #030b26;
    color: #ffffff;
  }
  .period-pill {
    background: #030b26;
    color: #ffffff;
    padding: 0 18px;
    height: 36px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
  }
  .hero {
    background: linear-gradient(135deg, #030b26, #0c1d55);
    border-radius: 24px;
    padding: 36px;
    display: flex;
    flex-wrap: wrap;
    gap: 28px;
    color: #ffffff;
  }
  .hero-left {
    flex: 1 1 280px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .hero-tag {
    background: rgba(255, 255, 255, 0.18);
    padding: 6px 14px;
    width: fit-content;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
  .hero-left h1 {
    font-size: 36px;
    margin: 0;
  }
  .hero-left p {
    margin: 0;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.76);
    line-height: 1.6;
  }
  .hero-right {
    flex: 1 1 280px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
  }
  .hero-card {
    background: rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .hero-card span {
    font-size: 12px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
    font-weight: 600;
  }
  .hero-card strong {
    font-size: 22px;
    font-weight: 700;
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
  .metric-card {
    background: #ffffff;
    border-radius: 18px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    box-shadow: 0px 20px 45px rgba(3, 11, 38, 0.06);
  }
  .metric-card span {
    color: #6b7286;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.6px;
    text-transform: uppercase;
  }
  .metric-card h3 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #030b26;
  }
  .metric-card p {
    margin: 0;
    font-size: 14px;
    color: #6b7286;
  }
  .panels {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
  }
  .panel {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0px 16px 30px rgba(3, 11, 38, 0.05);
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .panel-title {
    font-size: 16px;
    font-weight: 700;
    color: #030b26;
  }
  .panel-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #6b7286;
  }
  .panel-row strong {
    color: #030b26;
    font-size: 16px;
  }
  .panel-row strong.positive {
    color: #0a8a4c;
  }
  .panel-row strong.negative {
    color: #d62f2f;
  }
  .negative-m {
    color: #d62f2f !important;
  }
  .statement {
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0px 16px 30px rgba(3, 11, 38, 0.05);
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .statement-header {
    font-size: 16px;
    font-weight: 700;
    color: #030b26;
  }
  .statement-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #6b7286;
  }
  .statement-value {
    font-weight: 700;
    color: #030b26;
  }
  .statement-value.positive {
    color: #0a8a4c;
  }
  .statement-value.negative {
    color: #d62f2f;
  }
  .statement-value.accent {
    color: #0c1d55;
  }
  .hero-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
  }
  .available-amount {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.76);
  }
  .withdraw-button {
    align-self: flex-start;
    background: #ffffff;
    color: #030b26;
    border-radius: 999px;
    padding: 10px 20px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .withdraw-button:hover {
    transform: translateY(-1px);
    box-shadow: 0px 8px 18px rgba(3, 11, 38, 0.18);
  }
  .withdraw-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .breakdown-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .breakdown-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }
  .breakdown-select {
    min-width: 200px;
    padding: 10px 14px;
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    font-size: 14px;
    color: #030b26;
    background: #ffffff;
  }
  .breakdown-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .breakdown-pair {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f2f8;
  }
  .breakdown-pair:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .breakdown-label {
    color: #6b7286;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    font-size: 12px;
    font-weight: 600;
  }
  .breakdown-value {
    color: #030b26;
    font-size: 15px;
    font-weight: 600;
    text-align: right;
  }
  .bonus-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 240px;
    overflow-y: auto;
  }
  .bonus-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #6b7286;
  }
  .bonus-item strong {
    color: #030b26;
  }
  .status {
    text-align: center;
    font-size: 14px;
    color: #6b7286;
  }
  @media (max-width: 768px) {
    padding: 24px;
    .hero {
      flex-direction: column;
      padding: 28px;
    }
    .breakdown-top {
      flex-direction: column;
      align-items: flex-start;
    }
    .breakdown-select {
      width: 100%;
    }
    .breakdown-pair {
      flex-direction: column;
      align-items: flex-start;
    }
    .breakdown-value {
      text-align: left;
    }
  }
`;

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

const safeNumber = (value) => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(safeNumber(value));

const formatDate = (value) => {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(17, 34, 64, 0.56);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
`;

const ModalCard = styled.div`
  background: #ffffff;
  width: min(420px, 90vw);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: 0px 24px 54px rgba(3, 11, 38, 0.18);
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: #030b26;
`;

const ModalText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7286;
  line-height: 1.5;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  font-size: 16px;
  color: #030b26;
  outline: none;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ModalButton = styled.button`
  min-width: 110px;
  padding: 10px 16px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  background: ${({ variant }) =>
    variant === "secondary" ? "#e5e7eb" : "#0c1d55"};
  color: ${({ variant }) => (variant === "secondary" ? "#030b26" : "#ffffff")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const ModalError = styled.p`
  margin: 0;
  font-size: 13px;
  color: #d62f2f;
`;

const makePeriodKey = (year, month) =>
  `${year}-${String(month).padStart(2, "0")}`;

export default function CsoReportWallet() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { csoId } = useParams();
  const [searchParams] = useSearchParams();
  const { csosReport, csosSingleReport, loading } = useSelector(
    (state) => state.otherLoan
  );
  const { overShootPaidLoading } = useSelector((state) => state.cso);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawError, setWithdrawError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const month = Number(searchParams.get("month")) || location.state?.month;
  const year = Number(searchParams.get("year")) || location.state?.year;

  useEffect(() => {
    if (!month || !year) return;
    dispatch(fetchCsoReportsSummary({ month, year }));
  }, [dispatch, month, year]);

  useEffect(() => {
    if (!month || !year || !csoId) return;
    dispatch(fetchCsoReportsSummarySingle({ month, year, csoId }));
  }, [dispatch, month, year, csoId]);

  const csoFromList = useMemo(() => {
    if (location.state?.cso) return location.state.cso;
    return csosReport?.find((item) => `${item.csoId}` === `${csoId}`);
  }, [location.state, csosReport, csoId]);

  const wallet = csosSingleReport || null;
  const breakdown = wallet?.breakdown || [];
  const overall = wallet?.overall || {};
  const currentMonth = wallet?.currentMonth || {};
  const bonusPayments = wallet?.bonusPayments || [];
  const csoMeta = wallet?.cso;
  const csoDetails = csoMeta || csoFromList;
  console.log(currentMonth);

  useEffect(() => {
    if (!breakdown.length) {
      setSelectedPeriod("");
      return;
    }

    const fallbackKey = makePeriodKey(breakdown[0].year, breakdown[0].month);

    if (month && year) {
      const currentKey = makePeriodKey(year, month);
      const exists = breakdown.some(
        (item) => makePeriodKey(item.year, item.month) === currentKey
      );
      setSelectedPeriod(exists ? currentKey : fallbackKey);
      return;
    }

    setSelectedPeriod(fallbackKey);
  }, [breakdown, month, year]);

  const totalDisbursed = safeNumber(overall.totalDisbursed);
  const totalInterest = safeNumber(overall.totalInterest);
  const totalRepayment = safeNumber(overall.totalRepayment);
  const totalLoanBalance = safeNumber(overall.totalLoanBalance);
  const totalLoanCount =
    overall.totalLoanCount ?? csoFromList?.totalLoanCount ?? 0;
  const totalOverdue = safeNumber(overall.totalOverdue);
  const totalRecovery = safeNumber(overall.totalRecovery);

  const realtotalDisbursed = safeNumber(currentMonth.totalDisbursed);
  const realtotalInterest = safeNumber(currentMonth.totalInterest);
  const realtotalRepayment = safeNumber(currentMonth.totalRepayment);
  const realtotalLoanBalance = safeNumber(currentMonth.totalLoanBalance);
  const realtotalLoanCount = currentMonth.totalLoanCount;
  const realtotalOverdue = safeNumber(currentMonth.totalOverdue);
  const realtotalRecovery = safeNumber(currentMonth.totalRecovery);

  const portfolioWorth = realtotalDisbursed + realtotalInterest;
  const performance = portfolioWorth
    ? Math.min(100, Math.round((realtotalRepayment / portfolioWorth) * 100))
    : 0;

  const selectedRecord = useMemo(() => {
    if (!selectedPeriod) return null;
    return (
      breakdown.find(
        (item) => makePeriodKey(item.year, item.month) === selectedPeriod
      ) || null
    );
  }, [breakdown, selectedPeriod]);

  const totalBonusEarned = breakdown.reduce(
    (sum, item) => sum + safeNumber(item?.bonus),
    0
  );
  const totalWithdrawn = bonusPayments.reduce(
    (sum, item) => sum + safeNumber(item?.amount),
    0
  );
  const availableForWithdrawal = Math.max(0, totalBonusEarned - totalWithdrawn);

  const currentBonus = safeNumber(selectedRecord?.bonus);

  const totalIncome =
    selectedRecord?.totalInterest + selectedRecord?.totalLoanForm;
  const profit = totalIncome - selectedRecord?.totalExpenses;
  const profitPercent = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  const handleOpenWithdraw = () => {
    setWithdrawAmount(currentBonus ? String(currentBonus) : "");
    setWithdrawError("");
    setWithdrawOpen(true);
  };

  const handleCloseWithdraw = () => {
    setWithdrawOpen(false);
    setWithdrawAmount("");
    setWithdrawError("");
  };

  const handleConfirmWithdraw = async () => {
    const numericAmount = Number(withdrawAmount);

    if (!numericAmount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setWithdrawError("Enter a valid amount greater than zero.");
      return;
    }

    if (numericAmount > availableForWithdrawal) {
      setWithdrawError("Amount exceeds available bonus.");
      return;
    }

    try {
      await dispatch(
        updateCsoOverShootPayment({ csoId, amount: numericAmount })
      ).unwrap();
      handleCloseWithdraw();
      dispatch(fetchCsoReportsSummarySingle({ month, year, csoId }));
      dispatch(fetchCsoReportsSummary({ month, year }));
    } catch (error) {
      setWithdrawError(error?.message || "Unable to record withdrawal.");
    }
  };

  return (
    <WalletRap>
      <div className="back-row">
        <button className="back-button" onClick={() => navigate(-1)}>
          Back
        </button>
        <div className="period-pill">
          {monthNames[month]} {year}
        </div>
      </div>

      <div className="hero">
        <div className="hero-left">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div className="hero-tag">CSO Wallet </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#d62f2f",
              }}
            >
              {performance}%
            </div>
          </div>
          <h1>{csoDetails?.name || "CSO Summary"}</h1>
          <p>
            Full breakdown of this CSO performance, wallet health, and loan
            portfolio for the selected reporting period.
          </p>
          <div className="hero-actions">
            <span className="available-amount">
              Available bonus: {formatCurrency(availableForWithdrawal)}
            </span>
            <button
              className="withdraw-button"
              onClick={handleOpenWithdraw}
              disabled={availableForWithdrawal <= 0}
            >
              Withdraw Bonus
            </button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-card">
            <span>Portfolio Worth</span>
            <strong>{formatCurrency(portfolioWorth)}</strong>
          </div>
          <div className="hero-card">
            <span>Total Repayment</span>
            <strong>{formatCurrency(realtotalRepayment)}</strong>
          </div>
          <div className="hero-card">
            <span>Balance of Debt</span>
            <strong>{formatCurrency(realtotalOverdue)}</strong>
          </div>
          <div className="hero-card">
            <span>Recovery</span>
            <strong>{formatCurrency(realtotalRecovery)}</strong>
          </div>
        </div>
      </div>

      <div className="statement">
        <div className="breakdown-section">
          <div className="breakdown-top">
            <div className="statement-header">Monthly Breakdown</div>
            {breakdown.length > 1 && (
              <select
                className="breakdown-select"
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value)}
              >
                {breakdown.map((item) => {
                  const key = makePeriodKey(item.year, item.month);
                  return (
                    <option value={key} key={key}>
                      {monthNames[item.month]} {item.year}
                    </option>
                  );
                })}
              </select>
            )}
          </div>

          {selectedRecord ? (
            <div className="breakdown-content">
              <div className="breakdown-pair">
                <span className="breakdown-label">Month</span>
                <span className="breakdown-value">
                  {monthNames[selectedRecord.month]} {selectedRecord.year}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Portfolio worth</span>
                <span className="breakdown-value">
                  {formatCurrency(
                    selectedRecord.totalDisbursed + selectedRecord.totalInterest
                  )}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Balance of Debt</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalOverdue)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Total Loan Count</span>
                <span className="breakdown-value">
                  {selectedRecord.totalLoanCount}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Total Repayment</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalRepayment)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Total Disbursed Loan</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalDisbursed)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Total Interest</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalInterest)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Cards and Others</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalLoanForm)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Total Expenses</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalExpenses)}
                </span>
              </div>

              <div className="breakdown-pair">
                <span className="breakdown-label">Total Profit</span>
                <span className="breakdown-value">
                  {formatCurrency(profit)}
                </span>
              </div>

              <div className="breakdown-pair">
                <span className="breakdown-label">Loan Balance</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalLoanBalance)}
                </span>
              </div>

              <div className="breakdown-pair">
                <span className="breakdown-label">Recovery</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.totalRecovery)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label"> Overtarget</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.overshootValue)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Bonus for Overtarget</span>
                <span className="breakdown-value">
                  {formatCurrency(selectedRecord.bonus)}
                </span>
              </div>
              <div className="breakdown-pair">
                <span className="breakdown-label">Profitability </span>
                <span className="breakdown-value">
                  {profitPercent ? profitPercent.toFixed(2) : 0}%
                </span>
              </div>
            </div>
          ) : (
            <div className="status">No breakdown data available.</div>
          )}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span>Total Disbursed</span>
          <h3>{formatCurrency(totalDisbursed)}</h3>
          <p>Aggregate value of loans granted.</p>
        </div>
        <div className="metric-card">
          <span>Total Interest</span>
          <h3>{formatCurrency(totalInterest)}</h3>
          <p>Interest generated on active loanss.</p>
        </div>
        <div className="metric-card">
          <span>Recovery</span>
          <h3 className="negative-m">{formatCurrency(totalRecovery)}</h3>
          <p>All recovery loans.</p>
        </div>
        <div className="metric-card">
          <span>Overdue</span>
          <h3 className="negative-m">{formatCurrency(totalOverdue)}</h3>
          <p>All overdue loans.</p>
        </div>
      </div>

      <div className="panels">
        <div className="panel">
          <div className="panel-title">Wallet Summary</div>
          <div className="panel-row">
            <span>Active Loans</span>
            <strong>{totalLoanCount || "-"}</strong>
          </div>
          <div className="panel-row">
            <span>Repayment Rate</span>
            <strong className={performance >= 70 ? "positive" : "negative"}>
              {performance}%
            </strong>
          </div>
          <div className="panel-row">
            <span>Overdue Balance</span>
            <strong className="negative">{formatCurrency(totalOverdue)}</strong>
          </div>
          <div className="panel-row">
            <span>Loan Balance</span>
            <strong className="negative">
              {formatCurrency(totalLoanBalance)}
            </strong>
          </div>
          <div className="panel-row">
            <span>Net Portfolio</span>
            <strong className="positive">
              {formatCurrency(portfolioWorth - totalOverdue)}
            </strong>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Remittance Overview</div>
          <div className="panel-row">
            <span>Total Repayment</span>
            <strong className="positive">
              {formatCurrency(totalRepayment)}
            </strong>
          </div>
          <div className="panel-row">
            <span>Total Recovery</span>
            <strong className="negative">
              {formatCurrency(totalRecovery)}
            </strong>
          </div>
          <div className="panel-row">
            <span>Bonus Earned</span>
            <strong>{formatCurrency(currentBonus)}</strong>
          </div>
          {/* <div className="panel-row">
            <span>Average Ticket Size</span>
            <strong>
              {totalLoanCount
                ? formatCurrency(portfolioWorth / totalLoanCount)
                : "-"}
            </strong>
          </div> */}
        </div>

        <div className="panel">
          <div className="panel-title">Recent Withdrawals</div>
          <div className="bonus-list">
            {bonusPayments.length === 0 && (
              <div className="status">No withdrawals recorded.</div>
            )}
            {bonusPayments.map((item, index) => (
              <div className="bonus-item" key={`${item.paidAt}-${index}`}>
                <span>{formatDate(item.paidAt)}</span>
                <strong>{formatCurrency(item.amount)}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="statement">
        <div className="statement-header">Statement Snapshot</div>
        <div className="statement-row">
          <span>Total Disbursed</span>
          <span className="statement-value accent">
            {formatCurrency(totalDisbursed)}
          </span>
        </div>
        <div className="statement-row">
          <span>Total Interest</span>
          <span className="statement-value">
            {formatCurrency(totalInterest)}
          </span>
        </div>
        <div className="statement-row">
          <span>Total Repayment</span>
          <span className="statement-value positive">
            {formatCurrency(totalRepayment)}
          </span>
        </div>
        <div className="statement-row">
          <span>Loan Balance</span>
          <span className="statement-value negative">
            {formatCurrency(totalLoanBalance)}
          </span>
        </div>
        <div className="statement-row">
          <span>Net Position</span>
          <span
            className={`statement-value ${
              portfolioWorth - totalOverdue >= 0 ? "positive" : "negative"
            }`}
          >
            {formatCurrency(portfolioWorth - totalOverdue)}
          </span>
        </div>
        <div className="statement-row">
          <span>Total Bonus Earned</span>
          <span className="statement-value">
            {formatCurrency(totalBonusEarned)}
          </span>
        </div>
        <div className="statement-row">
          <span>Total Withdrawn</span>
          <span className="statement-value">
            {formatCurrency(totalWithdrawn)}
          </span>
        </div>
      </div>

      {/* {loading && <div className="status">Refreshing data…</div>}
      {!cso && !loading && (
        <div className="status">
          Unable to retrieve CSO details. Please return to the reports table and try again.
        </div>
      )} */}

      {withdrawOpen && (
        <ModalOverlay>
          <ModalCard>
            <ModalTitle>Confirm Withdrawal</ModalTitle>
            <ModalText>
              You can withdraw up to {formatCurrency(availableForWithdrawal)}{" "}
              from the available bonus balance. Enter the amount you would like
              to withdraw now.
            </ModalText>
            <ModalInput
              type="number"
              min="0"
              value={withdrawAmount}
              onChange={(event) => setWithdrawAmount(event.target.value)}
              placeholder="Enter amount"
            />
            {withdrawError && <ModalError>{withdrawError}</ModalError>}
            <ModalActions>
              <ModalButton
                variant="secondary"
                onClick={handleCloseWithdraw}
                disabled={overShootPaidLoading}
              >
                Cancel
              </ModalButton>
              <ModalButton
                onClick={handleConfirmWithdraw}
                disabled={overShootPaidLoading}
              >
                {overShootPaidLoading ? "Processing…" : "Confirm"}
              </ModalButton>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
    </WalletRap>
  );
}
