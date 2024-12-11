import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CalendarWrapAll = styled.div`
width: 100%;
  font-family: "Onest";
  padding: 15px;
`;
const CalendarWrapper = styled.div`
  font-family: "Onest";
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%; /* Increased width of the calendar */
  border-radius: 14px !important; /* Rounded corners */
  /* Border with the specified color */
 

.calendar-width {
  max-width: 100%;
}
@media (max-width: 1300px) {
  .calendar-width {
  max-width: 100% !important;
  overflow-x: auto;
}
}
.calendar-scroll {
  width: 100% !important;
  overflow-x: auto;
}
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #030b260d;
    color: #030b26;
    font-weight: bold;
    padding: 0 20px;
  }
  .calendar-header .month-name {
    font-size: 18px;
    font-weight: bold;
  }
  .calendar-header .button {
    cursor: pointer;
    font-size: 16px;
    background: none;
    border: none;
    color: #030b26;
    padding: 5px;
    &:hover {
      background-color: #dbe0ee;
      border-radius: 5px;
    }
  }
  .calendar-view-buttons {
  }

  .calendar-view-buttons .view-button {
  }
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0px;

    width: 100%;
  }
  .calendar-cell {
    background-color: white;
    padding: 10px;
    text-align: center;

    min-height: 114px;
    border: 1px solid #dbe0ee; /* Border between cells */
    position: relative;
    box-sizing: border-box;
  }
  .month-calender-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 10px;
    text-align: center;
    border: 1px solid #dbe0ee;
    height: 40px !important;
    background: #030b260d;
  }
  .faded {
    opacity: 0.5;
    color: #aaa;
  }

  /* Date number styling */
  .date-number {
    font-size: 14px;
    color: #030b26;
    position: absolute;
    left: 5px;
    top: 5px;
  }
  .weekly-view {
    display: flex;
    flex-direction: column;
    border: 1px solid #dbe0ee;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }

  .week-header {
    display: flex;
    height: 40px;
    background: #fff;
    background: #030b260d;

    border-bottom: 1px solid #dbe0ee;
  }

  .time-header {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #030b26;
    border-right: 1px solid #dbe0ee;
  }

  .day-header {
    flex: 1;
    display: flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #030b26;
  }

  .week-grid {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 0px;
    position: relative;
    width: 100%;
  }

  .time-column {
    display: flex;
    flex-direction: column;
    width: 100px;

    border-right: 1px solid #dbe0ee;
  }

  .time-slot {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #555;
    font-size: 12px;
  }

  .day-column {
    flex: 1;
    display: flex;
    border-right: 1px solid #dbe0ee;
    flex-direction: column;
    position: relative;
  }

  .time-slot-cell {
    height: 100px;
    border-bottom: 1px solid #dbe0ee;
  }
  .week-event {
    color: white;
    padding: 5px;
    margin: 2px 0;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    position: absolute; /* Keep absolute positioning */
    top: 12px; /* Ensure it's placed based on time */
    left: 0; /* Align it within the grid */
    z-index: 9999;
  }
  .daily-grid {
    display: grid;
    position: relative;
    grid-template-rows: auto 1fr;
    gap: 0;
    width: 100%;
    border: 1px solid #dbe0ee;
    border-radius: 8px;
  }

  .header-row {
    display: flex;
    gap: 300px;
    background: #030b260d;
    height: 40px;
    align-items: center;
    border-bottom: 1px solid #dbe0ee;
  }

  .time-header {
    font-weight: bold;
    color: #030b26;
  }

  .event-header {
    font-weight: bold;
    color: #030b26;
    padding-left: 10px;
  }

  .hour-row {
    display: grid;
    grid-template-columns: 100px 1fr;
    height: 100px;

    position: relative;
  }

  .time-column {
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    font-size: 14px;
    color: #030b26;
    border-right: 1px solid #dbe0ee;

    border-bottom: 1px solid white !important;
  }

  .event-column {
    padding: 5px 10px;
    position: relative;
    border-bottom: 1px solid #dbe0ee;
  }

  .event {
    background-color: green;
    color: white;
    width: 100%;
    padding: 5px;
    margin: auto;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    position: relative; /* Ensure absolute positioning */
  }

  .header {
    h1 {
      font-size: 24px;
    }

    .view-buttons {
      button {
        margin: 0 5px;
        padding: 5px 10px;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }

  .event-form {
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: white;

    h2 {
      margin-bottom: 10px;
    }

    input,
    select,
    textarea {
      width: 100%;
      margin-bottom: 10px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 5px;
    }

    button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;
const Header = styled.div`
  font-family: "Onest";
  display: flex;
  justify-content: space-between;
