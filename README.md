# Pipeline Builder - Full Stack Application

A visual pipeline builder application featuring a React Frontend (with React Flow) and a FastAPI Backend.

## 📂 Project Structure

- **`frontend/`**: The React application (Vite, Tailwind, Shadcn UI).
- **`backend/`**: The FastAPI server (Python, OAuth, Validation).

## 🚀 Quick Start (Local Development)

You need to run both the frontend and backend servers simultaneously.

### 1. Start the Backend
```bash
cd backend
# Create/Activate virtual env (if not done)
# Install dependencies: pip install -r requirements.txt
uvicorn main:app --reload
```
Runs on: **http://localhost:8000**

### 2. Start the Frontend
Open a new terminal:
```bash
cd frontend
# Install dependencies: npm install
npm run dev
```
Runs on: **http://localhost:5173**

## 🔑 Authentication Setup
This project uses Google and GitHub OAuth. You must configure the `.env` files in both `frontend` and `backend` directories.
See `backend/README.md` and `frontend/README.md` for detailed configuration instructions.

## 📦 Deployment (Render)
This project is configured for deployment on Render.
- The root `package.json` contains a build script that builds the frontend and moves the artifacts to the root `dist/` folder.
- `Render Build Command`: `npm run build`
- `Render Start Command`: `cd backend && pip install -r requirements.txt && python -m uvicorn main:app --host 0.0.0.0 --port $PORT`
