import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchProducts } from '../services/api';

import ProductsByCategoryChart from '../components/charts/ProductsByCategoryChart';
import CurrentStockLevelsChart from '../components/charts/CurrentStockLevelsChart';
import ProductPriceDistributionChart from '../components/charts/ProductPriceDistributionChart';

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

const ProductsDashboard = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProductData(response.data);
      } catch (err) {
        setError("Failed to fetch product data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <DashboardContainer>Loading product data...</DashboardContainer>;
  if (error) return <DashboardContainer>{error}</DashboardContainer>;

  return (
    <DashboardContainer>
      <PageTitle>Product Analytics Dashboard</PageTitle>
      <ChartGrid>
        <ProductsByCategoryChart data={productData} />
        <CurrentStockLevelsChart data={productData} />
        <ProductPriceDistributionChart data={productData} />
      </ChartGrid>
    </DashboardContainer>
  );
};

export default ProductsDashboard;
