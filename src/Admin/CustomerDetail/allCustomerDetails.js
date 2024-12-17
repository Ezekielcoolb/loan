import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CustomersDaily from "./CustomerDailyTrans";
import { Icon } from "@iconify/react/dist/iconify.js";

const CustDetailRap = styled.div`
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
    justify-content: flex-start;
    align-items: center;
  }
  .client-link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }
  .personal-inner-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }
  .personal-second {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .personal-first {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .personal {
    display: flex;
    justify-content: space-between;
    border: 1px solid #d0d5dd;
    border-radius: 14px;
    margin: 20px;
    padding: 20px;
    width: 760px;
  }
`;

const AllCustomerDetail = () => {
  const [activeLink, setActiveLink] = useState("transaction");
  const [formData, setFormData] = useState({
    firstName: "Olayinka",
    lastName: "Jamiu",
    address: "Ikeja, Lagos, Nigeria",
    email: "yinka@gmail.com",
    phone: "0900000000",
    gender: "Male",
    employedDate: "Apr 24, 2024",
    loan: "3",
    defaulted: "none",
    performance: "100%",
    branch: "Ikeja",
    guarantorName: "Olayinka Samson",
    guarantorPhone: "00000000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field dynamically
    }));
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <CustDetailRap>
      <div>
        <div className="client-1">
          <div className="client-link-container">
            <Link style={{}} className="cso-link" to="/customerdetails">
              <Icon
                icon="formkit:arrowleft"
                width="90"
                height="16"
                style={{ color: "black", cursor: "pointer" }}
              />
            </Link>
            <Link
              className={`client-link ${
                activeLink === "transaction" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("transaction")}
            >
              All Transaction
            </Link>
            <Link
              className={`client-link ${
                activeLink === "personal" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("personal")}
            >
              Personal Details
            </Link>
          </div>
        </div>
        <div>
          {activeLink === "transaction" && <CustomersDaily />}

          <div className="personal">
            <div className="personal-first">
              <h4>Personal Details</h4>
              <p>Personal details of Yinka</p>
            </div>

            <div className="personal-second">
              <div className="personal-inner-div">
                <h4>First Name</h4>
                <p>{formData.firstName}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Last Name</h4>
                <p>{formData.lastName}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Address</h4>
                <p>{formData.address}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Email</h4>
                <p>{formData.email}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Phone number</h4>
                <p>{formData.phone}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Gender</h4>
                <p>{formData.gender}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Date Employed</h4>
                <p>{formData.employedDate}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Number of loan</h4>
                <p>{formData.customers}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Number of times defaulted</h4>
                <p>{formData.defaulted}</p>
              </div>
              <div className="personal-inner-div">
                <h4>General loan performance</h4>
                <p>{formData.performance}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Branch Associated</h4>
                <p>{formData.branch}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Guarantor's Name</h4>
                <p>{formData.guarantorName}</p>
              </div>
              <div className="personal-inner-div">
                <h4>Guarantor's Number</h4>
                <p>{formData.guarantorPhone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustDetailRap>
  );
};
export default AllCustomerDetail;
