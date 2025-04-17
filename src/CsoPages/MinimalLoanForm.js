import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    clearMessages,
  fetchAllLoansByCsoId,
  submitLoanApplication,
} from "../redux/slices/LoanSlice";
import axios from "axios";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  setDropdownVisible,
  setDropSuccessVisible,
} from "../redux/slices/appSlice";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate, useParams } from "react-router-dom";


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* ✅ Semi-transparent background */
  backdrop-filter: blur(5px); /* ✅ Blurred background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  h3 {
    font-size: 24px;
    font-weight: 600px;
  }
  button {
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    border-style: none;
    width: 120px;
    height: 40px;
    border-radius: 10px;
  }
`;

const LoanApplicationRap = styled.div`
  margin-bottom: 100px;
  h3 {
    color: #005e78;
    font-weight: 700px;
    size: 16px;
    text-align: center;
    margin: auto;
  }
  .upload-label {
    color: #005e78;
    font-weight: 400px;
    size: 12px;
    margin-bottom: 0px;
  }
  input,
  select {
    width: 350px;
    height: 45px;
    border-radius: 15px;
    padding: 10px;
    border-style: none;
    background: #eaeaea;
  }
  .cancel-btn {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .all-dropdown-div {
    padding-bottom: 50px !important;
  }
  .upper-mininal h1 {
    color: #005e78;
    font-weight: 700px;
    size: 16px;
    margin: auto;
  }
  .upper-mininal {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  button {
    background: #005e78;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    color: #ffffff;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 200px;
    height: 40px;
    padding: 20px;
    border-style: none;
    margin: auto;
  }
  .loan-customers {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .detailssss {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .all-dropdown-div {
    max-height: 100vh;
    padding: 20px;
    width: 100%;
  }
  .loan-customers {
    overflow-y: auto;
  }
  .change-guarantor {
    color: #005e78;
    font-weight: 400px;
    size: 14px;
  }
`;

const MinimalApplicationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [ownerImage, setOwnerIamge] = useState("");
  const [loanerImage, setLoanerIamge] = useState("");
  const [otherImages, setOtherIamges] = useState("");
  const [guarantorChange, setGuarantorChange] = useState(false);
  const [personalAddress, setPersonalAddress] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(false);
  const [signImage, setSignImage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const loans = useSelector((state) => state.loan.loans);
  const successMessage = useSelector((state) => state.loan.successMessage);
  const loan = loans.find((loan) => loan._id === id);
  const [formData, setFormData] = useState({
    csoId: user.workId,
    branch: user.branch,
    csoName: `${user.firstName} ${user.lastName}`,
    customerDetails: {
      firstName: loan.customerDetails.firstName,
      lastName: loan.customerDetails.lastName,
      middleName: loan.customerDetails.middleName,
      dateOfBirth: loan.customerDetails.dateOfBirth,
      email: loan.customerDetails.email,
      phoneOne: loan.customerDetails.phoneOne,
      phoneTwo: loan.customerDetails.phoneTwo,
      address: loan.customerDetails.address,
      city: loan.customerDetails.city,
      state: loan.customerDetails.state,
      bvn: loan.customerDetails.bvn,
      religion: loan.customerDetails.religion,
      NextOfKin: loan.customerDetails.NextOfKin,
      NextOfKinNumber: loan.customerDetails.NextOfKinNumber,
    },
    businessDetails: {
      businessName: loan.businessDetails.businessName,
      natureOfBusiness: loan.businessDetails.natureOfBusiness,
      address: loan.businessDetails.address,
      yearsHere: loan.businessDetails.yearsHere,
      nameKnown: loan.businessDetails.nameKnown,
      estimatedValue: loan.businessDetails.estimatedValue,
      operationalStatus: loan.businessDetails.operationalStatus,
      additionalInfo: loan.businessDetails.additionalInfo,
    },
    bankDetails: {
      accountName: "",
      accountNo: null,
      bankName: "",
    },
    loanDetails: {
      amountRequested: null,
      loanType: "daily",
      amountApproved: null,
      loanAppForm: 1500,
    },
    guarantorDetails: {
      name: loan.guarantorDetails.name,
      address: loan.guarantorDetails.address,
      phone: loan.guarantorDetails.phone,
      phoneTwo: loan.guarantorDetails.phoneTwo,
      email: loan.guarantorDetails.email,
      relationship: loan.guarantorDetails.relationship,
      yearsKnown: loan.guarantorDetails.yearsKnown,
    },
    groupDetails: {
      groupName: loan.groupDetails.groupName,
      leaderName: loan.groupDetails.leaderName,
      mobileNo: loan.groupDetails.mobileNo,
    },
    pictures: {
      customer: "",
      business: "",
      others: [], // Ensure it's initialized as an empty array
      signature: "",
    },
  });

  console.log(successMessage);

  const isValid =
    formData.customerDetails.firstName !== "" &&
    formData.customerDetails.lastName !== "" &&
    formData.customerDetails.middleName !== "" &&
    formData.customerDetails.email !== "" &&
    formData.customerDetails.phoneOne !== "" &&
    formData.customerDetails.address !== "" &&
    formData.customerDetails.city !== "" &&
    formData.customerDetails.state !== "" &&
    formData.customerDetails.bvn !== "" &&
    formData.customerDetails.dateOfBirth !== "" &&
    formData.customerDetails.religion !== "" &&
    formData.customerDetails.NextOfKin !== "" &&
    formData.customerDetails.NextOfKinNumber !== "" &&
    formData.businessDetails.natureOfBusiness !== "" &&
    formData.businessDetails.estimatedValue !== "" &&
    formData.businessDetails.operationalStatus !== "" &&
    formData.businessDetails.businessName !== "" &&
    formData.businessDetails.address !== "" &&
    formData.businessDetails.yearsHere !== "" &&
    formData.businessDetails.nameKnown !== "" &&
    formData.bankDetails.accountName !== "" &&
    formData.bankDetails.accountNo !== "" &&
    formData.bankDetails.bankName !== "" &&
    formData.loanDetails.amountRequested !== "" &&
    formData.loanDetails.loanType !== "" &&
    formData.guarantorDetails.name !== "" &&
    formData.guarantorDetails.address !== "" &&
    formData.guarantorDetails.email !== "" &&
    formData.guarantorDetails.phone !== "" &&
    formData.guarantorDetails.relationship !== "" &&
    formData.guarantorDetails.yearsKnown !== "" &&
    formData.groupDetails.groupName !== "" &&
    formData.groupDetails.leaderName !== "" &&
    formData.groupDetails.mobileNo !== "" &&
    ownerImage !== "" &&
    loanerImage !== "" &&
    signImage !== "" 

  const { dropdowVisible } = useSelector((state) => state.app);

  const csoId = user.workId;

  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  const handleVisisbleNow = () => {
    navigate(`/cso/customer-details/${loan?._id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // for nested properties
    setFormData((prevState) => {
      let newData = { ...prevState };
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleFirstImage = async (e) => {
    try {
      const form = new FormData();
      form.append("file", e[0]);
      form.append("upload_preset", "ml_default");
      const imageUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        form
      );
      setOwnerIamge(imageUrl.data.secure_url);
      // setFormData(formData.pictures.business === imageUrl.data.secure_url)
      console.log(imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSecondImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("upload_preset", "ml_default");
      const imageUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        formData
      );
      console.log(imageUrl);
      setLoanerIamge(imageUrl.data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };
  const handleThirdImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("upload_preset", "ml_default");
      const imageUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        formData
      );
      console.log(imageUrl);
      setSignImage(imageUrl.data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGuarantorChange = () => {
    setGuarantorChange(!guarantorChange);
  };

  const handleAddressChange = () => {
    setPersonalAddress(!personalAddress);
  };

  const handleBusinessChange = () => {
    setBusinessInfo(!businessInfo);
  };

  const handleFileChange = async (e) => {
    const imageUrls = [];
    try {
      for (const img of e) {
        const form = new FormData();
        form.append("file", img);
        form.append("upload_preset", "ml_default");
        const imageUrl = await axios.post(
          `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
          form
        );
        console.log(imageUrl);
        imageUrls.push(imageUrl.data.secure_url);
        setOtherIamges(imageUrls);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        formData.pictures = {
          customer: ownerImage,
          business: loanerImage,
          others: otherImages,
          signature: signImage,
        };
        setLoading(true);
        const res = await dispatch(submitLoanApplication(formData));
        setLoading(false);
        dispatch(setDropdownVisible());
        dispatch(setDropSuccessVisible());
        console.log(res);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    dispatch(clearMessages()); 
    navigate(`/cso/customer-details/${loan?._id}`);
  };

  return (
    <LoanApplicationRap>
      <div className="">
        <form className="all-dropdown-div" onSubmit={handleSubmit}>
          <div className="upper-mininal">
            <h1> REAPPLICATION FORM</h1>

            <div className="cancel-btn">
              <Icon
                onClick={handleVisisbleNow}
                icon="stash:times-circle"
                width="24"
                height="24"
                style={{ color: "#005e78", cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="loan-customers">
            <Link className="change-guarantor" onClick={handleAddressChange}>
              Does your address change?
            </Link>
            {personalAddress ? (
              <div className="detailssss">
                <h3>Customer Details</h3>

                <input
                  type="text"
                  name="customerDetails.address"
                  value={formData.customerDetails.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  required
                />
                <input
                  type="text"
                  name="customerDetails.city"
                  value={formData.customerDetails.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  required
                />
                <input
                  type="text"
                  name="customerDetails.state"
                  value={formData.customerDetails.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  required
                />
              </div>
            ) : (
              ""
            )}
            <div className="detailssss">
              {/* Loan Details */}
              <h3>Loan Details</h3>
              <input
                type="number"
                name="loanDetails.amountRequested"
                value={formData.loanDetails.amountRequested}
                onChange={handleInputChange}
                placeholder="Amount Requested"
                required
              />
              <select
                name="loanDetails.loanType"
                value={formData.loanDetails.loanType}
                onChange={handleInputChange}
                required
              >
                <option value="daily">Daily</option>
                {/* <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option> */}
              </select>
            </div>

            <Link className="change-guarantor" onClick={handleBusinessChange}>
              Does the business information change?
            </Link>
            {businessInfo ? (
              <div className="detailssss">
                {/* Business Details */}
                <h3>Business Details</h3>
                <input
                  type="text"
                  name="businessDetails.businessName"
                  value={formData.businessDetails.businessName}
                  onChange={handleInputChange}
                  placeholder="Business Name"
                  required
                />
                <input
                  type="text"
                  name="businessDetails.natureOfBusiness"
                  value={formData.businessDetails.natureOfBusiness}
                  onChange={handleInputChange}
                  placeholder="Nature of Business"
                  required
                />
                <input
                  type="text"
                  name="businessDetails.address"
                  value={formData.businessDetails.address}
                  onChange={handleInputChange}
                  placeholder="Business Address"
                  required
                />
                <input
                  type="text"
                  name="businessDetails.yearsHere"
                  value={formData.businessDetails.yearsHere}
                  onChange={handleInputChange}
                  placeholder="Years you've been in the business address"
                  required
                />
                <input
                  type="text"
                  name="businessDetails.nameKnown"
                  value={formData.businessDetails.nameKnown}
                  onChange={handleInputChange}
                  placeholder="Name you are know as in the business area"
                  required
                />
                <input
                  type="number"
                  name="businessDetails.estimatedValue"
                  value={formData.businessDetails.estimatedValue}
                  onChange={handleInputChange}
                  placeholder="How much do you make in a month"
                  required
                />
                <input
                  type="text"
                  name="businessDetails.operationalStatus"
                  value={formData.businessDetails.operationalStatus}
                  onChange={handleInputChange}
                  placeholder="What is the worth of your business"
                  required
                />
              </div>
            ) : (
              ""
            )}

            <div className="detailssss">
              {/* Loan Details */}
              <h3>Bank Details</h3>
              <input
                type="text"
                name="bankDetails.accountName"
                value={formData.bankDetails.accountName}
                onChange={handleInputChange}
                placeholder="Name of Account"
                required
              />
              <input
                type="number"
                name="bankDetails.accountNo"
                value={formData.bankDetails.accountNo}
                onChange={handleInputChange}
                placeholder="Account Number"
                required
              />
              <input
                type="text"
                name="bankDetails.bankName"
                value={formData.bankDetails.bankName}
                onChange={handleInputChange}
                placeholder="Bank Name"
                required
              />
            </div>

            <Link className="change-guarantor" onClick={handleGuarantorChange}>
              Will you like to change Guarantor?
            </Link>
            {guarantorChange ? (
              <div className="detailssss">
                {/* Guarantor Details */}
                <h3>Guarantor Details</h3>
                <input
                  type="text"
                  name="guarantorDetails.name"
                  value={formData.guarantorDetails.name}
                  onChange={handleInputChange}
                  placeholder=" Name in Full"
                  required
                />
                <input
                  type="text"
                  name="guarantorDetails.address"
                  value={formData.guarantorDetails.address}
                  onChange={handleInputChange}
                  placeholder="Guarantor Address"
                  required
                />
                <input
                  type="text"
                  name="guarantorDetails.phone"
                  value={formData.guarantorDetails.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number in form of +234XXXXXXXXXX"
                  required
                />
                {/* <input
                type="text"
                name="guarantorDetails.phoneTwo"
                value={formData.guarantorDetails.phoneTwo}
                onChange={handleInputChange}
                placeholder="Mobile No 2 in form of +234XXXXXXXXXX"
               
              /> */}
                <input
                  type="email"
                  name="guarantorDetails.email"
                  value={formData.guarantorDetails.email}
                  onChange={handleInputChange}
                  placeholder="Guarantor Email"
                />
                <input
                  type="text"
                  name="guarantorDetails.relationship"
                  value={formData.guarantorDetails.relationship}
                  onChange={handleInputChange}
                  placeholder="Relationship to Guarantor"
                  required
                />
                <input
                  type="number"
                  name="guarantorDetails.yearsKnown"
                  value={formData.guarantorDetails.yearsKnown}
                  onChange={handleInputChange}
                  placeholder="Years Known"
                  required
                />
              </div>
            ) : (
              ""
            )}

            <div className="detailssss">
              {/* Pictures */}
              <h3>Upload Pictures</h3>
              <label className="upload-label">Upload customer picture</label>
              <input
                type="file"
                capture="user"
                onChange={(e) => handleFirstImage(e.target.files)}
                required
              />
              <label className="upload-label">Upload business picture</label>
              <input
                type="file"
                capture="user"
                onChange={(e) => handleSecondImage(e.target.files)}
                required
              />
              {/* <label className="upload-label">
                {" "}
                Upload another business picture
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(Array.from(e.target.files))}
              /> */}
            </div>
            <div className="detailssss">
              {/* Pictures */}
              <h3>Signature</h3>

              <label className="upload-label">
                Upload customer's signature
              </label>
              <input
                type="file"
                capture="user"
                onChange={(e) => handleThirdImage(e.target.files)}
                required
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid}
              style={{
                backgroundColor: isValid ? "#0c1d55" : "#727789",
                cursor: loading || !isValid ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <PulseLoader color="white" size={10} />
              ) : (
                "Confirm Application"
              )}
            </button>
          </div>
        </form>
      </div>
      {successMessage && (
        <ModalOverlay>
          <ModalContent>
            <h3>Success 🎉</h3>
            <p>{successMessage}</p>
            <button
              style={{
                backgroundColor: "#0067D0",
              }}
              onClick={handleClose}             >
              Continue
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
    </LoanApplicationRap>
  );
};

export default MinimalApplicationForm;
