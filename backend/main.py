import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load variables from the .env file
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Gemini Client using the key from our .env file
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is missing from the .env file!")

client = genai.Client(api_key=api_key)

# This defines what structure the frontend needs to send us
class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str

@app.get("/")
def home():
    return {"status": "Backend Server is Running Successfully!"}

# Our main AI analysis route
@app.post("/api/analyze")
def analyze_resume(request: AnalysisRequest):
    try:
        # 1. Create a well-engineered prompt for Gemini
        prompt = f"""
        You are an expert HR Manager and Technical Recruiter.
        Analyze the following Resume against the Job Description provided.
        
        Resume:
        {request.resume_text}
        
        Job Description:
        {request.job_description}
        
        Provide the evaluation strictly matching this JSON structure:
        - match_percentage (an integer between 0 and 100)
        - missing_keywords (a list of technical strings/skills missing)
        - profile_summary (a short text suggestion explaining how to improve)
        """

        # 2. Call the Gemini 2.5 Flash model
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            # This configuration forces Gemini to return valid, clean JSON data
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            ),
        )
        
        # 3. Return Gemini's evaluation directly back to the user
        return {"success": True, "analysis": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))