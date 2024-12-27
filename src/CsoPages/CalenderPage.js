import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRepaymentSchedule } from "../redux/slices/LoanSlice";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const CalenderRap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  .callender {
    background: #005e78;
    padding: 80px 15px;
    padding-top: 40px !important;
    border-radius: 40px;
    width: 100%;
  }
  .cancel-icon {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-bottom: 40px;
  }
  .circle-btn {
    width: 25px;
    height: 25px;
    border: 2px solid #d9d9d9;
    border-radius: 50%;
    font-size: 14px;
    font-weight: 600;
    color: white;
    background: transparent;
  }
`;

const CalendarPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { repaymentSchedule, loading } = useSelector((state) => state.loan);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchRepaymentSchedule(id));
  }, [dispatch, id]);

  if (loading === "loading") return <p>Loading...</p>;

  const handleMoveBack = () => {
    navigate(`/cso/customer-details/${id}`);
  };

  // Helper to generate days in the current month, including previous and next month's days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    const daysInNextMonth = new Date(year, month + 1, 0).getDate();

    const prevMonthDays = [];
    const nextMonthDays = [];

    // Add the last days of the previous month to fill the starting slots
    for (let i = firstDay - 1; i >= 0; i--) {
      prevMonthDays.push(new Date(year, month - 1, lastDayOfPrevMonth - i));
    }

    // Add the first days of the next month to fill the ending slots
    const totalDays = daysInMonth + prevMonthDays.length;
    for (let i = totalDays; i < 42; i++) {
      nextMonthDays.push(new Date(year, month + 1, i - totalDays + 1));
    }

    const days = [
      ...prevMonthDays,
      ...Array.from(
        { length: daysInMonth },
        (_, i) => new Date(year, month, i + 1)
      ),
      ...nextMonthDays,
    ];
    return days;
  };

  // Function to format the date to match the 'YYYY-MM-DD' format
  const formatDate = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
  };

  const getDayStyle = (date) => {
    if (!date) return "transparent"; // No date, return default

    const formattedDate = formatDate(date); // Format date for comparison
    const disbursementDate = repaymentSchedule?.[0]?.date
      ? formatDate(new Date(repaymentSchedule[0].date))
      : null;
    const dueDate = repaymentSchedule?.[29]?.date
      ? formatDate(new Date(repaymentSchedule[29].date))
      : null;

    // Debugging logs
    console.log("Formatted Date:", formattedDate);
    console.log("Disbursement Date:", disbursementDate);
    console.log("Due Date:", dueDate);
    console.log(
      "Repayment Schedule Dates:",
      repaymentSchedule.map((r) => formatDate(new Date(r.date)))
    );

    // Mark disbursement date as blue
    if (formattedDate === disbursementDate) return "blue";

    // Mark due date (30 days after) as yellow
    if (formattedDate === dueDate) return "yellow";

    // Mark repayment dates between the start and end as white
    if (
      repaymentSchedule?.some(
        (repayment) => formatDate(new Date(repayment.date)) === formattedDate
      )
    )
      return "white";

    return "white"; // Default color
  };

  const changeMonth = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  };

  const days = generateCalendarDays();

  return (
    <CalenderRap>
      <div className="callender">
        <div className="cancel-icon">
          <Icon
            onClick={handleMoveBack}
            icon="stash:times-circle"
            width="30"
            height="30"
            style={{ color: "white", cursor: "pointer" }}
          />
        </div>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <button className="circle-btn" onClick={() => changeMonth(-1)}>
              &lt;{" "}
            </button>
            <span
              style={{
                margin: "0 20px",
                color: "white",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              {currentDate.toLocaleString("default", { month: "long" })}{" "}
              {currentDate.getFullYear()}
            </span>
            <button className="circle-btn" onClick={() => changeMonth(1)}>
              {" "}
              &gt;
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "10px",
              textAlign: "center",
            }}
          >
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} style={{ fontWeight: "bold" }}>
                {day}
              </div>
            ))}
            {days.map((date, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: date
                    ? getDayStyle(date) === "blue"
                      ? "blue"
                      : getDayStyle(date) === "yellow"
                      ? "yellow"
                      : "black"
                    : "transparent",
                  color:
                    date && getDayStyle(date) !== "transparent"
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)", // Set text color to white or faded
                  border: date ? "1px solid #ccc" : "none",
                  borderRadius: "5px",
                  height: "50px",
                  opacity: date && index < 7 ? 0.5 : 1, // Fade out the days from the previous and next month
                }}
              >
                {date?.getDate() || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </CalenderRap>
  );
};

export default CalendarPage;
