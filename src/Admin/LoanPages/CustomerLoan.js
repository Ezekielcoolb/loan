// src/components/LoanTable.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchCustomerActiveLoans,
  fetchCustomerActiveLoansSearch,
  nextWeek,
  previousWeek,
} from "../../redux/slices/LoanSlice";
import styled from "styled-components";
import { MoonLoader } from "react-spinners";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchAllTheCsos } from "../../redux/slices/csoSlice";

const CustLoanRap = styled.div`
.cust-loan-1 h1 {
 font-size: 20px;
 font-weight: 700;
 margin-left: 20px;
 margin-bottom: 20px;
}
.btns {
  display: flex;
  justify-content: space-between;
}
.btns button {
    color: #007bff;
    border-radius: 6px;
    border: 1px solid #007bff;
    background: transparent;
    width: 120px;
    height: 40px;
}
.cust-loan-1  {
  padding-top: 20px;
  margin: 20px;
  background: #ffffff;
  border-radius: 15px;
}
.pre-next {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px;
}
.pre-next  p {
  font-weight: 700;
}
.pre-next button {
  padding: 10px 10px;
  background: #0C1D55;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
}
 .search-div {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .search-position {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .search-div input {
    width: 259px !important;
    height: 38px !important;
    padding: 0px 10px;
    border-radius: 8px !important;
    border: 1px solid #dbe0ee !important;
  }

  .search-div p {
    color: #9499ac;
    font-weight: 600;
    font-size: 14px;
  }
  .fiter-cso-div select {
    border: 1px solid #d0d5dd;
    border-radius: 10px;
    height: 30px;
    padding: 0px 15px;
  }
  .fiter-cso-div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  @media (max-width: 900px) {
.flex-down {
  flex-wrap: wrap;
}
  }
`;

const CustomerLoan = () => {
  const dispatch = useDispatch();
  const { loans, pagination, loading, error, currentWeekStart } = useSelector(
    (state) => state.loan
  );
  const { list: csos } = useSelector((state) => state.cso);

  console.log(loans);
  

const [csoName, setCsoName] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCustomerActiveLoans({ page: 1, limit: 20 }));
  }, [dispatch]);

   useEffect(() => {
      dispatch(fetchAllTheCsos());
    }, [dispatch]);


    useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(fetchCustomerActiveLoansSearch({ csoName, search }));
    }, 400);

    return () => clearTimeout(delay);
  }, [csoName, search, dispatch]);


  // Generate the current week dates
  const getWeekDates = () => {
    let weekDates = [];
    let date = new Date(currentWeekStart);
    for (let i = 0; i < 7; i++) {
      weekDates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return weekDates;
  };

  // Generate the week range text (e.g., Dec 2 - Dec 8)
  const getWeekRangeText = () => {
    const start = new Date(currentWeekStart);
    const end = new Date(currentWeekStart);
    end.setDate(start.getDate() + 6);
    const format = (date) =>
      date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${format(start)} - ${format(end)}`;
  };

   const handlePageChange = (newPage) => {
    dispatch(fetchCustomerActiveLoans({ page: newPage, limit: pagination.limit }));
  };

  return (
    <CustLoanRap>
      <div className="cust-loan-1">
        <div className="flex-down" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <h1>Customer Loans</h1>
        <div className="flex-down"  style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}>
          <div className="fiter-cso-div">
              <select
               value={csoName}
                onChange={e => setCsoName(e.target.value)}
                className="border p-2 w-full"
              >
                <option value="">-- Filter by a CSO --</option>
                {csos.map((cso) => (
                  <option
                    key={cso._id}
                    value={`${cso.firstName} ${cso.lastName}`}
                  >
                    {cso.firstName} {cso.lastName}
                  </option>
                ))}
              </select>
              
            </div>
          <div className='search-div' style={{ position: "relative" }}>
                              <input  value={search}
                               onChange={e => setSearch(e.target.value)}
                               type="text" placeholder="search" />
                              <Icon
                                className="search-position"
                                icon="material-symbols-light:search"
                                width="18"
                                height="18"
                                style={{ color: "#9499AC" }}
                              />
                            </div>
                            </div>
        </div>
        {/* Week Navigation */}
        <div className="pre-next">
          <button
            onClick={() => dispatch(previousWeek())}
            className="px-4 py-2 bg-blue-500 text-white"
          >
            Previous Week
          </button>
          <p>{getWeekRangeText()}</p>
          <button
            onClick={() => dispatch(nextWeek())}
            className="px-4 py-2 bg-green-500 text-white"
          >
            Next Week
          </button>
        </div>

      

        {/* Loan Table */}
        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table" border="1">
                <thead>
                  <tr>
                    <th className="border p-2">Customer Name</th>
                    <th className="border p-2">Amount Disbursed</th>
                    <th className="border p-2">Principal + <br /> Interest</th>
                    <th className="border p-2">Start Date</th>
                    <th className="border p-2">Loan Balance</th>
                    {/* Display the week days dynamically */}
                    {getWeekDates().map((date, index) => (
                      <th key={index} className="border p-2">
                        {date.toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                        })}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loans?.slice().reverse().map((loan, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        {loan?.customerDetails?.firstName}{" "}
                        {loan?.customerDetails?.lastName}
                      </td>
                      <td className="border p-2">
                        {loan?.loanDetails?.amountDisbursed}
                      </td>
                      <td className="border p-2">
                        {loan?.loanDetails?.amountToBePaid}
                      </td>
                      <td className="border p-2">
                        {new Date(loan.createdAt)?.toLocaleDateString()}
                      </td>
                      <td className="border p-2">
                        {loan.loanDetails.amountToBePaid -
                          loan.loanDetails.amountPaidSoFar}
                      </td>
                      {getWeekDates().map((date, index) => {
                        const payment = loan.repaymentSchedule?.find(
                          (p) =>
                            new Date(p.date).toDateString() ===
                            date.toDateString()
                        );
                        return (
                          <td key={index} className="border p-2">
                            {payment ? payment.amountPaid : 0}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
               <div className="btns">
        <button
          disabled={pagination.page === 1}
          onClick={() => handlePageChange(pagination.page - 1)}
          className=""
        >
          Prev
        </button>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => handlePageChange(pagination.page + 1)}
          className=""
        >
          Next
        </button>
      </div>
            </div>
          </div>
        </div>
      </div>
    </CustLoanRap>
  );
};
export default CustomerLoan;
