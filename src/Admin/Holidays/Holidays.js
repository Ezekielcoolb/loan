// src/components/HolidayList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHolidays } from '../../redux/slices/holidaySlice';

const HolidayList = () => {
  const dispatch = useDispatch();
  const { holidays, loading, error } = useSelector((state) => state.holiday);
console.log(holidays);

  useEffect(() => {
    dispatch(fetchHolidays());
  }, [dispatch]);

  if (loading) return <p>Loading holidays...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
     <div className="p-4">
 <div className="find-lawyer-header">
          <h2>Holiday List</h2>
    
        </div>
   

  <div className="table-container">
          <div className="new-table-scroll">
            <div className="table-div-con">
              <table className="custom-table">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-2 py-1">Date</th>
          <th className="border px-2 py-1">Holiday Reason</th>
         
        </tr>
      </thead>
      <tbody>
        {holidays?.map((operation, idx) => (
          <tr key={operation.required} className="text-center">
            <td className="border px-2 py-1">
                {new Date(operation?.holiday).toLocaleDateString()}
            </td>
            <td className="border px-2 py-1">
                {operation?.reason}
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  </div>
    </div>
  );
};

export default HolidayList;
