import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoanStats } from "../redux/slices/dashboardSlice";

const LoanStats = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchLoanStats());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Loan Statistics</h2>

      {["today", "yesterday", "week", "month", "year", "overall"].map((period) => (
        <div key={period} className="border p-4 m-2 rounded shadow">
          <h3 className="text-xl font-semibold capitalize">{period} Statistics</h3>
          <p>Total Loans: {stats[period]?.totalLoans || 0}</p>
          <p>Total Amount Disbursed: ₦{stats[period]?.totalDisbursed || 0}</p>
          <p>Total Daily Payments: ₦{stats[period]?.totalDailyPayment || 0}</p>
        </div>
      ))}
    </div>
  );
};

export default LoanStats;
