import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGuarantorResponse,
  submitGuarantorResponse,
} from "../redux/slices/guarantorSlice";
import { useParams } from "react-router-dom"; // Import useParams if getting loanId from URL
import styled from "styled-components";
import { fetchWaitingLoans } from "../redux/slices/LoanSlice";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const GuarantorRap = styled.div`
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  input,
  select {
    width: 280pxpx;
    height: 40px;
  border: none;
    border-bottom: 1px solid #d0d5dd;
  }
  label {
    display: flex;
    gap: 10px;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
  .checkbox {
    width: 18px !important;
    height: 18px !important;
    margin-left: 10px;
  }
  form, .form-body{
    display: flex;
    flex-direction: column;
    max-width: 500px;
    gap: 20px;
  }
  .upper-grand p {
    color: #60667a;
    font-size: 14px;
    font-weight: 450;
    text-align: center;
    margin-top: 10px;
  }
  .upper-grand h2 {
    color: #112240;
    font-size: 20px;
    font-weight: 800;
    text-align: center;
    margin-top: 30px;
  }
  .upper-grand {
    margin-bottom: 20px;
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
  .label {
    justify-content: flex-start !important;
  }
  .upload-label {
    margin: 10px 0px;
  }
  .upload-label input {
    border: none !important;
  }
`;
const GuarantorForm = () => {
  const dispatch = useDispatch();
  const { response, status } = useSelector((state) => state.guarantor);
  const { id } = useParams(); // Get loanId from URL if applicable
  const [loanerImage, setLoanerIamge] = useState("");
  const [loading, setLoading] = useState(false)

  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id); // Find the loan in Redux store

  const [formData, setFormData] = useState({
    loanId: id || "", // Ensure loanId is dynamic
    guarantorName: "",
    relationship: "",
    address: "",
    businessAddress: "",
    phone: "",
    knownDuration: "",
    signature: "",
    consentGiven: false,
  });
  console.log(id);

  const isValid = formData.loanId !== "" &&
                  formData.guarantorName !== "" &&
                  formData.relationship !== "" &&
                  formData.address !== "" &&
                  formData.businessAddress !== "" &&
                  formData.phone !== "" &&
                  formData.knownDuration !== "" &&
                  formData.signature !== "" &&
                  formData.consentGiven !== "" 

  useEffect(() => {
    dispatch(fetchWaitingLoans());
  }, [loan, dispatch]);

  

  useEffect(() => {
    if (id) {
      dispatch(fetchGuarantorResponse(id));
      setFormData((prev) => ({ ...prev, loanId: id })); // Ensure loanId updates dynamically
    }
  }, [dispatch, id]);


  const handleSecondImage = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", e[0]);
      formData.append("upload_preset", "ml_default");
  
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dmwhuekzh/image/upload`,
        formData
      );
  
      const imageUrl = response.data.secure_url;
      console.log(imageUrl);
  
      setLoanerIamge(imageUrl);
  
      // Update formData state
      setFormData((prevData) => ({
        ...prevData,
        signature: imageUrl,
      }));
    } catch (err) {
      console.log(err);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    dispatch(submitGuarantorResponse(formData));
    setLoading(false)
    console.log(formData);
    
  };

  if (status === "loading") return <p>Loading...</p>;
  if (response) return <p style={{
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontSize: "20px",
    fontWeight: "600"
  }}>✅ You've already submitted your response.</p>;

  return (
    <GuarantorRap>
      <div className="upper-grand">
        <h1>JK POS SOLUTION ENTERPRISES</h1>
        <h2>Guarantor Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-body">
          <h4>Guarantor Information</h4>
          <label>
            Name:
            <input
              type="text"
              name="guarantorName"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Relationship to client:
            <input
              type="text"
              name="relationship"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Residential Address:
            <input
              type="text"
              name="address"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Business Address:
            <input
              type="text"
              name="businessAddress"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="number"
              name="phone"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            How long do you know client:
            <input
              type="number"
              name="knownDuration"
              onChange={handleChange}
              required
            />
          </label>
          <label className="label">
            Do you consent to be the guarantor?
            <input
              type="checkbox"
              name="consentGiven"
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <h4>Declaration</h4>
          <p>
            I declare that all information, including NIN, picture, and ID
            tendered for this purpose, are valid and authentic; any false
            information given may disqualify the client from loan approval. I
            confirm that the client house address provided above is valid and
            correct.
          </p>
          <p>
            I have agreed to take responsibility for the payment of the
            principal Loan amount plus the interest in the event of default.
          </p>
          <label className="upload-label">Upload signature</label>
              <input
                type="file"
                capture="user"
                onChange={(e) => handleSecondImage(e.target.files)}
                required
              />
        </div>

        <button type="submit"
            onClick={handleSubmit}
            disabled={!isValid}
            style={{
              backgroundColor: isValid ? "#0c1d55" : "#727789",
              cursor: !isValid ? "not-allowed" : "pointer",
            }}
            >
              {loading ? 
                <PulseLoader color="white" size={10} />
                  : "Submit"
            }
              
              </button>
      </form>
    </GuarantorRap>
  );
};

export default GuarantorForm;
