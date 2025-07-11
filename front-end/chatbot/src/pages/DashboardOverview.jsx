// src/pages/DashboardOverview.js
import React from 'react';
import styled from 'styled-components';

const DashboardOverviewContainer = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const WelcomeTitle = styled.h1`
  color: #2c3e50;
  font-size: 3em;
  margin-bottom: 20px;
`;

const WelcomeText = styled.p`
  font-size: 1.2em;
  color: #555;
  max-width: 600px;
  line-height: 1.6;
`;

const DashboardOverview = () => {
  return (
    <DashboardOverviewContainer>
      <WelcomeTitle>Welcome to the Microbrand Admin Dashboard!</WelcomeTitle>
      <WelcomeText>
        Use the navigation bar on the left to explore detailed analytics for Customers, Products, Sales, Campaigns, Employees, and Feedback.
        The chatbot at the bottom right is available to assist you with quick queries.
      </WelcomeText>
    </DashboardOverviewContainer>
  );
};

export default DashboardOverview;