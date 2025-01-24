import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CsoFooterRap = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  background: #daf7ff;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  z-index: 9999;

  .footer-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .footer-div h4 {
    color: #005e78;
    font-size: 14px;
    font-weight: 500;
  }
  .link-under {
    text-decoration: none;
  }
`;

const CsoFooter = () => {
  return (
    <CsoFooterRap>
      <Link className="link-under" to="/cso">
        <div className="footer-div">
          <Icon
            icon="line-md:home"
            width="24"
            height="24"
            style={{ color: " #005E78" }}
          />
          <h4>Home</h4>
        </div>
      </Link>
      <Link className="link-under" to="/cso/loans-dashboard">
      <div className="footer-div">
        <Icon
          icon="carbon:global-loan-and-trial"
          width="24"
          height="24"
          style={{ color: " #005E78" }}
        />
        <h4>Loan</h4>
      </div>
      
      </Link>
      <Link className="link-under" to="/cso/loans-collections">
      <div className="footer-div">
        <Icon
          icon="ic:outline-collections"
          width="24"
          height="24"
          style={{ color: " #005E78" }}
        />
        <h4>Collections</h4>
      </div>
      </Link>
      <Link className="link-under" to="/cso/csos-dashboard">
      <div className="footer-div">
          <Icon
            icon="material-symbols-light:dashboard-outline-rounded"
            width="24"
            height="24"
            style={{ color: " #005E78" }}
          />
          <h4>Dashboard</h4>
        </div>
        </Link>
        {/* <Link to="/cso/csos-test">
      <div className="footer-div">
          <Icon
            icon="material-symbols-light:dashboard-outline-rounded"
            width="24"
            height="24"
            style={{ color: " #005E78" }}
          />
          <h4>Test</h4>
        </div>
        </Link> */}
    </CsoFooterRap>
  );
};

export default CsoFooter;
