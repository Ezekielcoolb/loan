import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOutstandingProgressChart } from '../redux/slices/otherLoanSlice';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

// Styled container
const ChartWrapper = styled.div`
  max-height: 300px;
  height: 100%;
  width: 100%;
  canvas {
    max-height: 300px !important;
  }
`;

const OutstandingDoughnutChart = () => {
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const dispatch = useDispatch();
  const { totalOutstandingChart, defaultingTargetChart, percentageChart, status } = useSelector((state) => state.otherLoan);
  const csoId = user?.workId;

  useEffect(() => {
    if (csoId) {
      dispatch(fetchOutstandingProgressChart(csoId));
    }
  }, [csoId, dispatch]);

  const getColor = () => {
    if (percentageChart < 50) return '#4CAF50';
    if (percentageChart < 90) return '#FFC107';
    return '#F44336';
  };

  const chartData = {
    labels: ['Outstanding', 'Remaining'],
    datasets: [
      {
        data: [percentageChart, 100 - percentageChart],
        backgroundColor: [getColor(), '#e0e0e0'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            if (index === 0) {
              return `Outstanding: ₦${totalOutstandingChart.toLocaleString()}`;
            } else {
              const remaining = defaultingTargetChart - totalOutstandingChart;
              return `Remaining: ₦${remaining.toLocaleString()}`;
            }
          },
        },
      },
    },
  };
  

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Outstanding vs Target</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ChartWrapper>
          <Doughnut data={chartData} options={chartOptions} />
        </ChartWrapper>
      )}
      <p className="mt-4 text-center text-sm">
        {`Outstanding: ₦${totalOutstandingChart.toLocaleString()} / Target: ₦${defaultingTargetChart.toLocaleString()}`}
      </p>
    </div>
  );
};

export default OutstandingDoughnutChart;
