// src/pages/CustomersDashboard.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchCustomers } from '../services/api';
import GenderDistributionChart from '../components/charts/GenderDistributionChart';
import AgeDistributionChart from '../components/charts/AgeDistributionChart';
// Add this import at the top
import CustomersByCityChart from '../components/charts/CustomersByCityChart';

// Add more customer-related charts here, e.g., CustomersByCityChart

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
  justify-content: center; /* Center charts if they don't fill the row */
`;

const CustomersDashboard = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCustomerData = async () => {
      try {
        const response = await fetchCustomers();
        setCustomerData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customer data.");
        setLoading(false);
        console.error("Error fetching customer data:", err);
      }
    };
    getCustomerData();
  }, []);

  if (loading) return <DashboardContainer>Loading customer data...</DashboardContainer>;
  if (error) return <DashboardContainer>Error: {error}</DashboardContainer>;

  return (
    <DashboardContainer>
      <PageTitle>Customer Analytics Dashboard</PageTitle>
      <ChartGrid>
        <GenderDistributionChart data={customerData} />
        <AgeDistributionChart data={customerData} />
        <CustomersByCityChart data={customerData} />

        {/* Add more customer-related charts here */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          flex: 1,
          minWidth: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2em',
          color: '#555'
        }}>
         
        </div>
      </ChartGrid>
      {/* You can add a detailed table view of customers here */}
    </DashboardContainer>
  );
};

export default CustomersDashboard;