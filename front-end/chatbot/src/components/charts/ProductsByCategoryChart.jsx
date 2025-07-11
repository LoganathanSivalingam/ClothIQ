// src/components/charts/ProductsByCategoryChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex: 1;
  min-width: 300px;
`;

const ProductsByCategoryChart = ({ data }) => {
  const categoryCounts = data.reduce((acc, product) => {
    const category = product.category || 'Unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(255,159,64,0.6)',
          'rgba(153,102,255,0.6)',
          'rgba(255,205,86,0.6)',
          'rgba(231,233,237,0.6)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(255,159,64,1)',
          'rgba(153,102,255,1)',
          'rgba(255,205,86,1)',
          'rgba(231,233,237,1)',
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Products by Category',
        font: { size: 16 }
      },
      legend: { position: 'top' }
    },
    responsive: true
  };

  return (
    <ChartContainer>
      <Pie data={chartData} options={options} />
    </ChartContainer>
  );
};

export default ProductsByCategoryChart;
