import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components"
import { PulseLoader } from 'react-spinners';
import { addHoliday } from '../../redux/slices/holidaySlice';

const HolidayRap = styled.div`
input {
      border: 1px solid #d0d5dd;
    width: 380px;
    border-radius: 100px;
    height: 40px;
  padding-left: 10px;
  
}
button {
      border: 1px solid #112240;
  background-color: #112240;
  color: white;
  width: 380px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;

}
label {
    margin-bottom: 15px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
`

const HolidayForm = () => {
  const dispatch = useDispatch();
  const {holidays, successHolidayMessage, holidayloading, error } = useSelector((state) => state.holiday);
console.log(successHolidayMessage, holidays);

  const [formData, setFormData] = useState({
    holiday: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addHoliday(formData));
  };

  return (
    <HolidayRap>
    <form >
      <div>
        <label>Holiday Date:</label> <br />
        <input
          type="date"
          name="holiday"
          value={formData.holiday}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Reason:</label> <br />
        <input
          type="text"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} type="submit" disabled={holidayloading}>
        {holidayloading ? <PulseLoader color="white" size={10} /> : 'Add Holiday'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </HolidayRap>
  );
};

export default HolidayForm;
