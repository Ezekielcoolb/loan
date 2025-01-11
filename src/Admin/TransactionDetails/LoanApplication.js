import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allLaonfTransactions } from "../../redux/slices/LoanSlice";
import styled from "styled-components";


const TableRap = styled.div`
.loan-sum h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.loan-sum p {
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
}
.inner-sum span {
  width: 80px;
  height: 80px;
  border: 2px solid black;
  border-radius: 50%;
  display: flex;
  align-items: center;
font-size: 20px;
font-weight: 500;
  justify-content: center;
}

button {
  padding: 8px 15px;
  margin: 20px 0px;
}
.inner-sum {
  display: flex;
  gap: 20px;
}
.loan-sum {
  background: #ffffff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 30px 20px;
  margin: 30px;
}
@media (max-width: 678px) {
.inner-sum {
  flex-wrap: wrap;
}
}
`

const AllCustomerTable = () => {
  const dispatch = useDispatch();
  const { allLoans, loading, error } = useSelector((state) => state.loan);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;
  const [filteredLoans, setFilteredLoans] = useState([]);

  useEffect(() => {
    dispatch(allLaonfTransactions());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLoans(allLoans); // Initially show all loans
  }, [allLoans]);

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredLoans(allLoans);
    } else if (status === "approved") {
      setFilteredLoans(
        allLoans.filter((loan) => loan.status === "active loan")
      );
    } else if (status === "pending") {
      setFilteredLoans(
        allLoans.filter(
          (loan) =>
            loan.status === "waiting for approval" ||
            loan.status === "waiting for disbursement"
        )
      );
    } else if (status === "rejected") {
      setFilteredLoans(allLoans.filter((loan) => loan.status === "rejected"));
    }
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredLoans.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredLoans.length / rowsPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  // ✅ Loan statistics
  const totalLoans = allLoans.length;
  const activeLoansCount = allLoans.filter(
    (loan) => loan.status === "active loan"
  ).length;
  const pendingLoansCount = allLoans.filter(
    (loan) =>
      loan.status === "waiting for approval" ||
      loan.status === "waiting for disbursement"
  ).length;
  const rejectedLoansCount = allLoans.filter(
    (loan) => loan.status === "rejected"
  ).length;

  return (
    <TableRap>
    <div className="loan-sum">
      {/* Loan Summary Section */}
      <h3>Loan Application Summary</h3>
      <div className="inner-sum">
      <p>Total Loans Submitted: 
        
        <span>{totalLoans}</span>

      </p>
      <p>Number of Active Loans:
        <span> {activeLoansCount} </span>
         </p>
      <p>Number of Pending Loans:
        <span> {pendingLoansCount} </span>
         </p>
      <p>Number of Rejected Loans: 
        <span>{rejectedLoansCount}
        </span></p>
        </div>
      {/* Filter Buttons */}
      <div>
        <button onClick={() => handleFilter("all")}>All</button>
        <button onClick={() => handleFilter("approved")}>Approved</button>
        <button onClick={() => handleFilter("pending")}>Pending</button>
        <button onClick={() => handleFilter("rejected")}>Declined</button>
      </div>

      {/* Loan Table */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="table-container">
            <div className="new-table-scroll">
              <div className="table-div-con">
                <table className="custom-table" border="1">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Amount Requested</th>
                      <th>Amount Approved</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((loan, index) => (
                      <tr key={index}>
                        <td>
                          {loan.customerDetails.firstName}{" "}
                          {loan.customerDetails.lastName}
                        </td>
                        <td>
                          ₦{loan.loanDetails.amountRequested.toLocaleString()}
                        </td>
                        <td>
                          ₦
                          {loan.loanDetails.amountDisbursed?.toLocaleString() ||
                            "N/A"}
                        </td>
                        <td>{loan.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination Controls */}
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="noboder"> 
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </TableRap>
  );
};

export default AllCustomerTable;
