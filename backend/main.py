from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import pandas as pd
import pickle
import joblib
import io
import os
from dotenv import load_dotenv

app = FastAPI(title="Unified AI Prediction API 🚀")

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Input Schemas
# -----------------------------
class LeadData(BaseModel):
    annual_revenue__m__: float
    leads_generated: float
    conversion_rate____: float
    total_purchases_last_year: float
    frequency_num: float
    industry: str
    company_size: str
    campaign_type: str
    region: str
    district: str
    contract_status: str
    payment_behavior: str
    preferred_channel: str

class LoanData(BaseModel):
    Gender: str
    Married: str
    Dependents: int
    Education: str
    Self_Employed: str
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: int
    Credit_History: int
    Property_Area: str

# -----------------------------
# Load Models Once at Startup
# -----------------------------
try:
    with open("lead_priority_pipeline.pkl", "rb") as f:
        lead_pipeline = pickle.load(f)
except Exception as e:
    raise RuntimeError(f"Failed to load lead model: {e}")

try:
    loan_model = joblib.load("loan_model.pkl")
except Exception as e:
    raise RuntimeError(f"Failed to load loan model: {e}")

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {"message": "Unified Lead + Loan Prediction API is running 🚀"}

# Health check
@app.get("/health")
def health():
    return {"status": "ok", "lead_model_loaded": True, "loan_model_loaded": True}

# -----------------------------
# 1️⃣ Lead Priority Prediction (POST)
# -----------------------------
@app.post("/predict-lead-priority")
def predict_lead_priority(data: LeadData):
    input_df = pd.DataFrame([data.dict()])

    numeric_cols = ["annual_revenue__m__", "leads_generated", "conversion_rate____", 
                    "total_purchases_last_year", "frequency_num"]
    for col in numeric_cols:
        input_df[col] = pd.to_numeric(input_df[col], errors="coerce")

    try:
        pred = lead_pipeline.predict(input_df)
        return {"Lead_Priority": str(pred[0])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Lead prediction error: {str(e)}")

# -----------------------------
# 1️⃣ Lead Priority Prediction (GET) for browser testing
# -----------------------------
@app.get("/predict-lead-priority-get")
def predict_lead_priority_get(
    annual_revenue__m__: float,
    leads_generated: float,
    conversion_rate____: float,
    total_purchases_last_year: float,
    frequency_num: float,
    industry: str,
    company_size: str,
    campaign_type: str,
    region: str,
    district: str,
    contract_status: str,
    payment_behavior: str,
    preferred_channel: str
):
    input_df = pd.DataFrame([{
        "annual_revenue__m__": annual_revenue__m__,
        "leads_generated": leads_generated,
        "conversion_rate____": conversion_rate____,
        "total_purchases_last_year": total_purchases_last_year,
        "frequency_num": frequency_num,
        "industry": industry,
        "company_size": company_size,
        "campaign_type": campaign_type,
        "region": region,
        "district": district,
        "contract_status": contract_status,
        "payment_behavior": payment_behavior,
        "preferred_channel": preferred_channel
    }])

    numeric_cols = ["annual_revenue__m__", "leads_generated", "conversion_rate____", 
                    "total_purchases_last_year", "frequency_num"]
    for col in numeric_cols:
        input_df[col] = pd.to_numeric(input_df[col], errors="coerce")

    try:
        pred = lead_pipeline.predict(input_df)
        return {"Lead_Priority": str(pred[0])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Lead prediction error: {str(e)}")

# -----------------------------
# Lead CSV Prediction
# -----------------------------
@app.post("/predict-lead-priority-csv")
def predict_lead_priority_csv(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        df = pd.read_csv(io.BytesIO(contents))

        required_cols = lead_pipeline.feature_names_in_
        missing = [col for col in required_cols if col not in df.columns]
        if missing:
            raise HTTPException(status_code=400, detail=f"Missing columns in CSV: {missing}")

        preds = lead_pipeline.predict(df)
        df["Predicted_Lead_Priority"] = preds
        return df.head(10).to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"CSV processing error: {str(e)}")

# -----------------------------
# 2️⃣ Loan Approval Prediction
# -----------------------------
@app.post("/predict-loan-approval")
def predict_loan(data: LoanData):
    input_data = pd.DataFrame({
        'Gender': [1 if data.Gender == "Male" else 0],
        'Married': [1 if data.Married == "Yes" else 0],
        'Dependents': [data.Dependents],
        'Education': [1 if data.Education == "Graduate" else 0],
        'Self_Employed': [1 if data.Self_Employed == "Yes" else 0],
        'ApplicantIncome': [data.ApplicantIncome],
        'CoapplicantIncome': [data.CoapplicantIncome],
        'LoanAmount': [data.LoanAmount],
        'Loan_Amount_Term': [data.Loan_Amount_Term],
        'Credit_History': [data.Credit_History],
        'Property_Area': [
            0 if data.Property_Area == "Rural" else
            1 if data.Property_Area == "Semiurban" else
            2 if data.Property_Area == "Urban" else -1
        ]
    })

    if input_data['Property_Area'][0] == -1:
        raise HTTPException(status_code=400, detail=f"Invalid Property_Area value: {data.Property_Area}")

    try:
        pred = loan_model.predict(input_data)
        result = "Approved ✅" if pred[0] == 1 else "Not Approved ❌"
        return {"Loan_Approval": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Loan prediction error: {str(e)}")

# -----------------------------
# Loan CSV Prediction
# -----------------------------
@app.post("/predict-loan-csv")
def predict_loan_csv(file: UploadFile = File(...)):
    try:
        contents = file.file.read()
        df = pd.read_csv(io.BytesIO(contents))

        preds = loan_model.predict(df)
        df["Loan_Approval_Prediction"] = ["Approved ✅" if p == 1 else "Not Approved ❌" for p in preds]
        return df.head(10).to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"CSV processing error: {str(e)}")

# -----------------------------
# 🤖 Chatbot Endpoint
# -----------------------------
@app.post("/chatbot")
async def chatbot(request: Request):
    try:
        data = await request.json()
    except Exception:
        return JSONResponse({"answer": "Please ask a question."})
    question = data.get("question", "").strip()
    if not question:
        return JSONResponse({"answer": "Please ask a question."})

    # --- Groq Chatbot logic ---
    from langchain_groq import ChatGroq
    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser
    load_dotenv()
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not groq_api_key or not groq_api_key.startswith("gsk_"):
        return JSONResponse({"answer": "Groq API key is missing or invalid. Please check your .env file."})
    os.environ["GROQ_API_KEY"] = groq_api_key

    model_name = "llama-3.1-8b-instant"  # <-- Use supported model
    try:
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a helpful assistant for CapreCapital, a finance startup that leverages AI. Answer questions about CapreCapital, its finance solutions, and its AI-powered products."),
            ("human", "{question}"),
        ])
        llm = ChatGroq(model=model_name)
        output_parser = StrOutputParser()
        chain = prompt | llm | output_parser
        answer = chain.invoke({'question': question})
    except Exception as e:
        return JSONResponse({"answer": f"Groq error: {str(e)}"})
    return JSONResponse({"answer": answer})

load_dotenv()
print("GROQ_API_KEY loaded:", os.getenv("GROQ_API_KEY"))  # Add this for debugging
