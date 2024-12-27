import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { disburseLoan, fetchWaitingDisbursementLoans } from "../redux/slices/LoanSlice";
import { useDispatch, useSelector } from "react-redux";

const NewLoanRap = styled.div`
  width: 100%;
  padding: 20px;
  h4 {
    font-size: 16px;
    font-weight: 600;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #727789;
  }
  .amount-approved {
    font-weight: 700;
    font-size: 16px;
    color: #030b26;
  }

   

  
  .approve,
  .reject {
   border-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 80px;
    height: 30px;
    background: #0c1d55;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
  }
  
`;



const Disbursment = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchWaitingDisbursementLoans());
  }, [dispatch]);

  const handleDisburse = (id) => {
    dispatch(disburseLoan(id));
  };

  if (loading === 'loading') return <p>Loading...</p>;
  return (
    <NewLoanRap>
      <div>
        <div className="find-lawyer-header">
          <h2>Loan Disbursement</h2>
        </div>
        <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Amount Approved</th>
                    <th>Account Name</th>
                    <th>Account Number</th>
                    <th>Bank Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((loan) => (
                    <tr
                      key={loan?.id}
                    
                    >
                       <td>{`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}</td>
                       <td className="amount-approved">{loan?.loanDetails?.amountApproved}</td>
                       <td>{loan?.bankDetails?.accountName} </td>
                      <td>{loan?.bankDetails?.accountNo} </td>
                      <td>{loan?.bankDetails?.bankName} </td>
                      <td style={{color: "green"}}>
                        {loan?.status}
                      </td>
                      <td>
              <button className="approve" onClick={() => handleDisburse(loan._id)}>Disburse</button>
            </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
         
        </div>
      </div>
    </NewLoanRap>
  );
};

export default Disbursment;
