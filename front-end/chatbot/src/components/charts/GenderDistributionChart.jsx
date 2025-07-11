// src/components/charts/GenderDistributionChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  flex: 1; /* Allow charts to grow/shrink in a flex container */
  min-width: 300px; /* Minimum width for responsiveness */
`;

const GenderDistributionChart = ({ data }) => {
  // Process raw customer data to get gender counts
  const genderCounts = data.reduce((acc, customer) => {
    const gender = customer.gender ? customer.gender.toLowerCase() : 'unknown';
    acc[gender] = (acc[gender] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(genderCounts).map(g => g.charAt(0).toUpperCase() + g.slice(1)), // Capitalize labels
    datasets: [
      {
        data: Object.values(genderCounts),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue for Male
          'rgba(255, 99, 132, 0.6)', // Red for Female
          'rgba(201, 203, 207, 0.6)', // Grey for Other/Unknown
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Customer Gender Distribution',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <ChartContainer>
      <Pie data={chartData} options={options} />
    </ChartContainer>
  );
};

export default GenderDistributionChart;