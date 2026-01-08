from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import PipelineData, PipelineResult
from utils.dag import validate_pipeline
from routes import auth

app = FastAPI()

app.include_router(auth.router)

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:8080", 
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Add allowed origins from environment variable
if os.getenv("ALLOWED_ORIGINS"):
    origins.extend(os.getenv("ALLOWED_ORIGINS").split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/pipelines/parse", response_model=PipelineResult)
async def parse_pipeline(data: PipelineData):
    result = validate_pipeline(data.nodes, data.edges)
    return result

@app.get("/")
async def root():
    return {"message": "Pipeline Parser API is running"}
