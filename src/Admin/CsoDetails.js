import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Customers from "./CsoDetails/CsoCustomer";
import { use } from "react";
import ListOfCustomers from "./CsoDetails/ListOfCustomer";
import { Icon } from "@iconify/react/dist/iconify.js";

const DetailsRap = styled.div`
  width: 100%;

  h4 {
    font-size: 16px;
    font-weight: 600;
  }
  h5 {
    font-size: 14px;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }
  th {
    font-size: 14px;
    font-weight: 500;
    color: #727789;
  }
  td {
    font-size: 13px;
    font-weight: 400;
    color: #727789;
  }
  label {
    font-size: 14px !important;
    color: #60667a;
    font-weight: 600;
  }
  .star {
    font-weight: 700;
    color: red;
  }
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
  .create-new-cso {
    width: 128px;
    height: 38px;
    border-radius: 6px;
    background: #0c1d55;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .new-cso-dropdown {
    box-shadow: 0px 8px 22px 0px #2230491a;
    border: 0.5px solid #dbe0ee;
    width: 160px;
    right: 4px;
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 40px;
    background: #ffffff;
    z-index: 1000;
  }
  .new-cso-link {
    text-decoration: none;
    font-size: 14px;
    color: #171717;
  }
  .person-details-edit input {
    width: 380px;
    border-radius: 12px;
    padding: 10px;
    height: 45px;
    border: 1px solid #dbe0ee;
  }
  .person-details-edit label {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .person-details-edit  {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-bottom: 1px solid #dbe0ee;
    padding-bottom: 15px;
  }
  .client-create-btn {
    background: #0c1d55;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
  }
  .save-cancel-div {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 15px;
  }
  .client-cancel-btn {
    border: 1px solid #dbe0ee;
    width: 185px;
    height: 45px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c1d55;
    background: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
  }
  .client-cancel-btn:hover {
    background-color: #0c1d55;
    color: white;
  }
`;

const CsoDetails = () => {
  const [activeLink, setActiveLink] = useState("transaction");
  const [visibility, setVisibility] = useState(false);
  const [openEditForm, setEditForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Olayinka",
    lastName: "Jamiu",
    address: "Ikeja, Lagos, Nigeria",
    email: "yinka@gmail.com",
    phone: "0900000000",
    gender: "Male",
    employedDate: "Apr 24, 2024",
    customers: "3",
    branch: "Ikeja",
    guarantorName: "Olayinka Samson",
    guarantorPhone: "00000000",
  });

  const isValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.branch.trim() !== "" &&
    formData.address.trim() !== "" ;
   

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setEditForm(!openEditForm);
    }
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
const handleOpenFormEdit = () => {
    setEditForm(!openEditForm)
}
  const toogleVisiblility = () => {
    setVisibility(!visibility);
  };
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field dynamically
    }));
  };
  return (
    <DetailsRap>
      <div>
        <div className="cso-1">
          <div className="cso-link-container">
            <Link style={{marginLeft:"-50px"}} className="cso-link" to="/cso"><Icon
                              
                              icon="formkit:arrowleft"
                              width="90"
                              height="16"
                              style={{ color: "black", cursor: "pointer" }}
                            /></Link>
          <Link
              className={`cso-link ${
                activeLink === "transaction" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("transaction")}
            >
              Transactions
            </Link>
            <Link
              className={`cso-link ${
                activeLink === "customers" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("customers")}
            >
              Customers
            </Link>
            <Link
              className={`cso-link ${
                activeLink === "personal" ? "active" : ""
              }`}
              onClick={() => handleLinkClick("personal")}
            >
              Personal Detail
            </Link>
           
           
            {/* <Link
              className={`cso-link ${activeLink === "account" ? "active" : ""}`}
              onClick={() => handleLinkClick("account")}
            >
              Account
            </Link> */}
          </div>
          {activeLink === "transaction" && (
            <div style={{ position: "relative" }}>
              <div>
                <Link onClick={toogleVisiblility} className="create-new-cso">
                  Access customers
                </Link>
              </div>
              {visibility ? (
                <div className="new-cso-dropdown">
                  <Link className="new-cso-link">Iya Shade</Link>
                  <Link className="new-cso-link">Iya sula</Link>
                  <Link className="new-cso-link">Lukmaon</Link>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        <div>
          {activeLink === "personal" && (
            <div className="personal">
              <div className="personal-first">
                <h4>Personal Details</h4>
                <p>Personal details of Yinka</p>
                <Link
                    className="client-cancel-btn"
                    onClick={handleOpenFormEdit}
                  >
                    Edit details
                  </Link>
              </div>
              {openEditForm ? (
                <div>
                <div className="person-details-edit">
                  <label>
                    First Name <br />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Last Name <br />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Address <br />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Email <br />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Phone Number <br />
                    <input
                      type="number"
                      name="phone"
                      value={formData.phone}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Gender <br />
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Date employed <br />
                    <input
                      type="date"
                      name="employedDate"
                      value={formData.employedDate}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Branch <br />
                    <input
                      type="text"
                      name="branch"
                      value={formData.branch}
                      onClick={handleChange}
                    />
                  </label>

                  <label>
                    Guarantor's Name <br />
                    <input
                      type="text"
                      name="guarantorName"
                      value={formData.guarantorName}
                      onClick={handleChange}
                    />
                  </label>
                  <label>
                    Guarantor's Number <br />
                    <input
                      type="number"
                      name="guarantorPhone"
                      value={formData.guarantorPhone}
                      onClick={handleChange}
                    />
                  </label>
                </div>
                <div className="save-cancel-div">
                  <Link
                    className="client-cancel-btn"
                    onClick={handleOpenFormEdit}
                  >
                    Cancel
                  </Link>
                  <Link
                    className="client-create-btn"
                    onClick={handleSubmit}
                    disabled={!isValid}
                    style={{
                      backgroundColor: isValid ? "#0c1d55" : "#727789",
                    }}
                  >
                    Save
                  </Link>
                </div>
              </div>
              ) :  
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
                <h4>Number of customer</h4>
                <p>{formData.customers}</p>
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
            }
             

              
            </div>
          )}
        {activeLink === "customers" && <ListOfCustomers />}
          {activeLink === "transaction" && <Customers />}
        </div>
      </div>
    </DetailsRap>
  );
};

export default CsoDetails;
