// src/components/charts/PaymentMethodChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  flex: 1;
  min-width: 300px;
`;

const PaymentMethodChart = ({ data }) => {
  const methodCounts = data.reduce((acc, sale) => {
    const method = sale.payment_method || 'Unknown';
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(methodCounts),
    datasets: [{
      data: Object.values(methodCounts),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Red
        'rgba(54, 162, 235, 0.6)', // Blue
        'rgba(255, 206, 86, 0.6)', // Yellow
        'rgba(153, 102, 255, 0.6)', // Purple
      ],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Payment Method Distribution',
        font: { size: 16 },
      },
    },
  };

  return <ChartContainer><Pie data={chartData} options={options} /></ChartContainer>;
};

export default PaymentMethodChart;
