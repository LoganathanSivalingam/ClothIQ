import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ChartWrapper = styled.div`
  width: 500px;
  height: 400px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MonthlySalesTrendChart = ({ data }) => {
  // Step 1: Group sales by month
  const monthlySales = {};

  data.forEach((sale) => {
    const date = new Date(sale.sale_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const amount = parseFloat(sale.total_amount || 0); // Ensure numeric
    monthlySales[monthKey] = (monthlySales[monthKey] || 0) + amount;
  });

  const labels = Object.keys(monthlySales).sort();
  const salesData = labels.map((label) => monthlySales[label]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total Sales (INR)',
        data: salesData,
        fill: false,
        borderColor: '#3498db',
        backgroundColor: '#3498db',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹ ${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Sales Amount (INR)',
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <h3 style={{ textAlign: 'center' }}>Monthly Sales Trend</h3>
      <Line data={chartData} options={options} />
    </ChartWrapper>
  );
};

export default MonthlySalesTrendChart;
