import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CsoLoan from "./LoanPages/CsoLoan";
import CustomerLoan from "./LoanPages/CustomerLoan";

const LoanRap = styled.div`
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

const Loan = () => {
 const [activeLink, setActiveLink] = useState("csoloan");
    const handleLinkClick = (link) => {
        setActiveLink(link);
      };
  return (
    <LoanRap>

        <div>
        <div className="client-1">
            <div className="client-link-container">
            <Link
                className={`client-link ${activeLink === "csoloan" ? "active" : ""}`}
                onClick={() => handleLinkClick("csoloan")}
            >
                Cso Loan Overview
            </Link>
            <Link
                className={`client-link ${activeLink === "customerLoan" ? "active" : ""}`}
                onClick={() => handleLinkClick("customerLoan")}
            >
                Customer Loan Overview
            </Link>
            </div>
        </div>
        <div>
            {activeLink === "csoloan" && <CsoLoan />}
            {activeLink=== "customerLoan" && <CustomerLoan />}
        </div>
        </div>
    </LoanRap>
  );
};
export default Loan;
