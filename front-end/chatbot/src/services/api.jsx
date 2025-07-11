// src/services/api.js
import axios from 'axios';


const API_BASE_URL = "http://127.0.0.1:5000/api/data"; // ✅

export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);
export const fetchCampaigns = () => axios.get(`${API_BASE_URL}/campaigns`);
export const fetchEmployees = () => axios.get(`${API_BASE_URL}/employees`);
export const fetchCustomers = () => axios.get(`${API_BASE_URL}/customers`);
export const fetchSales = () => axios.get(`${API_BASE_URL}/sales`);
export const fetchCampaignResults = () => axios.get(`${API_BASE_URL}/campaign_results`);
export const fetchFeedback = () => axios.get(`${API_BASE_URL}/feedback`);

// If you implement a chatbot endpoint on Flask:
// export const sendChatQuery = (query) => axios.post(`${API_BASE_URL}/chatbot`, { query });
export const askGeminiChatbot = async (question) => {
  try {
    const response = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    return await response.json();
  } catch (err) {
    console.error("❌ Chatbot API error:", err);
    return { answer: "AI is currently unavailable." };
  }
};
