import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const YearlySalesChart = () => {
  // Monthly sales data
  const monthlySales = [
    30000, 400000, 500000, 600000, 700000, 800000, 850000, 90000,
    950000, 100000, 100000, 110000,
  ]; // Example monthly sales

  const yearlyTarget = 5000000;

  // Compute cumulative sales
  const cumulativeSales = monthlySales.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value);
    } else {
      acc.push(acc[index - 1] + value);
    }
    return acc;
  }, []);

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Cumulative Sales Progress",
        data: cumulativeSales,
        borderColor: cumulativeSales[cumulativeSales.length - 1] >= yearlyTarget ? "green" : "red", // Line color
        backgroundColor: "rgba(0, 255, 0, 0.1)", // Fill color (light green)
        borderWidth: 2,
        pointBackgroundColor: cumulativeSales.map(sale =>
          sale >= yearlyTarget ? "green" : "red"
        ),
        tension: 0.3, // Smooth curve
        fill: true, // Enable area under the line
      },
      {
        label: "Yearly Target",
        data: Array(12).fill(yearlyTarget),
        borderColor: "blue", // Line color for target
        borderWidth: 1,
        borderDash: [5, 5], // Dashed line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${context.dataset.label}: ${context.raw.toLocaleString()} `;
          },
        },
      },
      chartArea: {
        backgroundColor: "rgba(240, 240, 240, 1)", // Background color of the chart area
      },
    },
    scales: {
      y: {
        beginAtZero: false, // Do not start from zero
        min: 1000000, // Start y-axis at 5,000,000
        max: 7000000,
        ticks: {
            callback: function (value) {
                if (value >= 1000000) {
                  return `${value / 1000000}M`; // Format the tick as M (1M, 2M, etc.)
                }
                return value;
            }
        },
      },
    },
  };

  return (
    <div style={{ width: "200px", height: "200px" }}>
     
      <Line data={data} options={options} />
    </div>
  );
};

export default YearlySalesChart;
