import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchLoanById } from '../redux/slices/LoanSlice';

const LoanCalendar = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loan = useSelector((state) => state?.loan?.selectedLoan);
  const [popupInfo, setPopupInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchLoanById(id));
  }, [dispatch, id]);

  if (!loan) return <p>Loading...</p>;

  const today = new Date();
  
  const dailyAmount = loan.loanDetails.amountToBePaid/30

  const handleButtonClick = (schedule, missedAmount = dailyAmount) => {
    setPopupInfo({
      date: new Date(schedule.date).toDateString(),
      amountPaid: schedule.amountPaid,
      missedAmount: missedAmount - schedule.amountPaid, 
     
      
    });
   console.log(missedAmount);
   
  };

  const closePopup = () => setPopupInfo(null);

  return (
    <div>
      <h1>Loan Details</h1>
      <h2>
        Customer Name: {loan?.customerDetails?.firstName} {loan?.customerDetails?.lastName}
      </h2>
      <h3>Loan Start Date: {new Date(loan.createdAt).toDateString()}</h3>
      <h3>Amount to be Paid: {loan?.loanDetails?.amountToBePaid}</h3>

      <h2>Repayment Calendar</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {loan?.repaymentSchedule?.map((schedule, index) => {
          const scheduleDate = new Date(schedule.date);
          const isStartDate = scheduleDate.toDateString() === new Date(loan.createdAt).toDateString();
          const isEndDate = index === loan.repaymentSchedule.length - 1;
          const isPaid = schedule.status === 'paid' || schedule.status === 'partial';
          const isMissed = scheduleDate < today && schedule.status === 'pending';
          const isFuture = scheduleDate > today;

          let backgroundColor = 'black'; // Default for future dates
          if (isStartDate) backgroundColor = 'blue';
          else if (isEndDate) backgroundColor = 'purple';
          else if (isMissed) backgroundColor = 'black'; // Set missed background to black

          const buttonColor = isPaid
            ? scheduleDate.toDateString() === today.toDateString()
              ? 'green'
              : isFuture
              ? 'orange'
              : 'green'
            : isMissed
            ? 'red' // Red button for missed payments
            : 'transparent';

          const missedAmount = isMissed ? (schedule.expectedAmount - schedule.amountPaid) : null; // Calculate missed amount

          return (
            <div
              key={index}
              style={{
                padding: '10px',
                color: 'white',
                textAlign: 'center',
                border: '1px solid black',
                backgroundColor,
                position: 'relative',
              }}
            >
              {scheduleDate.toDateString()}
              {isPaid && (
                <button
                  onClick={() => handleButtonClick(schedule)}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: buttonColor,
                    border: 'none',
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    cursor: 'pointer',
                  }}
                />
              )}
              {isMissed && (
                <button
                  onClick={() => handleButtonClick(schedule)} // Pass missed amount
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: buttonColor,
                    border: 'none',
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    cursor: 'pointer',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {popupInfo && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            borderRadius: '5px',
            zIndex: 1000,
          }}
        >
          <h3>Payment Details</h3>
          <p>Date: {popupInfo.date}</p>
          <p>Amount Paid: {popupInfo.amountPaid}</p>
          {popupInfo.missedAmount !== null && <p>Missed Amount: {popupInfo.missedAmount}</p>} {/* Show missed amount */}
          <button onClick={closePopup} style={{ marginTop: '10px', cursor: 'pointer' }}>
            Close
          </button>
        </div>
      )}
      {popupInfo && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={closePopup}
        />
      )}
    </div>
  );
};

export default LoanCalendar;