padding-bottom: 15px;
  border-bottom: 1px solid #dbe0ee;
  padding-left: 15px;
  margin-bottom: 10px; /* Adds space between header and calendar */
  @media (max-width: 650px) {
    flex-direction: column;
    gap: 15px;
  }
  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }

  .add-event-button {
    text-decoration: none;
    background: #12d27d;
    width: 128px;
    height: 38px;

    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;

    &:hover {
      /* background-color: #218838; */
    }
  }
  .pre-next-icon-month {
    display: flex;
    flex-direction: column;
  }
  .current-month-name {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .current-month-name span {
    font-weight: 600;
    font-size: 14px !important;
    color: #030b26;
    line-height: 17px;
  }
  .today-month {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .today-month h5 {
    font-size: 14px;
    font-weight: 600;
    color: #030b26;
    margin-bottom: 0px;
    border-bottom: 2px solid #030b26;
    padding-bottom: 19px;
  }
  .month-week-day-links {
    display: flex;
    align-items: center;
    width: 234px;
    height: 38px;
    border-radius: 6px;
    border: 1px solid #dbe0ee;
  }
  .view-button {
    text-decoration: none;
    width: 78px;
    height: 38px;
    border-right: 1px solid #dbe0ee;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #727789;
    background: #ffffff;
  }
  .view-button.active {
    background: #030b260d;
    color: #030b26;
  }
  .setting-icon {
    width: 38px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dbe0ee;
    border-radius: 6px;
  }
  .setting-icon img {
    width: 18px;
    height: 18px;
  }
  .calendar-view-buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }
`;

const Customers = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formVisible, setFormVisible] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [view, setView] = useState("month");


  // Add a check to ensure currentDate is always valid
  if (!currentDate) {
    return <div>Invalid Date</div>;
  }

 

  const renderMonthView = () => {
    // Ensure currentDate is valid
    if (!currentDate) return null;

    // Get the number of days in the current month and the days array as before
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const prevMonthDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDay();
    const totalCells = daysInMonth + firstDayOfMonth + (6 - lastDayOfMonth);

    const daysArray = Array.from({ length: totalCells }, (_, index) => {
      let day = index - firstDayOfMonth + 1;
      let isFaded = false;

      // Handling faded days from the previous and next month
      if (day <= 0) {
        day = prevMonthDays + day;
        isFaded = true;
      } else if (day > daysInMonth) {
        day = day - daysInMonth;
        isFaded = true;
      }

      return { day, isFaded };
    });

    return (
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div className="month-calender-header" key={day}>
            {day}
          </div>
        ))}

        {daysArray.map((item, index) => (
          <div className="calendar-cell" key={index}>
            {item.day !== null && (
              <div
                className={`date-number ${item.isFaded ? "faded" : ""}`}
                style={{ opacity: item.isFaded ? 0.5 : 1 }}
              >
                {item.day}
                {events
                  .filter(
                    (event) =>
                      new Date(event.startDate).getDate() === item.day &&
                      new Date(event.startDate).getMonth() ===
                        currentDate.getMonth() &&
                      new Date(event.startDate).getFullYear() ===
                        currentDate.getFullYear()
                  )
                  .map((event, i) => (
                    <div
                      key={i}
                      className="event"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  

  
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const currentMonthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  



  return (
    <>
      <CalendarWrapAll>
        <Header>
          <div className="calendar-header">
            <div className="today-month">
            
              <div className="current-month-name">
              
               
                  <Icon
                    onClick={handlePreviousMonth}
                    icon="iconamoon:arrow-up-2-light"
                    width="18"
                    height="18"
                    style={{
                      color: "#636878",
                      cursor: "pointer",
                      margin: "0px",
                    }}
                  />
                    <span className="month-name">{currentMonthName}</span>
                  <Icon
                    onClick={handleNextMonth}
                    icon="iconamoon:arrow-down-2-light"
                    width="18"
                    height="18"
                    style={{
                      color: "#636878",
                      cursor: "pointer",
                      margin: "0px",
                    }}
                  />
              
              </div>
            </div>
          </div>
          <div className="calendar-view-buttons">
          
           
        
          </div>
        </Header>
        <div className="the-calender-divs">
          <CalendarWrapper>
            <div className="calendar-scroll">
            <div className="calendar-width">
            { renderMonthView()}
           
            </div>
            </div>

                      
          </CalendarWrapper>
        </div>
      </CalendarWrapAll>
    </>
  );
};

export default Customers;
