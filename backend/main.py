# skillbridge-chatbot/backend/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from fuzzywuzzy import process

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

qa_data = pd.read_csv("qa_dataset.csv")
questions = qa_data["question"].tolist()
answers = qa_data["answer"].tolist()

@app.post("/ask")
async def ask_question(request: Request):
    data = await request.json()
    message = data.get("message", "").lower()
    best_match, score = process.extractOne(message, questions)
    if score >= 70:
        idx = questions.index(best_match)
        return {"response": answers[idx]}
    else:
        return {"response": "I'm SkillBridge's assistant. Please ask me about our courses, jobs, or your progress!"}
