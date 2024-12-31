import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { fetchLoanById, makePayment } from '../redux/slices/LoanSlice';

const PaymentPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loan = useSelector((state) => state.loan.selectedLoan);
  const [amount, setAmount] = useState(null);


  useEffect(() => {
    dispatch(fetchLoanById(id)); // Fetch loan data when the component loads
  }, [dispatch, id]);

  const handlePayment = () => {
    dispatch(makePayment({ id, amount }));
    setAmount(0);
  };
  console.log(loan);
  

  return (
    <div>
      <h1>Payment Page</h1>
      {loan && (
        <>
          <p>Amount Remaining: {loan?.loanDetails?.amountToBePaid}</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button onClick={handlePayment}>Make Payment</button>
        </>
      )}
    </div>
  );
};

export default PaymentPage;
