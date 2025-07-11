// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Import Dashboard Components for each table
import CustomersDashboard from './pages/CustomersDashboard';
import ProductsDashboard from './pages/ProductsDashboard';
import SalesDashboard from './pages/SalesDashboard';
import CampaignsDashboard from './pages/CampaignsDashboard';
import EmployeesDashboard from './pages/EmployeesDashboard';
import FeedbackDashboard from './pages/FeedbackDashboard';
import DashboardOverview from './pages/DashboardOverview.jsx';
 // A general overview page

const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative; /* For chatbot positioning */
`;

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/customers" element={<CustomersDashboard />} />
         <Route path="/products" element={<ProductsDashboard />} />
          <Route path="/sales" element={<SalesDashboard />} />
          <Route path="/campaigns" element={<CampaignsDashboard />} />
          <Route path="/employees" element={<EmployeesDashboard />} />
          <Route path="/feedback" element={<FeedbackDashboard />} />
        </Routes>
        <ChatbotContainer>
          <Chatbot />
        </ChatbotContainer>
      </MainContent>
    </Router>
  );
}

export default App;