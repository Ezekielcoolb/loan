import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom"; // For routing
import {
  fetchAllLoansByCsoId,
  fetchFullyPaidLoans,
  fetchFullyPaidLoansStart,
  fetchLoanById,
  fetchWaitingLoans,
} from "../redux/slices/LoanSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchRemittanceStatus } from "../redux/slices/csoSlice";

const CustomerPageDetailRap = styled.div`
  height: 100vh;
  font-family: "Roboto";
  color: #005e78;
  th,
  td,
  tr,
  table,
  thead,
  tbody {
    border: none;
    color: #005e78;
    font-size: 16px;
    background-color: transparent !important;
  }
  th {
    padding: 5px;
    font-weight: 700;
  }
  td {
    font-weight: 400;
    padding: 5px;
    white-space: nowrap;
    text-align: center;
  }
  .table-div-con {
    min-width: 700px !important;
    min-height: 400px;
    padding: 0px 40px;
  }
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
  .previous-loans-div {
    display: flex;
    gap: 20px;
  }
  .previous-loans {
    width: 130px;
    text-decoration: none;
    background: #005e78;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    color: #005e78;
    text-decoration: none;
    font-size: 12px !important;
    font-weight: 600 !important;
  }
  .customer-details p {
    color: #005e78;
    font-size: 12px;
    font-weight: 500;
  }
  .the-active-box h3 {
    color: #005e78;
    font-size: 18px;
    font-weight: 700;
    margin-left: 10px;
  }
  .pay-now-button {
    background: #009a49;
    width: 114px;
    height: 91px;
    border-style: none;
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }
  .dropdown-content{ 
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
}
  .dropdown-content p {
  font-size: 20px;
  color: #112240;
  font-weight: 500;
}
.submit-btn {
    border: 1px solid #112240;
  background-color: #112240;
  color: white;
  width: 380px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
}
.submit-btn-2 {
     border: 1px solid #112240;
  color: #112240;
  background: transparent;
  width: 380px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
}
  .loan-balances h6,
  .disbursement-info h6 {
    color: #319f43;
    font-size: 12px;
    font-weight: 400;
  }
  .loan-balances h1 {
    color: #005e78;
    font-size: 24px;
    font-weight: 900;
  }
  .loan-balances,
  .disbursement-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .loan-take-action,
  .disbursement-info-divs {
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
padding-bottom: 100px;
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
    border-top: 2px solid #005e78;
    border-radius: 40px;
    margin-top: 50px;
    background: #daf7ff;
    padding: 30px;
    display: flex;
    flex-direction: column;

    gap: 20px;
  }
  .div-date-payment h2 {
    color: #e33629;
    font-size: 16px;
    font-weight: 900;
    text-align: center;
  }
  .check-loan-card {
    box-shadow: 2px 2px 4px 0px #005e7833;
    animation-duration: 0ms;
    background: #005e78;
    width: 112px;
    height: 38px;
    border-style: none;
    color: #d9d9d9;
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
    background: #daf7ff;
    border: 1px solid #005e78;
    border-radius: 20px;
    width: 140px;
  }
  .the-current-loan p {
    color: #319f43;
    font-size: 9px;
    font-weight: 400;
  }
  .the-current-loan h4 {
    color: #005e78;

    font-size: 16px;
    font-weight: 900;
  }
  .first-custom-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .request-new-loan {
    border-radius: 10px;
    text-decoration: none;
    background: #005e78;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 800;
    padding: 10px;
  }
  .the-active-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("csoUser"));

  const loans = useSelector((state) => state.loan.loans);
  const { fullyPaidLoans, loading, error } = useSelector(
    (state) => state.loan || {}
  );

    const { remittancestatus, hoursLeft, minutesLeft } = useSelector((state) => state.cso);
 const loan = loans?.find(loan => loan._id === id);
  const navigate = useNavigate();
  console.log(loan);
  console.log(remittancestatus, hoursLeft, minutesLeft);
  
const [remittanceAvailableShow, setRemittanceAvailableShow] = React.useState(false);
  const bvn = loan?.customerDetails?.bvn;
  const csoId = user?.workId;

const [disburesementDrop, setDisbursementDrop] =useState(false)


const handleDisbursementDrop = () => {
setDisbursementDrop(true)
}

  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

useEffect(() => {
    dispatch(fetchLoanById(id));
  }, [dispatch, id]);

   useEffect(() => {
    if (csoId) {
      dispatch(fetchRemittanceStatus(csoId));
    }
  }, [csoId, dispatch]);

console.log(loans);

  console.log(bvn);
  console.log(loan);

  console.log(fullyPaidLoans);

  useEffect(() => {
    if (bvn) {
      dispatch(fetchFullyPaidLoans(bvn));
    }
  }, [bvn, id, dispatch]);

  const handleGoToCalendar = () => {
    navigate(`/cso/calendar/${id}`);
  };


  const handleGoToPreviousLoan = () => {
    navigate(`/cso/previousLoans/${id}`)

    dispatch(fetchFullyPaidLoansStart())
  }
  // Get today's amountPaid
  const today = new Date();
  let adjustedDate = new Date(today); // Copy today's date
  
  // If today is Saturday (6), move back to Friday (5)
  // If today is Sunday (0), move back to Friday (5)
  if (today.getDay() === 6) {
    adjustedDate.setDate(today.getDate() - 1);
  } else if (today.getDay() === 0) {
    adjustedDate.setDate(today.getDate() - 2);
  }
  
  const formattedDate = adjustedDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  
  const todayRepayment = loan?.repaymentSchedule?.find(
    (schedule) => schedule.date.split("T")[0] === formattedDate
  );
  
  console.log("Adjusted Date:", formattedDate);
  console.log("Today's Repayment:", todayRepayment || "No repayment found");
  

  function countWeekdaysSinceFirstRepayment(schedule) {
    if (!schedule?.length) return 0;
  
    const firstDate = new Date(schedule[0].date);
    const today = new Date();
  
    let count = 0;
    const current = new Date(firstDate);
    current.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
  
    while (current <= today) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
  
    // If first status is pending, subtract 1 day
    if (schedule[0].status === 'pending' || schedule[0].status === 'holiday') {
      count = Math.max(0, count - 1);
    }
  
    return count;
  }
  
  const repaymentSchedule = loan?.repaymentSchedule

  console.log("Repayment Schedule:", repaymentSchedule);
  
  // const today = new Date();
  
  const daysToShow = countWeekdaysSinceFirstRepayment(repaymentSchedule);
  console.log("Days to show:", daysToShow);

  console.log(`Display ${daysToShow} days of repayment.`);
      
  const dailyAmount = loan?.loanDetails?.amountToBePaid / 22;

  const totalDue = dailyAmount * daysToShow;
  
  let AmountDueOne = totalDue - (loan?.loanDetails?.amountPaidSoFar || 0);
  
if (AmountDueOne === NaN ) {
  AmountDueOne = totalDue
}


  const expectedPay = loan?.loanDetails?.amountToBePaid
 const totalPaidSoFar = repaymentSchedule?.reduce((sum, item) => sum + item.amountPaid, 0);
console.log("Total amount paid:", totalPaidSoFar);

const AmountDueTwo = expectedPay - loan?.loanDetails?.amountPaidSoFar


const repaymentScheduleLengthTillToday = repaymentSchedule?.filter(item => {
  const repaymentDate = new Date(item.date);
  return repaymentDate <= today;
}).length;

console.log(repaymentScheduleLengthTillToday);

let AmountDue = 0
if (repaymentScheduleLengthTillToday > 22) {
   AmountDue = AmountDueTwo
} else {
   AmountDue = AmountDueOne
}

  // Ensure AmountDue is not negative
  // AmountDue = AmountDue < 0 ? 0 : AmountDue;
  

  const LoanBalance =
    loan?.loanDetails?.amountToBePaid - loan?.loanDetails?.amountPaidSoFar;

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
    ? formatDateWithOrdinal(loan?.disbursedAt)
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

    const getFormattedDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
    
      const getOrdinal = (n) => {
        if (n > 3 && n < 21) return 'th';
        switch (n % 10) {
          case 1: return 'st';
          case 2: return 'nd';
          case 3: return 'rd';
          default: return 'th';
        }
      };
    
      return `${day}${getOrdinal(day)} ${month} ${year}`;
    };

    const lastDate = loan?.repaymentSchedule?.[loan?.repaymentSchedule?.length - 1]?.date;

    const countPendingTillToday = loan?.repaymentSchedule?.filter(entry => {
      const entryDate = new Date(entry.date);
      const today = new Date();
    
      // Remove time part so we compare only the date
      entryDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
    
      return entry.status === "pending" && entryDate <= today;
    }).length;
    
    console.log("Pending repayments up to today:", countPendingTillToday);
    
    const handlePayNowMovement = () => {
      if (remittancestatus === false) {
        navigate(`/cso/loans/${id}/payment`)
      } else {
          setRemittanceAvailableShow(true);
      }
    }
    
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
  src={
    loan?.pictures?.customer?.startsWith("http")
      ? loan?.pictures?.customer // Cloudinary URL
      : loan?.pictures?.customer
      ? `https://api.jksolutn.com${loan?.pictures?.customer}` // Local image
      : "fallback.jpg" // Optional fallback image
  }
  alt="customer"
  style={{ width: "70px", height: "100px", objectFit: "contain" }}
