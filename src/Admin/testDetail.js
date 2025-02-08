import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCsoPageActiveLoans } from "../redux/slices/csoLoanSlice";

const ActiveLoans = () => {
  const dispatch = useDispatch();
  const { loans, currentPage, totalPages, loading, error } = useSelector(
    (state) => state.loans
  );
const csoId = "996"
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (csoId) {
      dispatch(fetchCsoPageActiveLoans({ csoId, page }));
    }
  }, [dispatch, csoId, page]);

  return (
    <div>
      <h2>Active Loans</h2>
      {loading && <p>Loading loans...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <ul>
        {loans.map((loan) => (
          <li key={loan._id}>
            {loan.customerDetails.firstName} {loan.customerDetails.lastName} - ₦
            {loan.loanDetails.amountToBePaid}
          </li>
        ))}
      </ul>
      {/* Pagination */}
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ActiveLoans;
