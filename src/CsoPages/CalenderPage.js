import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchLoanById } from "../redux/slices/LoanSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const CalendarRap = styled.div`
height: 100vh;
background: #005e78;
  .pop-info h3 {
    font-weight: 700;
    font-size: 20px;
    color: #005e78;
  }
  .pop-info span {
    font-weight: 500;
    font-size: 16px;
    color: black;
  }
  .pop-info p {
    font-weight: 900;
    font-size: 25px;
    color: #005e78;
  }
  .pop-info {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .calendar-detail {
    background: #005e78;
    color: white;
    height: auto;
  }
  .pop-info button {
    color: #005e78;
    width: 98px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid #005e78;
  }
  .calendar-detail h1 {
    font-size: 50px;
    font-weight: 900;
    margin-left: 20px;
  }
  .calendar-detail h6 {
    font-size: 16px;
    font-weight: 500;
    margin-left: 20px;
  }
  .loan-span {
    font-size: 25px;
    font-weight: 900;
    color: orange;
  }
  .cancel-icon {
    padding-right: 10px;
  }
  .calendar-header {
    display: flex;
    justify-content: space-between;
  }
  .small-circle-color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .color-1 {
    background: green;
  }
  .color-2 {
    background: orange;
  }
  .color-3 {
    background: red;
  }
  .color-4 {
    background: #e7c17b;
  }
  .circle-div p {
    color: black;
    font-size: 14px;
  }
  .circle-div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .all-circle-div {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding-top: 20px;
    padding-left: 20px;
  }
  .loanCardSpace {
    min-width: 370px;
    max-width: 500px;
    padding-left: 3px;
    padding-right: 10px;
    padding-bottom: 100px !important;
  }
`;

const CalendarPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loan = useSelector((state) => state?.loan?.selectedLoan);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchLoanById(id));
  }, [dispatch, id]);

  if (!loan) return <p>Loading...</p>;

  const today = new Date();

  const dailyAmount = loan?.loanDetails?.amountToBePaid / 30;

  // Custom function to format the date
  const formatDate = (date) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "2-digit",
    };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(date);

    // Extract the components
    const [weekday, month, day, year] = formattedDate.split(" ");

    // Return custom format (e.g., "Mo Dec 01 24")
    return `${weekday} ${month} ${day} ${year}`;
  };

  const LoanBalance =
    loan?.loanDetails?.amountToBePaid - loan?.loanDetails?.amountPaidSoFar;

  const handleButtonClick = (schedule, missedAmount = dailyAmount) => {
    setPopupInfo({
      date: formatDate(new Date(schedule.date)),
      amountPaid: schedule.amountPaid,
      missedAmount: missedAmount - schedule.amountPaid,
    });
  };

  const handleMoveBack = () => {
    navigate(`/cso/customer-details/${id}`);
  };

  const closePopup = () => setPopupInfo(null);

  return (
    <CalendarRap>
      <div className="calendar-detail">
        <div className="calendar-header">
          <h1>
            {loan?.customerDetails?.firstName} {loan?.customerDetails?.lastName}
          </h1>
          <div className="cancel-icon">
            <Icon
              onClick={handleMoveBack}
              icon="stash:times-circle"
              width="50"
              height="50"
              style={{ color: "#ffffff", cursor: "pointer" }}
            />
          </div>
        </div>
        <h6>
          Amount disbursed:
          <span className="loan-span">
            {" "}
            {loan?.loanDetails?.amountToBePaid}{" "}
          </span>
        </h6>
        <h6>
          Loan Balance:
          <span className="loan-span">{LoanBalance}</span>
        </h6>
<div className="all-circle-div">
  <div className="circle-div">
    <div className="small-circle-color color-1"></div>
    <p>Full payment made</p>
  </div>
  <div className="circle-div">
    <div className="small-circle-color color-2"></div>
    <p>Full payment ahead</p>
  </div>
  <div className="circle-div">
    <div className="small-circle-color color-3"></div>
    <p>Defaulting</p>
  </div>
  <div className="circle-div">
    <div className="small-circle-color color-1"></div>
    <p>Partial payment</p>
  </div>
</div>



        <h2 style={{ marginTop: "30px", textAlign: "center" }}>Loan Card</h2>
        <div className="loanCardSpace">
        <div
          style={{
            display: "grid",
            overflowX: "auto",
            width: "100%",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "2px",
          }}
        >
          {loan?.repaymentSchedule?.map((schedule, index) => {
            const scheduleDate = new Date(schedule.date);
            const isStartDate =
              scheduleDate.toDateString() ===
              new Date(loan.disbursedAt).toDateString();
            const isEndDate = index === loan.repaymentSchedule.length - 1;
            const isPaid = schedule.status === "paid";
            const isPartial = schedule.status === "partial";
            const isMissed =
              scheduleDate < today && schedule.status === "pending";
            const isFuture = scheduleDate > today;

            let backgroundColor = "black"; // Default for future dates
            if (isStartDate) backgroundColor = "blue";
            else if (isEndDate) backgroundColor = "#afaf5a";
            else if (isMissed) backgroundColor = "black"; // Set missed background to black

            const buttonColor = isPaid
              ? scheduleDate.toDateString() === today.toDateString()
                ? "green"
                : isFuture
                ? "orange"
                : "green"
              : isMissed
              ? "red"
              : isPartial
              ? "#e7c17b"
              : "transparent";

            const missedAmount = isMissed
              ? schedule.expectedAmount - schedule.amountPaid
              : null; // Calculate missed amount

            return (
              <div
                key={index}
                style={{
                  padding: "10px",
                  color: "white",
                  textAlign: "center",
                  border: "1px solid black",
                  backgroundColor,
                  position: "relative",
                }}
              >
                {formatDate(scheduleDate)}
                {isPaid && (
                  <button
                    onClick={() => handleButtonClick(schedule)}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: buttonColor,
                      border: "none",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                    }}
                  />
                )}
                {isMissed && (
                  <button
                    onClick={() => handleButtonClick(schedule)} // Pass missed amount
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: buttonColor,
                      border: "none",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                    }}
                  />
                )}
                {isPartial && (
                  <button
                    onClick={() => handleButtonClick(schedule)} // Pass missed amount
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: buttonColor,
                      border: "none",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
</div>
        {popupInfo && (
          <div
            className="pop-info"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              color: "black",
            width: "300px",
              border: "1px solid black",
              borderRadius: "5px",
              zIndex: 1000,
            }}
          >
            <h3>Payment Details</h3>
            <p>
              <span>Date: </span> {popupInfo.date}
            </p>
            <p>
              <span>Amount Paid: </span> {popupInfo.amountPaid}
            </p>
            {popupInfo.missedAmount !== null && (
              <p>
                <span>Amount Due: </span> {popupInfo.missedAmount}
              </p>
            )}{" "}
            {/* Show missed amount */}
            <button
              onClick={closePopup}
              style={{ marginTop: "10px", cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        )}
        {popupInfo && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={closePopup}
          />
        )}
      </div>
    </CalendarRap>
  );
};

export default CalendarPage;
