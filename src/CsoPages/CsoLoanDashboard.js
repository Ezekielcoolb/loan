// src/components/LoanDashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  calculateDefaultingCustomers,
  calculateNoPaymentYesterday,
  fetchAllLoansByCsoId,
} from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";

const LoanCsoRap = styled.div`
  height: 100vh;
  .all-loan {
    padding: 20px;
    padding-top: 120px;
    margin: auto;
    color: #005e78;
  }
  input {
    background: #daf7ff;
    padding: 20px 40px;
    width: 333px;
    height: 45px !important;
    border-style: none;
    border-radius: 20px;
  }
  .input-div {
    position: relative;
  }
  .search-input-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .home-first-div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .home-first-div h2 {
    color: #005e78;
    font-size: 24px;
    font-weight: 500;
  }
  .loan-summary {
    border: 1px solid #005e78;
    border-radius: 20px;
    padding: 15px;
    margin-top: 30px;
  }
  .loan-summary h3 {
    color: #005e78;
    font-weight: 700;
    font-size: 20px;
    text-align: center;
    margin-bottom: 30px;
  }
  .summary-loan {
    display: flex !important;
    justify-content: space-between;
    gap: 3px;
  }
  .summary-loan p {
    width: 78px;

    border-radius: 5px;
    line-height: 14px;
    padding: 5px;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
  }
  .summary-loan span {
    font-size: 16px;
    font-weight: 500;
  }
  .p-1 {
    background: #ffffff;
    color: #005e78;
  }
  .p-2 {
    background: #009a49;
    color: #ffffff;
  }
  .p-3 {
    background: #f8bd00;
    color: #ffffff;
  }
  .p-4 {
    background: #ff0000;
    color: #ffffff;
  }
  button {
    background: #005e78;
    color: #ffffff;
    width: 100px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 15px;
    border-style: none;
    color: #d9d9d9;
    font-size: 12px;
    font-weight: 700;
  }
  .btns {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-top: 30px;
  }
  .all-dropdown-div {
    width: 333px !important;
    padding: 15px;
  }
  .default-head {
    display: flex;

    justify-content: space-between;
  }
  .default-head h3 {
    font-size: 24px;
    font-weight: 900;
  }
  .no-default {
    color: #005e78;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .late-pay-text ul {
    margin-left: 20px;
  }
  .late-pay-text li {
    color: #005e78;
    font-size: 14px;
    margin-top: 10px;
    font-weight: 600;
  }
  .default-cust {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #005e78;
    font-size: 14px;
  }
`;

const LoanCsoDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    loans,
    totalLoans,
    activeLoans,
    pendingLoans,
    rejectedLoans,
    defaultingCustomers,
    noPaymentYesterday,
    status,
    error,
  } = useSelector((state) => state.loan);

  const [showDefaultingCustomers, setShowDefaultingCustomers] = useState(false);
  const [showYesDefaultingCustomers, setShowYesDefaultingCustomers] =
    useState(false);

  const csoId = user.workId;
  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  const handleShowDefaultingCustomers = () => {
    dispatch(calculateDefaultingCustomers());
    setShowDefaultingCustomers(true);
  };
  const handleNoPaymentYesterday = () => {
    dispatch(calculateNoPaymentYesterday());
    setShowYesDefaultingCustomers(true);
  };

 

  {
    status === "loading" && <p>Loading...</p>;
  }
  {
    status === "failed" && <p>Error: {error}</p>;
  }

  return (
    <LoanCsoRap>
      <div className="all-loan">
        <div className="home-first-div">
          <h2>Loans</h2>
          <div className="input-div">
            <input type="text" placeholder="Search Loan Records" />
            <Icon
              className="search-input-icon"
              icon="ic:baseline-search"
              width="24"
              height="24"
              style={{ color: " #005E7880" }}
            />
          </div>
        </div>

        <div className="loan-summary">
          <h3>Loan Summary</h3>
          <div className="summary-loan">
            <p className="p-1">
              Submitted Loan Applications
              <span>{totalLoans}</span>
            </p>
            <p className="p-2">
              Approved loans
              <span> {activeLoans}</span>
            </p>
            <p className="p-3">
              Pending Loans:
              <span> {pendingLoans} </span>
            </p>
            <p className="p-4">
              Declined Loans:
              <span> {rejectedLoans} </span>
            </p>
          </div>
          <div className="btns">
            <button onClick={handleNoPaymentYesterday}>Late Payment</button>
            <button onClick={handleShowDefaultingCustomers}>
              Defaulted Loans
            </button>
          </div>

          {showDefaultingCustomers && defaultingCustomers?.length > 0 && (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Defaulted Loans</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => setShowDefaultingCustomers(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div className="late-pay-text">
                <ul>
                  {defaultingCustomers?.map((customer, index) => (
                    <li key={index}>
                        <div className="default-cust">
                    
                      <p>
                      {customer?.customerDetails?.firstName}{" "}
                      {customer?.customerDetails?.lastName} 
                      </p>
                      <p>
                      {customer?.loanDetails?.amountToBePaid -
                        customer?.loanDetails?.amountPaidSoFar}
                        </p>
                        </div>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
            </div>
          )}

          {showDefaultingCustomers && defaultingCustomers?.length === 0 && (
            <div className="dropdown-container">
              <div className="all-dropdown-div">
                <div className="default-head">
                  <h3>Defaulted Loans</h3>
                  <div className="cancel-btn">
                    <Icon
                      onClick={() => setShowDefaultingCustomers(false)}
                      icon="stash:times-circle"
                      width="24"
                      height="24"
                      style={{ color: "#005e78", cursor: "pointer" }}
                    />
                  </div>
                </div>
                <p className="no-default">No Defaulted Loans Found.</p>
              </div>
            </div>
          )}
          {/* List of customers who didn't make payment yesterday */}
          <div>
            {showYesDefaultingCustomers && noPaymentYesterday?.length > 0 && (
              <div className="dropdown-container">
                <div className="all-dropdown-div">
                  <div className="default-head">
                    <h3>Late Payment </h3>
                    <div className="cancel-btn">
                      <Icon
                        onClick={() => setShowYesDefaultingCustomers(false)}
                        icon="stash:times-circle"
                        width="24"
                        height="24"
                        style={{ color: "#005e78", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div className="late-pay-text">
                    <ul>
                      {noPaymentYesterday.map((loan, index) => (
                        <li key={index}>
                        <strong>{loan.customerName}</strong> -  N{loan.amountOwingUntilYesterday.toFixed(2)}
                    </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {showYesDefaultingCustomers && noPaymentYesterday?.length === 0 && (
              <div className="dropdown-container">
                <div className="all-dropdown-div">
                  <div className="default-head">
                    <h3>Late Payment Loans</h3>
                    <div className="cancel-btn">
                      <Icon
                        onClick={() => setShowDefaultingCustomers(false)}
                        icon="stash:times-circle"
                        width="24"
                        height="24"
                        style={{ color: "#005e78", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <p className="no-default">No Late Payment Found.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          
        </div>
      </div>
    </LoanCsoRap>
  );
};

export default LoanCsoDashboard;
