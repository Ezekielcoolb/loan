// src/components/DisbursementChart.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { fetchDisbursementDataChart } from '../../redux/slices/LoanSlice';


Chart.register(...registerables);

const DisbursementChart = () => {
    const dispatch = useDispatch();
    const { monthlyData, status } = useSelector((state) => state.loan);
    const currentMonth = new Date().getMonth();
    const months = Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString('default', { month: 'long' })
    );

    useEffect(() => {
        dispatch(fetchDisbursementDataChart());
    }, [dispatch]);

    const data = {
        labels: months,
        datasets: [{
            label: 'Total Amount Disbursed',
            data: monthlyData,
            backgroundColor: monthlyData.map((_, index) =>
                index === currentMonth ? '#22C55E' : '#D1D5DB' // Green for current month, grey for others
            ),
            borderRadius: 10,  // Rounded corners
            borderSkipped: false, // No border skipping to keep the rounded effect
            hoverBackgroundColor: monthlyData.map((_, index) =>
                index === currentMonth ? '#16A34A' : '#9CA3AF' // Darker on hover
            ),
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `₦${tooltipItem.raw.toLocaleString()}`;
                    }
                },
                backgroundColor: '#000', // Black tooltip background
                titleColor: '#fff', // White tooltip text
                bodyColor: '#fff'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    color: '#E5E7EB' // Light grey gridlines
                },
                ticks: {
                    color: '#6B7280' // Grey ticks
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: '#6B7280'
                }
            }
        }
    };

    return (
        <div style={chartContainerStyle}>
            <h2 style={titleStyle}>Disbursement Metrics</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error loading data</p>}
            {status === 'succeeded' && (
                <Bar data={data} options={options} />
            )}
        </div>
    );
};

// **Inline Styles for Consistency with Image**
const chartContainerStyle = {
    padding: '20px',
    borderRadius: '15px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
   
};

const titleStyle = {
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: "20px"
};

export default DisbursementChart;
