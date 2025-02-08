import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGuarantor } from '../redux/slices/guarantorSlice';

const GuarantorDetailsTest = () => {
  const dispatch = useDispatch();
  const { guarantorResponse, loading, error } = useSelector((state) => state.guarantor);
const loanId ="67a60ba25310242752e055c9"
  useEffect(() => {
    if (loanId) {
      dispatch(fetchGuarantor(loanId));
    }
  }, [dispatch, loanId]);
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Guarantor Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {guarantorResponse && (
        <div className="border p-4 rounded-lg shadow">
          <p><strong>Name:</strong> {guarantorResponse.guarantorName}</p>
          <p><strong>Relationship:</strong> {guarantorResponse.relationship}</p>
          <p><strong>Address:</strong> {guarantorResponse.address}</p>
          <p><strong>Business Address:</strong> {guarantorResponse.businessAddress}</p>
          <p><strong>Phone:</strong> {guarantorResponse.phone}</p>
          <p><strong>Known Duration:</strong> {guarantorResponse.knownDuration}</p>
          <p><strong>Consent Given:</strong> {guarantorResponse.consentGiven ? 'Yes' : 'No'}</p>
          <p><strong>Signature:</strong> <img src={guarantorResponse.signature} alt="Signature" className="w-32" /></p>
          <p><strong>Submitted At:</strong> {new Date(guarantorResponse.submittedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default GuarantorDetailsTest;
