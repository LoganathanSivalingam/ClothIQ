# 🧠 ClothIQ – AI-Powered Business Analyst for Clothing Microbrands

ClothIQ is a full-stack intelligent dashboard that combines SQL data and PDF knowledge to give insightful analytics and recommendations for small clothing brands. It features AI-powered chat, campaign intelligence, product performance visualizations, and customer sentiment analysis — all in one place.

---

## 🚀 Features

### 🔍 Smart Business Assistant
- Natural language chatbot to ask business questions.
- Understands SQL data and PDF documents.
- Gives short, strategic, human-like answers (e.g., "How can I improve sales in Chennai?").

### 📊 Real-Time Visual Dashboards
- **Sales Dashboard**: Sales by region, trend over time, and payment breakdown.
- **Campaign Dashboard**: Revenue by platform, active/inactive status, performance (leads/conversions).
- **Employee Dashboard**: Orders processed and satisfaction score by employee.
- **Feedback Dashboard**: Sentiment distribution, product ratings, and feedback trends.

### 🧠 AI-Powered Backend
- Combines SQL from MySQL and unstructured data from PDFs using:
  - Google Gemini 1.5 API (via LangChain)
  - ChromaDB vector store
  - Flask backend with structured REST endpoints

---

## 🛠 Tech Stack

### 🔧 Backend
- Python + Flask
- LangChain + Google Generative AI (Gemini 1.5)
- MySQL
- ChromaDB (vector store for PDFs)

### 💻 Frontend
- React + Vite
- Styled Components + Recharts
- Axios for API calls
- Responsive, collapsible AI assistant UI

---

## 📂 Project Structure
ClothIQ/
│
├── front-end/
│ ├── chatbot/ # React project
│ ├── src/
│ │ ├── components/
│ │ │ ├── charts/ # All chart visualizations
│ │ │ └── Chatbot.jsx # Smart AI chatbot
│ │ └── pages/ # Dashboard views
│
├── back-end/
│ ├── app.py # Main Flask app
│ ├── .env # Google API Key (excluded from Git)
│ ├── config.py # MySQL config
│ ├── chroma_store/ # Vector DB for PDFs
│
├── PDFs/ # Indexed documents for business intelligence
├── README.md
└── .gitignore


