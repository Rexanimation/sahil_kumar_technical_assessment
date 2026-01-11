# Pipeline Builder - Backend

This directory contains the FastAPI backend for the Pipeline Builder application. It handles authentication (OAuth), pipeline validation, and serves the API endpoints.

## 🛠️ Tech Stack
- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Authentication**: OAuth2 (Google & GitHub) + JWT
- **Server**: Uvicorn

## 🚀 Setup & Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    # Windows
    python -m venv .venv
    .\.venv\Scripts\activate

    # Linux/Mac
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configuration (.env):**
    Copy `.env.example` to `.env` and fill in your credentials.
    ```bash
    cp .env.example .env
    ```
    
    **Required Variables:**
    - `SECRET_KEY`: A secure random string for JWT signing.
    - `FRONTEND_URL`: URL of the frontend (e.g., `http://localhost:5173`).
    - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: From Google Cloud Console.
    - `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: From GitHub Developer Settings.
    - `GOOGLE_REDIRECT_URI`: `http://localhost:8000/auth/google/callback`
    - `GITHUB_REDIRECT_URI`: `http://localhost:8000/auth/github/callback`

## ▶️ Running the Server

Start the development server with hot-reload:

```bash
uvicorn main:app --reload
```
The server will be available at **http://localhost:8000**.

## 🔌 API Endpoints

- **GET /**: Health check / Root endpoint.
- **GET /auth/login/{provider}**: Initiates OAuth flow (google/github).
- **POST /pipelines/parse**: Validates a pipeline structure (DAG).
