import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { clearDisbursedMessages, disburseLoan, fetchWaitingDisbursementLoans } from "../redux/slices/LoanSlice";
import { useDispatch, useSelector } from "react-redux";
import { MoonLoader, PulseLoader } from "react-spinners";

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
  .find-lawyer-header h2 {
    font-size: 20px;
    font-weight: 700;
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
    width: fit-content;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;

  }
  .all-dropdown-div p {
    color: #0c1d55;
    font-size: 25px;
    font-weight: 700;
    max-width: 300px;
    text-align: center;
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
`;



const Disbursment = () => {
  const dispatch = useDispatch();
  const {dibursedSuccessMessage, loans, disburseloading, loading } = useSelector((state) => state.loan);
  const [isLoading, setIsLoading] = useState(false)
console.log(dibursedSuccessMessage);

  useEffect(() => {
    dispatch(fetchWaitingDisbursementLoans());
  }, [dispatch]);

  const handleDisburse = (id) => {
    dispatch(disburseLoan(id));
    setIsLoading(true)
    // window.location.reload();
  };

  const handleCancel = () => {
    dispatch(clearDisbursedMessages())
        window.location.reload();

  }

  if (loading === 'loading') return <p style={{display: "flex", 
    flexDirection: "column", 
    height: "90vh",
    justifyContent: "center",
   alignItems: "center"}} > <MoonLoader /></p>;;
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
                  {loans?.map((loan) => (
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
              <button className="approve" onClick={() => handleDisburse(loan._id)}>

              {disburseloading ? 
                                    <PulseLoader color="white" size={10} />
                                      : "Disburse"
                                }
              </button>
            </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
         
        </div>
      </div>
      {dibursedSuccessMessage ? (
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
          <p>{dibursedSuccessMessage}</p>
          <button onClick={handleCancel} className="exist-btn">Exit</button>

        </div>
      </div>
      ): ""}
    </NewLoanRap>
  );
};

export default Disbursment;
