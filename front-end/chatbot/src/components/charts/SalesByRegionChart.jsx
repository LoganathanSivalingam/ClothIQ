import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartWrapper = styled.div`
  width: 500px;
  height: 400px;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SalesByRegionChart = ({ data }) => {
  // Step 1: Aggregate sales by region
  const regionSales = {};

  data.forEach((sale) => {
    const region = sale.region || 'Unknown';
    const amount = parseFloat(sale.total_amount || 0); // Ensure numeric
    regionSales[region] = (regionSales[region] || 0) + amount;
  });

  const labels = Object.keys(regionSales);
  const salesData = labels.map((region) => regionSales[region]);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Sales by Region (INR)',
        data: salesData,
        backgroundColor: '#9b59b6',
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
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
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales Amount (INR)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Region',
        },
      },
    },
  };

  return (
    <ChartWrapper>
      <h3 style={{ textAlign: 'center' }}>Sales by Region</h3>
      <Bar data={chartData} options={options} />
    </ChartWrapper>
  );
};

export default SalesByRegionChart;
