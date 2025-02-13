import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useReactToPrint } from "react-to-print";
import generatePDF from "react-to-pdf";
import { Icon } from "@iconify/react/dist/iconify.js";
import { fetchAdminLoans } from "../redux/slices/LoanSlice";
import { fetchGuarantor } from "../redux/slices/guarantorSlice";

const DownloadRap = styled.div`
  width: 100%;
  padding: 40px;
  img {
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
  ol {
    color: #99a33a;
    margin-left: 25px;
  }
  li {
    font-size: 14px;
    max-width: 600px;
    color: black;
    margin-top: 10px;
  }
  .signature {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 15px;
  }
  .signature img {
    width: 150px;
    height: 70px;
  }
  .signature h5 {
    color: #727789;
    font-size: 20px;
    font-weight: 500;
  }
  .form-body {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 15px;
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
.guaran-h2 {
  font-size: 30px;
  font-weight: 500;
  margin-top: 100px;
}
`;

const DisburseLoanForm = () => {
  const { id } = useParams(); // Get loan ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id);
  const loanId = id;
  const formRef = useRef();
  const [opened, setOpen] = useState(false);
    const { guarantorResponse } = useSelector((state) => state.guarantor);
    const guarantorRef = useRef();
    const picRef = useRef();

  useEffect(() => {
    if (!loan) {
      dispatch(fetchAdminLoans());
    }
  }, [loan, dispatch]);

    useEffect(() => {
      if (loanId) {
        dispatch(fetchGuarantor(loanId));
      }
    }, [dispatch, loanId]);
  
   
  
  
    const handleClick = () => {
      setOpen(!opened);
    };

  const handlePrint = useReactToPrint({
    content: () => formRef.current, // Ensure this returns the correct reference
    documentTitle: "Loan Form",
  });

  return (
    <DownloadRap>
      <div>
        <Link
          style={{ marginLeft: "-50px" }}
          className="cso-link"
          to="/officer/customer"
        >
          <Icon
            icon="formkit:arrowleft"
            width="90"
            height="16"
            style={{ color: "black", cursor: "pointer" }}
          />
        </Link>
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
                    Loan Application <span>Form</span>
                  </h4>
                </div>
              </div>
              <div className="form-details">
                <h5>FORM DETAILS</h5>
              </div>
            </div>
          </div>
          <div className="form-body">
            <div className="form-body-info">
              <div className="form-body-info-sub">
                <h5>CSO in Charge:</h5>
                <p>{loan?.csoName}</p>
              </div>
              <div className="form-body-info-sub">
                <h5>Date Submitted:</h5>
                <p>{loan?.createdAt}</p>
              </div>
            </div>
            <div className="personal-Details">
              <h3>PERSONAL DATA INFORMATION</h3>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Full Name:</h5>
                  <p>
                    {loan?.customerDetails.lastName}{" "}
                    {loan?.customerDetails.firstName}{" "}
                    {loan?.customerDetails.middleName}
                  </p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Date of Birth:</h5>
                  <p>{loan?.customerDetails.dateOfBirth}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Address:</h5>
                  <p>{loan?.customerDetails.address}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>City:</h5>
                  <p>{loan?.customerDetails.city}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>State:</h5>
                  <p>{loan?.customerDetails.state}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Religion:</h5>
                  <p>{loan?.customerDetails.religion}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Email:</h5>
                  <p>{loan?.customerDetails.email}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>BVN:</h5>
                  <p>{loan?.customerDetails.bvn}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Mobile Number:</h5>
                  <p>{loan?.customerDetails.phoneOne}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>OtherMobile Number:</h5>
                  <p>{loan?.customerDetails.phoneTwo}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Next of Kin:</h5>
                  <p>{loan?.customerDetails.NextOfKin}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>OtherMobile Number:</h5>
                  <p>{loan?.customerDetails.NextOfKinNumber}</p>
                </div>
              </div>
            </div>
            <div className="personal-Details">
              <h3>BUSINESS DETAILS</h3>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Business Name:</h5>
                  <p>{loan?.businessDetails.businessName}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Nature of Business:</h5>
                  <p>{loan?.businessDetails.natureOfBusiness}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Business Address:</h5>
                  <p>{loan?.businessDetails.address}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Years in Business Address:</h5>
                  <p>{loan?.businessDetails.yearsHere}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Name Known As in Business Area:</h5>
                  <p>{loan?.businessDetails.nameKnown}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Seasonal Business?:</h5>
                  <p>{loan?.businessDetails.additionalInfo}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Amount Made in a Month:</h5>
                  <p>{loan?.businessDetails.estimatedValue}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Worth of Business:</h5>
                  <p>{loan?.businessDetails.operationalStatus}</p>
                </div>
              </div>
            </div>
            <div className="personal-Details">
              <h3>LOAN DETAILS</h3>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Amount Requested:</h5>
                  <p>{loan?.loanDetails.amountRequested}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Loan Type:</h5>
                  <p>{loan?.loanDetails.loanType}</p>
                </div>
              </div>
            </div>
            <div className="personal-Details">
              <h3>GUARANTOR DETAILS</h3>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5> Guarantor Name:</h5>
                  <p>{loan?.guarantorDetails.name}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Email:</h5>
                  <p>{loan?.guarantorDetails.email}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Address:</h5>
                  <p>{loan?.guarantorDetails.address}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Phone Number:</h5>
                  <p>
                    {loan?.guarantorDetails.phone},{" "}
                    {loan?.guarantorDetails.phoneTwo}
                  </p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Relationship:</h5>
                  <p>{loan?.guarantorDetails.relationship}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Years Known:</h5>
                  <p>{loan?.guarantorDetails.yearsKnown} years</p>
                </div>
              </div>
            </div>
            <div className="personal-Details">
              <h3>Group Details</h3>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Group Name:</h5>
                  <p>{loan?.groupDetails?.groupName}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Group Leader:</h5>
                  <p>{loan?.groupDetails?.leaderName}</p>
                </div>
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Leader's Number:</h5>
                  <p>{loan?.groupDetails?.mobileNo}</p>
                </div>
              </div>
            </div>
            <div className="personal-Details">
              <h3>TERM AND CONDITIONS</h3>
              <div>
                <ol>
                  <li>
                    By submitting this biodata form, I hereby declare that the
                    information provided is true, accurate, and complete to the
                    best of my knowledge.
                  </li>
                  <li>
                    I understand that any false or misleading information may
                    lead to rejection of my application and may also be
                    punishable under applicable laws. This includes, but is not
                    limited to, criminal prosecution and/or damages.
                  </li>
                  <li>
                    I have read, understood, and agreed to the Terms and
                    Conditions of JK SOLUTNS including the company's policies
                    and procedures. Additionally, I authorize JK SOLUTNS to
                    verify the information provided and conduct reference checks
                    as required.
                  </li>
                </ol>
              </div>
              <div className="signature">
                <h5>Signature:</h5>
                <img src={loan?.pictures.signature} alt="" />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            generatePDF(formRef, {
              filename: `Loan form for ${loan.customerDetails.lastName} ${loan.customerDetails.firstName}`,
            });
          }}
        >
          Download{" "}
        </button>{" "}
      </div>
      <div>
        <h2 className="guaran-h2">Guarantor Form</h2>
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
              generatePDF(guarantorRef, {
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
      </div>
    </DownloadRap>
  );
};

export default DisburseLoanForm;
