import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { fetchLoanById, makePayment } from "../redux/slices/LoanSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import styled from "styled-components";
import axios from "axios";

const PaymentRap = styled.div`
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
    color: #005E78;
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
    background: #005E78;
    width: 200px;
    height: 55px;
    border-style: none;
    border-radius: 10px;
    cursor: pointer;
    color: #ffffff;
    font-weight: 600;
    font-size: 16px;
  }

`;

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loan = useSelector((state) => state.loan.selectedLoan);
  const [amount, setAmount] = useState(null);
  const [isManual, setIsManual] = useState(false);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");

  // Get today's amountPaid
  const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
  const todayRepayment = loan?.repaymentSchedule?.find(
    (schedule) => schedule.date.split("T")[0] === today
  );

  const isValid = amount !== "" && image !== "";

  const dailyAmount = loan?.loanDetails?.amountToBePaid / 30;

  const AmountDue = dailyAmount - todayRepayment?.amountPaid;

  // Predefined value for the first button
  const predefinedValue = AmountDue;
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
    setAmount(null); // Clear input
    setVisible(!visible);
  };

  // Handle manual input changes
  const handleInputChange = (e) => {
    if (isManual) {
      setAmount(Number(e.target.value));
    }
  };

  const handleFirstImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("upload_preset", "ml_default");
      const imageUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        formData
      );
      console.log(imageUrl);
      setImage(imageUrl.data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(fetchLoanById(id)); // Fetch loan data when the component loads
  }, [dispatch, id]);

  const handlePayment = () => {
    if (isValid) {
      dispatch(makePayment({ id, amount, imageLink: image }));
      setAmount(null);
      setImage("");
    }
  };

  const handleMoveBack = () => {
    navigate(`/cso/customer-details/${id}`);
  };

  return (
    <PaymentRap>
       <Icon
                      onClick={handleMoveBack}
                      icon="formkit:arrowleft"
                      width="50"
                      height="50"
                      style={{ color: "#005E78", cursor: "pointer" , marginLeft: "15px"}}
                    />
      <div className="alll-pay">
        
        
        <h1>Make Payment</h1>
       
        {loan && (
          < div className="inner-payment-div">
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
            <label>
              {" "}
              Upload Proof of Payment:
              <input
                type="file"
                onChange={(e) => handleFirstImage(e.target.files)}
                required
              />
            </label>
            <button className="make-pay-btn" onClick={handlePayment} disabled={!isValid}>
              Make Payment
            </button>
          </div>
        )}
      </div>
    </PaymentRap>
  );
};

export default PaymentPage;
