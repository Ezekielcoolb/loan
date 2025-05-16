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

// Styled Components
const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
  canvas {
    max-height: 300px !important;
  }
`;

const ChartRapper = styled.div`
  h2 {
    color: #005e78;
    font-size: 20px;
    font-weight: 700;
    margin-top: 30px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const TextInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;

  p {
    color: #005e78;
  }
`;

const CsoOutstandingDoughnutChart = () => {
  const user = JSON.parse(localStorage.getItem("csoUser"));
  const dispatch = useDispatch();
  const {
    totalOutstandingChart,
    defaultingTargetChart,
    percentageChart,
    status,
  } = useSelector((state) => state.otherLoan);
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

  // Handle edge case: no target
  const isZeroTarget = defaultingTargetChart === 0;
  const adjustedPercentage = isZeroTarget
    ? 0
    : Math.min((totalOutstandingChart / defaultingTargetChart) * 100, 100);

  const chartData = {
    labels: ['Outstanding', 'Remaining'],
    datasets: [
      {
        data: isZeroTarget ? [0, 100] : [adjustedPercentage, 100 - adjustedPercentage],
        backgroundColor: isZeroTarget ? ['#e0e0e0', '#e0e0e0'] : [getColor(), '#e0e0e0'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 15,
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            if (isZeroTarget) {
              return 'No target set';
            }
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
    <ChartRapper>
      <div>
        <h2 className="text-lg font-bold mb-2">Default Limit Tracker</h2>
        <TextInfo>
          <p>
            Outstanding: <br /> ₦{totalOutstandingChart.toLocaleString()}
          </p>
          <p>
            Limit: <br /> ₦{defaultingTargetChart.toLocaleString()}
          </p>
        </TextInfo>
        {status === 'loading' ? (
          <p>Loading...</p>
        ) : (
          <FlexContainer>
            <ChartWrapper>
              <Doughnut data={chartData} options={chartOptions} />
            </ChartWrapper>
          </FlexContainer>
        )}
      </div>
    </ChartRapper>
  );
};

export default CsoOutstandingDoughnutChart;
