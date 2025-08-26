import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchAdminLoans, fetchWaitingLoans } from "../redux/slices/LoanSlice";
import { useReactToPrint } from "react-to-print";
import generatePDF from "react-to-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Icon } from "@iconify/react/dist/iconify.js";
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
.form-body-info-sub-img img {
  width: 450px;
  height: 450px;
}
.form-body-info-sub-img {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.picture-divs-sub {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
.picture-divs{
  display: flex;
  flex-direction: column;
  gap: 30px;
} 
@media (max-width: 900px) {
.header-info-1 h2, .header-info-1 p {
  text-align: center;
}
.header-info-1 {
  align-items: center;
}
.form-body-info-sub-img img {
  width: 300px;
  height: 400px;
}
}
@media (max-width: 700px) {
.form-body-info, .picture-divs-sub {
  flex-direction: column;
  gap: 20px;
}
.form-body-info-sub {
  width: 100% !important;
}
}
@media (max-width: 600px) {
.loan-form-app {
  display: none;
}
}
@media (max-width: 500px) {
.image-div  img {
  width: 100px;
}
.image-div p {
  border-radius: 10px !important;
  text-align: center;
}
.form-body-info-sub-img img {
  width: 270px;
  height: 300px;
}
}
@media (max-width: 400px) {
.form-header, .image-div {
  flex-direction: column;
  align-items: center;
}
}
`;

const DownloadLoanForm = () => {
  const { id } = useParams(); // Get loan ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans?.find((loan) => loan._id === id);
  const loanId = id;
  const formRef = useRef();
  const [opened, setOpen] = useState(false);
    const { guarantorResponse } = useSelector((state) => state.guarantor);
    const guarantorRef = useRef();
    const picRef = useRef();


console.log(loan);

  // const options = {
  //   html2canvas: {
  //     useCORS: true,
  //     allowTaint: true,
  //     scale: 2,
  //   },
  // };

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
  
   
  // Wait until all images are fully loaded
  const waitForImagesToLoad = (ref) => {
    const imgs = Array.from(ref.current.querySelectorAll("img"));
    return Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      )
    );
  };

  const handleDownload = async () => {
    console.log("Preparing PDF...");

    // Wait for all images
    await waitForImagesToLoad(formRef);
    console.log("Images loaded, capturing...");

    // Capture with html2canvas
    const canvas = await html2canvas(formRef.current, {
      scale: 2, // better quality
      useCORS: true,
      allowTaint: false,
      imageTimeout: 0,
    });

    console.log("Canvas captured, generating PDF...");

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    let position = 0;
    let heightLeft = pdfHeight;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    // Additional pages
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save(
      `Loan form for ${loan?.customerDetails?.lastName || ""} ${
        loan?.customerDetails?.firstName || ""
      }.pdf`
    );
    console.log("PDF saved!");
  };

  
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
          to="/admin/customerdetails"
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
            padding: "0px",
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
                  <p>1, Adeniyi Street, Back of Rail Filling Stations, Oke Aro, Ogun State.</p>
                  <p>+234-7017501294 (Office)</p>
                  <p>https://jksolutn.com/</p>
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
               <p>{new Date(loan?.createdAt)?.toLocaleDateString("en-US")}</p>

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
                  <h5>NIN:</h5>
                  <p>{loan?.customerDetails.bvn}</p>
                </div>
                {/* <div className="form-body-info-sub">
                  <h5>Date of Birth:</h5>
                  <p>{loan?.customerDetails.dateOfBirth}</p>
                </div> */}
              </div>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Address:</h5>
                  <p>{loan?.customerDetails.address}</p>
                </div>
                  <div className="form-body-info-sub">
                  <h5>Mobile Number:</h5>
                  <p>{loan?.customerDetails.phoneOne}</p>
                </div>
               {/* <div className="form-body-info-sub">
                  <h5>Religion:</h5>
                  <p>{loan?.customerDetails.religion}</p>
                </div> */}
              </div>
              {/* <div className="form-body-info">
                
                
              </div> */}
              
             
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Next of Kin:</h5>
                  <p>{loan?.customerDetails.NextOfKin}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Next of Kin Number:</h5>
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
                {/* <div className="form-body-info-sub">
                  <h5>Years in Business Address:</h5>
                  <p>{loan?.businessDetails.yearsHere}</p>
                </div> */}
                <div className="form-body-info-sub">
                  <h5>Name Known As in Business Area:</h5>
                  <p>{loan?.businessDetails.nameKnown}</p>
                </div>
              </div>
              {/* <div className="form-body-info">
                
                <div className="form-body-info-sub">
                  <h5>Seasonal Business?:</h5>
                  <p>{loan?.businessDetails.additionalInfo}</p>
                </div>
              </div> */}
              <div className="form-body-info">
                {/* <div className="form-body-info-sub">
                  <h5>Amount Made in a Month:</h5>
                  <p>{loan?.businessDetails.estimatedValue}</p>
                </div> */}
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
              <h3>ACCOUNT DETAILS</h3>
              <div className="form-body-info">
                <div className="form-body-info-sub">
                  <h5>Account Name:</h5>
                  <p>{loan?.bankDetails.accountName}</p>
                </div>
                <div className="form-body-info-sub">
                  <h5>Account Number:</h5>
                  <p>{loan?.bankDetails.accountNo}</p>
                </div>
              </div>
               <div className="form-body-info">
                
                <div className="form-body-info-sub">
                  <h5>Bank  Name:</h5>
                  <p>{loan?.bankDetails.bankName}</p>
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
                  <h5>Relationship:</h5>
                  <p>{loan?.guarantorDetails.relationship}</p>
                </div>
                {/* <div className="form-body-info-sub">
                  <h5>Email:</h5>
                  <p>{loan?.guarantorDetails.email}</p>
                </div> */}
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
              <h3>Pictures</h3>
              <div className="picture-divs">
                <div className="picture-divs-sub">
                <div className="form-body-info-sub-img">
                  <h5>Customer picture:</h5>
     <img  
                    src={
                      loan?.pictures?.customer?.startsWith("http")
                        ? loan?.pictures?.customer // Cloudinary URL
                        : loan?.pictures?.customer
                        ? `https://api.jksolutn.com${loan?.pictures?.customer}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "contain" }}
                  />                </div>
                <div className="form-body-info-sub-img">
                  <h5>Business picture:</h5>
                      <img  
                    src={
                      loan?.pictures?.business?.startsWith("http")
                        ? loan?.pictures?.business // Cloudinary URL
                        : loan?.pictures?.business
                        ? `https://api.jksolutn.com${loan?.pictures?.business}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                </div>
                <div className="picture-divs-sub">
                {/* <div className="form-body-info-sub-img">
                  <h5>Other pictures:</h5>
                  <div className="other-pictures-div">
                  {loan?.pictures?.others.map((image, index) => (
                         <img
                    src={
                     image?.startsWith("http")
                        ?image // Cloudinary URL
                        :image
                        ? `https://api.jksolutn.com${image}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "contain" }}
                  />
                  ))}
                  </div>
                </div> */}
                </div>
              </div>
              
            </div>

            <div className="personal-Details">
              <h3>TERM AND CONDITIONS</h3>
              <div>
                <ol>
                  <li>
                    By submitting this form, I hereby declare that all information provided is true, accurate, and complete to the best of my knowledge and belief. I expressly authorize JK Solutn Loan and Savings Limited to verify any and all information contained herein and to conduct background or reference checks as may be deemed necessary in furtherance of this application. I further acknowledge and agree to be bound by the company's operational policies, procedures, and terms of service, 
                    as may be revised from time to time.
                  </li>
                  <li>
                    I understand and accept that in the event of a loan default, both I and the guarantor named in this application shall bear joint and several responsibility for the repayment of any and all outstanding amounts. Where I become unreachable, abscond, or fail to comply with repayment obligations, the guarantor shall be required to either produce me 
                    (the borrower) or discharge the full indebtedness without delay.
                  </li>
                  <li>
                    In circumstances where I fail, refuse, or neglect to repay the loan as agreed, JK Solutn Loan and Savings Limited reserves the full right to take possession of any goods, mobile phones, electronic devices, or other items of commercial value found at my residence, business premises, or any known location associated with me, for the purpose of debt recovery. Such items 
                    shall be held as collateral and shall only be released upon full repayment of the outstanding debt.
                  </li>
                  <li>Should the debt remain unpaid for a period of seven (7) days following confiscation, the
                     company shall be entitled, without further notice, to sell the seized items at fair market value. Proceeds 
                     from such sale shall be applied to offset the outstanding loan, and no refund, return, or compensation shall 
                     thereafter be owed to me or my guarantor.</li>
                     <li>Furthermore, I acknowledge and accept that the company reserves the right to pursue recovery of its funds through any lawful and appropriate enforcement 
                      method or means as it may deem fit, without limitation or obligation to notify me in advance.</li>
                </ol>
              </div>
              <div className="signature">
                <h5>Customer Signature:</h5>
               <img 
                    src={
                      loan?.pictures?.signature?.startsWith("http")
                        ? loan?.pictures?.signature // Cloudinary URL
                        : loan?.pictures?.signature
                        ? `https://api.jksolutn.com${loan?.pictures?.signature}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "contain" }}
                  />  
              </div>
              <div className="signature">
                <h5>Cso Signature:</h5>
               <img 
                    src={
                      loan?.csoSignature?.startsWith("http")
                        ? loan?.csoSignature // Cloudinary URL
                        : loan?.csoSignature
                        ? `https://api.jksolutn.com${loan?.csoSignature}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "contain" }}
                  />  
              </div>
              <div className="signature">
                <h5>Guarantor Signature:</h5>
               <img 
                    src={
                      loan?.guarantorDetails?.signature?.startsWith("http")
                        ? loan?.guarantorDetails?.signature // Cloudinary URL
                        : loan?.guarantorDetails?.signature
                        ? `https://api.jksolutn.com${loan?.guarantorDetails?.signature}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "contain" }}
                  />  
              </div>
            </div>
          </div>
        </div>
        {/* Download Button */}
      <button style={{
        marginBottom: "100px"
      }} onClick={handleDownload}>Download</button>{" "}
      </div>
      
          <div styled={{
           marginTop: "70px"
          }} className="personal-Details">
              <h3  styled={{
            marginTop: "70px"
          }}>Loan Disclosure Document</h3>
                <img  
                    src={
                      loan?.pictures?.disclosure?.startsWith("http")
                        ? loan?.pictures?.disclosure // Cloudinary URL
                        : loan?.pictures?.disclosure
                        ? `https://api.jksolutn.com${loan?.pictures?.disclosure}` // Local image
                        : "fallback.jpg" // Optional fallback image
                    }
                    alt="customer"
                    style={{ objectFit: "cover", width: "100%", height: "500px" }}
                  /> 
            </div>
    </DownloadRap>
  );
};

export default DownloadLoanForm;
