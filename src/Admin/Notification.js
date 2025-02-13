import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications, setPage } from "../redux/slices/notificationSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { formatDistanceToNow } from "date-fns";

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
  .page-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
  }
  .page-btn {
    width: 70px;
    height: 30px;
    color: #005e78;
    border-radius: 10px;
    border: 1px solid #005e78;
  }
  .page-btn:disabled {
   cursor: no-drop;
  }
`;

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, status, error, page, limit } = useSelector(
    (state) => state.notifications
  );
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageApprove, setCurrentPageApprove] = useState(1);
  const [currentPagePay, setCurrentPagePay] = useState(1);
  const [currentPageDefault, setCurrentPageDefault] = useState(1);

  useEffect(() => {
    dispatch(fetchNotifications({ page, limit }));
  }, [dispatch, page, limit]);

  if (status === "loading") {
    return <p>Loading notifications...</p>;
  }

  if (status === "failed") {
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
              <div className="all-note">
                <div className="notice-circle">
                  {" "}
                  <Icon
                    icon="tdesign:notification"
                    width="20"
                    height="20"
                    style={{ color: "#030b26" }}
                  />
                </div>
                <li key={index}>
                  {item.message} -{" "}
                  <span style={{ color: "#030b26" }}>
                    {formatDistanceToNow(new Date(item.date), {
                      addSuffix: true,
                    })}
                  </span>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <></>
        )}
        {title === "Loan Submit" ? (
          <div className="page-div">
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {title === "Approval, Disbursement, and Rejection" ? (
          <div className="page-div">
            <button
              className="page-btn"
              onClick={() => handlePageChangeApprove(currentPageApprove - 1)}
              disabled={currentPageApprove === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPageApprove} of {approvetotalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => handlePageChangeApprove(currentPageApprove + 1)}
              disabled={currentPageApprove === approvetotalPages}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {title === "Payment, Full Payment, and Late Payment" ? (
          <div className="page-div">
            <button
              className="page-btn"
              onClick={() => handlePageChangePay(currentPagePay - 1)}
              disabled={currentPagePay === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPagePay} of {paymenttotalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => handlePageChangePay(currentPagePay + 1)}
              disabled={currentPagePay === paymenttotalPages}
            >
              Next
            </button>
          </div>
        ) : (
          ""
        )}
        {title === "Defaulting and Monthly Loan Submit" ? (
          <div className="page-div">
            <button
              className="page-btn"
              onClick={() => handlePageChangeDefault(currentPageDefault - 1)}
              disabled={currentPageDefault === 1}
            >
              Prev
            </button>
            <span>
              Page {currentPageDefault} of {defaultingtotalPages}
            </span>
            <button
              className="page-btn"
              onClick={() => handlePageChangeDefault(currentPageDefault + 1)}
              disabled={currentPageDefault === defaultingtotalPages}
            >
              Next
            </button>
          </div>
        ) : (
          ""
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

  const newLoanSubmit = loanSubmit.reverse();
  const newApprove = approvalDisbursementRejection.reverse();
  const newPayment = paymentFullLate.reverse();
  const newDefault = defaultingMonthlySubmit.reverse();

  const totalPages = Math.ceil(newLoanSubmit?.length / itemsPerPage);
  const approvetotalPages = Math.ceil(newApprove?.length / itemsPerPage);
  const paymenttotalPages = Math.ceil(newPayment?.length / itemsPerPage);
  const defaultingtotalPages = Math.ceil(newDefault?.length / itemsPerPage);

  // Get current items to display
  const currentLoans = newLoanSubmit?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const approveNotice = newApprove?.slice(
    (currentPageApprove - 1) * itemsPerPage,
    currentPageApprove * itemsPerPage
  );
  const payNotice = newPayment?.slice(
    (currentPagePay - 1) * itemsPerPage,
    currentPagePay * itemsPerPage
  );
  const defaultNotice = newDefault?.slice(
    (currentPageDefault - 1) * itemsPerPage,
    currentPageDefault * itemsPerPage
  );

  // Handle pagination click
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handlePageChangeApprove = (newPage) => {
    if (newPage >= 1 && newPage <= approvetotalPages) {
      setCurrentPageApprove(newPage);
    }
  };
  const handlePageChangePay = (newPage) => {
    if (newPage >= 1 && newPage <= paymenttotalPages) {
      setCurrentPagePay(newPage);
    }
  };
  const handlePageChangeDefault = (newPage) => {
    if (newPage >= 1 && newPage <= defaultingtotalPages) {
      setCurrentPageDefault(newPage);
    }
  };

  return (
    <div>
      {renderCategory(currentLoans, "Loan Submit")}
      {renderCategory(approveNotice, "Approval, Disbursement, and Rejection")}
      {renderCategory(payNotice, "Payment, Full Payment, and Late Payment")}
      {renderCategory(defaultNotice, "Defaulting and Monthly Loan Submit")}
    </div>
  );
};

export default Notifications;
