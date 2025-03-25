import React, { useState } from "react";
import styled from "styled-components";
import DisbursementRepayment from "./TransactionDetails/DisbursementDetail";
import LoanSubmissions from "./TransactionDetails/LoanApplication";
import { Link } from "react-router-dom";
import AllCustomerTable from "./TransactionDetails/LoanApplication";
import RemittanceTable from "./TransactionDetails/AllRemittance";
import DailyDisbursementTable from "./TransactionDetails/DailyDisbursement";

const TransactionRap = styled.div`
  .client-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
  }
  .upperLink {
    display: flex;
    gap: 20px;
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
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }

  .client-link:hover {
    color: #555; /* Optional hover effect */
  }
  .client-link-container {
    display: flex;
    justify-content: flex-start;
  }
`;

const AllTransactions = () => {
  const [activeLink, setActiveLink] = useState("disbursement");
  const [activeLinkDaily, setActiveLinkDaily] = useState("disburse")
  
  
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };


  const handleActiveLinkDaily = (link) =>{
    setActiveLinkDaily(link)
  }
  return (
    <TransactionRap>
      <div className="client-1">
        <div className="client-link-container">
          <Link
            className={`client-link ${
              activeLink === "disbursement" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("disbursement")}
          >
            Disbursement & Repayment
          </Link>
          <Link
            className={`client-link ${
              activeLink === "application" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("application")}
          >
            Loan Applications
          </Link>
          <Link
            className={`client-link ${
              activeLink === "collection" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("collection")}
          >
            Collection $ Remmittance
          </Link>
          <Link
            className={`client-link ${
              activeLink === "daily" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("daily")}
          >
            Daily Transactions
          </Link>
        </div>
      </div>
      <div>{activeLink === "disbursement" && <DisbursementRepayment />}</div>
      <div>{activeLink === "application" && <AllCustomerTable />}</div>
      <div>{activeLink === "collection" && <RemittanceTable />}</div>
      <div>
        {activeLink=== "daily" && (
          <>
          <div className="find-lawyer-header">
            <div className="upperLink">
            <Link
            className={`client-link ${
              activeLinkDaily === "disburse" ? "active" : ""
            }`}
            onClick={() => handleActiveLinkDaily("disburse")}
          >
            Disbursement
          </Link>
          <Link
            className={`client-link ${
              activeLinkDaily === "collect" ? "active" : ""
            }`}
            onClick={() => handleActiveLinkDaily("collect")}
          >
            Collection
          </Link>
            </div>
            <div>
              {activeLinkDaily==="disburse" && <DailyDisbursementTable />}
            </div>
          </div>
          </>
        )}
      </div>
    </TransactionRap>
  );
};
export default AllTransactions;
