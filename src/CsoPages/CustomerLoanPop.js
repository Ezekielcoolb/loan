import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitLoanApplication } from "../redux/slices/LoanSlice";
import axios from "axios";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  setDropdownVisible,
  setDropSuccessVisible,
} from "../redux/slices/appSlice";
import { PulseLoader } from "react-spinners";
import imageCompression from "browser-image-compression";
import { resetUpload, uploadImages } from "../redux/slices/uploadSlice";
import SignatureCanvas from "react-signature-canvas";
import { fetchGroupLeadersByCso } from "../redux/slices/groupLeaderSlice";

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
    width: 300px;
    height: 40px;
    border-radius: 15px;
    padding: 10px;
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
    max-height: 600px;
    padding: 20px;
    width: 380px;
  }
  .loan-customers {
    overflow-y: auto;
  }
`;

const LoanApplicationForm = () => {
  const dispatch = useDispatch();
  const sigCanvas = useRef();
   const guaCanvas = useRef();

  const [ownerImage, setOwnerIamge] = useState("");
  const [loanerImage, setLoanerIamge] = useState("");
  const [otherImages, setOtherIamges] = useState("");
  const [signImage, setSignImage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("csoUser"));
  const [uploadTarget, setUploadTarget] = useState(null);
  const { urls, target, imageUploadloading } = useSelector(
    (state) => state.upload
  );
  const {
    options: groupLeaderOptions,
    optionsLoading: groupLeaderOptionsLoading,
    optionsError: groupLeaderOptionsError,
  } = useSelector((state) => state.groupLeader);

  const [selectedGroupLeaderId, setSelectedGroupLeaderId] = useState("");

  const [formData, setFormData] = useState({
    csoId: user.workId,
    branch: user.branch,
    csoSignature: user?.signature,
    csoName: `${user.firstName} ${user.lastName}`,
    customerDetails: {
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      phoneOne: "",
      address: "",
      bvn: null,
      NextOfKin: "",
      NextOfKinNumber: "",
    },
    businessDetails: {
      businessName: "",
      natureOfBusiness: "",
      address: "",
      yearsHere: "",
      nameKnown: "",
      estimatedValue: null,
      operationalStatus: "",
      additionalInfo: "",
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
      loanAppForm: 2000,
    },
    guarantorDetails: {
      name: "",
      address: "",
      phone: "",
      phoneTwo: "",
      email: "",
      relationship: "",
      yearsKnown: null,
      signature: "",
    },
    groupDetails: {
      groupName: "",
      leaderName: "",
      address: "",
      groupId: "",
      mobileNo: "",
    },
    pictures: {
      customer: "",
      business: "",
      others: [], // Ensure it's initialized as an empty array
      signature: "",
      disclosure: "",
    },
  });

  console.log(uploadTarget);
  console.log(formData);

  const { submitLoanloading, status, error } = useSelector(
    (state) => state.loan
  );

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
    formData.groupDetails.address !== "" &&
    formData.groupDetails.groupId !== "" &&
    formData.groupDetails.mobileNo !== "" &&
    formData.pictures.business !== "" &&
    formData.pictures.customer !== "" &&
      formData.pictures.disclosure !== "" &&
    formData.pictures.signature !== "";

  console.log(isValid);

  const { dropdowVisible } = useSelector((state) => state.app);

  const handleVisisble = () => {
    dispatch(setDropdownVisible());
  };

  useEffect(() => {
    if (user?.workId) {
      dispatch(fetchGroupLeadersByCso(user.workId));
    }
  }, [dispatch, user?.workId]);

  useEffect(() => {
    if (formData.groupDetails.groupId) {
      setSelectedGroupLeaderId(formData.groupDetails.groupId);
    }
  }, [formData.groupDetails.groupId]);

  const handleGroupLeaderSelect = (e) => {
    const selectedId = e.target.value;
    setSelectedGroupLeaderId(selectedId);
    const selectedLeader = groupLeaderOptions.find((leader) => leader._id === selectedId);

    if (selectedLeader) {
      setFormData((prev) => ({
        ...prev,
        groupDetails: {
          groupName: selectedLeader.groupName || "",
          leaderName: `${selectedLeader.firstName || ""} ${selectedLeader.lastName || ""}`.trim(),
          address: selectedLeader.address || "",
          groupId: selectedLeader._id || "",
          mobileNo: selectedLeader.phone || "",
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        groupDetails: {
          groupName: "",
          leaderName: "",
          address: "",
          groupId: "",
          mobileNo: "",
        },
      }));
    }
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

  //  const handleFirstImage = (files) => {
  //   if (!files.length) return;
  //   setUploadTarget("customer");
  //   dispatch(uploadImages({ files, folderName: "products" }));
  // };

  // const handleFirstImage = (fileList) => {
  //     setUploadTarget("customer");

  //   let files = Array.from(fileList);

  //   // Check if it's missing File metadata (e.g., no name)
  //   files = files.map((file, index) => {
  //     if (!file.name || !file.lastModified) {
  //       // Create a "File" from the Blob
  //       return new File([file], `photo_${Date.now()}_${index}.jpg`, {
  //         type: file.type || 'image/jpeg',
  //         lastModified: Date.now(),
  //       });
  //     }
  //     return file;
  //   });

  //   // Filter valid images (non-zero size and type)
  //   files = files.filter(f => f.size > 0 && f.type.startsWith("image/"));

  //   if (files.length === 0) {
  //     alert("Captured file is invalid or empty. Please try again.");
  //     return;
  //   }

  //   dispatch(uploadImages({ files, folderName: 'products' }));
  // };
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

  // const handleSecondImage = (files) => {
  //   if (!files.length) return;
  //   setUploadTarget("business");
  //   dispatch(uploadImages({ files, folderName: "products" }));
  // };

  // const handleSecondImage = (fileList) => {
  //     setUploadTarget("business");

  //   let files = Array.from(fileList);

  //   // Check if it's missing File metadata (e.g., no name)
  //   files = files.map((file, index) => {
  //     if (!file.name || !file.lastModified) {
  //       // Create a "File" from the Blob
  //       return new File([file], `photo_${Date.now()}_${index}.jpg`, {
  //         type: file.type || 'image/jpeg',
  //         lastModified: Date.now(),
  //       });
  //     }
  //     return file;
  //   });

  //   // Filter valid images (non-zero size and type)
  //   files = files.filter(f => f.size > 0 && f.type.startsWith("image/"));

  //   if (files.length === 0) {
  //     alert("Captured file is invalid or empty. Please try again.");
  //     return;
  //   }

  //   dispatch(uploadImages({ files, folderName: 'products' }));
  // };

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

  // const handleThirdImage = (files) => {
  //   if (!files.length) return;
  //   setUploadTarget("signature");
  //   dispatch(uploadImages({ files, folderName: "products" }));
  // };

  // const handleFileChange = (files) => {
  //   if (!files.length) return;
  //   setUploadTarget("others");
  //   dispatch(uploadImages({ files, folderName: "products" }));
  // };

  // const handleFileChange = (fileList) => {
  //     setUploadTarget("others");

  //   let files = Array.from(fileList);

  //   // Check if it's missing File metadata (e.g., no name)
  //   files = files.map((file, index) => {
  //     if (!file.name || !file.lastModified) {
  //       // Create a "File" from the Blob
  //       return new File([file], `photo_${Date.now()}_${index}.jpg`, {
  //         type: file.type || 'image/jpeg',
  //         lastModified: Date.now(),
  //       });
  //     }
  //     return file;
  //   });

  //   // Filter valid images (non-zero size and type)
  //   files = files.filter(f => f.size > 0 && f.type.startsWith("image/"));

  //   if (files.length === 0) {
  //     alert("Captured file is invalid or empty. Please try again.");
  //     return;
  //   }

  //   dispatch(uploadImages({ files, folderName: 'products' }));
  // };
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
    if (!imageUploadloading && urls.length > 0 && target) {
      setFormData((prev) => ({
        ...prev,
        pictures: {
          ...prev.pictures,
          [target]:
             urls[0],
        },
      }));
      dispatch(resetUpload()); // 👈 Clear upload state after use
    }
  }, [urls, imageUploadloading, target, dispatch]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vibrate on click
    if (navigator.vibrate) {
      navigator.vibrate(100); // 100ms vibration
    }

    if (isValid) {
      try {
        const res = await dispatch(submitLoanApplication(formData));

        // Vibrate again after successful submit
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100]); // vibrate-pause-vibrate
        }

        dispatch(setDropdownVisible());
        dispatch(setDropSuccessVisible());
        console.log(res);
      } catch (error) {
        console.log(error);
      }
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
  return (
    <LoanApplicationRap>
      <div className="dropdown-container">
        <form className="all-dropdown-div" onSubmit={handleSubmit}>
          <div className="cancel-btn">
            <Icon
              onClick={handleVisisble}
              icon="stash:times-circle"
              width="24"
              height="24"
              style={{ color: "#005e78", cursor: "pointer" }}
            />
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
            <div className="detailssss">
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
              </div>
            </div>

            <div className="detailssss">
              {/* Loan Details */}
              <h3>Group Details</h3>
              <select
                value={selectedGroupLeaderId}
                onChange={handleGroupLeaderSelect}
                required
              >
                <option value="">
                  {groupLeaderOptionsLoading
                    ? "Loading group leaders..."
                    : "Select Group Leader"}
                </option>
                {groupLeaderOptions.map((leader) => (
                  <option key={leader._id} value={leader._id}>
                    {leader.groupName} - {leader.firstName} {leader.lastName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={formData.groupDetails.groupName}
                placeholder="Group Name"
                readOnly
                className="display-only"
              />
              <input
                type="text"
                value={formData.groupDetails.leaderName}
                placeholder="Group Leader's Name"
                readOnly
                className="display-only"
              />
              <input
                type="text"
                value={formData.groupDetails.address}
                placeholder="Group Leader's Address"
                readOnly
                className="display-only"
              />
              <input
                type="text"
                value={formData.groupDetails.mobileNo}
                placeholder="Group Leader's Number"
                readOnly
                className="display-only"
              />
            </div>

            <div className="detailssss">
              {/* Loan Details */}
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
              <label className="upload-label">
                Upload Loan Disclosure Document
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(Array.from(e.target.files))}
              />
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

            <div className="detailssss">
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
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid || submitLoanloading}
              style={{
                backgroundColor: isValid ? "#0c1d55" : "#727789",
                cursor:
                  submitLoanloading || !isValid ? "not-allowed" : "pointer",
              }}
            >
              {submitLoanloading ? (
                <PulseLoader color="white" size={10} />
              ) : (
                "Confirm Application"
              )}
            </button>
          </div>
        </form>
      </div>
      {submitLoanloading ? (
        <div className="dropdown-container">
          <PulseLoader color="white" size={50} />
        </div>
      ) : (
        ""
      )}
    </LoanApplicationRap>
  );
};

export default LoanApplicationForm;
