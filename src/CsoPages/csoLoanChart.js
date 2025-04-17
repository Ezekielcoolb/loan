import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController, // Add this
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchLoanProgressChart } from '../redux/slices/csoSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  LineController, // Register this
  PointElement,
  Title,
  Tooltip,
  Legend
);
const LoanProgressChart = () => {
  const dispatch = useDispatch();
  const { monthlyLoanTarget, monthlyLoanCounts, status, error } = useSelector(
    (state) => state.cso
  );
  const user = JSON.parse(localStorage.getItem("csoUser"));

  const workId = user.workId;

  useEffect(() => {
    if (workId) dispatch(fetchLoanProgressChart(workId));
  }, [dispatch, workId]);

  const data = {
    labels: [
     'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Loan count',
        data: monthlyLoanCounts,
        backgroundColor: monthlyLoanCounts.map((count, index) =>
          index === 3 ? '#10B981' : 'rgba(16, 185, 129, 0.3)'
        ), // Highlight April
        borderRadius: 10, // Rounded corners for bars
        barThickness: 20,
      },
      {
        label: ' Loan Target',
        type: 'line',
        data: Array(12).fill(monthlyLoanTarget),
        borderColor: '#1E40AF', // Deep blue for the line
        borderWidth: 3,
        tension: 0.4, // Smooth line
        pointBackgroundColor: '#1E40AF',
        pointBorderColor: '#1E40AF',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
        },
      },
      title: {
        display: true,
        text: '',
      },
      tooltip: {
        backgroundColor: '#111827', // Dark tooltip background
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        padding: 10,
      },
      datalabels: {
        display: false, // Disable data labels
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', // Light grid lines
        },
      },
      x: {
        grid: {
          display: false, // Remove grid lines on x-axis
        },
      },
    },
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <Bar key={JSON.stringify(data)} data={data} options={options} />;
};

export default LoanProgressChart;


