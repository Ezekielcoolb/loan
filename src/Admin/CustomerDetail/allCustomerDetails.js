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

const CustomerDetailsInfo = () => {
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

 
  const handleMoveBack = () => {
    navigate(`/admin/customerdetails`);
  };

  return (
    <CustomerDetailRap>
      <div className="client-1">
       
        <div className="client-link-container">
        <Icon
                      onClick={handleMoveBack}
                      icon="formkit:arrowleft"
                      width="30"
                      height="30"
                      style={{ color: "black", cursor: "pointer" }}
                    />
          <Link
            className={`client-link ${
              activeLink === "transaction" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("transaction")}
          >
            Customer Transactions
          </Link>
          <Link
            to={`/admin/customer/calender/${details[0]?.customerDetails?.bvn}`}
            className={`client-link ${
              activeLink === "loanCard" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("loanCard")}
          >
            Customer Loan Card
          </Link>
          <Link
            className={`client-link ${
              activeLink === "details" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("details")}
          >
            Customer Details
          </Link>
        </div>
      </div>
      <div>
        {activeLink === "transaction" && (
          <div className="custom-1">
            <h2>Customer Loan Details</h2>
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
                            <td>{new Date(endDate).toLocaleDateString()}</td>
                            <td>{loan.status}</td>
                            <td>{loanPerformance}</td>
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

        {activeLink === "details" && (
          <div className="details">
            <h2>Customer Details</h2>
            <div className="left-loan-detail">
              <div className="inner-details">
                <h4>Personal Details</h4>
                <p>
                  <span>Customer Name:</span>{" "}
                  {`${details[0]?.customerDetails?.firstName} ${details[0]?.customerDetails?.lastName}`}
                </p>
                <p>
                  <span>Email:</span> {details[0]?.customerDetails?.email}
                </p>
                <p>
                  <span>Phone:</span> {details[0]?.customerDetails?.phoneOne}
                </p>
                <p>
                  <span>Address:</span> {details[0]?.customerDetails?.address}
                </p>
                <p>
                  <span>BVN:</span> {details[0]?.customerDetails?.bvn}
                </p>
              </div>
              <div className="inner-details">
                <h4>Business Details</h4>
                <p>
                  <span>Business Name:</span>{" "}
                  {details[0]?.businessDetails?.businessName}
                </p>
                <p>
                  <span>Nature of Business:</span>{" "}
                  {details[0]?.businessDetails?.natureOfBusiness}
                </p>
                <p>
                  <span>Business Estimated Value:</span>{" "}
                  {details[0]?.businessDetails?.estimatedValue}
                </p>
                <p>
                  <span>Business Operational Status:</span>{" "}
                  {details[0]?.businessDetails?.operationalStatus}
                </p>
              </div>
              <div className="inner-details">
                <h4>Loan Details</h4>
                <p className="change-size">
                  <span>Loan Requested:</span>
                  {details[0]?.loanDetails?.amountRequested}
                </p>
                <p>
                  <span>Loan Type:</span> {details[0]?.loanDetails?.loanType}
                </p>
              </div>
              <div className="inner-details">
                <h4>Bank Details</h4>
                <p>
                  <span>Account Name:</span> {details[0]?.bankDetails?.accountName}
                </p>
                <p>
                  <span>Account Number:</span> {details[0]?.bankDetails?.accountNo}
                </p>
                <p>
                  <span>Bank Name:</span> {details[0]?.bankDetails?.bankName}
                </p>
              </div>
              <div className="inner-details">
                <h4>Guarantor's Details</h4>
                <p>
                  <span>Guarantor Name:</span> {details[0]?.guarantorDetails?.name}
                </p>
                <p>
                  <span>Guarantor Address:</span>{" "}
                  {details[0]?.guarantorDetails?.address}
                </p>
                <p>
                  <span>Guarantor Number:</span> {details[0]?.guarantorDetails?.phone}
                </p>
                <p>
                  <span>Guarantor Email:</span> {details[0]?.guarantorDetails?.email}
                </p>
                <p>
                  <span>Relationship with Custoomer:</span>{" "}
                  {details[0]?.guarantorDetails?.relationship}
                </p>
                <p>
                  <span>Years Known:</span> {details[0]?.guarantorDetails?.yearsKnown}
                </p>
              </div>
              <div className="inner-details">
                <h4>Group Details</h4>
                <p>
                  <span>Group Name:</span> {details[0]?.groupDetails?.groupName}
                </p>
                <p>
                  <span>Group Leader:</span> {details[0]?.groupDetails?.leaderName}
                </p>
                <p>
                  <span>Leader's Number:</span> {details[0]?.groupDetails?.mobileNo}
                </p>
              </div>
              <div className="inner-details">
                <h4>Images</h4>
                <div>
                  <h5>Business Image</h5>
                  <div>
                    <img src={details[0]?.pictures?.business} alt="" />
                  </div>
                </div>
                <div>
                  <h5>Other Images</h5>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomerDetailRap>
  );
};

export default CustomerDetailsInfo;