/>
                  
                </div>
                <div className="customer-details">
                  <h4>
                    {`${loan?.customerDetails?.firstName} ${loan?.customerDetails?.lastName}`}
                  </h4>
                  <p>{loan?.customerDetails?.address}</p>
                  <a href={`tel:${loan?.customerDetails?.phoneOne}`}>
                    {loan?.customerDetails?.phoneOne}
                  </a>{" "}
                  <p>{loan?.businessDetails?.businessName}</p>
                </div>
              </div>
              <div className="the-active-box">
                <h3>Active Loan</h3>
                <div className="the-current-loan">
                  {loan?.status === "active loan" ? (
                    <>
                      <p>Ammout Disbursed</p>
                      <h4>{loan?.loanDetails?.amountApproved}</h4>
                      <p>Total Paid</p>
                      <h4>{loan?.loanDetails?.amountPaidSoFar}</h4>
                      <p>No of Defaults</p>
                      <h4>{countPendingTillToday - 1}</h4>
                    </>
                  ) : (
                    <h4>No Active Loan</h4>
                  )}
                </div>
                {loan?.status === "fully paid" ? (
                  <>
                    <Link
                      to={`/cso/minimalApplication/${loan?._id}`}
                      className="request-new-loan"
                    >
                      Request New Loan
                    </Link>
                  </>
                ) : (
                  ""
                )}
                 <button
                  className="check-loan-card"
                  onClick={handleDisbursementDrop}
                  style={{
                    background:"#009a49"
                  }}
                >
                  Disbursement Receipt
                </button>
              </div>
            </div>
          </div>

          {loan?.status === "fully paid" ? (
            <div className="">
              <div className="new-table-scroll">
                <div className="table-div-con">
                <table className="" border="1" cellPadding="10">
  <thead>
    <tr>
      <th>S/N</th> 
      <th>Start Date</th>
      <th>End Date</th>
      <th>Loan Amount</th>
      <th>Status</th>
      <th>Defaults</th>
      <th>Performance</th>
    </tr>
  </thead>
  <tbody>
    {fullyPaidLoans && fullyPaidLoans.length > 0 ? (
      <>
        {fullyPaidLoans.map((customer, index) => {
          const repaymentSchedule = customer?.repaymentSchedule || [];
          const sortedSchedule = [...repaymentSchedule].sort((a, b) => new Date(a.date) - new Date(b.date));
          const startDate = sortedSchedule.length > 0 ? new Date(sortedSchedule[0].date).toLocaleDateString("en-GB") : "N/A";
 const lastPaymentDateRaw = customer?.loanDetails?.dailyPayment
    ?.slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .at(-1)?.date;
    
       const lastDate = lastPaymentDateRaw
    ? new Date(lastPaymentDateRaw).toLocaleDateString("en-GB")
    : "N/A";
    
    const pendingCount = repaymentSchedule.filter(p => p.status === "pending").length;
          const days = 22
          const performance = ((days - (pendingCount - 1))/days) * 100
          const repaymentPercentage = performance < 0 ? 100 : Math.round(performance);

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{startDate}</td>
              <td>{lastDate}</td>
              <td>{customer?.loanDetails?.amountApproved}</td>
              <td>{customer.status}</td>
              <td>{pendingCount - 1}</td>
              <td>{repaymentPercentage}%</td>
            </tr>
          );
        })}
      </>
    ) : (
      ""
    )}
  </tbody>
</table>


                </div>
              </div>
            </div>
          ) : (
            <div className="div-date-payment">
              <h2>{currentDate}</h2>
              <div className="all-payment-action-div">
                <div className="loan-take-action">
                  <div className="loan-balances">
                    <h6>Amount Due</h6>
                    <h1>{Math.round(AmountDue)}</h1>
                  </div>
                  <div className="loan-balances">
                    <h6>Loan Balance</h6>
                    <h1>{LoanBalance}</h1>
                  </div>
                  <button
                    onClick={handlePayNowMovement}
                    className="pay-now-button"
                  >
                    PAY NOW
                  </button>
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
                    <h3>{getFormattedDate(lastDate)}</h3>
                  </div>
                </div>
              </div>
              <div className="previous-loans-div">
                <button
                  className="check-loan-card"
                  onClick={handleGoToCalendar}
                >
                  Check Loan Card
                </button>
                <button
                  onClick={handleGoToPreviousLoan}
                  className="previous-loans"
                >
                  Previous Loans
                </button>

                 
              </div>
             
            </div>
          )}
        </div>
      </div>

      {remittanceAvailableShow ? (
        <>
         <div className="dropdown-container">
      <div className="all-dropdown-div">

       
        <div className="dropdown-content">
          <p >Sorry, you cannot post a new payment after submitting remittance. <br /> Please wait till the next {hoursLeft}hr {minutesLeft} minutes. <br /> Thanks.</p>
          <button className="submit-btn-2" onClick={() => setRemittanceAvailableShow(false)}>
            Close
            </button>
        </div>
        </div>
        </div>
        
        </>
      ): ""}


         {disburesementDrop && loan?.loanDetails?.disbursementPicture
 ? (
        <>
         <div className="dropdown-container">
      <div className="all-dropdown-div">

       
        <div className="dropdown-content">
          <img style={{
            width: "300px",
            height: "400px",
            margin: "auto"
          }} src={`https://api.jksolutn.com${loan?.loanDetails?.disbursementPicture}`} alt="" />
          <button className="submit-btn-2" onClick={() => setDisbursementDrop(false)}>
            Close
            </button>
        </div>
        </div>
        </div>
        
        </>
      ): ""}
    </CustomerPageDetailRap>
  );
};

export default CustomerDetailsPage;
