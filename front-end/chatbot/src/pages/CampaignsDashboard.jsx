// src/pages/DashboardOverview.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchCampaigns, fetchCampaignResults } from "../services/api";
import CampaignStatusChart from '../components/charts/CampaignStatusChart';
import CampaignPerformanceChart from '../components/charts/CampaignPerformanceChart';
import CampaignsByPlatformChart from '../components/charts/CampaignsByPlatformChart';

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

const DashboardOverview = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignResults, setCampaignResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCampaignData = async () => {
      try {
        const [campaignsRes, resultsRes] = await Promise.all([
          fetchCampaigns(),
          fetchCampaignResults()
        ]);
        setCampaigns(campaignsRes.data);
        setCampaignResults(resultsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading campaign data:", err);
        setError("Failed to fetch campaign data.");
        setLoading(false);
      }
    };

    getCampaignData();
  }, []);

  if (loading) return <DashboardContainer>Loading...</DashboardContainer>;
  if (error) return <DashboardContainer>{error}</DashboardContainer>;

  return (
    <DashboardContainer>
      <PageTitle>Campaign Analytics Dashboard</PageTitle>
      <ChartGrid>
        <CampaignStatusChart data={campaigns} />
        {/* <CampaignPerformanceChart data={campaignResults} /> */}
        <CampaignsByPlatformChart data={campaigns} />
      </ChartGrid>
    </DashboardContainer>
  );
};

export default DashboardOverview;
