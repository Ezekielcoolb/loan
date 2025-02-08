import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, setPage } from '../redux/slices/notificationSlice';
import styled from 'styled-components';
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDistanceToNow } from 'date-fns';


const NotificationRap = styled.div`
h3 {
    color: #030b26;
  font-weight: 800;
  font-size: 12px;
  margin-top: 15px;
}
li {
    color: #727789;
  font-weight: 450;
  font-size: 10px;
  list-style-type: none;
  max-width: 250px;
}
.all-note {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;
}
.notice-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #030b260d;
    display: flex;
    justify-content: center;
    align-items: center;
}
`

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, status, error, page, limit } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications({ page, limit }));
  }, [dispatch, page, limit]);

  if (status === 'loading') {
    return <p>Loading notifications...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  const handleNextPage = () => {
    dispatch(setPage(page + 1));
  };

  const handlePrevPage = () => {
    if (page > 1) dispatch(setPage(page - 1));
  };

  // Category-specific render function
  const renderCategory = (category, title) => (
    <NotificationRap>
    <div>
      <h3>{title}</h3>
      {category.length > 0 ? (
        <ul>
          {category.map((item, index) => (
            <div className='all-note'>
                <div className='notice-circle'> <Icon
                          icon="tdesign:notification"
                          width="20"
                          height="20"
                          style={{ color: "#030b26" }}
                        /></div>
           <li key={index}>
  {item.message} - <span style={{ color: "#030b26" }}>
    {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
  </span>
</li>
            </div>
          ))}
        </ul>
      ) : (
        <>
        
        </>
      )}
    </div>
    </NotificationRap>
  );

  // Separate notifications by categories
  const loanSubmit = notifications.flatMap((n) => n.loanSubmit || []);
  const approvalDisbursementRejection = [
    ...notifications.flatMap((n) => n.approval || []),
    ...notifications.flatMap((n) => n.disbursement || []),
    ...notifications.flatMap((n) => n.rejection || []),
  ];
  const paymentFullLate = [
    ...notifications.flatMap((n) => n.payment || []),
    ...notifications.flatMap((n) => n.fullPayment || []),
    ...notifications.flatMap((n) => n.latePayment || []),
  ];
  const defaultingMonthlySubmit = [
    ...notifications.flatMap((n) => n.defaulting || []),
    ...notifications.flatMap((n) => n.monthlyLoanSubmit || []),
  ];

  return (
    <div>
     

      {renderCategory(loanSubmit, 'Loan Submit')}
      {renderCategory(approvalDisbursementRejection, 'Approval, Disbursement, and Rejection')}
      {renderCategory(paymentFullLate, 'Payment, Full Payment, and Late Payment')}
      {renderCategory(defaultingMonthlySubmit, 'Defaulting and Monthly Loan Submit')}

     
    </div>
  );
};

export default Notifications;
