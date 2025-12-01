import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { clearPaymentMessages, fetchLoanById, makePaymenting } from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";
import { submitDailyRemittanceReport } from "../redux/slices/csoSlice";

const PaymentRap = styled.div`
  height: 80vh !important;
  padding-top: 30px;
  background: #ffffff;
  .select-payment {
    background: #d9d9d9 !important;
    width: 333px;
    height: 44px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 15px;
  }
  .select-payment p {
    color: #005e78;
    font-size: 16px;
    font-weight: 700;
  }
  .payment-amount {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .payment-amount h6 {
    background: #d9d9d9;
    width: 333px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 39px;
    color: #005e78;
    font-size: 16px;
    font-weight: 700;
    border-radius: 15px;
  }
  input {
    background: #eaeaea;
    width: 333px;
    border-style: none;
    border-radius: 15px;
    padding: 20px;
    height: 45px;

    color: #005e78;
    font-size: 16px;
    font-weight: 700;
  }
  label {
    width: 333px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #005e78;
    font-size: 16px;
  }
  .inner-payment-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 70%;
  }
  .alll-pay h1 {
    color: #005e78;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .alll-pay {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90vh;
  }
  .make-pay-btn {
    background: #005e78;
    width: 200px;
    height: 55px;
    border-style: none;
    border-radius: 10px;
    cursor: pointer;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }
  .pay-btn {
    display: flex;
    gap: 20px;
  }
  .pay-butn,
  .exist-btn {
    background: #005e78;
    width: 150px;
    height: 55px;
    border-style: none;
    border-radius: 10px;
    cursor: pointer;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }
  .pop-btn {
    display: flex;
    gap: 15px;
  }
  .exist-btn {
    background: red;
    color: black;
  }
  .pay-dropdown p {
    color: #005e78;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
  }
  .pay-dropdown {
    width: 350px;
    padding: 30px;
    background: white;
    display: flex;
    flex-direction: column;
    gap: 40px;
    border-radius: 15px;
    align-items: center;
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
`;

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loan = useSelector((state) => state.loan.selectedLoan);
  const {
    paymentloading,
    paymentError,
    paymentSuccess,
    paymentRemainingBalance,
    wasFinalPayment,
  } = useSelector((state) => state.loan);
  

const workId = loan?.csoId

console.log(workId);



  const [amount, setAmount] = useState(null);
  const [isManual, setIsManual] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [pay, setPay] = useState(false);

  // Get today's amountPaid
  const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const todayRepayment = loan?.repaymentSchedule?.find(
    (schedule) => schedule.date.split("T")[0] === today
  );

  // const today = new Date();

  const isValid = typeof amount === "number" && !Number.isNaN(amount) && amount > 0;

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
  
if (Number.isNaN(AmountDueOne)) {
  AmountDueOne = totalDue;
}


  const expectedPay = loan?.loanDetails?.amountToBePaid
 const totalPaidSoFar = repaymentSchedule?.reduce((sum, item) => sum + item.amountPaid, 0);
console.log("Total amount paid:", totalPaidSoFar);

const AmountDueTwo = expectedPay - loan?.loanDetails?.amountPaidSoFar
 const newtoday = new Date();
const repaymentScheduleLengthTillToday = repaymentSchedule?.filter(item => {
  const repaymentDate = new Date(item.date);
  return repaymentDate <= newtoday;
}).length;

console.log(repaymentScheduleLengthTillToday);

