// src/components/charts/FeedbackTrendChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const FeedbackTrendChart = ({ data }) => {
  const dateCounts = {};

  data.forEach(item => {
    const date = new Date(item.feedback_date).toISOString().split('T')[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1;
  });

  const sortedDates = Object.keys(dateCounts).sort();
  const chartData = {
    labels: sortedDates,
    datasets: [
      {
        label: 'Feedback Over Time',
        data: sortedDates.map(date => dateCounts[date]),
        borderColor: '#9b59b6',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default FeedbackTrendChart;
