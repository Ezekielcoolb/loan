import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDailDisbursedLoans } from "../../redux/slices/LoanSlice";
import styled from "styled-components";



const DisburseRap = styled.div`
button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: #0c1d55;
    width: 120px;
    height: 30px;
    border: 1px solid  #0c1d55;
    background: transparent;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px; 
}
button:hover {
    background: #0c1d55;
    color: #ffffff;
}
.month-btn {
    display: flex;
    gap: 20px;
    align-items: center;
}
.page-div {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.all-disbursed {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
}
`

const DailyDisbursementTable = () => {
  const dispatch = useDispatch();
  const { dailyDisbursedLoans, dailyDisbursedTotalPages, dailyDisbursedCurrentPage, loading, error } = useSelector((state) => state.loan);

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [page, setPage] = useState(1);
console.log(dailyDisbursedLoans);

  useEffect(() => {
    dispatch(fetchDailDisbursedLoans({ year, month, page }));
  }, [year, month, page, dispatch]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
    setPage(1);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= dailyDisbursedTotalPages) {
      setPage(newPage);
    }
  };

  return (
    <DisburseRap>
    <div className="all-disbursed">
      
      <div className="month-btn">
        <button onClick={handlePrevMonth} className="">Previous Month</button>
        <span className="">{new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth} className="">Next Month </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table" border="1">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Loan Type</th>
            <th className="border p-2">Admin and Application Fees</th>
            <th className="border p-2">Date Disbursed</th>
          </tr>
        </thead>
        <tbody>
          {dailyDisbursedLoans?.length > 0 ? (
            dailyDisbursedLoans?.map((loan) => (
              <tr key={loan._id}>
                <td className="border p-2">{loan.customerDetails.firstName} {loan.customerDetails.lastName}</td>
                <td className="border p-2">{loan.loanDetails.amountDisbursed}</td>
                <td className="border p-2">{loan.loanDetails.loanType}</td>
                <td className="border p-2">{loan.loanDetails.loanAppForm}</td>
                <td className="border p-2">{new Date(loan.disbursedAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-2 text-center">No loans found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </div>

      <div className="page-div">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 bg-gray-200 rounded mr-2">← Previous</button>
        <span className="text-lg font-medium">{page} / {dailyDisbursedTotalPages}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === dailyDisbursedTotalPages} className="px-4 py-2 bg-gray-200 rounded ml-2">Next →</button>
      </div>
    </div>
    </DisburseRap>
  );
};

export default DailyDisbursementTable;
