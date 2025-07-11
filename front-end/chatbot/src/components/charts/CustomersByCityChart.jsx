// src/components/charts/CustomersByCityChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  flex: 1;
  min-width: 400px;
`;

const CustomersByCityChart = ({ data }) => {
  const cityCounts = data.reduce((acc, customer) => {
    const city = customer.city || 'Unknown';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: 'Number of Customers',
        data: Object.values(cityCounts),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Customers by City',
        font: { size: 16 }
      },
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Customers' }
      },
      x: {
        title: { display: true, text: 'City' }
      }
    }
  };

  return <ChartContainer><Bar data={chartData} options={options} /></ChartContainer>;
};

export default CustomersByCityChart;
