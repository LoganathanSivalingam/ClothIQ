// src/components/charts/CampaignPerformanceChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CampaignPerformanceChart = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  // Group revenue by platform
  const platformRevenueMap = {};
  data.forEach(item => {
    const platform = item.platform || "Unknown";
    const revenue = parseFloat(item.revenue_generated || 0);
    platformRevenueMap[platform] = (platformRevenueMap[platform] || 0) + revenue;
  });

  const platforms = Object.keys(platformRevenueMap);
  const revenues = Object.values(platformRevenueMap);

  const chartData = {
    labels: platforms,
    datasets: [
      {
        label: "Revenue (₹)",
        data: revenues,
        backgroundColor: "#27ae60",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Revenue by Platform",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `₹${value.toLocaleString("en-IN")}`,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default CampaignPerformanceChart;
