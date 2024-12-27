import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const Button = styled.button`
  background: #005e78;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 5px;
`;

const Popup = ({ message, onClose, customerStatus, customerId }) => {
  const history = useHistory();

  const handleRedirect = () => {
    if (customerStatus === 'active loan') {
      history.push(`/customer-info/${customerId}`); // Redirect to customer's info page
    }
  };

  return (
    <PopupWrapper>
      <PopupContainer>
        <h2>{message}</h2>
        {customerStatus === 'active loan' && (
          <Button onClick={handleRedirect}>Go to Calendar</Button>
        )}
        <Button onClick={onClose}>Close</Button>
      </PopupContainer>
    </PopupWrapper>
  );
};

export default Popup;
