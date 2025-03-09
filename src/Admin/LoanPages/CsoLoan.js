// src/components/CsoTransactionsTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCsoTransactions } from "../../redux/slices/csoSlice";
import styled from "styled-components";
import { MoonLoader } from "react-spinners";

const CsoLoanRap = styled.div`
.cso-loan-1 {
  background: #ffffff;
  border-radius: 15px;
  margin: 20px;
  padding-top: 20px;
  
}
.cso-loan-1 h1 {
  font-size: 20px;
  font-weight: 700px;
  margin-bottom: 20px;
  margin: 20px;
}
.month-year select, .month-year input {
  width: 150px;
  height: 30px;
  border: 1px solid #d0d5dd;
  padding-left: 10px;
  border-radius: 100px;
}
.month-year {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin: 20px;
}
.month-year label {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  color: #9499ac
}
`;
const CsoTransactionsTable = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector((state) => state.cso);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(
      fetchCsoTransactions({ month: selectedMonth, year: selectedYear })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  const handleDateChange = () => {
    dispatch(
      fetchCsoTransactions({
        month: selectedMonth,
        year: selectedYear,
      })
    );
  };

  if (loading) return <p style={{display: "flex", 
    flexDirection: "column", 
    height: "90vh",
    justifyContent: "center",
   alignItems: "center"}} > <MoonLoader /></p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <CsoLoanRap>
      <div className="cso-loan-1">
        <h1>CSO Transactions</h1>

        {/* Month and Year Selector */}
        <div className="month-year" style={{ marginBottom: "20px" }}>
          <label>
            Select Month:
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
          </label>
          <label>
            Select Year:
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
          </label>
        </div>

        {/* CSO Transaction Table */}

        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table" border="1">
                <thead>
                  <tr>
                    <th>Name of CSO</th>
                    <th>Number of Loans</th>
                    <th>Amount Disbursed</th>
                    <th>Principal + <br />
                    Interest</th>
                    <th>Actual Paid</th>
                    <th>Loan Balance</th>
                    <th> Admin and Transaction Fees</th>
                    <th>Monthly Loan Target</th>
                    <th>Monthly Disbursement Target</th>
                    <th>Target Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((cso, index) => (
                    <tr key={index}>
                      <td>{cso.csoName}</td>
                      <td>{cso.numberOfLoans}</td>
                      <td>{cso.totalDisbursed}</td>
                      <td>{cso.totalAmountToBePaid}</td>
                      <td>{cso.totalAmountPaid}</td>
                      <td>{cso.loanBalance}</td>
                      <td>{cso.totalLoanAppForm}</td>
                      <td>{cso.monthlyLoanTarget}</td>
                      <td>{cso.monthlyDisbursementTarget}</td>
                      <td
                        style={{
                          color:
                            cso.targetStatus === "Target Met" ? "green" : "red",
                        }}
                      >
                        {cso.targetStatus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </CsoLoanRap>
  );
};

export default CsoTransactionsTable;
