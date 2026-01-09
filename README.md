# VectorShift Frontend Assessment

## Overview
A frontend-focused pipeline builder that allows users to construct and validate DAG-based workflows.

## Features
- **Node Abstraction**: Reusable base node component (`BaseNode.tsx`) simplifying creation of new node types.
- **Dynamic Text Nodes**: Text nodes that auto-resize and support `{{variable}}` handle creation.
- **DAG Validation**: Backend integration to validate pipeline structure and prevent cycles.
- **Modern UI**: "Premium Dark Theme" with glassmorphism effects using React Flow and Tailwind CSS.
- **5 Custom Nodes**: Input, Output, LLM, Text, Math, Delay, Merge, Condition, and Note.

## Design Decisions
- **Minimal UI**: Prioritized usability for non-technical users with a clean sidebar and intuitive drag-and-drop.
- **Backend Validation**: Limited backend scope to structure validation (`dag.py`) rather than full execution to focus on frontend interactivity.
- **Abstraction**: Used a config-driven approach (`nodeConfigs`) to register new nodes without boilerplate.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TypeScript, React Flow, Tailwind CSS, Shadcn UI
- **Backend**: Python, FastAPI, NetworkX

## 📦 Installation & Setup

### 1. Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Backend
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

## Environment Variables
Sensitive values are intentionally omitted. See `.env.example`.

## Future Improvements
- **Pipeline execution engine**: Actually processing data through the nodes.
- **AI tool integrations**: Connecting real LLM APIs to the LLM Node.

