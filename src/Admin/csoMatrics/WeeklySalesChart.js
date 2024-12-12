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

const WeeklySalesChart = () => {
  const dailySales = [10000, 20000, 15000, 30000, 5000]; // Example sales for Monday to Friday
  const weeklyTarget = 150000; // Weekly target

  // Compute cumulative sales for the week
  const cumulativeDailySales = dailySales.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value);
    } else {
      acc.push(acc[index - 1] + value);
    }
    return acc;
  }, []);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri"],
    datasets: [
      {
        label: "Cumulative Daily Sales",
        data: cumulativeDailySales,
        borderColor: cumulativeDailySales[cumulativeDailySales.length - 1] >= weeklyTarget ? "green" : "red", // Line color
        backgroundColor: "rgba(0, 255, 0, 0.1)", // Fill color
        borderWidth: 2,
        pointBackgroundColor: cumulativeDailySales.map(sale =>
          sale >= weeklyTarget ? "green" : "red"
        ),
        tension: 0.3, // Smooth curve
        fill: true, // Enable area under the line
      },
      {
        label: "Weekly Target",
        data: Array(5).fill(weeklyTarget),
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
        min: 20000, // Start y-axis at 0
        max: 200000,
        ticks: {
            callback: function (value) {
                if (value >= 10000) {
                  return `${value / 10000}0K`; // Format the tick as M (1M, 2M, etc.)
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

export default WeeklySalesChart;
