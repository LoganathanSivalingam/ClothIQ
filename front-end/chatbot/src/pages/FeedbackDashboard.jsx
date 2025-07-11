// src/pages/FeedbackDashboard.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchFeedback } from "../services/api";
import FeedbackSentimentChart from "../components/charts/FeedbackSentimentChart";
import ProductRatingChart from "../components/charts/ProductRatingChart";
import FeedbackTrendChart from "../components/charts/FeedbackTrendChart";

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

const FeedbackDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const response = await fetchFeedback();
        setFeedbackData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch feedback data.");
        setLoading(false);
        console.error("Error fetching feedback:", err);
      }
    };
    getFeedback();
  }, []);

  if (loading) return <DashboardContainer>Loading...</DashboardContainer>;
  if (error) return <DashboardContainer>{error}</DashboardContainer>;

  return (
    <DashboardContainer>
      <PageTitle>Feedback Analytics Dashboard</PageTitle>
      <ChartGrid>
        <FeedbackSentimentChart data={feedbackData} />
        {/* <ProductRatingChart data={feedbackData} /> */}
        <FeedbackTrendChart data={feedbackData} />
      </ChartGrid>
    </DashboardContainer>
  );
};

export default FeedbackDashboard;
