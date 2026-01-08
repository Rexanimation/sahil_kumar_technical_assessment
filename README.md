# Pipeline UI Project - Technical Assessment

A React-based Node Pipeline UI with a FastAPI backend, capable of creating, connecting, and validating variable-based nodes.

## 🚀 Features

- **Draggable Nodes**: Create and connect nodes in a visual editor.
- **Dynamic Text Nodes**: Supports `{{variable}}` syntax with auto-generated input handles.
- **Backend Validation**: FastAPI backend validates the pipeline structure (DAG) and counts nodes/edges.
- **Modern UI**: Built with React Flow, Tailwind CSS, and Shadcn UI.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, React Flow, Tailwind CSS
- **Backend**: Python, FastAPI, NetworkX (for DAG checks)

## 📦 Installation & Setup

### 1. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

## 🌐 Application Flow

1.  **Design**: User drags and connects nodes on the canvas.
2.  **Submit**: Clicking "Submit" sends the graph topology (nodes & edges) to the backend.
3.  **Validate**: The backend (`dags.py`) ensures the graph is a Directed Acyclic Graph (DAG) using DFS.
4.  **Response**: Frontend receives the cycle status, node count, and edge count to display to the user.

## 🚀 Deployment

Live Demo: [INSERT_DEPLOYMENT_LINK_HERE]

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your credentials for authentication features (if applicable).

```bash
cp .env.example .env
```
