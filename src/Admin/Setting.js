import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SettingRap = styled.div`
  font-family: "Onest";
  h4 {
    font-weight: 600;
    font-size: 16px;
    color: #030b26;
  }

  h5 {
    font-weight: 400;
    font-size: 14px;
    color: #030b26;
  }
  p,
  label {
    font-weight: 400;
    font-size: 14px;
    color: #727789;
  }
  .label {
    margin-bottom: 10px;
  }

  .link-container {
    display: flex;
    justify-content: flex-start;
  }

  .link {
    padding: 20px 20px;
    text-decoration: none;
    color: #727789;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 2px solid transparent; /* Default underline */
    transition: all 0.3s ease;
  }
  .setting-1 {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d0d5dd;
    justify-content: space-between;
    position: relative;
    margin-bottom: 15px;
    gap: 10px;
    flex-wrap: wrap;
  }
  .create-new-user {
    width: 166px;
    height: 38px;
    border-radius: 6px;
    background: #12d27d;
    color: #ffffff;
    text-decoration: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .link.active {
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid black; /* Black underline for the active link */
    color: #030b26;
  }

  .link:hover {
    color: #555; /* Optional hover effect */
  }

  .notify {
    width: 768px;
    border-radius: 12px;
    border: 1px solid #dbe0ee;
    padding: 32px;
    margin: 15px;
  }

  .notification-divs {
    display: flex;

    justify-content: space-between;
  }
  .notification-divs h5 {
    margin-bottom: 5px;
  }
  .company-mess {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .company-mess label {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .notification-divs p {
    max-width: 359px;
  }
  .category-notification {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px 0px;
    border-bottom: 1px solid #dbe0ee;
  }
  .no-boder {
    border-bottom: 1px solid white !important;
  }
  .toogleSwitch {
    display: flex;
    align-items: center;
    width: 32px;
    height: 18px;
    background: #f5f5f6;
    border-radius: 10.8px;
    cursor: pointer;
    padding: 2px;
    position: relative;
    transition: background-color 0.3s, justify-content 0.3s;
  }
  .circularSwitch {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
  }
  .notify-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sys-acc-div {
    width: 280px;
    height: 38px;
    border: 1px solid #dbe0ee;
    border-radius: 6px;
    margin-left: 15px;
    display: flex;
  }
  .notice-button {
    width: 140px;
    height: 35px;
    border-right: 1px solid #dbe0ee;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    color: #727789;
  }
  .notice-button.active {
    background: #f2f3f4 !important;
    color: #030b26;
  }
  .remind-input {
    width: 276px;
    height: 45px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #dbe0ee;
  }
  .reminds-input {
    width: 310px;
    height: 45px;
    padding: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border: 1px solid #dbe0ee;
  }
  .delete-icon {
    width: 24px;
    height: 24px;
  }
  .delete-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .reminder-select {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 45px;
    background: #030b260a;
    border-left: 1px solid #dbe0ee;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .change-password input {
    width: 358px;
    height: 45px;
    border: 1px solid #dbe0ee;
    border-radius: 10px;
    padding: 10px;
  }

  .change-password label {
    margin-bottom: 20px;
  }
  .change-password {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .security-div {
    display: flex;
    width: 832px;
    border-radius: 12px;
    border: 1px solid #dbe0ee;
    gap: 100px;
    padding: 32px;
    margin: 15px;
  }
  .sys-bill-div {
    width: 186px !important;
  }
  .bill-btn {
    width: 93px !important;
  }
  .plan-icon {
    background: #f2f3f4;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px solid #f2f3f4;
  }
  .plan-icon img {
    width: 16px;
    height: 16px;
  }
  .different-plans {
    border: 0.5px solid #dbe0ee;
    border-radius: 12px;
    padding: 16px;
    display: flex;
    gap: 4px;
  }
  .download-icon {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .first-subscribe-div {
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    border-bottom: 1px solid #dbe0ee;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }
  .all-plans-sub {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .download-btn {
    width: 145px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px solid #dbe0ee;
    color: #030b26;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
  }
  .target-loan h5 {
    font-weight: 600;
  }
  .pro-cancel-btn,
  .pro-save-btn {
    width: 174px;
    text-decoration: none;
    height: 45px;
    border-radius: 10px;
    border: 1px solid #dbe0ee;
    font-size: 14px;
    font-weight: 600;
    color: #dbe0ee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pro-save-btn {
    color: #ffffff !important;
  }
  .profile-info-links {
    display: flex;
    gap: 15px;
  }
  .notice h4 {
    margin-bottom: 20px;
  }
.target-loan {
    border-top: 1px solid #dbe0ee;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}
.target-loan div {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.target-loan input, .target-loan select {
    width: 358px;
    height: 45px;
    border: 1px solid #dbe0ee;
    border-radius: 10px;
    padding: 10px;
}
  .edit-user {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #0c1d55;
  }
  .delete-user {
    height: 30px;
    width: 76px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #0c1d55;
    border: 1px solid #dbe0ee;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    background: #ffffff;
  }
  .edi-del-btn {
    display: flex;
    margin: 15px;
    gap: 10px;
  }

  @media (max-width: 1300px) {
    .subscribe-set-div {
      width: 95% !important;
    }
  }
  @media (max-width: 870px) {
    .profile-info,
    .account-setting-all,
    .security-div,
    .all-prefer {
      width: 95% !important;
    }
  }
  @media (max-width: 790px) {
    .notify {
      width: 95% !important;
    }
  }
  @media (max-width: 678px) {
    .account-setting-all p {
      display: none;
    }
    .account-setting-all,
    .security-div {
      flex-direction: column;
    }
    .input-post {
      width: 358px;
    }
    .first-subscribe-div,
    .all-prefer {
      flex-direction: column;
      gap: 15px;
    }
    .link-width {
      width: 700px;
      overflow: hidden;
    }
    .link-container {
      overflow-x: auto;
    }
  }
  @media (max-width: 500px) {
    .remind-input,
    .reminds-input {
      width: 212px !important;
    }
    .adjust-input,
    .small-tax-input {
      width: 260px !important;
    }
    .profile-info-links {
      flex-direction: column;
    }
    .change-password input,
    .input-post {
      width: 300px;
    }
    .taxt-div {
      max-width: 358px !important;
    }
  }
  @media (max-width: 550px) {
    .profile-info p {
      display: none;
    }
    .profile-info {
      flex-direction: column;
    }
  }
  @media (max-width: 400px) {
    .small-input-div {
      flex-direction: column;
    }
    .small-pro-input {
      width: 280px !important;
    }
    .profile-edit-div input {
      width: 280px !important;
    }
    .change-password input,
    .input-post {
      width: 280px;
    }
  }
`;

