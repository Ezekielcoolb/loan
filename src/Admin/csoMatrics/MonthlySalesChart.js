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

const MonthlySalesChart = () => {
  const weeklySales = [200000, 30000, 40000, 50000, 60000]; // Example weekly sales for a 5-week month
  const monthlyTarget = 500000; // Monthly target

  // Compute cumulative sales for the month
  const cumulativeWeeklySales = weeklySales.reduce((acc, value, index) => {
    if (index === 0) {
      acc.push(value);
    } else {
      acc.push(acc[index - 1] + value);
    }
    return acc;
  }, []);

  const data = {
    labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"],
    datasets: [
      {
        label: "Cumulative Weekly Sales",
        data: cumulativeWeeklySales,
        borderColor: cumulativeWeeklySales[cumulativeWeeklySales.length - 1] >= monthlyTarget ? "green" : "red", // Line color
        backgroundColor: "rgba(0, 255, 0, 0.1)", // Fill color
        borderWidth: 2,
        pointBackgroundColor: cumulativeWeeklySales.map(sale =>
          sale >= monthlyTarget ? "green" : "red"
        ),
        tension: 0.3, // Smooth curve
        fill: true, // Enable area under the line
      },
      {
        label: "Monthly Target",
        data: Array(5).fill(monthlyTarget),
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
        min: 100000, // Start y-axis at 0'
        max: 700000,
        ticks: {
          callback: function (value) {
            if (value >= 10000) {
              return `${value / 10000}0K`; // Format the tick as M (1M, 2M, etc.)
            } else if (value >= 1000000)  {
              return `${value / 1000000}M`;
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

export default MonthlySalesChart;
