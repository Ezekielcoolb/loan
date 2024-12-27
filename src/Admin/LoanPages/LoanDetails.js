import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  fetchWaitingLoans,
  rejectLoan,
} from "../../redux/slices/LoanSlice";
import styled from "styled-components";

const LoanDetailRap = styled.div`
  width: 100%;
  padding: 20px;
  h2 {
    color: #030b26;
    font-size: 18px;
    font-weight: 700;
  }
  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #030b26;
  }
  h5 {
    font-size: 16px;
    font-weight: 600;
    color: #727789;
  }
  p {
    font-size: 14px;
    font-weight: 600;
    color: #030b26;
  }
  .change-size {
    font-size: 18px;
    font-weight: 900;
    color:rgb(5, 154, 50);
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: #727789;
  }
  .loan-details {
    background: #ffffff;
    border: 1px solid #dbe0ee;
    border-radius: 16px;
  }
  .inner-details h4,
  .right-loan-detail h4 {
    border-bottom: 1px solid #dbe0ee;
    padding-bottom: 15px;
  }
  .inner-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
  }
  .inner-details p {
    display: flex;
    align-items: center;

    justify-content: space-between;
  }
  .left-loan-detail {
    display: flex;
    flex-direction: column;
  }
  .right-loan-detail {
    padding: 20px;
  }
  .loan-details {
    display: flex;
  }
  .left-loan-detail {
    width: 60%;
    border-right: 1px solid #dbe0ee;
  }
  .right-loan-detail {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 100px;
  }
  .call-btn {
    height: 30px;
    width: 90px;
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
  .right-loan-detail p {
    color: #727789;
  }
  .span {
    font-weight: 600;
    color: #030b26 !important;
  }
  .inner-verify {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .inner-verify p {
    max-width: 280px;
  }
  .verify-divs,
  .action-div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .approve,
  .reject {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 700;
    color: white;
    width: 150px;
    height: 40px;
    background: green;
    padding: 10px;
    border-radius: 10px;
    border-style: none;
  }
  .reject {
    background: red;
  }
  input {
    width: 300px;
    height: 40px;
    border-radius: 16px;
    border: 1px solid #dbe0ee;
    padding: 20px;
    margin-bottom: 15px;
  }
  .move-it {
    margin-bottom: 15px;
  }
  .app-rej-btn {
    display: flex;
    gap: 15px;
  }
`;

