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

const DailySalesChart = () => {
  const hourlySales = [4000, 6000, 5000, 70000, 8000, 7500, 9000, 10000, 11000, 12000, 13000, 14000]; // Example sales every 4 hours
  const dailyTarget = 50000; // Daily target (can be modified)

  // Compute cumulative sales for the day
  const cumulativeHourlySales = hourlySales.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value);
    } else {
      acc.push(acc[index - 1] + value);
    }
    return acc;
  }, []);

  const timeLabels = [
    "12 AM",
    "4AM",
    "8AM",
    "12PM",
    "4PM",
    "8PM",
    
  ];

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: "Cumulative Hourly Sales",
        data: cumulativeHourlySales,
        borderColor: cumulativeHourlySales[cumulativeHourlySales.length - 1] >= dailyTarget ? "green" : "red", // Line color
        backgroundColor: "rgba(0, 255, 0, 0.1)", // Fill color
        borderWidth: 2,
        pointBackgroundColor: cumulativeHourlySales.map(sale =>
          sale >= dailyTarget ? "green" : "red"
        ),
        tension: 0.3, // Smooth curve
        fill: true, // Enable area under the line
      },
      {
        label: "Daily Target",
        data: Array(hourlySales.length).fill(dailyTarget),
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
        min: 5000, // Start y-axis at 0
        max: 100000,
        ticks: {
            callback: function (value) {
                if (value >= 1000) {
                  return `${value / 10000}K`; // Format the tick as M (1M, 2M, etc.)
                }
                return value;
            }
        },
      },
    },
  };

  return (
    <div style={{ width: "300px", height: "300px" }}>
     
      <Line data={data} options={options} />
    </div>
  );
};

export default DailySalesChart;
