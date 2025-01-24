import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import { fetchPieRepaymentData } from '../redux/slices/LoanSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const RepaymentPieChart = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { promptPayments, overduePayments, loading, error } = useSelector((state) => state.loan);

  const csoId = user.workId;

  useEffect(() => {
    // Fetch repayment data on component mount
    dispatch(fetchPieRepaymentData({ csoId }));
  }, [dispatch, csoId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Calculate percentages
  const total = promptPayments + overduePayments;
  const promptPercentage = ((promptPayments / total) * 100).toFixed(1); // Keep one decimal
  const overduePercentage = ((overduePayments / total) * 100).toFixed(1);

  // Prepare chart data
  const chartData = {
    labels: [
      `Prompt Payments ${promptPercentage}%`,
      `Overdue Payments ${overduePercentage}%`,
    ],
    datasets: [
      {
        data: [promptPayments, overduePayments],
        
        backgroundColor: ['#005E78', '#F4F0FD'], // Teal and Light Yellow
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '180px', margin: 'auto' }}>
      <Pie
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: false, // Disable the default legend
            },
            datalabels: {
              color: [ '#F4F0FD', '#005E78'], 
              maxWidth: 70, // Limit the max width
              font: {
                size: 14,
                weight: 700,
              },
              formatter: (value, context) => {
                const label = context.chart.data.labels[context.dataIndex];
                // Split label into multiple lines if it exceeds maxWidth
                const words = label.split(' ');
                const firstLine = words.slice(0, 1).join(' '); // First part of the label
                const secondLine = words.slice(1, 2).join(' '); // Remaining part
                const thirdLine = words.slice(2).join(' ');
                return secondLine ? `${firstLine}\n${secondLine}\n${thirdLine}` : firstLine;
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RepaymentPieChart;
