# FinanceAI

FinanceAI is a modern web application for smarter financial decisions, featuring AI-powered lead priority prediction, instant loan approval analysis, and an interactive CapreCapital chatbot. The platform is built with React (frontend) and FastAPI (backend), leveraging advanced machine learning models for real-time predictions.

## Features

- **Lead Priority Prediction:**  
  Analyze company data and predict lead priority levels (High, Medium, Low) using a custom-trained ML pipeline for sales optimization.

- **Loan Approval System:**  
  Evaluate loan applications with a robust classifier that assesses financial profiles and credit history for instant eligibility decisions.

- **CapreCapital Chatbot:**  
  Floating widget powered by Groq LLM, answering questions about CapreCapital, finance, and AI.

- **Responsive UI:**  
  Modern, full-screen, adaptive layout for desktop and mobile. Seamless navigation between modules with a "Back to Home" button.

## Machine Learning Models

- **Lead Priority Model:**  
  Custom pipeline trained on company metrics to score and prioritize leads.

- **Loan Approval Model:**  
  Classifier trained on financial and credit data to predict loan approval status.

## Tech Stack

- **Frontend:** React, TypeScript, Lucide Icons
- **Backend:** FastAPI, Python, Pandas, Pickle, Joblib
- **ML Models:** Scikit-learn pipelines (lead_priority_pipeline.pkl, loan_model.pkl)
- **Chatbot:** LangChain + Groq API (llama-3.1-8b-instant or other supported models)

## Requirements

To run FinanceAI, install the following dependencies:

### Backend (Python)
- Python 3.8+
- fastapi
- uvicorn
- pandas
- joblib
- python-dotenv
- langchain_groq
- langchain_core

Install with:
```
pip install fastapi uvicorn pandas joblib python-dotenv langchain_groq langchain_core
```

### Frontend (Node.js)
- Node.js 16+
- npm
- React
- TypeScript
- Lucide Icons

Install with:
```
npm install
```

## Setup

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/financeai-app.git
   cd financeai-app
   ```

2. **Backend Setup:**
   - Place your ML model files (`lead_priority_pipeline.pkl`, `loan_model.pkl`) in the backend directory.
   - Add your Groq API key to `.env`:
     ```
     GROQ_API_KEY=your_groq_api_key
     ```
   - Install backend dependencies:
     ```
     pip install fastapi uvicorn pandas joblib python-dotenv langchain_groq langchain_core
     ```
   - Run the backend:
     ```
     uvicorn main:app --reload
     ```

3. **Frontend Setup:**
   - Install frontend dependencies:
     ```
     npm install
     ```
   - Run the frontend:
     ```
     npm run dev
     ```
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Start both frontend and backend servers.
- Use the homepage to select Lead Priority or Loan Approval modules.
- Return to the homepage using the "Back to Home" button.
- Interact with the floating CapreCapital chatbot for finance and AI questions.

## About Caprae

**Caprae’s Mission:**  
Caprae’s mission is to transform businesses post-acquisition by empowering them through AI-driven operational excellence and strategic growth rather than relying solely on financial engineering. The firm focuses on identifying, acquiring, and scaling companies by integrating technology, strong leadership, and an innovation-first culture.

**How Caprae is Changing ETA and Private Equity:**  
Caprae redefines traditional Private Equity and ETA by treating M&A as a long-term journey (seven years) focused on post-acquisition transformation rather than short-term financial arbitrage. Through AI-readiness, cultural development, and hands-on founder/operator leadership, Caprae accelerates business performance, turning good companies into world-class organizations that blend finance, strategy, and technology.

## License

MIT License

## Author

CapreCapital Team

# To update the README file in your git repository, run these commands in your terminal from the project root:

git add README.md
git commit -m "Update README with Caprae mission and ETA explanation"
git push
