import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  fetchCustomerDetails,
  fetchWaitingLoans,
  rejectLoan,
  updateCallStatus,
} from "../../redux/slices/LoanSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  .count {
     font-size: 20px;
    font-weight: 700;
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
    color: rgb(5, 154, 50);
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
    border-style: none;
    text-decoration: none;
    background: #0c1d55;
  }
  .call-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
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
    position: relative;
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
  .popup {
    position: absolute;
    
   z-index: 1000;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    h3 {
      margin-bottom: 15px;
      font-size: 18px;
    }

    .popup-buttons {
      display: flex;
      justify-content: center;
      gap: 10px;

      button {
        padding: 8px 16px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &.yes {
          background-color: #28a745;
          color: white;
        }

        &.no {
          background-color: #dc3545;
          color: white;
        }

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }
  .approved-div {
    background: #ffffff;
    padding: 20px;
    border-radius: 15px;

  }
  .approved-div  p {
    font-size: 14px;
    font-weight: 600;
    color: #030b26;
  }
  .approved-div button {
    border: 1px solid #dbe0ee;
    width: 150px;
    height: 38px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #030b26;
    background: white;
    margin-top: 15px;
  }
  .customerimages {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .customerimages img{
    max-width: 250px;
    max-height: 250px;
    border-radius: 20px;
  }
  .signature img {
    width: 100px;
    height: 70px;
  }

  .doenload-details {
    border-top: 1px solid #dbe0ee;
    padding: 20px;
  }
  .download {
    background: #030b26;
    color: wheat;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    width: 100px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .all-dropdown-div {
    width: fit-content !important;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .all-dropdown-div h5  {
    font-size: 25px;
    font-weight: 700;
    max-width: 370px;
    text-align: center;
  }
  .all-dropdown-div span  {
    color: #030b26 !important;
    font-size: 25px;
    font-weight: 700;
  }
  .btn-div {
    display: flex;
    gap: 15px;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  margin: 8px;
  border-radius: 8px;
  color: white;
  background-color: ${({ active }) => (active ? '#16A34A' : '#3B82F6')}; // Green if true, Blue if false
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? '0.6' : '1')};

  &:hover {
    background-color: ${({ active, disabled }) => 
      disabled ? '#16A34A' : active ? '#15803D' : '#2563EB'};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  margin: 10px;
  border-radius: 6px;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;

  &:first-child {
    background-color: #EF4444;
    &:hover {
      background-color: #DC2626;
    }
  }

  &:last-child {
    background-color: #22C55E;
    &:hover {
      background-color: #16A34A;
    }
  }
`;

const LoanDetails = () => {
  const { id } = useParams(); // Get loan ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id); // Find the loan in the Redux store
  const [amountApproved, setAmountApproved] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [approveOpen, setApproveOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isCalled, setIsCalled] = useState(false);
  const { callCso, callGuarantor, callCustomer, verifyCustomer } = useSelector(state => state.loan);
  const [popup, setPopup] = useState(null); // Track which popup is open
const [approveLoading, setApprovedLoading] = useState(false)
const [rejectLoading, setRejectLoading] = useState(false)
const [isApproved, setIsApproved] = useState(false)
const [isRejected, setIsRejected] = useState(false)
  const { details } = useSelector((state) => state.loan);


  console.log(details);
  const filteredLoansDetails = details?.filter(
  (loan) =>
    loan?.status?.toLowerCase() === "fully paid" ||
    loan?.status?.toLowerCase() === "active loan"
);

const count = filteredLoansDetails?.length;

console.log("Filtered Loan Count:", count);
const bvn = loan?.customerDetails?.bvn
const isValid =
amountApproved !== "" 

const handleIsApprove = () => {
  setIsApproved(!isApproved)
}

const handleIsReject = () => {
  setIsRejected(!isRejected)
}


  const handleApprovedPop = () => {
    setApprovedLoading(false)
    navigate('/admin/newloan')
  };
  const handleRejectPop = () => {
    setRejectLoading(false)
    navigate('/admin/newloan')
  };

  const handlePopupResponse = (response) => {
    if (response === "yes") {
      setIsCalled(true); // Mark as called
    }
    setShowPopup(false); // Close the pop-up
  };


  const handleUpdate = () => {
    if(popup) {
    dispatch(updateCallStatus({ loanId: id, field: popup }));
    setPopup(null); // Close popup after update
    }
  };
  // Fetch loans if not already in the Redux store
  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);


  
    useEffect(() => {
      dispatch(fetchCustomerDetails(bvn));
    }, [dispatch, bvn]);

  const handleOpenApprove = () => {
    setApproveOpen(!approveOpen);
    setRejectOpen(false);
  };
  const handleOpenReject = () => {
    setRejectOpen(!rejectOpen);
    setApproveOpen(false);
  };
  // Approve loan handler
  const handleApprove = () => {
    dispatch(approveLoan({ id, amountApproved }));
    setIsApproved(false)
    setApprovedLoading(true)
  };

  // Reject loan handler
  const handleReject = () => {
    dispatch(rejectLoan({ id, rejectionReason }));
    setIsRejected(false)
    setRejectLoading(true)
  };

  const handleMoveToCustomerInfo = () => {
    navigate(`/admin/new-customer/${loan?.customerDetails?.bvn}`)
  }

  if (!loan) return <p>Loading loan details...</p>; // Show a loader until the loan is found

  return (
    <LoanDetailRap>
      <div style={{display: "flex", alignItems:"center"}}>
<Link
              style={{ marginLeft: "-50px" }}
              className="cso-link"
              to="/admin/newloan"
            >
              <Icon
                icon="formkit:arrowleft"
                width="90"
                height="16"
                style={{ color: "black", cursor: "pointer" }}
              />
            </Link>
      <h2>Loan Details</h2>
      </div>
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
              <span>NIN:</span> {loan?.customerDetails?.bvn}
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
             <p>
<span>Date Submitted:</span> {new Date(loan?.createdAt).toLocaleDateString('en-GB')}            </p>
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
            <h4>Signature</h4>
            <div className="signature">
                  <img src={loan?.pictures?.signature} alt="" />
                </div>
            
          </div>
          <div className="inner-details">
            <h4>Images</h4>
            <div className="customerimages">
              <div>
                <h5>Customer Image</h5>
                <div>
                  <img src={loan?.pictures?.customer} alt="" />
                </div>
              </div>
              <div>
                <h5>Business Image</h5>
                <div>
                  <img src={loan?.pictures?.business} alt="" />
                </div>
              </div>
            </div>
            <div>
              <h5>Other Images</h5>
              <div className="customerimages">
                {loan?.pictures?.others.map((img, index) => (
                  <img key={index} src={img} alt="" />
                ))}
                </div>
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
              <Button onClick={() => setPopup('callCso')} active={callCso} disabled={callCso}>Call</Button>
            </div>
            <div className="inner-verify">
              <p>Call customer for extra information or confirmation</p>
              <Button onClick={() => setPopup('callCustomer')} active={callCustomer} disabled={callCustomer}>Call </Button>
              </div>
            <div className="inner-verify">
              <p>Call Guarantor for his/her consent</p>
              <Button onClick={() => setPopup('callGuarantor')} active={callGuarantor} disabled={callGuarantor}>Call </Button>
              </div>
            {/* <div className="inner-verify">
              <p>Verify past loan performance</p>
              <Button onClick={() => setPopup('verifyCustomer')} active={verifyCustomer} disabled={verifyCustomer}>Verify </Button>
              </div> */}
              <div className="inner-verify">
              <p>Number of previous loans: <span className="count">{count}</span></p>
              {count > 0 ? (
              <Button onClick={handleMoveToCustomerInfo} active={verifyCustomer} disabled={verifyCustomer}>View </Button>
              ): ""}
              </div>
            <p>
              Click <Link to={`/admin/guarantorDetails/${id}`}>here</Link> to confirm if guarantor fill the guarantor
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
                <button
                 disabled={!isValid}
                 className="approve"
                 style={{
                  backgroundColor: isValid ? "green" : "#727789",
                  cursor:  !isValid ? "not-allowed" : "pointer",
                }}
                 onClick={handleIsApprove}>
                  Approve
                </button>
              </div>
            ) : (
              ""
            )}
               {isApproved ? (
                <div className="dropdown-container">
              <div className="all-dropdown-div">
                <h5 className="">You are about to approve <span> {amountApproved}</span></h5>
                <div className="btn-div"> 
                <button className="approve" onClick={handleApprove}>
                  Approve
                </button>
                <button onClick={() => setIsApproved(false)} className="reject">Cancel</button>
                </div>
              </div>
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
                <button className="reject" onClick={handleIsReject}>
                  Reject
                </button>
              </div>
            ) : (
              ""
            )}
               {isRejected ? (
                <div className="dropdown-container">
              <div className="all-dropdown-div">
                <h5 className="">You are rejecting this loan because of this reason: <span> {rejectionReason}</span></h5>
                <div className="btn-div"> 
                <button className="reject" onClick={handleReject}>
                  Reject
                </button>
                <button onClick={() => setIsRejected(false)} className="approve">Cancel</button>
                </div>
              </div>
              </div>
            ) : (
              ""
            )}
            {approveLoading? (
              <div className="dropdown-container ">
                <div className="approved-div">
              <p>You have approved the loan of<span style={{
                fontWeight: "900",
                fontSize: "18px",
                color: "#030b26"
              }}> {amountApproved}</span> </p>
              <button onClick={handleApprovedPop}>Exit</button>
              </div>
              </div>
            ): ""}
             {rejectLoading? (
              <div className="dropdown-container ">
                <div className="approved-div">
              <p>You have rejected the loan due to<span style={{
                fontWeight: "900",
                fontSize: "18px",
                color: "red"
              }}> {rejectionReason}</span> </p>
              <button onClick={handleRejectPop}>Exit</button>
              </div>
              </div>
            ): ""}
          </div>
        </div>
      </div>


      <div>

      {/* Popup Modal */}
      {popup && (
        <ModalOverlay>
          <ModalContent>
            <p>Have you called the {popup.replace('call', '').replace('verifyCustomer', 'Customer')}?</p>
            <div>
              <ModalButton onClick={() => setPopup(null)}>No</ModalButton>
              <ModalButton onClick={handleUpdate}>Yes</ModalButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
    </LoanDetailRap>
  );
};

export default LoanDetails;
