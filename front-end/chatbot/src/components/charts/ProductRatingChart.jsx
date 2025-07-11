// src/components/charts/ProductRatingChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, CategoryScale, LinearScale, Legend } from 'chart.js';
ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend);

const ProductRatingChart = ({ data }) => {
  const ratingCounts = data.reduce((acc, item) => {
    const rating = item.rating || 0;
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(ratingCounts),
    datasets: [
      {
        label: 'Number of Ratings',
        data: Object.values(ratingCounts),
        backgroundColor: '#3498db',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ProductRatingChart;
