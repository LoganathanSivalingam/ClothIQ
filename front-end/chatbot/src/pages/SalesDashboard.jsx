import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchSales } from '../services/api';
import SalesByRegionChart from '../components/charts/SalesByRegionChart';
import MonthlySalesTrendChart from '../components/charts/MonthlySalesTrendChart';
import PaymentMethodChart from '../components/charts/PaymentMethodChart';


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

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSalesData = async () => {
      try {
        const response = await fetchSales();
        setSalesData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sales data.");
        setLoading(false);
        console.error("Error fetching sales data:", err);
      }
    };
    getSalesData();
  }, []);

  if (loading) return <DashboardContainer>Loading sales data...</DashboardContainer>;
  if (error) return <DashboardContainer>Error: {error}</DashboardContainer>;

  return (
    <DashboardContainer>
      <PageTitle>Sales Analytics Dashboard</PageTitle>
      <ChartGrid>
         <SalesByRegionChart data={salesData} />
          <MonthlySalesTrendChart data={salesData} />
          <PaymentMethodChart data={salesData} />
      </ChartGrid>
    </DashboardContainer>
  );
};

export default SalesDashboard;