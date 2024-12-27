import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchActiveCustomers } from '../redux/slices/LoanSlice';
import { useNavigate } from 'react-router-dom';

const CustomerGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeCustomers } = useSelector((state) => state.loan);

  useEffect(() => {
    dispatch(fetchActiveCustomers());
  }, [dispatch]);

  return (
    <div>
      {activeCustomers.map((customer) => (
        <img
          key={customer._id}
          src={customer.pictures.customer}
          alt={customer.customerDetails.firstName}
          onClick={() => navigate(`/calendar/${customer._id}`)}
        />
      ))}
    </div>
  );
};

export default CustomerGallery;
