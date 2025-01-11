// src/components/DoughnutChart.jsx
import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchLoanStatsChart } from '../../redux/slices/branchLoanSlice';


Chart.register(ArcElement, Tooltip, Legend);

const LoanDoughnutChart = () => {
    const dispatch = useDispatch();
    const { totalLoanTarget, totalActiveLoan, status } = useSelector((state) => state.loanBranches);

    useEffect(() => {
        dispatch(fetchLoanStatsChart());
    }, [dispatch]);




    const completionRate = ((totalActiveLoan / totalLoanTarget) * 100).toFixed(2);

    const data = {
        labels: ['Active Loans', 'Remaining'],
        datasets: [{
            data: [totalActiveLoan, totalLoanTarget - totalActiveLoan],
            backgroundColor: ['#10B981', '#E5E7EB'],
            borderWidth: 0
        }]
    };

    const options = {
        cutout: '80%',
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => `${context.label}: ₦${context.raw.toLocaleString()}`
                }
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', position: "relative", width: "200px" }}>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'succeeded' && (
                <>
                    <Doughnut data={data} options={options} />
                    <h2 style={{ position: 'absolute', top: '60%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem',
                        fontSize:"25px"
                     }}>
                        {completionRate}%
                    </h2>
                </>
            )}
            {status === 'failed' && <p>Error loading chart data</p>}
        </div>
    );
};

export default LoanDoughnutChart;
