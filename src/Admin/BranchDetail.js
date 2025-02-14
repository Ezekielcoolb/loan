import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BranchTransaction from "./BranchDetails/Transaction";
import BranchCSO from "./BranchDetails/csoBranch";
import BranchCustomers from "./BranchDetails/BranchCustomer";
import { Icon } from "@iconify/react/dist/iconify.js";

const BranchDetailRap = styled.div`
  width: 100%;
  .cso-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    padding-right: 15px;
  }
  .cso-link-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .cso-link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .cso-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
`;

const BranchDetails = () => {
  const [activeLink, setActiveLink] = useState("transaction");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <BranchDetailRap>
      <div className="cso-1">
        <div className="cso-link-container">
          <Link style={{}} className="cso-link" to="/admin/branches">
            <Icon
              icon="formkit:arrowleft"
              width="90"
              height="16"
              style={{ color: "black", cursor: "pointer" }}
            />
          </Link>
          <Link
            className={`cso-link ${
              activeLink === "transaction" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("transaction")}
          >
            Annual Transaction
          </Link>
          <Link
            className={`cso-link ${activeLink === "csos" ? "active" : ""}`}
            onClick={() => handleLinkClick("csos")}
          >
            Cso
          </Link>
          <Link
            className={`cso-link ${activeLink === "customers" ? "active" : ""}`}
            onClick={() => handleLinkClick("customers")}
          >
            Customers
          </Link>
        </div>
      </div>
      <div>
        {activeLink === "transaction" && <BranchTransaction />}
        {activeLink === "csos" && <BranchCSO />}
        {activeLink === "customers" && <BranchCustomers />}
      </div>
    </BranchDetailRap>
  );
};

export default BranchDetails;