const Setting = () => {
  const [activeLink, setActiveLink] = useState("notification");
  const [isOn, setIsOn] = useState(true);
  const [onCal, setOnCal] = useState(true);
  const [onCalen, setOnCalen] = useState(true);
  const [decline, setDecline] = useState(true);
  const [totalApprove, setTotalApprove] = useState(true);
  const [disburse, setDisburse] = useState(true);
  const [totalDisbursed, setTotalDisbursed] = useState(true);
  const [latePayment, setLatePayment] = useState(true);
  const [defaulting, setDefaulting] = useState(true);
  const [repay, setRepay] = useState(true);
  const [repayment, setRepayment] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const toogleDecline = () => {
    setDecline(!decline);
  };
  const toogleApprove = () => {
    setTotalApprove(!totalApprove);
  };
  const toogleDisburst = () => {
    setDisburse(!disburse);
  };
  const toggleTotalDisburse = () => {
    setTotalDisbursed(!totalDisbursed);
  };
  const toogleLatePayment = () => {
    setLatePayment(!latePayment);
  };
  const toogleDefaulting = () => {
    setDefaulting(!defaulting);
  };
  const toogleRepay = () => {
    setRepay(!repay);
  };
  const toogleRepayment = () => {
    setRepayment(!repayment);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleSwitch = () => {
    setIsOn((prevState) => !prevState);
  };
  const toggleOnCal = () => {
    setOnCal((prevState) => !prevState);
  };
  const toggleOnCalen = () => {
    setOnCalen((prevState) => !prevState);
  };

  return (
    <SettingRap>
      <div>
        <div className="setting-1">
          <div className="link-width">
            <div className="link-container">
              <Link
                className={`link ${
                  activeLink === "notification" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("notification")}
              >
                Notification
              </Link>
              <Link
                className={`link ${activeLink === "target" ? "active" : ""}`}
                onClick={() => handleLinkClick("target")}
              >
                Target
              </Link>
              <Link
                className={`link ${activeLink === "security" ? "active" : ""}`}
                onClick={() => handleLinkClick("security")}
              >
                Security
              </Link>
            </div>
          </div>
        </div>

        {activeLink === "notification" && (
          <div className="notify">
            <div className="category-notification">
              <h4>All Notifications</h4>
              <div className="notification-divs ">
                <div>
                  <h5>Loan Applications</h5>
                  <p>Notify me when a new loan application is submitted</p>
                </div>
                <div
                  onClick={toggleSwitch}
                  className="toogleSwitch"
                  style={{
                    justifyContent: isOn ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: isOn ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>

              <div className="notification-divs ">
                <div>
                  <h5>Monthly Loan Application</h5>
                  <p>
                    Notify me when at the total number of loan applications
                    submitted at the end of each month
                  </p>
                </div>
                <div
                  onClick={toggleOnCal}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCal ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCal ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Loan Approval</h5>
                  <p>Notify me when a loan is approved</p>
                </div>
                <div
                  onClick={toggleOnCalen}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Total Loan Approval</h5>
                  <p>
                    Notify me at the end of the month the total loan approved
                    for the month
                  </p>
                </div>
                <div
                  onClick={toogleApprove}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Loan Declined</h5>
                  <p>Notify me when a loan is declined</p>
                </div>
                <div
                  onClick={toogleDecline}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Loan Disbursed</h5>
                  <p>Notify me when a loan is disbursed</p>
                </div>
                <div
                  onClick={toogleDisburst}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Total Loan Disbursed</h5>
                  <p>
                    Notify me the total amount disbursed for a month at the end
                    of the month
                  </p>
                </div>
                <div
                  onClick={toggleTotalDisburse}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Late Payment</h5>
                  <p>Notify me when a customer miss his/her daily payment.</p>
                </div>
                <div
                  onClick={toogleLatePayment}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Defaulting</h5>
                  <p>
                    Notify me at the end of a loan if a customer is defaulting.
                  </p>
                </div>
                <div
                  onClick={toogleLatePayment}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Repayment</h5>
                  <p>Notify me when a customer make a payment</p>
                </div>
                <div
                  onClick={toogleRepay}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
              <div className=" notification-divs">
                <div>
                  <h5>Final payment</h5>
                  <p>Notify me when a customer finish paying a loan</p>
                </div>
                <div
                  onClick={toogleRepayment}
                  className="toogleSwitch"
                  style={{
                    justifyContent: onCalen ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Circular switch */}
                  <div
                    className="circularSwitch"
                    style={{
                      backgroundColor: onCalen ? "#0c1d55" : "#ffffff",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeLink === "target" && (
          <div className="notify notice">
            <h4>Set yearly target</h4>
            <div className="target-loan">
              <div>
                <h5> Set Loan target for all branch</h5>
                <input type="number" />
              </div>
              <div>
                <h5>Set laon target for a specific branch</h5>
                <label>
                  Pick a branch <br />
                  <select>
                    <option>Select a branch</option>
                    <option>Branch A</option>
                    <option>Branch B</option>
                    <option>Branch C</option>
                    <option>Branch D</option>
                    <option>Branch E</option>
                  </select>
                </label>
                <label>
                  Target <br />
                  <input type="number" placeholder="input the target" />
                </label>
              </div>
            </div>
            <div className="target-loan">
              <div>
                <h5> Set Disbursement target for all branch</h5>
                <input type="number" />
              </div>
              <div>
                <h5>Set Disbursement target for a specific branch</h5>
                <label>
                  Pick a branch <br />
                  <select>
                    <option>Select a branch</option>
                    <option>Branch A</option>
                    <option>Branch B</option>
                    <option>Branch C</option>
                    <option>Branch D</option>
                    <option>Branch E</option>
                  </select>
                </label>
                <label>
                  Target <br />
                  <input type="number" placeholder="input the target" />
                </label>
              </div>
            </div>
            <Link
                  className="pro-save-btn"
                  style={{
                    backgroundColor: "#727789",
                  }}
                >
                  Save
                </Link>
          </div>
        )}

        {activeLink === "security" && (
          <div className="security-div">
            <h4>Change password</h4>
            <div className="change-password">
              <div className="input-post">
                <label>
                  Current Password <br />
                  <input
                    className="password-input"
                    type={passwordVisible ? "text" : "password"}
                    required
                  />
                </label>
                <Icon
                  onClick={togglePasswordVisibility}
                  className="icon-post"
                  icon="basil:eye-outline"
                  width="25"
                  height="25"
                  style={{ color: "#727789" }}
                />
              </div>
              <div className="input-post">
                <label>
                  New Password <br />
                  <input
                    className="password-input"
                    type={passwordVisible ? "text" : "password"}
                    required
                  />
                </label>
                <Icon
                  onClick={togglePasswordVisibility}
                  className="icon-post"
                  icon="basil:eye-outline"
                  width="25"
                  height="25"
                  style={{ color: "#727789" }}
                />
              </div>
              <div className="input-post">
                <label>
                  Confirm Password <br />
                  <input
                    className="password-input"
                    type={passwordVisible ? "text" : "password"}
                    required
                  />
                </label>
                <Icon
                  onClick={togglePasswordVisibility}
                  className="icon-post"
                  icon="basil:eye-outline"
                  width="25"
                  height="25"
                  style={{ color: "#727789" }}
                />
              </div>
              <div className="profile-info-links">
                <Link className="pro-cancel-btn">Cancel</Link>
                <Link
                  className="pro-save-btn"
                  style={{
                    backgroundColor: "#727789",
                  }}
                >
                  Save
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </SettingRap>
  );
};
export default Setting;
