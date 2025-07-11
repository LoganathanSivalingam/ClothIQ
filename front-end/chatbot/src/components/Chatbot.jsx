import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import {
  fetchCustomers,
  fetchProducts,
  fetchSales,
  fetchCampaigns,
  fetchEmployees,
  fetchFeedback,
  askGeminiChatbot
} from '../services/api';

const ChatbotWindow = styled.div`
  width: 350px;
  height: ${props => (props.$isOpen ? '450px' : '60px')};
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border: 1px solid #ddd;
`;

const ChatHeader = styled.div`
  background-color: #3498db;
  color: white;
  padding: 15px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const ChatBody = styled.div`
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #eaf1f7;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
  line-height: 1.4;
  font-size: 0.95em;

  ${props => props.sender === 'user' && `
    background-color: #dcf8c6;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  `}

  ${props => props.sender === 'bot' && `
    background-color: #ffffff;
    align-self: flex-start;
    border: 1px solid #eee;
    border-bottom-left-radius: 4px;
  `}
`;

const ChatInputContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #ddd;
  display: flex;
  background-color: #f9f9f9;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  font-size: 1em;
  margin-right: 10px;
`;

const SendButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 18px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you with your microbrand data today?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    const botResponse = await getBotResponse(userMessage);
    setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
  };

  const getBotResponse = async (query) => {
    const lowerQuery = query.toLowerCase();

    try {
      if (lowerQuery.includes('total customers')) {
        const res = await fetchCustomers();
        return `There are ${res.data.length} customers in total.`;
      }

      if (lowerQuery.includes('total products')) {
        const res = await fetchProducts();
        return `There are ${res.data.length} products listed.`;
      }

      if (lowerQuery.includes('active campaigns')) {
        const res = await fetchCampaigns();
        const active = res.data.filter(c => c.status === 'Active');
        return active.length
          ? `There are ${active.length} active campaigns: ${active.map(c => c.name).join(', ')}.`
          : `There are no active campaigns currently.`;
      }

      if (lowerQuery.includes('total sales amount')) {
        const res = await fetchSales();
        const total = res.data.reduce((sum, s) => sum + s.total_amount, 0);
        return `The total sales amount is ₹${total.toLocaleString('en-IN')}.`;
      }

      if (lowerQuery.includes('highest rated product')) {
        const feedback = await fetchFeedback();
        const ratings = {};

        feedback.data.forEach(fb => {
          if (fb.product_id && fb.rating) {
            if (!ratings[fb.product_id]) ratings[fb.product_id] = { sum: 0, count: 0 };
            ratings[fb.product_id].sum += fb.rating;
            ratings[fb.product_id].count++;
          }
        });

        let bestId = null, bestAvg = -1;
        for (const id in ratings) {
          const avg = ratings[id].sum / ratings[id].count;
          if (avg > bestAvg) {
            bestAvg = avg;
            bestId = id;
          }
        }

        if (bestId) {
          const products = await fetchProducts();
          const product = products.data.find(p => p.product_id == bestId);
          return `Highest rated product: "${product?.name || `Product ID ${bestId}`}" with avg rating ${bestAvg.toFixed(2)}.`;
        } else {
          return "Not enough feedback data to determine the highest rated product.";
        }
      }

      // Simple keyword replies
      if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) return "Hello! How can I assist you?";
      if (lowerQuery.includes('thank you')) return "You're welcome! Ask anything else.";
      if (lowerQuery.includes('help')) return "I can assist with customers, sales, products, campaigns, employees, and feedback. Try: 'total sales amount' or 'active campaigns'.";

      // 👇 If not matched, fallback to Gemini chatbot
      const res = await askGeminiChatbot(query);
      return res.answer || "Sorry, no answer available from AI.";

    } catch (err) {
      console.error("Bot error:", err);
      return "Sorry, I couldn't process your request.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <ChatbotWindow $isOpen={isOpen}>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        AI Assistant
        <span>{isOpen ? '—' : '+'}</span>
      </ChatHeader>
      {isOpen && (
        <>
          <ChatBody ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <Message key={i} sender={msg.sender}>{msg.text}</Message>
            ))}
          </ChatBody>
          <ChatInputContainer>
            <ChatInput
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <SendButton onClick={handleSend}>Send</SendButton>
          </ChatInputContainer>
        </>
      )}
    </ChatbotWindow>
  );
};

export default Chatbot;
