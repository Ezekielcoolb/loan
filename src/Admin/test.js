import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWaitingDisbursementLoans, disburseLoan } from '../redux/slices/LoanSlice';

const DisbursementTable = () => {
  const dispatch = useDispatch();
  const { loans, loading } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchWaitingDisbursementLoans());
  }, [dispatch]);

  const handleDisburse = (id) => {
    dispatch(disburseLoan(id));
  };

  if (loading === 'loading') return <p>Loading...</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Amount Approved</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan._id}>
            <td>{`${loan.customerDetails.firstName} ${loan.customerDetails.lastName}`}</td>
            <td>{loan.loanDetails.amountApproved}</td>
            <td>
              <button onClick={() => handleDisburse(loan._id)}>Disburse</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisbursementTable;
