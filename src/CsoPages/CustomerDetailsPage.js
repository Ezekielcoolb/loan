import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"; // For routing
import { fetchWaitingLoans } from "../redux/slices/LoanSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const CustomerPageDetailRap = styled.div`
 
    font-family: 'Roboto';
  
  .customer-details-div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .customer-details {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .customer-details h4 {
    color: #005e78;
    font-size: 16px;
    font-weight: 700;
  }
  .customer-details p {
    color: #005e78;
    font-size: 12px;
    font-weight: 500;
  }
  .pay-now-button {
    background: #009a49;
    width: 114px;
    height: 91px;
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  .loan-balances h6, .disbursement-info h6  {
    color: #319f43;
    font-size: 12px;
    font-weight: 400;
  }
  .loan-balances h1 {
    color: #005e78;
    font-size: 24px;
    font-weight: 900;
  }
  .loan-balances, .disbursement-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .loan-take-action, .disbursement-info-divs{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .disbursement-info h3 {
    color: #005e78;
    font-size: 15px;
    font-weight: 900;
  }
  .all-payment-action-div {
    display: flex;
    margin-bottom: 15px;
    justify-content: space-between;
  }
  .active-loan-details {
    max-width: 500px;
    min-width: 409px;
   
    background: #ffffff;
    border-radius: 40px;
   
  }
  .loan-details-move-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
   
    padding: 20px;
    
  }
 
  .Customer-upper-details {
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .Customer-upper-details h2 {
    color: #005e78;
    font-size: 24px;
    font-weight: 700;
    text-align: center;

  }
  .div-date-payment {
    border-top: 2px solid #005E78;
    border-radius: 40px;
margin-top: 50px;
    background: #DAF7FF;
padding: 30px;
display: flex;
flex-direction: column;

gap: 20px;
  }
  .div-date-payment h2 {
    color: #E33629;
font-size: 16px;
font-weight: 900;
text-align: center;
  }
  .check-loan-card {
    box-shadow: 2px 2px 4px 0px #005E7833;
animation-duration: 0ms;
background: #005E78;
width: 112px;
height: 38px;
border-style: none;
color: #D9D9D9;
font-size: 12px;
font-weight: 700;
border-radius: 10px;
margin: auto;

  }
  .cancel-icon {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

  }
  .the-current-loan {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 10px;
    background: #DAF7FF;
    border: 1px solid  #005E78;
    border-radius: 20px;
    width: 140px;
    


  }
   .the-current-loan p {
    color: #319F43;
    font-size: 9px;
    font-weight: 400;

   }
   .the-current-loan h4 {
    color: #005E78;

    font-size: 16px;
    font-weight: 900;

   }
   .first-custom-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
   }
`;

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);

  const handleGoToCalendar = () => {
    navigate(`/cso/calendar/${id}`);
  };
  if (!loan) return <p>Loading loan details...</p>;


  const handleMoveBack = () => {
    navigate(`/cso`);
  };
  // Helper functions
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDateWithOrdinal = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.getFullYear();
    const ordinal = getOrdinalSuffix(day);
    return `${day}${ordinal}, ${month} ${year}`;
  };

  // Dates logic
  const currentDate = formatDateWithOrdinal(new Date()); // Current date
  const disbursedDate = loan?.disbursedAt
    ? formatDateWithOrdinal(loan.disbursedAt)
    : "Not Disbursed Yet";
  const repaymentStartDate = loan?.disbursedAt
    ? formatDateWithOrdinal(
        new Date(
          new Date(loan.disbursedAt).setDate(
            new Date(loan.disbursedAt).getDate() + 1
          )
        )
      )
    : "Not Scheduled";
  const repaymentEndDate = loan?.disbursedAt
    ? formatDateWithOrdinal(
        new Date(
          new Date(loan.disbursedAt).setDate(
            new Date(loan.disbursedAt).getDate() +
              loan?.repaymentSchedule?.length || 0
          )
        )
      )
    : "Not Scheduled";

  return (
    <CustomerPageDetailRap>
      <div className="loan-details-move-div">
        <div className="active-loan-details">
          <div className="Customer-upper-details">
             <div className="cancel-icon">
                      <Icon
                        onClick={handleMoveBack}
                        icon="stash:times-circle"
                        width="30"
                        height="30"
                        style={{ color: "#005e78", cursor: "pointer" }}
                      />
                    </div>
            <h2>Customer's Details</h2>
            <div className="first-custom-div">
              <div className="customer-details-div">
                <div>
                  <img
                    src={loan?.pictures?.customer}
                    alt="Customer"
                    width={79}
                    height={100}
                  />
                </div>
                <div className="customer-details">
                  <h4>
                    {`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}
                  </h4>
                  <p>{loan?.customerDetails?.address}</p>
                  <p>{loan?.customerDetails?.phone}</p>
                  <p>{loan?.businessDetails?.businessName}</p>
                </div>
              </div>
              <div className="the-current-loan">
                <p>Ammout Disbursed</p>
                <h4>{loan?.loanDetails?.amountApproved}</h4>
                <p>Customer Reliability Ratings</p>
                <p>Default Payment</p>
              </div>
            </div>
          </div>


          <div className="div-date-payment">
            <h2>{currentDate}</h2>
            <div className="all-payment-action-div">
              <div className="loan-take-action">
                <div className="loan-balances">
                  <h6>Amount Due</h6>
                  <h1>₦550,000</h1>
                </div>
                <div className="loan-balances">
                  <h6>Loan Balance</h6>
                  <h1>₦55,000</h1>
                </div>
                <Link className="pay-now-button">PAY NOW</Link>
              </div>
              <div className="disbursement-info-divs">
                <div className="disbursement-info">
                  <h6>Disbursed Date</h6>
                  <h3>{disbursedDate}</h3>
                </div>
                <div className="disbursement-info">
                  <h6>Current Loan (P + I) </h6>
                  <h3>{loan?.loanDetails?.amountToBePaid}</h3>
                </div>
              
                <div className="disbursement-info">
                  <h6>Payment Start Date</h6>
                  <h3>{repaymentStartDate}</h3>
                </div>
                <div className="disbursement-info">
                  <h6>Payment End Date</h6>
                  <h3>{repaymentEndDate}</h3>
                </div>
              </div>
            </div>
            <button className="check-loan-card" onClick={handleGoToCalendar}>Check Loan Card</button>
          </div>
        </div>
      </div>
    </CustomerPageDetailRap>
  );
};

export default CustomerDetailsPage;
