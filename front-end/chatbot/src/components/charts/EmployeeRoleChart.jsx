// src/components/charts/EmployeeRoleChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';

const EmployeeRoleChart = ({ data }) => {
  const roleCounts = data.reduce((acc, emp) => {
    acc[emp.role] = (acc[emp.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: 'Roles',
        data: Object.values(roleCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Employee Role Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default EmployeeRoleChart;
