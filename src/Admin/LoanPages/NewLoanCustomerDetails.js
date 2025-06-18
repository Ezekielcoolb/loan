import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchCustomerDetails } from "../../redux/slices/LoanSlice";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";

const CustomerDetailRap = styled.div`
  .client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .client-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .client-link:hover {
    color: #555; /* Optional hover effect */
  }
  .client-link-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
  .inner-details {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border-bottom: 1px solid #d0d5dd;
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
  .details {
    border-radius: 20px;
    background: #ffffff;
    margin: 30px;
    padding: 30px;
  }
  .custom-1 h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 20px;
  }
  .custom-1 {
    background: #ffffff;
    border-radius: 15px;
    padding-top: 20px;
    margin: 20px;
  }
`;

const NewCustomerDetailsInfo = () => {
  const [activeLink, setActiveLink] = useState("transaction");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { details } = useSelector((state) => state.loan);
  const { bvn } = useParams();

  useEffect(() => {
    dispatch(fetchCustomerDetails(bvn));
  }, [dispatch, bvn]);
  console.log(details);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  console.log(details[0]?.customerDetails?.bvn);

  return (
    <CustomerDetailRap>
      <div className="client-1">
        <div className="client-link-container">
          <Link
            className={`client-link ${
              activeLink === "transaction" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("transaction")}
          >
            Previous Loans
          </Link>
          {/* <Link
            to={`/admin/customer/calender/${details[0]?.customerDetails?.bvn}`}
            className={`client-link ${
              activeLink === "loanCard" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("loanCard")}
          >
            Customer Loan Card
          </Link> */}
          {/* <Link
            className={`client-link ${
              activeLink === "details" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("details")}
          >
            Customer Details
          </Link> */}
        </div>
      </div>
      <div>
        {activeLink === "transaction" && (
          <div className="custom-1">
            <h2>
              {details[0]?.customerDetails?.lastName}{" "}
              {details[0]?.customerDetails?.firstName}'s Loan Details
            </h2>
            <div className="table-container">
              <div className="new-table-scroll">
                <div className="table-div-con">
                  <table className="custom-table" border="1">
                    <thead>
                      <tr>
                        <th>Amount Requested</th>
                        <th>Amount Disbursed</th>
                        <th>Amount To Be Paid</th>
                        <th>Amount Paid So Far</th>
                        <th>Loan Balance</th>
                        <th>Requested Date</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Loan Status</th>
                        <th>Loan Performance</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.map((loan, index) => {
                        const loanBalance =
                          loan.loanDetails.amountPaidSoFar === ""
                            ? loan.loanDetails.amountToBePaid
                            : loan.loanDetails.amountToBePaid -
                              loan.loanDetails.amountPaidSoFar;
                        const endDate =
                          loan.repaymentSchedule[
                            loan.repaymentSchedule.length - 1
                          ]?.date;
                        const loanPerformance =
                          new Date() > new Date(endDate)
                            ? "Defaulting"
                            : "Not Defaulting Yet";

                        const lastPaymentDateRaw =
                          loan?.loanDetails?.dailyPayment
                            ?.slice()
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .at(-1)?.date;
                        const lastDate = lastPaymentDateRaw
                          ? new Date(lastPaymentDateRaw).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A";
                        return (
                          <tr key={index}>
                            <td>{loan.loanDetails.amountRequested}</td>
                            <td>{loan.loanDetails.amountDisbursed}</td>
                            <td>{loan.loanDetails.amountToBePaid}</td>
                            <td>{loan.loanDetails.amountPaidSoFar}</td>
                            <td>{loanBalance}</td>
                            <td>
                              {new Date(loan.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              {new Date(loan.disbursedAt).toLocaleDateString()}
                            </td>
                            <td>
                              {loan?.status === "fully paid"
                                ? lastDate
                                : new Date(endDate).toLocaleDateString()}
                            </td>

                            <td>{loan.status}</td>
                            <td>{loanPerformance}</td>
                            <td>
                              {" "}
                              {loan.status === "fully paid" ||
                              loan.status === "active loan" ? (
                                <Link
                                  to={`/admin/new-loan-customer/calender/${loan?._id}`}
                                >
                                  View Loan Card
                                </Link>
                              ) : (
                                <p>No Loan Card</p>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </CustomerDetailRap>
  );
};

export default NewCustomerDetailsInfo;
