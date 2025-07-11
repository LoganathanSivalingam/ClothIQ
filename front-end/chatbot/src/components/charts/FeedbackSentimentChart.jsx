// src/components/charts/FeedbackSentimentChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const FeedbackSentimentChart = ({ data }) => {
  const sentimentCounts = data.reduce((acc, feedback) => {
    const sentiment = feedback.sentiment || 'Unknown';
    acc[sentiment] = (acc[sentiment] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        label: 'Feedback Sentiment',
        data: Object.values(sentimentCounts),
        backgroundColor: ['#2ecc71', '#e74c3c', '#f1c40f'],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default FeedbackSentimentChart;
