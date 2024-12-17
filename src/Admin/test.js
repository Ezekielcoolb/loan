import React, { useEffect, useState } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const LoanRap = styled.div`
  width: 100%;
  h4 {
    font-size: 16px;
    font-weight: 700;
  }
  h5 {
    font-size: 14px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
  .loan {
    
    
    margin: 20px;
  }

  .loan-header {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px
  }
.loan-header h1 {
    font-size: 18px;
    font-weight: 800;
}

  .table-container {
    margin: 15px auto;
    min-width: 760px;
    overflow-x: auto;
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }

  .custom-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    border: 1px solid #d0d5dd;
  }

  .custom-table thead th {
    padding: 10px;
    background-color: #f4f4f4;
    font-weight: bold;
    font-size: 14px;
    border: 1px solid #d0d5dd;
  }

  .custom-table tbody tr {
    padding: 10px;
    border: 1px solid #d0d5dd;
  }
  .custom-table tbody td {
    padding: 10px;
    border: none;
  }

  button {
    padding: 10px 20px;
    background-color: #030b26;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .statement-detail-head {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .remaining-balance {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .statement-drop-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #030b260a;
    border-bottom: 0.5px solid #dbe0ee;
    height: 45px;
    padding: 0px 15px;
  }
  .statement-body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
  .delete-client {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c1d55;
    border: 1px solid #dbe0ee;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #ffffff;
  }
  .edit-client {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #0c1d55;
  }
 .di {

 }
  .edi-del-btn {
    display: flex;
    margin: 15px;
    gap: 10px;

  }
  .amount {
    font-size: 18px;
    color: #0c1d55;
    font-weight: 800;
  }
  .next-page-link {
    text-decoration: none;
    color: #636878;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .pagination-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    border: 1px solid #dbe0ee;
    padding: 0px 20px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  .paginations {
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    line-height: 20px;
    margin: 0 10px;
    text-align: center;
  }
  .month-change-bttn {
    display: flex;
    gap: 15px;
    align-items: center;
    margin-bottom: 20px;
  }
`;
const ITEMS_PER_PAGE = 5;

// Mock customer data
const mockCustomers = [
  {
    id: 1,
    name: "John Doe",
    loan: 50000,
    interestRate: 0.05,
    loanStartDate: "2024-11-20",
    payments: {
      "2024-11-20": 2500,
      "2024-11-21": 2500,
      "2024-11-22": 2500,
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    loan: 75000,
    interestRate: 0.08,
    loanStartDate: "2024-12-01",
    payments: {
      "2024-12-01": 3000,
      "2024-12-02": 3000,
    },
  },
  {
    id: 3,
    name: "Michael Johnson",
    loan: 40000,
    interestRate: 0.06,
    loanStartDate: "2024-11-26",
    payments: {
      "2024-11-26": 2000,
      "2024-11-27": 2000,
      "2024-11-28": 2000,
    },
  },
];

const CustomerLoan = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment().format("YYYY-MM"));
  const [currentWeekStart, setCurrentWeekStart] = useState(
    moment().startOf("week")
  );
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    // Filter customers who have active loans within the selected week
    const updatedCustomers = mockCustomers.filter((customer) => {
      const loanStart = moment(customer.loanStartDate);
      const weekEnd = currentWeekStart.clone().add(6, "days");

      // Include customer only if loan started before or within the selected week
      return loanStart.isSameOrBefore(weekEnd, "day") && calculateRemainingBalance(customer) > 0;
    });

    setFilteredCustomers(updatedCustomers);
  }, [currentWeekStart]);

  const calculateRemainingBalance = (customer) => {
    const totalPaid = Object.values(customer.payments).reduce(
      (sum, payment) => sum + payment,
      0
    );
    const totalOwed = customer.loan + customer.loan * customer.interestRate;
    return totalOwed - totalPaid;
  };

  const getWeekDays = (weekStart) => {
    return Array.from({ length: 7 }, (_, i) =>
      weekStart.clone().add(i, "days").format("YYYY-MM-DD")
    );
  };

  const handleWeekChange = (direction) => {
    setCurrentWeekStart((prev) =>
      direction === "prev"
        ? prev.clone().subtract(1, "week")
        : prev.clone().add(1, "week")
    );
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentWeekStart(moment(event.target.value).startOf("month"));
  };

  const weekDays = getWeekDays(currentWeekStart);

  return (
    <div className="loan">
      <header className="loan-header">
        <h1>Customer Loan Payment Dashboard</h1>
        <div className="controls">
          <label>
            Select Month:
            <input
              type="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
          </label>
          <div className="week-controls">
            <button onClick={() => handleWeekChange("prev")}>Previous Week</button>
            <span>
              {currentWeekStart.format("MMM DD")} -{" "}
              {currentWeekStart.clone().add(6, "days").format("MMM DD, YYYY")}
            </span>
            <button onClick={() => handleWeekChange("next")}>Next Week</button>
          </div>
        </div>
      </header>

      <main>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Loan (₦)</th>
              <th>Interest (₦)</th>
              <th>Total Amount (₦)</th>
              <th>Loan Start Date</th>
              {weekDays.map((day) => (
                <th key={day}>{moment(day).format("ddd")}</th>
              ))}
              <th>Remaining (₦)</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => {
                const interest = customer.loan * customer.interestRate;
                const totalOwed = customer.loan + interest;
                const remaining = calculateRemainingBalance(customer);

                return (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.loan.toLocaleString()}</td>
                    <td>{interest.toLocaleString()}</td>
                    <td>{totalOwed.toLocaleString()}</td>
                    <td>{moment(customer.loanStartDate).format("MMM DD, YYYY")}</td>
                    {weekDays.map((day) => (
                      <td key={day}>
                        {customer.payments[day]
                          ? customer.payments[day].toLocaleString()
                          : 0}
                      </td>
                    ))}
                    <td>{remaining.toLocaleString()}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={weekDays.length + 5} className="no-loan">
                  No customers with active loans in this week.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};



export default CustomerLoan;
