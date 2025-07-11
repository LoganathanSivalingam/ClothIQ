// src/components/charts/OrdersByEmployeeChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';

const OrdersByEmployeeChart = ({ data }) => {
  const chartData = {
    labels: data.map(emp => emp.name),
    datasets: [
      {
        label: 'Total Orders Processed',
        data: data.map(emp => emp.total_orders_processed),
        backgroundColor: '#42A5F5',
      },
    ],
  };

  return (
    <div className="chart-card">
      <h3>Orders Processed by Employee</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default OrdersByEmployeeChart;
