import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDailyPayments,
  nextMonth,
  nextWeek,
  prevMonth,
  prevWeek,
} from '../../redux/slices/otherLoanSlice';

const DailyCollectionTable = () => {
  const dispatch = useDispatch();
  const {
    data,
    status,
    currentMonth,
    currentYear,
    currentWeek,
  } = useSelector((state) => state.otherLoan);

  useEffect(() => {
    dispatch(fetchDailyPayments({ year: currentYear, month: currentMonth }));
  }, [dispatch, currentMonth, currentYear]);

  const getWeekRange = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

    // Get first Monday of the month
    let firstMonday = new Date(firstDayOfMonth);
    const dayOfWeek = firstMonday.getDay();
    if (dayOfWeek !== 1) {
      const offset = (8 - dayOfWeek) % 7;
      firstMonday?.setDate(firstMonday?.getDate() + offset);
    }

    // Get Monday of the current week
    const firstDay = new Date(firstMonday);
    firstDay?.setDate(firstMonday.getDate() + currentWeek * 7);

    if (firstDay > lastDayOfMonth) {
      return { firstDay: null, lastDay: null };
    }

    const lastDay = new Date(firstDay);
    lastDay.setDate(firstDay.getDate() + 4); // Monday to Friday

    return { firstDay, lastDay };
  };

  const { firstDay, lastDay } = getWeekRange();

  const filteredData = data?.filter((item) => {
    const date = new Date(item.date);
    return firstDay && lastDay && date >= firstDay && date <= lastDay;
  });

  const total = filteredData?.reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <div className="">
        <div className='collect-upper-admin'>
      <div className="collect-upper-admin-month">
        <button onClick={() => dispatch(prevMonth())}>← Prev Month</button>
      
        <button onClick={() => dispatch(nextMonth())}>Next Month →</button>
      </div>
      <h2 className="">
          {firstDay && lastDay
            ? `${firstDay.toDateString()} – ${lastDay.toDateString()}`
            : 'No more weeks in this month'}
        </h2>
      <div className="collect-upper-admin-week">
        <button onClick={() => dispatch(prevWeek())}>← Prev Week</button>
        <button onClick={() => dispatch(nextWeek())}>Next Week →</button>
      </div>
      </div>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <div className="new-table-scroll">
        <div className="table-div-con">
          <table className="custom-table" border="1">
          <thead>
            <tr className="">
              <th className="">Date</th>
              <th className="">Customer</th>
              <th className="">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((entry, idx) => (
              <tr key={idx}>
                <td className="">
                  {new Date(entry.date).toDateString()}
                </td>
                <td className="">{entry.customerName}</td>
                <td className="">₦{entry.amount.toLocaleString()}</td>
              </tr>
            ))}
            <tr className="">
              <td colSpan="2" className=" text-right">Total</td>
              <td className="total-here-now">₦{total.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
      )}
    </div>
  );
};

export default DailyCollectionTable;
