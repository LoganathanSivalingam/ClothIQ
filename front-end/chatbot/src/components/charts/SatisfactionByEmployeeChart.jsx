// src/components/charts/SatisfactionByEmployeeChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const SatisfactionByEmployeeChart = ({ data }) => {
  const chartData = {
    labels: data.map(emp => emp.name),
    datasets: [
      {
        label: 'Customer Satisfaction Score',
        data: data.map(emp => emp.customer_satisfaction_score),
        backgroundColor: '#66BB6A',
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Customer Satisfaction by Employee</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default SatisfactionByEmployeeChart;
