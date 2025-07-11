// src/components/charts/AgeDistributionChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  flex: 1;
  min-width: 300px;
`;

const AgeDistributionChart = ({ data }) => {
  // Process raw customer data into age bins
  const ageBins = {
    '8-15': 0,
    '20-25': 0,
    '25-35': 0,
    '35-50': 0,
    '50+': 0,
  };

  data.forEach(customer => {
    const age = customer.age;
    if (age >= 8 && age <= 15) ageBins['8-15']++;
    else if (age >= 20 && age <= 25) ageBins['20-25']++;
    else if (age >= 25 && age <= 35) ageBins['25-35']++;
    else if (age >= 35 && age <= 50) ageBins['35-50']++;
    else if (age > 50) ageBins['50+']++;
  });

  const chartData = {
    labels: Object.keys(ageBins),
    datasets: [
      {
        data: Object.values(ageBins),
        backgroundColor: [
          'rgba(255, 205, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
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
        text: 'Customer Age Distribution',
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

export default AgeDistributionChart;