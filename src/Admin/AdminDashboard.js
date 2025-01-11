import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { allLaonfTransactions } from "../redux/slices/LoanSlice";
import LoanDoughnutChart from "./DashboardCharts/LoanChart";
import { fetchLoanStatsChart } from "../redux/slices/branchLoanSlice";
import DisbursementChart from "./DashboardCharts/DisburseChart";
import { Link } from "react-router-dom";

const DashboardRap = styled.div`
width: 100%;
padding: 20px;
@media (max-width: 360px) {
  padding: 5px !important;
}
  .overview-chart {
    width: 83px;
    height: 38px;
  }
  .overview-chart img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }
  .over-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #ffffff;
  }
  .over-text p {
    color: #ffffff99;
  }
  .overview-total h5 {
    font-size: 12px;
    font-weight: 500;
    color: #ffffff99;
  }
  .overview-total p {
    color: #ffffff;
    font-size: 16px;
    font-weight: 700;
  }
  .overview-total div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .overview-total {
    display: flex;
    justify-content: space-between;
  }
  .overview-divs {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: #0c1d55;
    padding: 20px 15px;
    border-radius: 15px;
    width: 50%;
  }
  .complete-cancel {
    border-top: 1px solid #ffffff1a;
    padding-top: 15px;
  }
  .width-total {
    width: 30%;
  }
  .all-payment-divs {
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 50%;
  }
  .payment-div {
    background: #ffffff;
    border-radius: 15px;
    padding: 25px 20px;
    display: flex;

    align-items: center;
    gap: 15px;
  }
  .payment-img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #12d27d;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .payment-img img {
    width: 18px;
    height: 18px;
  }
  .pay-div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .pay-div h5 {
    color: #727789;
    font-size: 14px;
    font-weight: 400;
  }
  .pay-div p {
    color: #030b26;

    font-size: 22px;
    font-weight: 700;
  }
  .paid-outstand {
    display: flex;
   
    justify-content: space-between;
    padding: 20px;
    gap: 15px;
    background: #ffffff;
    border-radius: 15px;
  }
  .left-dash-1{
    display: flex;
    gap: 20px;
    width: 100%;
  }
  .target-text h4 {
    font-size: 14px;
    font-weight: 500;
  }
  .target-text p {
    font-size: 18px;
    font-weight: 600;
   color:  #0c1d55;
  }
  .target-text, .target-text-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .target-text-1 {
    gap: 8px;
  }
  .left-dash-2 {
    width: 100%;
    margin-top: 50px;
  }
  
  .calendar-container {
    width: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   border-radius: 10px;
   border: 1px solid #DBE0EE;
  height: 144px;
  padding: 0px 10px;
  }

  .calendar-header {
    background: #030b260d;
    width: 100%;
    height: 32px;
    padding: 0px 5px;
    border-radius: 8px;
    color: #030b26;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .calendar-header button {
    background-color: #ffffff;
    border: 1px solid #d0d5dd;
    border-radius: 7px;
    color: #030b26;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
  }

  .calendar-header button:hover {
    background-color: #bbb;
  }

  .calendar-week {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .calendar-days {
    display: flex;
    

    align-items: center;
  }
  .second-right-dash-card {
    display: flex;
    border-top: 1px solid #d0d5dd;
    border-bottom: 1px solid #d0d5dd;
    align-items: center;
    height: 40px;
    margin-top: 15px;
    justify-content: space-between;
  }
  .event-seeall {
    color: #727789;
    font-size: 12px;
  }
.second-right-dash-card h3 {
    display: flex;
    align-items: center;
    gap: 5px;
}
  .calendar-day {
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
    width: 45px;
    height: 52px;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  .day-name {
    font-weight: 400;
    font-size: 12px;
    color: #727789;
  }
  .day-date {
    font-weight: 500;
    font-size: 14px;
    color: #030b26;
  }

  .calendar-day.highlight {
    background: #0c1d55;
    color: white;
  }
  .calendar-day.highlight .day-date,
  .calendar-day.highlight .day-name {
    color: white;
  }
  
  .calendar-week button {
    background-color:#030b260d;
    border: 1px solid #d0d5dd;
    border-radius: 7px;
    color: #030b26;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
  }

  .calendar-week button:hover {
    background-color: #bbb;
  }
 
 
 
  .cal-eve {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-bottom: 1px solid #dbe0ee;
    padding-bottom: 15px;
    margin-bottom: 10px;
  }
  .dashboard {
display: flex;
gap: 20px;
  }
  .right-dash-card {
   background: #ffffff;
    border-radius: 14px;
    border: 1px solid #dbe0ee;
    padding: 10px;
    width: 30% !important;
  }
  .third-right-dash-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
  }
  @media (max-width: 1200px) {
.dashboard {
  flex-direction: column;
}
.left-dash {
  width: 100% !important;
}
.right-dash-card {
  width: 70% !important;
}
  }
  @media (max-width: 992px) {
    .right-dash-card {
  width: 100% !important;
}
  }
  @media (max-width: 768px)  {
.left-dash-1 {
  flex-direction: column;
}
.overview-divs, .all-payment-divs {
  width: 100% !important;
}
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allLoans, loading, error } = useSelector((state) => state.loan);
     const { totalLoanTarget, totalActiveLoan, status } = useSelector((state) => state.loanBranches);

  useEffect(() => {
    dispatch(allLaonfTransactions());
    dispatch(fetchLoanStatsChart());
  }, [dispatch]);

  // ✅ Loan statistics
  const totalLoans = allLoans?.length;
  const activeLoansCount = allLoans?.filter(
    (loan) => loan?.status === "active loan"
  ).length;

  // ✅ Cumulative totals for all months and years
  const totalAmountDisbursed = allLoans?.reduce(
    (sum, loan) => sum + (loan?.loanDetails?.amountDisbursed || 0),
    0
  );
  const totalAmountToBePaid = allLoans?.reduce(
    (sum, loan) => sum + (loan?.loanDetails?.amountToBePaid || 0),
    0
  );
  const totalAmountPaid = allLoans?.reduce(
    (sum, loan) => sum + (loan?.loanDetails?.amountPaidSoFar || 0),
    0
  );
  const totalLoanBalance = totalAmountToBePaid - totalAmountPaid;



  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);

  // Function to get 5 consecutive days
  const getDaysInRange = (startDay) => {
    const days = [];
    for (let i = -2; i <= 2; i++) {
      const day = new Date(startDay);
      day.setDate(startDay.getDate() + i);
      days.push({
        dayName: day.toLocaleDateString("en-US", { weekday: "short" }),
        dayDate: day.getDate(),
        fullDate: day,
      });
    }
    return days;
  };

  const visibleDays = getDaysInRange(currentDay);

  // Move to the previous day
  const goToPreviousDay = () => {
    const newDay = new Date(currentDay);
    newDay.setDate(currentDay.getDate() - 1);
    setCurrentDay(newDay);
  };

  // Move to the next day
  const goToNextDay = () => {
    const newDay = new Date(currentDay);
    newDay.setDate(currentDay.getDate() + 1);
    setCurrentDay(newDay);
  };

  // Move to the previous month
  const goToPreviousMonth = () => {
    const newDay = new Date(currentDay);
    newDay.setMonth(currentDay.getMonth() - 1);
    setCurrentDay(newDay);
  };

  // Move to the next month
  const goToNextMonth = () => {
    const newDay = new Date(currentDay);
    newDay.setMonth(currentDay.getMonth() + 1);
    setCurrentDay(newDay);
  };

  // Display the current month and year
  const currentMonthYear = `${currentDay.toLocaleDateString("en-US", {
    month: "long",
  })} ${currentDay.getFullYear()}`;
  return (
    <DashboardRap>
      <div className="dashboard">
        <div className="left-dash">
          <div className="left-dash-1">
            <div className="overview-divs">
              <div className="overview">
                <div className="over-text">
                  <h4>Overview</h4>
                  <p>Account operations</p>
                </div>
                <div className="width-total">
                  <img src="/images/dash-chart.png" alt="" />
                </div>
              </div>
              <div className="overview-total">
                <div>
                  <h5>TOTAL LOANS</h5>
                  <p>{totalLoans}</p>
                </div>
                <div className="width-total">
                  <h5>TOTAL ACTIVE LOANS</h5>
                  <p>{activeLoansCount}</p>
                </div>
              </div>
              <div className="overview-total complete-cancel">
                <div>
                  <h5>AMOUNT DISBURSED</h5>
                  <p> ₦{totalAmountDisbursed?.toLocaleString()}</p>
                </div>
                <div className="width-total">
                  <h5>AMOUNT DISBURSED + INTEREST</h5>
                  <p> ₦{totalAmountToBePaid?.toLocaleString()}</p>
                </div>
              </div>
              <div className="overview-total complete-cancel">
                <div>
                  <h5>TOTAL PAYMENT</h5>
                  <p> ₦{totalAmountPaid?.toLocaleString()}</p>
                </div>
                <div className="width-total">
                  <h5>LOAN BALANCE</h5>
                  <p> ₦{totalLoanBalance?.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="all-payment-divs">
              <div className="payment-div">
                <div className="payment-img">
                  <img src="/images/pay-chart.png" alt=".." />
                </div>
                <div className="pay-div">
                  <h5>Payment</h5>
                  <p>₦2,504,000</p>
                </div>
              </div>
              <div className="paid-outstand">
                <div className="target-text">
                    <div className="target-text-1">
                        <h4>Loan Target</h4>
                        <p>{totalLoanTarget}</p>
                    </div>
                    <div className="target-text-1">
                        <h4>No. Loan</h4>
                        <p>{totalActiveLoan}</p>
                    </div>
                </div>
                <LoanDoughnutChart />
              </div>
            </div>
          </div>
          <div className="left-dash-2">
            <DisbursementChart />
          </div>
        </div>
        <div className="right-dash-card">
          <div className="first-right-dash-card">
            <div className="cal-eve">
              <h3>Calendar </h3>
         
            </div>
            <div className="calendar-container">
              {/* Month and Year Header */}
              <div className="calendar-header">
                <button onClick={goToPreviousMonth}>&lt; </button>
                <span>{currentMonthYear}</span>
                <button onClick={goToNextMonth}> &gt;</button>
              </div>

              {/* Weekdays and Navigation */}
              <div className="calendar-week">
                <button onClick={goToPreviousDay}>&lt;</button>
                <div className="calendar-days">
                  {visibleDays.map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-day ${
                        day.fullDate.toDateString() === today.toDateString()
                          ? "highlight"
                          : ""
                      }`}
                    >
                      <span className="day-name">{day.dayName}</span>
                      <span className="day-date">{day.dayDate}</span>
                    </div>
                  ))}
                </div>
                <button onClick={goToNextDay}>&gt;</button>
              </div>
            </div>
          </div>
          <div>

          <div className="second-right-dash-card">
            <h3>
                <img src="/images/event_see.png" alt="" />
                All Notifications
            </h3>
            <Link className="event-seeall"> See all</Link>
          </div>
          <div className="third-right-dash-card">
                <img src="/images/mask_img.png" alt="" />
                <p>You currently have no notifications</p>
          </div>
          </div>
        </div>
      </div>
    </DashboardRap>
  );
};

export default Dashboard;
