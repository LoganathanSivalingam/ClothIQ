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

const CampaignStatusChart = ({ data }) => {
  const statusCounts = data.reduce((acc, campaign) => {
    const status = campaign.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12', '#95a5a6'],
        borderColor: ['#27ae60', '#c0392b', '#d35400', '#7f8c8d'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Campaign Status Distribution',
        font: { size: 16 }
      },
      legend: {
        position: 'top'
      }
    },
    responsive: true,
  };

  return <ChartContainer><Pie data={chartData} options={options} /></ChartContainer>;
};

export default CampaignStatusChart;
