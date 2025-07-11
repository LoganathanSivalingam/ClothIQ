// src/components/charts/ProductPriceDistributionChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex: 1;
  min-width: 400px;
`;

const ProductPriceDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.map(p => p.name),
    datasets: [
      {
        label: 'Selling Price',
        data: data.map(p => p.selling_price),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Product Price Distribution',
        font: { size: 16 }
      },
      legend: { display: false }
    },
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Selling Price (INR)' }
      },
      x: {
        ticks: { maxRotation: 90, minRotation: 45 },
        title: { display: true, text: 'Product Name' }
      }
    }
  };

  return (
    <ChartContainer>
      <Bar data={chartData} options={options} />
    </ChartContainer>
  );
};

export default ProductPriceDistributionChart;
