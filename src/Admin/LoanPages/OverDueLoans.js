// components/OverdueLoansTable.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearOverDuePay, fetchOverdueLoans, payOverDuePenalty } from "../../redux/slices/otherLoanSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PulseLoader } from "react-spinners";


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
    .pay-green-circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: lightgreen;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .all-dropdown-div {
    display: flex;
    width: fit-content;
    padding: 30px;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }
    .all-dropdown-div input  {
        width: 330px;
    height: 40px;
    border-radius: 15px;
    padding: 10px;
    background: #eaeaea;
    }
    .exist-btn {
    background: red;
    width: 150px;
    height: 55px;
    border-style: none;
    border-radius: 10px;
    cursor: pointer;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }

  .submit-btn {
    background: #005e78;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    color: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    padding: 20px;
    border-style: none;
    margin: auto;
  }
  @media (max-width: 900px) {
.flex-down {
  flex-wrap: wrap;
}
  }
`;


const OverdueLoansTable = () => {
  const dispatch = useDispatch();
  const { overDueItems, pagination, payOverloading, paidOverdueLoan, loading, error } = useSelector(
    (state) => state.otherLoan
  );
console.log(paidOverdueLoan);
console.log(overDueItems);


  const [search, setSearch] = useState("");
  const [payOverDueOpen, setPaidOverDueOpen] = useState(false)
  const [loanId, setLoanId] = useState("")
  const [amount, setAmount] = useState(null)
console.log(loanId);
console.log(amount);


  const handelPayOverOpen =(id) => {
    setLoanId(id)
    setPaidOverDueOpen(!payOverDueOpen)
  }

  const handleCancel = () => {
    setLoanId("")
    setPaidOverDueOpen(false)
    setAmount(null)
  }

   const handleClose = () => {
    setLoanId("")
    setPaidOverDueOpen(false)
    setAmount(null)
dispatch(clearOverDuePay())
  }


   const handleMakePayment = (e) => {
      e.preventDefault();
      if (!amount) return alert("Please enter amount");
      dispatch(
        payOverDuePenalty({
          loanId: loanId,
          amount: amount,
        })
      );
    };

  useEffect(() => {
    dispatch(fetchOverdueLoans({ page: pagination.page, limit: pagination.limit, search }));
  }, [dispatch, pagination.page, pagination.limit, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchOverdueLoans({ page: newPage, limit: pagination.limit, search }));
  };

  return (
    <CustLoanRap>
    <div className="cust-loan-1">
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
        }}>
      <h1>Overdue Loans</h1>
          <div className='search-div' style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search by customer name..."
        value={search}
        onChange={handleSearch}
      />
       <Icon
                                      className="search-position"
                                      icon="material-symbols-light:search"
                                      width="18"
                                      height="18"
                                      style={{ color: "#9499AC" }}
                                    />
</div>
</div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

     <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
     <table className="custom-table" border="1">
  <thead>
    <tr>
      <th>S/N</th>
      <th>Customer</th>
      <th>Amount Approved</th>
      <th>Loan Balance</th>
      <th>Overdue Count</th>
      <th>Penalty</th>
      <th>Penalty Paid</th>
      <th>Penalty Balance</th>
      <th>Pay Due</th>
    </tr>
  </thead>
  <tbody>
    {overDueItems?.map((loan, idx) => {
      const penalty = loan?.penalty || 0;
      const penaltyPaid = loan?.loanDetails?.penaltyPaid || 0;
      const penaltyBalance = Math.max(penalty - penaltyPaid, 0); // prevent negatives

      return (
        <tr key={loan._id}>
          <td>{idx + 1}</td>
          <td>
            {loan.customerDetails.firstName} {loan.customerDetails.lastName}
          </td>
          <td>{loan.loanDetails.amountApproved?.toLocaleString()}</td>
          <td>
            {(
              (loan.loanDetails.amountToBePaid || 0) -
              (loan.loanDetails.amountPaidSoFar || 0)
            ).toLocaleString()}
          </td>
          <td>{loan.overdueCount}</td>
          <td>{penalty.toLocaleString()}</td>
          <td>{penaltyPaid.toLocaleString()}</td>
          <td>{penaltyBalance.toLocaleString()}</td>
          <td>
            <button style={{
                width: "100px",
                height: "30px"
            }} onClick={() => handelPayOverOpen(loan._id)}>Pay</button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

      </div>
      </div>
      </div>

      {/* Pagination */}
 <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap",
    alignItems: "center"
  }}>
  {Array.from(
    { length: Math.ceil(pagination.total / pagination.limit) },
    (_, i) => {
      const pageNum = i + 1;
      const isActive = pagination.page === pageNum;

      return (
        <button
          key={pageNum}
          disabled={isActive}
          onClick={() => handlePageChange(pageNum)}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid #ccc",
            backgroundColor: isActive ? "#007bff" : "#f0f0f0",
            color: isActive ? "#fff" : "#333",
            cursor: isActive ? "not-allowed" : "pointer",
            fontWeight: "500",
          }}
        >
          {pageNum}
        </button>
      );
    }
  )}
</div>

    </div>
    {payOverDueOpen ? (
                <div className="dropdown-container">
                  <div className="all-dropdown-div">
                    <div className="pay-green-circle">
                      <Icon
                        icon="twemoji:check-mark"
                        width="40"
                        height="40"
                        style={{ color: "black" }}
                      />
                    </div>
                    <h2>Make Payment</h2>
                    <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    <button onClick={handleMakePayment} className="submit-btn">
                        
                        
                         {payOverloading ? (
                                             <PulseLoader color="white" size={10} />
                                           ) : (
                                             "Make Payment"
                                           )}</button>
                    <button onClick={handleCancel} className="exist-btn">
                      Exit
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
                {paidOverdueLoan ? (
                <div className="dropdown-container">
                  <div className="all-dropdown-div">
                    <div className="pay-green-circle">
                      <Icon
                        icon="twemoji:check-mark"
                        width="40"
                        height="40"
                        style={{ color: "black" }}
                      />
                    </div>
                    <p>You have successfully made payemnt of {paidOverdueLoan?.penaltyPaid} and your balance is {paidOverdueLoan?.penaltyRemaining}</p>
                    <button onClick={handleClose} className="exist-btn">
                      Exit
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
    </CustLoanRap>
  );
};

export default OverdueLoansTable;
