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

const CampaignsByPlatformChart = ({ data }) => {
  const platformCounts = data.reduce((acc, campaign) => {
    const platform = campaign.platform || 'Unknown';
    acc[platform] = (acc[platform] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(platformCounts),
    datasets: [
      {
        label: 'Campaigns',
        data: Object.values(platformCounts),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Campaigns by Platform',
        font: { size: 16 }
      },
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Campaign Count' }
      },
      x: {
        title: { display: true, text: 'Platform' }
      }
    }
  };

  return <ChartContainer><Bar data={chartData} options={options} /></ChartContainer>;
};

export default CampaignsByPlatformChart;
