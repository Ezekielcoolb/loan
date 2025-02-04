import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuarantorResponse, submitGuarantorResponse } from '../redux/slices/guarantorSlice';
import { fetchWaitingLoans } from '../redux/slices/LoanSlice';
import { useParams } from 'react-router-dom'; // Import useParams if getting loanId from URL
import styled from 'styled-components';

const GuarantorRap = styled.div`
background: #ffffff;
display: flex;
flex-direction: column;
align-items: center;
input, select {
width: 300px;
height: 40px;
border-radius: 15px;
padding: 10px;
border: 1px solid #d0d5dd;

}
.checkbox {
  width: 18px !important;
  height: 18px !important;
  margin-left: 10px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  width: 100px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  color: #112240;
  font-size: 14px;
  font-weight: 500;
}
`
const GuarantorForm = () => {
  const dispatch = useDispatch();
  const { response, status } = useSelector((state) => state.guarantor);
  const { id } = useParams(); // Get loanId from URL if applicable
  
  const loans = useSelector((state) => state.loan.loans);
  const loan = loans.find((loan) => loan._id === id); // Find the loan in Redux store
  
  const [formData, setFormData] = useState({
    loanId: id || "", // Ensure loanId is dynamic
    known: "",
    guarantorName: "",
    knownDuration: "",
    relationshipConfirmed: "",
    consentGiven: false,
  });

  useEffect(() => {
    if (!loan) {
      dispatch(fetchWaitingLoans());
    }
  }, [loan, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchGuarantorResponse(id));
      setFormData((prev) => ({ ...prev, loanId: id })); // Ensure loanId updates dynamically
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitGuarantorResponse(formData));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (response) return <p>✅ You've already submitted your response.</p>;

  return (
    <GuarantorRap>
    <div className='upper-grand'>
      <h2>Guarantor Form for  {loan?.customerDetails.firstName} {loan?.customerDetails.lastName}</h2>
      <p> {loan?.customerDetails.firstName} {loan?.customerDetails.lastName} claimed to have known you for {loan?.guarantorDetails.yearsKnown} years as {loan?.guarantorDetails.relationship}
      </p>
    </div>
    <form onSubmit={handleSubmit}>
      <label>
        Are you {loan?.guarantorDetails?.name}? <br />
        <input type="text" name="guarantorName" onChange={handleChange} required />
      </label>
      <label>
        Do you know {loan?.customerDetails?.firstName} {loan?.customerDetails?.lastName}? <br />
        <input type="text" name="known" onChange={handleChange} required />
      </label>
      <label>
        How long have you known this person? <br />
        <input type="text" name="knownDuration" onChange={handleChange} required />
      </label>
      <label>
        Confirm your relationship with this person: <br />
        <input type="text" name="relationshipConfirmed" onChange={handleChange} required />
      </label>
      <label>
        Do you consent to be the guarantor? <br />
        <input type="checkbox" name="consentGiven" onChange={handleChange} required />
      </label>
      <button type="submit">Submit</button>
    </form>
    </GuarantorRap>
  );
};

export default GuarantorForm;
