import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fetchWaitingLoans } from "../../redux/slices/LoanSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchGuarantor } from "../../redux/slices/guarantorSlice";
import generatePDF from "react-to-pdf";


const GurarantoRap = styled.div`
  padding: 30px;
  .guarantor-pic {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }
  .guarantor-pic img {
    min-width: 300px;
    max-width: 600px;
    height: 500px;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .image-div p {
    border-radius: 100px;
    background: #99a33a;
    padding: 10px;
    width: fit-content;
    color: white;
    font-weight: 500;
    font-size: 14px;
  }
  .form-header {
    display: flex;
    justify-content: space-between;
  }
  .header-sub-1 {
    display: flex;
    justify-content: space-around;
    height: fit-content;
    gap: 30px;
  }
  .header-info-1 {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .header-info-1 h2 {
    font-size: 30px;
    font-weight: 800;
  }
  .header-info-1 p {
    font-size: 16px;
    font-weight: 450;
  }
  .loan-form-app {
    height: 100px;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #59b2c7;
  }
  .loan-form-app h4 {
    font-size: 20px;
    font-weight: 500;
  }
  .loan-form-app span {
    color: #dfe5a9;
  }
  .header-1 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .form-details {
    background: #99a33a;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
  .form-details h5 {
    font-size: 20px;
  }
  .form-body-info-sub h5 {
    color: #727789;
    font-size: 20px;
    font-weight: 500;
  }
  .form-body-info-sub p {
    color: #030b26;
    font-size: 20px;
    font-weight: 600;
  }
  .form-body-info-sub {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 50%;
    justify-content: space-between;
  }
  .form-body-info {
    display: flex;
    gap: 80px;
    justify-content: space-between;
  }
  .personal-Details {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .personal-Details h3 {
    background: #99a33a;
    padding: 8px;
    font-size: 20px;
  }
  .form-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }
  .alternative-form {
    padding: 30px;
  }
  .alternative-form p {
    font-size: 20px;
    font-weight: 600;
  }
  .alternative-form span {
    color: #99a33a;
  }
  button {
    background: #030b26;
    color: wheat;
    font-size: 12px;
    font-weight: 500;
    text-decoration: none;
    width: 100px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    border-style: none;
  }
`;

const GuarantorDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loanId = id;
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id);
  const [opened, setOpen] = useState(false);
  const { guarantorResponse } = useSelector((state) => state.guarantor);
  const formRef = useRef();
  const picRef = useRef();

  useEffect(() => {
    if (loanId) {
      dispatch(fetchGuarantor(loanId));
    }
  }, [dispatch, loanId]);

  // Fetch loans if not already in the Redux store
  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);


  const handleClick = () => {
    setOpen(!opened);
  };
  return (
    <GurarantoRap>
      <div className="header">
        <Link
          style={{ marginLeft: "-50px" }}
          className="cso-link"
          to={`/loan/${id}`}
        >
          <Icon
            icon="formkit:arrowleft"
            width="90"
            height="16"
            style={{ color: "black", cursor: "pointer" }}
          />
        </Link>
      </div>
      {guarantorResponse ? (
        <>
          <div
            style={{
              padding: "50px",
            }}
            ref={formRef}
          >
            <div className="form-header">
              <div className="image-div">
                <img src="/images/login_img.png" alt="" />
                <p>LOAN & SAVINGS</p>
              </div>
              <div className="header-1">
                <div className="header-sub-1">
                  <div className="header-info-1">
                    <h2>JK POS SOLUTION ENTERPRISES</h2>
                    <p>20, Deji Oworu Street, Ketu Alapere, Lagos</p>
                    <p>+234-9015047850 (Office)</p>
                    <p>www.</p>
                  </div>
                  <div className="loan-form-app">
                    <h4>
                      Guarantor <span>Form</span>
                    </h4>
                  </div>
                </div>
                <div className="form-details">
                  <h5>GUARANTOR FORM DETAILS</h5>
                </div>
              </div>
            </div>
            <div className="form-body">
              <div className="personal-Details">
                <h3>GUARANTOR DETAILS</h3>
                <div className="form-body-info">
                  <div className="form-body-info-sub">
                    <h5>Name:</h5>
                    <p>{guarantorResponse.guarantorName}</p>
                  </div>
                  <div className="form-body-info-sub">
                    <h5>Residential Address:</h5>
                    <p>{guarantorResponse.address}</p>
                  </div>
                </div>
                <div className="form-body-info">
                  <div className="form-body-info-sub">
                    <h5>Relationship with customer:</h5>
                    <p>{guarantorResponse.relationship}</p>
                  </div>
                  <div className="form-body-info-sub">
                    <h5>Business Address</h5>
                    <p>{guarantorResponse.businessAddress}</p>
                  </div>
                </div>
                <div className="form-body-info">
                  <div className="form-body-info-sub">
                    <h5>Phone Number:</h5>
                    <p>{guarantorResponse.guaraphonentorName}</p>
                  </div>
                  <div className="form-body-info-sub">
                    <h5> Known client for:</h5>
                    <p>{guarantorResponse.knownDuration} years</p>
                  </div>
                </div>
              </div>
              <div className="personal-Details">
                <h3>DECLARATION</h3>
                <p>
                  {" "}
                  I <span style={{fontWeight: "700"}}>{guarantorResponse.guarantorName} </span> hereby confirm that
                  Mr/Mrs/Miss<span style={{fontWeight: "700"}}> {loan?.customerDetails.lastName}{" "}
                  {loan?.customerDetails.firstName} </span> of{" "}
                  <span style={{fontWeight: "700"}}> {loan?.customerDetails.address} </span> has been known to me for{" "}
                  <span style={{fontWeight: "700"}}> {guarantorResponse.knownDuration} years </span> and I am his/ her{" "}
                  <span style={{fontWeight: "700"}}>  {guarantorResponse.relationship} </span>.
                </p>
                <p>
                  I declare that all information, including NIN, picture, and ID
                  tendered for this purpose, are valid and authentic; any false
                  information given may disqualify the client from loan
                  approval. I confirm that the client house address provided
                  above is valid and correct.
                </p>
                <p>
                  I have agreed to take responsibility for the payment of the
                  principal Loan amount plus the interest in the event of
                  default.
                </p>
              </div>
              <div className="personal-Details">
                <h3>SIGNATURE & DATE</h3>
                <div className="form-body-info">
                  <div className="form-body-info-sub">
                    <h5>Signature</h5>
                    <img src={guarantorResponse.signature} alt="Signature" />
                  </div>
                  <div className="form-body-info-sub">
                    <h5> Date:</h5>
                    <p>
                      {new Date(guarantorResponse.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              generatePDF(formRef, {
                filename: `Guarantor form for ${loan.customerDetails.lastName} ${loan.customerDetails.firstName}`,
              });
            }}
          >
            Download{" "}
          </button>
        </>
      ) : (
        <div className="alternative-form">
          <p>
            Guarantor Form not submitted yet{" "}
            <span onClick={handleClick}>See if guarantor form was uploaded </span>
          </p>
          {opened ? (
            <>
              <div ref={picRef}>
                <h4>Uploaded Guarantor Form Picture</h4>

                <div className="guarantor-pic">
                  <img src={loan?.guarantorFormPic} alt="" />
                </div>
              </div>
              <button
                onClick={() => {
                  generatePDF(picRef, {
                    filename: `Guarantor form `,
                  });
                }}
              >
                Download{" "}
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </GurarantoRap>
  );
};

export default GuarantorDetails;
