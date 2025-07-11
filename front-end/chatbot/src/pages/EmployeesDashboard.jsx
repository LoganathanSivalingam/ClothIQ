// src/pages/EmployeeDashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchEmployees } from '../services/api';
import EmployeeRoleChart from '../components/charts/EmployeeRoleChart';
import OrdersByEmployeeChart from '../components/charts/OrdersByEmployeeChart';
import SatisfactionByEmployeeChart from '../components/charts/SatisfactionByEmployeeChart';

const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 30px;
`;

const ChartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchEmployees();
        setEmployeeData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch employee data.");
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <DashboardContainer>Loading...</DashboardContainer>;
  if (error) return <DashboardContainer>Error: {error}</DashboardContainer>;

  return (
    <DashboardContainer>
      <PageTitle>Employee Analytics Dashboard</PageTitle>
      <ChartGrid>
        {/* <EmployeeRoleChart data={employeeData} /> */}
        <OrdersByEmployeeChart data={employeeData} />
        <SatisfactionByEmployeeChart data={employeeData} />
      </ChartGrid>
    </DashboardContainer>
  );
};

export default EmployeeDashboard;
