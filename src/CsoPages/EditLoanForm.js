import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  clearUpdateLoanMessage,
  fetchAllLoansByCsoId,
  submitLoanApplication,
  updateLoan,
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
import { resetUpload, uploadImages } from "../redux/slices/uploadSlice";
import imageCompression from "browser-image-compression";
import { fetchOutstandingLoans } from "../redux/slices/otherLoanSlice";
import { fetchCsoByWorkId } from "../redux/slices/csoSlice";
import SignatureCanvas from "react-signature-canvas";

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
    height: auto;
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
  .success-visible {
    padding: 20px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  .success-visible p {
    font-size: 18px;
  }
`;

const EditApplicationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sigCanvas = useRef();
  const { id } = useParams();
  const guaCanvas = useRef();
  const [ownerImage, setOwnerIamge] = useState("");
  const [loanerImage, setLoanerIamge] = useState("");
  const [otherImages, setOtherIamges] = useState("");
  const [guarantorChange, setGuarantorChange] = useState(false);
  const [personalAddress, setPersonalAddress] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(false);
  const [groupLeaderChange, setGroupLeaderChange] = useState(false);

  const [signImage, setSignImage] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const [uploadTarget, setUploadTarget] = useState(null);
  const { urls, target, imageUploadloading } = useSelector(
    (state) => state.upload
  );
  const { updatingLoanLoading,  udateLoanmessage, status, error } = useSelector(
    (state) => state.loan
  );
  const loans = useSelector((state) => state.loan.loans);
  const successMessage = useSelector((state) => state.loan.successMessage);
  const loan = loans.find((loan) => loan._id === id);
  const [formData, setFormData] = useState({
    csoId: user?.workId,
    branch: user?.branch,
    csoSignature: user?.signature,
    csoName: `${user?.firstName} ${user?.lastName}`,
    customerDetails: {
      firstName: loan?.customerDetails?.firstName,
      lastName: loan?.customerDetails?.lastName,
      middleName: loan?.customerDetails?.middleName,
      dateOfBirth: loan?.customerDetails?.dateOfBirth,
      email: loan?.customerDetails?.email,
      phoneOne: loan?.customerDetails?.phoneOne,
      phoneTwo: loan?.customerDetails?.phoneTwo,
      address: loan?.customerDetails?.address,
      city: loan?.customerDetails?.city,
      state: loan?.customerDetails?.state,
      bvn: loan?.customerDetails?.bvn,
      religion: loan?.customerDetails?.religion,
      NextOfKin: loan?.customerDetails?.NextOfKin,
      NextOfKinNumber: loan?.customerDetails?.NextOfKinNumber,
    },
    businessDetails: {
      businessName: loan?.businessDetails?.businessName,
      natureOfBusiness: loan?.businessDetails?.natureOfBusiness,
      address: loan?.businessDetails?.address,
      yearsHere: loan?.businessDetails?.yearsHere,
      nameKnown: loan?.businessDetails?.nameKnown,
      estimatedValue: loan?.businessDetails?.estimatedValue,
      operationalStatus: loan?.businessDetails?.operationalStatus,
      additionalInfo: loan?.businessDetails?.additionalInfo,
    },
    bankDetails: {
      accountName:  loan?.bankDetails?.accountName,
      accountNo: loan?.bankDetails?.accountNo,
      bankName: loan?.bankDetails?.bankName,
    },
    loanDetails: {
      amountRequested: loan?.loanDetails?.amountRequested,
      loanType: "daily",
      amountApproved: null,
      loanAppForm: loan?.loanDetails?.loanAppForm,
    },
    guarantorDetails: {
      name: loan?.guarantorDetails?.name,
      address: loan?.guarantorDetails?.address,
      phone: loan?.guarantorDetails?.phone,
      phoneTwo: loan?.guarantorDetails?.phoneTwo,
      email: loan?.guarantorDetails?.email,
      relationship: loan?.guarantorDetails?.relationship,
      yearsKnown: loan?.guarantorDetails?.yearsKnown,
      signature: loan?.guarantorDetails?.signature,
    },
    groupDetails: {
      groupName: loan?.groupDetails?.groupName,
      leaderName: loan?.groupDetails?.leaderName,
      mobileNo: loan?.groupDetails?.mobileNo,
    },
    pictures: {
      customer: loan?.pictures?.customer ,
      business: loan?.pictures?.business ,
      others: [], // Ensure it's initialized as an empty array
      signature: loan?.pictures?.signature ,
      disclosure: loan?.pictures?.disclosure ,
    },
  });
console.log(loan);

  const { outstandingLoans, totalOutstandingLoans } = useSelector(
    (state) => state.otherLoan
  );
  const { specificCso, remittancestatus, hoursLeft, minutesLeft } = useSelector(
    (state) => state.cso
  );

  const defaultingTarget = specificCso?.defaultingTarget;

  console.log(totalOutstandingLoans, defaultingTarget);

  console.log(formData);

    const isValid =
    formData.csoSignature !== "" &&
    formData.csoSignature !== undefined &&
    formData.customerDetails.firstName !== "" &&
    formData.customerDetails.lastName !== "" &&
    formData.customerDetails.phoneOne !== "" &&
    formData.customerDetails.address !== "" &&
    formData.customerDetails.bvn !== "" &&
    formData.customerDetails.NextOfKin !== "" &&
    formData.customerDetails.NextOfKinNumber !== "" &&
    formData.businessDetails.natureOfBusiness !== "" &&
    formData.businessDetails.operationalStatus !== "" &&
    formData.businessDetails.businessName !== "" &&
    formData.businessDetails.address !== "" &&
    formData.businessDetails.nameKnown !== "" &&
    formData.bankDetails.accountName !== "" &&
    formData.bankDetails.accountNo !== "" &&
    formData.bankDetails.bankName !== "" &&
    formData.loanDetails.amountRequested !== "" &&
    formData.loanDetails.loanType !== "" &&
    formData.guarantorDetails.name !== "" &&
    formData.guarantorDetails.address !== "" &&
    formData.guarantorDetails.signature !== "" &&
    formData.guarantorDetails.phone !== "" &&
    formData.guarantorDetails.relationship !== "" &&
    formData.guarantorDetails.yearsKnown !== "" &&
    formData.groupDetails.groupName !== "" &&
    formData.groupDetails.leaderName !== "" &&
    formData.groupDetails.mobileNo !== "" &&
    formData.pictures.business !== "" &&
    formData.pictures.customer !== "" &&
      formData.pictures.disclosure !== "" &&
    formData.pictures.signature !== "";

  const { dropdowVisible } = useSelector((state) => state.app);

  const csoId = user.workId;
  const workId = user.workId;
  useEffect(() => {
    dispatch(fetchAllLoansByCsoId({ csoId }));
  }, [dispatch]);

  useEffect(() => {
    if (csoId) dispatch(fetchOutstandingLoans(csoId));
  }, [csoId, dispatch]);

 useEffect(() => {
  if (loan && user) {
    setFormData({
      csoId: loan?.csoId,
      branch: loan?.branch,
      csoSignature: loan?.csoSignature,
      csoName: loan?.csoName,
      customerDetails: { ...loan?.customerDetails },
      businessDetails: { ...loan?.businessDetails },
      bankDetails: { ...loan?.bankDetails },
      loanDetails: { ...loan?.loanDetails },
      guarantorDetails: { ...loan?.guarantorDetails },
      groupDetails: { ...loan?.groupDetails },
      pictures: {
        customer: loan?.pictures?.customer,
        business: loan?.pictures?.business,
        others: loan?.pictures?.others || [],
        signature: loan?.pictures?.signature,
        disclosure: loan?.pictures?.disclosure,
      },
    });
  }
  // ⛔️ don't add `formData` in deps, otherwise it resets every change
}, [loan?._id, user?._id]); 

  useEffect(() => {
    if (workId) dispatch(fetchCsoByWorkId(workId));
  }, [workId, dispatch]);

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

  const handleFirstImage = async (fileList) => {
    const target = "customer"; // 👈 local value, not setState
    let files = Array.from(fileList);

    files = await Promise.all(
      files.map(async (file, index) => {
        if (!file.name || !file.lastModified) {
          file = new File([file], `photo_${Date.now()}_${index}.jpg`, {
            type: file.type || "image/jpeg",
            lastModified: Date.now(),
          });
        }

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          return await imageCompression(file, options);
        } catch {
          return file;
        }
      })
    );

    files = files.filter((f) => f.size > 0 && f.type.startsWith("image/"));
    if (files.length === 0) return alert("Captured file is invalid or empty.");

    dispatch(uploadImages({ files, folderName: "products", target })); // 👈 pass target
  };

  const handleSecondImage = async (fileList) => {
    const target = "business"; // 👈 local value, not setState
    let files = Array.from(fileList);

    files = await Promise.all(
      files.map(async (file, index) => {
        if (!file.name || !file.lastModified) {
          file = new File([file], `photo_${Date.now()}_${index}.jpg`, {
            type: file.type || "image/jpeg",
            lastModified: Date.now(),
          });
        }

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          return await imageCompression(file, options);
        } catch {
          return file;
        }
      })
    );

    files = files.filter((f) => f.size > 0 && f.type.startsWith("image/"));
    if (files.length === 0) return alert("Captured file is invalid or empty.");

    dispatch(uploadImages({ files, folderName: "products", target })); // 👈 pass target
  };

  const handleThirdImage = async (fileList) => {
    const target = "signature"; // 👈 local value, not setState
    let files = Array.from(fileList);

    files = await Promise.all(
      files.map(async (file, index) => {
        if (!file.name || !file.lastModified) {
          file = new File([file], `photo_${Date.now()}_${index}.jpg`, {
            type: file.type || "image/jpeg",
            lastModified: Date.now(),
          });
        }

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          return await imageCompression(file, options);
        } catch {
          return file;
        }
      })
    );

    files = files.filter((f) => f.size > 0 && f.type.startsWith("image/"));
    if (files.length === 0) return alert("Captured file is invalid or empty.");

    dispatch(uploadImages({ files, folderName: "products", target })); // 👈 pass target
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
  const handleGroupLeaderChange = () => {
    setGroupLeaderChange(!groupLeaderChange);
  };

  const handleFileChange = async (fileList) => {
    const target = "disclosure"; // 👈 local value, not setState
    let files = Array.from(fileList);

    files = await Promise.all(
      files.map(async (file, index) => {
        if (!file.name || !file.lastModified) {
          file = new File([file], `photo_${Date.now()}_${index}.jpg`, {
            type: file.type || "image/jpeg",
            lastModified: Date.now(),
          });
        }

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        };
        try {
          return await imageCompression(file, options);
        } catch {
          return file;
        }
      })
    );

    files = files.filter((f) => f.size > 0 && f.type.startsWith("image/"));
    if (files.length === 0) return alert("Captured file is invalid or empty.");

    dispatch(uploadImages({ files, folderName: "products", target })); // 👈 pass target
  };

  useEffect(() => {
    if (!loading && urls.length > 0 && target) {
      setFormData((prev) => ({
        ...prev,
        pictures: {
          ...prev.pictures,
          [target]: urls[0],
        },
      }));
      dispatch(resetUpload()); // 👈 Clear upload state after use
    }
  }, [urls, loading, target, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vibrate on click
    if (navigator.vibrate) {
      navigator.vibrate(100); // 100ms vibration
    }

    if (isValid) {
      try {
        const res = await     dispatch(updateLoan({ id: id, updateData: formData }));;

        // Vibrate again after successful submit
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]); // vibrate-pause-vibrate
        }

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClose = () => {
    dispatch(clearUpdateLoanMessage());
    navigate("/cso");
  };

  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const handleSaveSignature = async () => {
    if (sigCanvas.current.isEmpty()) {
      alert("Please provide a signature.");
      return;
    }

    // Convert signature to base64
    const dataUrl = sigCanvas.current.toDataURL("image/png");

    // Convert base64 to file
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], `signature_${Date.now()}.png`, {
      type: "image/png",
    });

    // Optional: Compress the file
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });

    // Upload the file
    const result = await dispatch(
      uploadImages({ files: [compressedFile], folderName: "products" })
    );

    if (result.payload?.urls?.length) {
      const signatureUrl = result.payload.urls[0];

      // Update formData
      setFormData((prev) => ({
        ...prev,
        pictures: {
          ...prev.pictures,
          signature: signatureUrl,
        },
      }));

      alert("Signature uploaded successfully!");
    } else {
      alert("Failed to upload signature.");
    }
  };

  const clearSignatureTwo = () => {
    guaCanvas.current.clear();
  };

  const handleSaveSignatureTwo = async () => {
    if (guaCanvas.current.isEmpty()) {
      alert("Please provide a signature.");
      return;
    }

    // Convert signature to base64
    const dataUrl = guaCanvas.current.toDataURL("image/png");

    // Convert base64 to file
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    const file = new File([blob], `signature_${Date.now()}.png`, {
      type: "image/png",
    });

    // Optional: Compress the file
    const compressedFile = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    });

    // Upload the file
    const result = await dispatch(
      uploadImages({ files: [compressedFile], folderName: "products" })
    );

    if (result.payload?.urls?.length) {
      const signatureUrl = result.payload.urls[0];

      // Update formData
      setFormData((prev) => ({
        ...prev,
        guarantorDetails: {
          ...prev.guarantorDetails,
          signature: signatureUrl,
        },
      }));

      alert("Signature uploaded successfully!");
    } else {
      alert("Failed to upload signature.");
    }
  };

  const handleVisisble = () => {
    navigate("/cso");
  };
  return (
    <LoanApplicationRap>
      {totalOutstandingLoans > defaultingTarget && defaultingTarget !== 0 ? (
        <div className="dropdown-container">
          <div className="success-visible">
            <p style={{ color: "red" }}>
              You have exceeded your defaulting limit of
              <span
                style={{
                  fontWeight: "900",
                  fontSize: "40px",
                }}
              >
                {" "}
                {formatNumberWithCommas(defaultingTarget)}{" "}
              </span>
              Try to clear the defaults in order to submit new loans. <br />{" "}
              Thanks.
            </p>
            <button onClick={handleVisisble}>Exit</button>
          </div>
        </div>
      ) : (
        <div className="">
          <form className="all-dropdown-div" onSubmit={handleSubmit}>
            <div className="upper-mininal">
              <h1> EDIT APPLICATION FORM</h1>

              <Link to="/cso"  className="cancel-btn">
                <Icon
                  icon="stash:times-circle"
                  width="24"
                  height="24"
                  style={{ color: "#005e78", cursor: "pointer" }}
                />
              </Link>
            </div>
            <div className="loan-customers">
                        <div className="detailssss">
                          <h3>Customer Details</h3>
                          <input
                            type="text"
                            name="customerDetails.firstName"
                            value={formData.customerDetails.firstName}
                            onChange={handleInputChange}
                            placeholder="First Name"
                            required
                          />
                          {/* <input
                            type="text"
                            name="customerDetails.middleName"
                            value={formData.customerDetails.middleName}
                            onChange={handleInputChange}
                            placeholder="Middle Name (Optional"
                            required
                          /> */}
                          <input
                            type="text"
                            name="customerDetails.lastName"
                            value={formData.customerDetails.lastName}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                            required
                          />
                          {/* <label className="upload-label">Date of Birth</label>
            
                          <input
                            type="date"
                            name="customerDetails.dateOfBirth"
                            value={formData.customerDetails.dateOfBirth}
                            onChange={handleInputChange}
                            placeholder="Date of Birth"
                            required
                          /> */}
                          {/* <input
                            type="email"
                            name="customerDetails.email"
                            value={formData.customerDetails.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                          /> */}
            
                          <input
                            type="text"
                            name="customerDetails.address"
                            value={formData.customerDetails.address}
                            onChange={handleInputChange}
                            placeholder="Address"
                            required
                          />
                          {/* <input
                            type="text"
                            name="customerDetails.city"
                            value={formData.customerDetails.city}
                            onChange={handleInputChange}
                            placeholder="City"
                            required
                          /> */}
                          {/* <input
                            type="text"
                            name="customerDetails.state"
                            value={formData.customerDetails.state}
                            onChange={handleInputChange}
                            placeholder="State"
                            required
                          /> */}
                          <input
                            type="number"
                            name="customerDetails.bvn"
                            value={formData.customerDetails.bvn}
                            onChange={handleInputChange}
                            placeholder="NIN"
                            required
                          />
                          <input
                            type="text"
                            name="customerDetails.phoneOne"
                            value={formData.customerDetails.phoneOne}
                            onChange={handleInputChange}
                            placeholder="Enter phone number in form of +234XXXXXXXXXX"
                            required
                          />
                          {/* <input
                            type="text"
                            name="customerDetails.phoneTwo"
                            value={formData.customerDetails.phoneTwo}
                            onChange={handleInputChange}
                            placeholder="Mobile No 2 in form of +234XXXXXXXXXX"
                          
                          /> */}
                          {/* <input
                            type="text"
                            name="customerDetails.religion"
                            value={formData.customerDetails.religion}
                            onChange={handleInputChange}
                            placeholder="Religion"
                          
                          /> */}
                          <input
                            type="text"
                            name="customerDetails.NextOfKin"
                            value={formData.customerDetails.NextOfKin}
                            onChange={handleInputChange}
                            placeholder="Next of Kin"
                          />
                          <input
                            type="number"
                            name="customerDetails.NextOfKinNumber"
                            value={formData.customerDetails.NextOfKinNumber}
                            onChange={handleInputChange}
                            placeholder="Next of Kin Number"
                          />
                        </div>
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
                          {/* <input
                            type="text"
                            name="businessDetails.yearsHere"
                            value={formData.businessDetails.yearsHere}
                            onChange={handleInputChange}
                            placeholder="Years you've been in the business address"
                            required
                          /> */}
                          <input
                            type="text"
                            name="businessDetails.nameKnown"
                            value={formData.businessDetails.nameKnown}
                            onChange={handleInputChange}
                            placeholder="Name you are know as in the business area"
                            required
                          />
                          {/* <input
                            type="number"
                            name="businessDetails.estimatedValue"
                            value={formData.businessDetails.estimatedValue}
                            onChange={handleInputChange}
                            placeholder="How much do you make in a month"
                            required
                          /> */}
                          <input
                            type="text"
                            name="businessDetails.operationalStatus"
                            value={formData.businessDetails.operationalStatus}
                            onChange={handleInputChange}
                            placeholder="What is the worth of your business"
                            required
                          />
                          {/* <input
                            type="text"
                            name="businessDetails.additionalInfo"
                            value={formData.businessDetails.additionalInfo}
                            onChange={handleInputChange}
                            placeholder="Is your business seasonal?"
                          /> */}
                        </div>
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
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
            
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
                          {/* <input
                            type="email"
                            name="guarantorDetails.email"
                            value={formData.guarantorDetails.email}
                            onChange={handleInputChange}
                            placeholder="Guarantor Email"
                          /> */}
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
                        {/* <div className="detailssss">
                          <h3>Guarantor Signature</h3>
            
                          <SignatureCanvas
                            ref={guaCanvas}
                            penColor="black"
                            canvasProps={{
                              width: 305,
                              height: 350,
                              className: "sigCanvas",
                              style: { border: "1px solid #ccc", borderRadius: "8px" },
                            }}
                          />
                          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                            <button onClick={clearSignatureTwo}>Clear</button>
                            <button
                              onClick={handleSaveSignatureTwo}
                              disabled={!!formData.guarantorDetails.signature}
                              style={{
                                filter: formData.guarantorDetails.signature ? "blur(2px)" : "none",
                                cursor: formData.guarantorDetails.signature
                                  ? "not-allowed"
                                  : "pointer",
                                opacity: formData.guarantorDetails.signature ? 0.6 : 1,
                              }}
                            >
                              {imageUploadloading ? (
                                <PulseLoader color="white" size={10} />
                              ) : (
                                "Save Signature"
                              )}
                            </button>{" "}
                          </div>
                          </div> */}
                        </div>
            
                        <div className="detailssss">
                          {/* Loan Details */}
                          <h3>Group Details</h3>
                          <input
                            type="text"
                            name="groupDetails.groupName"
                            value={formData.groupDetails.groupName}
                            onChange={handleInputChange}
                            placeholder="Group Name"
                            required
                          />
                          <input
                            type="text"
                            name="groupDetails.leaderName"
                            value={formData.groupDetails.leaderName}
                            onChange={handleInputChange}
                            placeholder="Group Leader's Name"
                            required
                          />
                          <input
                            type="text"
                            name="groupDetails.mobileNo"
                            value={formData.groupDetails.mobileNo}
                            onChange={handleInputChange}
                            placeholder="Group Leader's Number"
                            required
                          />
                        </div>
                        <div className="detailssss">
                          <h3>Upload Pictures</h3>
            
                          <label className="upload-label">Upload customer picture</label>
                          <input
                            type="file"
                            capture="user"
                            onChange={(e) => handleFirstImage(e.target.files)}
                            required
                          />
                          <img style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }} src={`https://api.jksolutn.com/${formData?.pictures?.customer}`} alt="" />
                          <label className="upload-label">Upload business picture</label>
                          <input
                            type="file"
                            capture="user"
                            onChange={(e) => handleSecondImage(e.target.files)}
                            required
                          />
                           <img style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }} src={`https://api.jksolutn.com/${formData?.pictures?.business}`} alt="" />
                          <label className="upload-label">
                            Upload Loan Disclosure Document
                          </label>
                          <input
                            type="file"
                            multiple
                            onChange={(e) => handleFileChange(Array.from(e.target.files))}
                          />
                           <img style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px",
                          }} src={`https://api.jksolutn.com/${formData?.pictures?.disclosure}`} alt="" />
                        </div>
                        {/* <div className="detailssss">
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
                        </div> */}
            
                        {/* <div className="detailssss">
                          <h3>Customer Signature</h3>
            
                          <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{
                              mwidth: 300,
                              height: 600,
                              className: "sigCanvas",
                              style: { border: "1px solid #ccc", borderRadius: "8px" },
                            }}
                          />
            
                          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                            <button onClick={clearSignature}>Clear</button>
                            <button
                              onClick={handleSaveSignature}
                              disabled={!!formData.pictures.signature}
                              style={{
                                filter: formData.pictures.signature ? "blur(2px)" : "none",
                                cursor: formData.pictures.signature
                                  ? "not-allowed"
                                  : "pointer",
                                opacity: formData.pictures.signature ? 0.6 : 1,
                              }}
                            >
                              {imageUploadloading ? (
                                <PulseLoader color="white" size={10} />
                              ) : (
                                "Save Signature"
                              )}
                            </button>{" "}
                          </div>
                        </div> */}
            
                        <button
                          type="submit"
                          onClick={handleSubmit}
                          disabled={!isValid || updatingLoanLoading}
                          style={{
                            backgroundColor: isValid ? "#0c1d55" : "#727789",
                            cursor:
                              updatingLoanLoading || !isValid ? "not-allowed" : "pointer",
                          }}
                        >
                          {updatingLoanLoading ? (
                            <PulseLoader color="white" size={10} />
                          ) : (
                            "Confirm Application"
                          )}
                        </button>
                      </div>
          </form>
        </div>
      )}

      {udateLoanmessage && (
        <ModalOverlay>
          <ModalContent>
            <h3>Success 🎉</h3>
            <p>{udateLoanmessage}</p>
            <button
              style={{
                backgroundColor: "#0067D0",
              }}
              onClick={handleClose}
            >
              Continue
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
      {updatingLoanLoading ? (
        <div className="dropdown-container">
          <PulseLoader color="white" size={50} />
        </div>
      ) : (
        ""
      )}
    </LoanApplicationRap>
  );
};

export default EditApplicationForm;
