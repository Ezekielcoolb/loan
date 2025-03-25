import React, { useEffect } from "react";
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
    min-width: 100%;
    min-height: 400px;
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
    border-radius: 10px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
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
  const { user } = useSelector((state) => state.auth);

  const loans = useSelector((state) => state.loan.loans);
  const { fullyPaidLoans, loading, error } = useSelector(
    (state) => state.loan || {}
  );
  const loan = loans.find((loan) => loan._id === id);
  const navigate = useNavigate();
  console.log(loan);

  const bvn = loan?.customerDetails?.bvn;
  const csoId = user?.workId;
  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

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
  const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const todayRepayment = loan?.repaymentSchedule.find(
    (schedule) => schedule.date.split("T")[0] === today
  );

  const dailyAmount = loan?.loanDetails?.amountToBePaid / 30;

  const AmountDue = dailyAmount - todayRepayment?.amountPaid;

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
                        <th>S/N</th> {/* Serial number column header */}
                        <th>Date</th>
                        {/* <th>Amount Requested</th> */}
                        <th>Principal +  Interest</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fullyPaidLoans && fullyPaidLoans.length > 0 ? (
                        <>
                      {fullyPaidLoans?.map((customer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>{" "}
                          {/* Serial number, starting from 1 */}
                          <td>
                            {customer?.disbursedAt
                              ? new Date(
                                  customer.disbursedAt
                                ).toLocaleDateString("en-GB")
                              : ""}
                          </td>
                          {/* <td>{customer?.loanDetails?.amountRequested}</td> */}
                          <td>{customer?.loanDetails?.amountPaidSoFar}</td>
                          <td>{customer.status}</td> {/* Display status */}
                        </tr>
                      ))}
                      </>
                      ): ""}
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
                  <Link
                    to={`/cso/loans/${id}/payment`}
                    className="pay-now-button"
                  >
                    PAY NOW
                  </Link>
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
    </CustomerPageDetailRap>
  );
};

export default CustomerDetailsPage;