const LoanDetails = () => {
  const { id } = useParams(); // Get loan ID from URL
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id); // Find the loan in the Redux store

  const [amountApproved, setAmountApproved] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  // Fetch loans if not already in the Redux store
  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);

  const handleOpenApprove = () => {
    setApproveOpen(!approveOpen);
  };
  const handleOpenReject = () => {
    setRejectOpen(!rejectOpen);
  };
  // Approve loan handler
  const handleApprove = () => {
    dispatch(approveLoan({ id, amountApproved }));
  };

  // Reject loan handler
  const handleReject = () => {
    dispatch(rejectLoan({ id, rejectionReason }));
  };

  if (!loan) return <p>Loading loan details...</p>; // Show a loader until the loan is found

  return (
    <LoanDetailRap>
      <h2>Loan Details</h2>
      <div className="loan-details">
        <div className="left-loan-detail">
          <div className="inner-details">
            <h4>Personal Details</h4>
            <p>
              <span>Customer Name:</span>{" "}
              {`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}
            </p>
            <p>
              <span>Email:</span> {loan?.customerDetails?.email}
            </p>
            <p>
              <span>Phone:</span> {loan?.customerDetails?.phoneOne}
            </p>
            <p>
              <span>Address:</span> {loan?.customerDetails?.address}
            </p>
            <p>
              <span>BVN:</span> {loan?.customerDetails?.bvn}
            </p>
          </div>
          <div className="inner-details">
            <h4>Business Details</h4>
            <p>
              <span>Business Name:</span> {loan?.businessDetails?.businessName}
            </p>
            <p>
              <span>Nature of Business:</span>{" "}
              {loan?.businessDetails?.natureOfBusiness}
            </p>
            <p>
              <span>Business Estimated Value:</span>{" "}
              {loan?.businessDetails?.estimatedValue}
            </p>
            <p>
              <span>Business Operational Status:</span>{" "}
              {loan?.businessDetails?.operationalStatus}
            </p>
          </div>
          <div className="inner-details">
            <h4>Loan Details</h4>
            <p className="change-size">
              <span>Loan Requested:</span> 
              {loan?.loanDetails?.amountRequested}
            </p>
            <p>
              <span>Loan Type:</span> {loan?.loanDetails?.loanType}
            </p>
          </div>
          <div className="inner-details">
            <h4>Bank Details</h4>
            <p>
              <span>Account Name:</span> {loan?.bankDetails?.accountName}
            </p>
            <p>
              <span>Account Number:</span> {loan?.bankDetails?.accountNo}
            </p>
            <p>
              <span>Bank Name:</span> {loan?.bankDetails?.bankName}
            </p>
          </div>
          <div className="inner-details">
            <h4>Guarantor's Details</h4>
            <p>
              <span>Guarantor Name:</span> {loan?.guarantorDetails?.name}
            </p>
            <p>
              <span>Guarantor Address:</span> {loan?.guarantorDetails?.address}
            </p>
            <p>
              <span>Guarantor Number:</span> {loan?.guarantorDetails?.phone}
            </p>
            <p>
              <span>Guarantor Email:</span> {loan?.guarantorDetails?.email}
            </p>
            <p>
              <span>Relationship with Custoomer:</span>{" "}
              {loan?.guarantorDetails?.relationship}
            </p>
            <p>
              <span>Years Known:</span> {loan?.guarantorDetails?.yearsKnown}
            </p>
          </div>
          <div className="inner-details">
            <h4>Group Details</h4>
            <p>
              <span>Group Name:</span> {loan?.groupDetails?.groupName}
            </p>
            <p>
              <span>Group Leader:</span> {loan?.groupDetails?.leaderName}
            </p>
            <p>
              <span>Leader's Number:</span> {loan?.groupDetails?.mobileNo}
            </p>
          </div>
          <div className="inner-details">
            <h4>Images</h4>
            <div>
              <h5>Business Image</h5>
              <div>
                <img src={loan?.pictures?.business} alt="" />
              </div>
            </div>
            <div>
              <h5>Other Images</h5>
            </div>
          </div>
        </div>

        <div className="right-loan-detail">
          <div className="verify-divs">
            <h4>Verification</h4>
            <div className="inner-verify">
              <p>
                Ask Cso <span className="span"> {loan?.csoName} </span>for more
                information
              </p>
              <Link className="call-btn">Call</Link>
            </div>
            <div className="inner-verify">
              <p>Call customer for extra information or confirmation</p>
              <Link className="call-btn">Call</Link>
            </div>
            <div className="inner-verify">
              <p>Call Guarantor for his/her consent</p>
              <Link className="call-btn">Call</Link>
            </div>
            <div className="inner-verify">
              <p>Verify past loan performanse</p>
              <Link className="call-btn">Verify</Link>
            </div>
            <p>
              Click <Link>here</Link> to confirm if guarantor fill the guarantor
              form
            </p>
          </div>
          <div className="action-div">
            <h4>Take Action</h4>
            <div className="app-rej-btn">
              <button className="approve" onClick={handleOpenApprove}>
                Approve
              </button>
              <button className="reject" onClick={handleOpenReject}>
                Reject
              </button>
            </div>
            {approveOpen ? (
              <div>
                <h5 className="move-it">Approve Loan</h5>
                <input
                  type="number"
                  placeholder="Amount Approved"
                  value={amountApproved}
                  onChange={(e) => setAmountApproved(e.target.value)}
                />{" "}
                <br />
                <button className="approve" onClick={handleApprove}>
                  Approve
                </button>
              </div>
            ) : (
              ""
            )}
            {rejectOpen ? (
              <div>
                <h5 className="move-it">Reject Loan</h5>
                <input
                  type="text"
                  placeholder="Rejection Reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <button className="reject" onClick={handleReject}>
                  Reject
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </LoanDetailRap>
  );
};

export default LoanDetails;