let AmountDue = 0
if (repaymentScheduleLengthTillToday > 22) {
   AmountDue = AmountDueTwo
} else {
   AmountDue = AmountDueOne
}


  // Predefined value for the first button
  const predefinedValue = AmountDue;
  console.log(AmountDue);
  
  const handleVisisble = () => {
    setVisible(!visible);
  };

  // Button Handlers
  const setPredefined = () => {
    setIsManual(false); // Disable manual mode
    setAmount(predefinedValue);
    setVisible(!visible);
  };

  const enableManualInput = () => {
    setIsManual(true); // Enable manual mode
    setAmount(NaN);
    setVisible(!visible);
  };

  // Handle manual input changes
  const handleInputChange = (e) => {
    if (isManual) {
      setAmount(Number(e.target.value));
    }
  };

  useEffect(() => {
    dispatch(fetchLoanById(id)); // Fetch loan data when the component loads
  }, [dispatch, id]);

  const handlePayment = async () => {
    if (!isValid || paymentloading) {
      return;
    }

    try {
      await dispatch(makePaymenting({ id, amount: Number(amount) })).unwrap();
      setAmount(null);
      setPay(true);
      setConfirm(false);
      setVisible(false);
    } catch (error) {
      console.error("Payment failed", error);
    }
  };

  const handleMoveBack = () => {
    navigate(`/cso/customer-details/${id}`);
  };
  const handleConfirm = () => {
    setConfirm(!confirm);
  };

  const handleCancel = () => {
    dispatch(clearPaymentMessages());
    setConfirm(false);
    setVisible(false);
  };

    const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  return (
    <PaymentRap>
      <Icon
        onClick={handleMoveBack}
        icon="formkit:arrowleft"
        width="50"
        height="50"
        style={{ color: "#005E78", cursor: "pointer", marginLeft: "15px" }}
      />
      <div className="alll-pay">
        <h1>Make Payment</h1>

        {loan && (
          <div className="inner-payment-div">
            <div className="all-select-pay">
              <div onClick={handleVisisble} className="select-payment">
                <Icon
                  icon="iconamoon:arrow-down-2-light"
                  width="24"
                  height="24"
                  style={{ color: "#005e78", cursor: "pointer" }}
                />
                <p>Select Payment</p>
                <Icon
                  icon="iconamoon:arrow-down-2-light"
                  width="24"
                  height="24"
                  style={{ color: "#005e78", cursor: "pointer" }}
                />
              </div>
              {visible ? (
                <div className="payment-amount">
                  <h6 onClick={setPredefined}>Amount Due</h6>
                  <h6 onClick={enableManualInput}>Other Payment</h6>
                </div>
              ) : (
                ""
              )}
            </div>
            <input
              type="number"
              value={amount}
              onChange={handleInputChange}
              disabled={!isManual}
              placeholder="Enter Amount"
              required
            />
            <button
              className="make-pay-btn"
              onClick={handleConfirm}
              disabled={!isValid}
              style={{
                backgroundColor: isValid ? "#0c1d55" : "#727789",
                cursor: !isValid ? "not-allowed" : "pointer",
              }}
            >
              Make Payment
            </button>
            {confirm ? (
              <div className="dropdown-container">
                <div className="pay-dropdown">
                  <p>Do you want to make a payment of {formatNumberWithCommas(amount)}</p>
                  <div className="pay-btn">

                         <button type="submit"
                         className="pay-butn"
                                onClick={handlePayment}
                                disabled={ paymentloading}
                                style={{
                                  cursor: paymentloading ? "not-allowed" : "pointer",
                                }}
                                >
                                  {paymentloading ? 
                                    <PulseLoader color="white" size={10} />
                                      : "Make Payment"
                                }
                                  
                                  </button>

                    <button onClick={() => setConfirm(false)} className="exist-btn">Cancel</button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
             {paymentloading ? (
              <div className="dropdown-container">
              <PulseLoader color="white" size={10} />

              </div>
            ) : (
              ""
            )}
            {paymentError ? (
              <div className="dropdown-container">
                <div className="pay-dropdown">
                  <p style={{ color: "red", textAlign: "center" }}>{paymentError}</p>
                  <button onClick={handleCancel} className="exist-btn">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
            {paymentSuccess ? (
              <div className="dropdown-container">
                <div className="pay-dropdown">
                  <div className="pay-green-circle">
                    <Icon
                      icon="twemoji:check-mark"
                      width="40"
                      height="40"
                      style={{ color: "black" }}
                    />
                  </div>
                  <p>{paymentSuccess}</p>
                  {typeof paymentRemainingBalance === "number" && !wasFinalPayment && (
                    <p>
                      Remaining balance: {formatNumberWithCommas(paymentRemainingBalance)}
                    </p>
                  )}
                  {wasFinalPayment && (
                    <p>Loan fully settled. Congratulations!</p>
                  )}
                  <button onClick={handleCancel} className="exist-btn">
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </PaymentRap>
  );
};

export default PaymentPage;
