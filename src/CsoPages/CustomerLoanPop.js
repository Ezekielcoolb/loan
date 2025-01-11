import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitLoanApplication } from "../redux/slices/LoanSlice";
import axios from "axios";
import styled from "styled-components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { setDropdownVisible } from "../redux/slices/appSlice";

const LoanApplicationRap = styled.div`
margin-bottom: 100px;
h3 {
  color: #005e78;
  font-weight: 700px;
  size: 16px;
  text-align: center;
}
input, select {
width: 300px;
height: 40px;
border-radius: 15px;
padding: 10px;
background: #EAEAEA ;
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
  background: #005E78;
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
  justify-content: center;
  align-items: center;
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
  const [ownerImage, setOwnerIamge] = useState("");
  const [loanerImage, setLoanerIamge] = useState("");
  const [otherImages, setOtherIamges] = useState("");
   const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    csoId: user.workId,
    branch: user.branch,
    csoName: `${user.firstName} ${user.lastName}`,
    customerDetails: {
      firstName: "",
      lastName: "",
      middleName: "",
      dateOfBirth: "",
      email: "",
      phoneOne: "",
      phoneTwo: "",
      address: "",
      bvn: null,
    },
    businessDetails: {
      businessName: "",
      natureOfBusiness: "",
      estimatedValue: null,
      operationalStatus: "",
      additionalInfo: ""
    },
    bankDetails: {
      accountName: "",
      accountNo: null,
      bankName: "",
    
    },
    loanDetails: {
      amountRequested: null,
      loanType: "",
      amountApproved: null,
    },
    guarantorDetails: {
      name: "",
      address: "",
      phone: "",
      phoneTwo: "",
      email: "",
      relationship: "",
      yearsKnown: null,
    },
    groupDetails: {
      groupName: "",
      leaderName: "",
      mobileNo: "",
    
    },
    pictures: {
      customer: "",
      business: "",
      others: [], // Ensure it's initialized as an empty array
    },
  });
  const { dropdowVisible} = useSelector((state) => state.app);
  
  
   
   
  
  const handleVisisble = () => {
    dispatch(setDropdownVisible());
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

    try {
      formData.pictures = {
        customer: ownerImage,
        business: loanerImage,
        others: otherImages,
      };

      const res = await dispatch(submitLoanApplication(formData));
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoanApplicationRap>
      <div className="dropdown-container">
        <form className="all-dropdown-div" onSubmit={handleSubmit}>
          <div  className="cancel-btn">

           <Icon onClick={handleVisisble}
                         
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
               <input
                type="text"
                name="customerDetails.middleName"
                value={formData.customerDetails.middleName}
                onChange={handleInputChange}
                placeholder="Middle Name (Optional"
                required
              />
              <input
                type="text"
                name="customerDetails.lastName"
                value={formData.customerDetails.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                required
              />
               <input
                type="date"
                name="customerDetails.dateOfBirth"
                value={formData.customerDetails.dateOfBirth}
                onChange={handleInputChange}
                placeholder="Date of Birth"
                required
              />
              <input
                type="email"
                name="customerDetails.email"
                value={formData.customerDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            
              <input
                type="text"
                name="customerDetails.address"
                value={formData.customerDetails.address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              />
              <input
                type="number"
                name="customerDetails.bvn"
                value={formData.customerDetails.bvn}
                onChange={handleInputChange}
                placeholder="BVN"
                required
              />
                <input
                type="number"
                name="customerDetails.phoneOne"
                value={formData.customerDetails.phoneOne}
                onChange={handleInputChange}
                placeholder="Mobile No 1"
                required
              />
               <input
                type="number"
                name="customerDetails.phoneTwo"
                value={formData.customerDetails.phoneTwo}
                onChange={handleInputChange}
                placeholder="Mobile No 2"
              
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
                type="number"
                name="businessDetails.estimatedValue"
                value={formData.businessDetails.estimatedValue}
                onChange={handleInputChange}
                placeholder="Estimated Value"
                required
              />
              <input
                type="text"
                name="businessDetails.operationalStatus"
                value={formData.businessDetails.operationalStatus}
                onChange={handleInputChange}
                placeholder="Operational Status"
                required
              />
               <input
                type="text"
                name="businessDetails.additionalInfo"
                value={formData.businessDetails.additionalInfo}
                onChange={handleInputChange}
                placeholder="Additional Information"
          
              />
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
                placeholder="Mobile No 1"
                required
              />
              <input
                type="number"
                name="guarantorDetails.phoneTwo"
                value={formData.guarantorDetails.phoneTwo}
                onChange={handleInputChange}
                placeholder="Mobile No 2"
               
              />
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

            <div className="detailssss">
              {/* Loan Details */}
              <h3>Group Details</h3>
              <input
                type="text"
                name="groupDetails.groupName"
                value={formData.bankDetails.groupName}
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
              {/* Pictures */}
              <h3>Upload Pictures</h3>
              <input
                type="file"
                capture="user"
                onChange={(e) => handleFirstImage(e.target.files)}
                required
              />
              <input
                type="file"
                capture="user"
                onChange={(e) => handleSecondImage(e.target.files)}
                required
              />
              <input
                type="file"
                multiple
                onChange={(e) => handleFileChange(Array.from(e.target.files))}
              />
            </div>
            <button type="submit">Confirm Application</button>
          </div>
        </form>
      </div>
    </LoanApplicationRap>
  );
};

export default LoanApplicationForm;
