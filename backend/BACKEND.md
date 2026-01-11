# Backend Documentation

Complete guide to the Python FastAPI backend for the Pipeline Builder.

## 📋 Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [DAG Validation](#dag-validation)
- [Authentication](#authentication)
- [Configuration](#configuration)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The backend is a lightweight Python FastAPI server that provides validation and authentication services for the Pipeline Builder frontend. It's designed to be:

- **Fast**: Built on FastAPI, one of the fastest Python web frameworks
- **Reliable**: Comprehensive DAG validation with cycle detection
- **Secure**: JWT-based authentication with password hashing
- **Scalable**: RESTful API design with clear separation of concerns
- **Type-Safe**: Pydantic models for request/response validation

**Key Responsibilities:**
- Validate pipeline structures (DAG validation)
- Detect cycles in pipelines
- User authentication and authorization
- CORS handling for frontend integration
- Error handling and logging

---

## 📁 Project Structure

```
backend/
├── main.py                              # FastAPI application
├── schemas.py                           # Pydantic data models
├── requirements.txt                     # Python dependencies
├── .env                                 # Environment variables (not in git)
├── routes/
│   ├── __init__.py
│   └── auth.py                          # Authentication endpoints
└── utils/
    ├── __init__.py
    ├── dag.py                           # DAG validation logic
    └── security.py                      # JWT and security utilities
```

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | FastAPI | 0.68.0+ |
| **Server** | Uvicorn | 0.15.0+ |
| **Language** | Python | 3.8+ |
| **Validation** | Pydantic | 1.8.0+ |
| **Authentication** | Python-jose | Latest |
| **Graph Processing** | NetworkX | (if needed) |
| **HTTP Client** | HTTPX | 0.23.0+ |
| **Environment** | python-dotenv | 1.0.0+ |
| **Security** | cryptography | Latest |

---

## 📦 Installation

### Prerequisites

- **Python**: 3.8 or higher
- **pip**: Python package manager (comes with Python)
- **Virtual Environment**: Recommended for isolation

### Step-by-Step Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# macOS/Linux
python3 -m venv .venv
source .venv/bin/activate
```

3. **Upgrade pip** (recommended)
```bash
pip install --upgrade pip
```

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

5. **Create environment file**
```bash
# Copy from example or create new
# Windows
echo # > .env

# macOS/Linux
touch .env
```

6. **Configure environment variables**
```env
# .env file
SECRET_KEY=your-super-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

7. **Verify installation**
```bash
python -c "import fastapi; import pydantic; print('All dependencies installed!')"
```

---

## ▶️ Running the Server

### Development Mode (with auto-reload)

```bash
uvicorn main:app --reload
```

**Options:**
- `--host 0.0.0.0` - Accept connections from all interfaces
- `--port 8000` - Custom port (default is 8000)
- `--reload` - Auto-restart on file changes (dev only)

### Production Mode

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Custom Configuration

```bash
# Run on specific host and port with logging
uvicorn main:app --host 127.0.0.1 --port 8000 --log-level info
```

### Access the Server

- **API**: `http://localhost:8000`
- **Interactive Docs (Swagger UI)**: `http://localhost:8000/docs`
- **Alternative Docs (ReDoc)**: `http://localhost:8000/redoc`

---

## 📡 API Endpoints

### Health Check

**GET** `/`

**Response:**
```json
{
  "message": "Pipeline Parser API is running"
}
```

**Status Code**: 200 OK

---

### Pipeline Validation

**POST** `/pipelines/parse`

**Purpose**: Validates pipeline structure, detects cycles, and returns validation results.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "node-1",
      "type": "input",
      "data": {
        "label": "Start"
      },
      "position": {
        "x": 0,
        "y": 0
      }
    },
    {
      "id": "node-2",
      "type": "output",
      "data": {
        "label": "End"
      },
      "position": {
        "x": 100,
        "y": 100
      }
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "node-1",
      "target": "node-2",
      "type": "default"
    }
  ]
}
```

**Response (Valid Pipeline):**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true,
  "message": "Pipeline is valid! 2 nodes, 1 edges."
}
```

**Response (Cycle Detected):**
```json
{
  "num_nodes": 3,
  "num_edges": 3,
  "is_dag": false,
  "message": "Pipeline contains a cycle! Please remove circular connections."
}
```

**Response (Empty Pipeline):**
```json
{
  "num_nodes": 0,
  "num_edges": 0,
  "is_dag": true,
  "message": "Pipeline is empty. Add some nodes to get started."
}
```

**Status Codes:**
- `200 OK` - Request processed successfully
- `422 Unprocessable Entity` - Invalid request format

---

### Authentication Endpoints

**POST** `/auth/signup`

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password_123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**POST** `/auth/login`

Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secure_password_123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

## 📊 Data Models

### Node

**Pydantic Model**: Represents a single node in the pipeline.

```python
class Node(BaseModel):
    id: str              # Unique identifier
    data: Dict = {}      # Node-specific data
    position: Dict = {}  # x, y coordinates
    type: Optional[str] = None  # Node type
```

**Example:**
```json
{
  "id": "text-node-1",
  "type": "text",
  "data": {
    "label": "Process Text",
    "value": "Hello {{name}}"
  },
  "position": {
    "x": 100,
    "y": 200
  }
}
```

### Edge

**Pydantic Model**: Represents a connection between nodes.

```python
class Edge(BaseModel):
    id: str                      # Unique identifier
    source: str                  # Source node ID
    target: str                  # Target node ID
    type: Optional[str] = None   # Edge type
```

**Example:**
```json
{
  "id": "edge-1",
  "source": "input-1",
  "target": "output-1",
  "type": "default"
}
```

### PipelineData

**Pydantic Model**: Complete pipeline structure.

```python
class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
```

### PipelineResult

**Pydantic Model**: Validation result.

```python
class PipelineResult(BaseModel):
    num_nodes: int      # Number of nodes
    num_edges: int      # Number of edges
    is_dag: bool        # Is valid DAG?
    message: str        # Validation message
```

---

## 🔄 DAG Validation

### Overview

The backend validates that pipelines form a valid Directed Acyclic Graph (DAG) - a graph with no cycles.

**Location**: `backend/utils/dag.py`

### Algorithm

The validation uses **Depth-First Search (DFS)** with a recursion stack to detect cycles:

```
1. Build adjacency list from nodes and edges
2. Initialize visited set and recursion stack
3. For each unvisited node:
   a. Mark as visited
   b. Add to recursion stack
   c. For each neighbor:
      - If not visited: recursively check
      - If in recursion stack: CYCLE FOUND
4. Remove from recursion stack
5. Return: true if no cycles found
```

### Time Complexity

- **Time**: O(V + E) where V = nodes, E = edges
- **Space**: O(V) for recursion stack

### Key Functions

**build_adjacency_list(nodes, edges)**
```python
# Creates a mapping of node -> [connected nodes]
{
  "node-1": ["node-2", "node-3"],
  "node-2": ["node-3"],
  "node-3": []
}
```

**is_dag(nodes, edges)**
```python
# Returns: True if valid DAG, False if cycle detected
```

**validate_pipeline(nodes, edges)**
```python
# Comprehensive validation with user-friendly messages
```

### Validation Results

| Scenario | is_dag | Message |
|----------|--------|---------|
| Empty pipeline | ✓ true | "Pipeline is empty..." |
| Valid chain | ✓ true | "Pipeline is valid! X nodes, Y edges." |
| Valid with disconnected | ✓ true | "Pipeline is valid but nodes are not connected." |
| Has cycle | ✗ false | "Pipeline contains a cycle!..." |

---

## 🔐 Authentication

### Overview

The backend uses JWT (JSON Web Tokens) for stateless authentication.

**Location**: `backend/utils/security.py`

### Token Structure

JWTs consist of three parts separated by dots:
- **Header**: Algorithm and token type
- **Payload**: Claims (user data, expiration, etc.)
- **Signature**: Encrypted hash for verification

**Example Token:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxNjQwNzE1MjAwfQ.signature
```

### Token Flow

```
1. User submits credentials
2. Server validates credentials
3. Server generates JWT token
4. Client stores token (localStorage)
5. Client includes token in Authorization header for protected requests
6. Server verifies token signature
7. Token expires after configured time (default: 30 minutes)
```

### Implementation

**Creating a Token:**
```python
from utils.security import create_access_token
from datetime import datetime

data = {"sub": "user@example.com"}
token = create_access_token(data=data)
```

**Verifying a Token:**
```python
from utils.security import verify_token

payload = verify_token(token)
# Returns decoded payload or None if invalid
```

### Environment Variables

```env
SECRET_KEY=your-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Important**: Change `SECRET_KEY` in production!

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file in backend directory:

```env
# Security
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS
FRONTEND_URL=http://localhost:5173
```

### CORS Configuration

The server is configured to accept requests from:
- `http://localhost` and variants
- `http://127.0.0.1` and variants
- Production domain (if deployed)

**Modify in `main.py`:**
```python
origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "https://yourdomain.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Logging

```python
import logging

logger = logging.getLogger(__name__)
logger.info("Message")
logger.error("Error")
```

---

## 📝 Development Guidelines

### Code Structure

**Route Handlers:**
```python
@app.post("/pipelines/parse", response_model=PipelineResult)
async def parse_pipeline(data: PipelineData):
    """
    Validate pipeline structure.
    
    Args:
        data: PipelineData containing nodes and edges
    
    Returns:
        PipelineResult with validation details
    """
    result = validate_pipeline(data.nodes, data.edges)
    return result
```

### Adding New Endpoints

1. **Create router** (if organizing by feature):
```python
# routes/pipelines.py
from fastapi import APIRouter

router = APIRouter(prefix="/pipelines", tags=["pipelines"])

@router.post("/parse")
async def parse_pipeline(data: PipelineData):
    # Implementation
    pass
```

2. **Register router** in `main.py`:
```python
from routes.pipelines import router as pipeline_router
app.include_router(pipeline_router)
```

### Error Handling

```python
from fastapi import HTTPException, status

@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    try:
        result = validate_pipeline(data.nodes, data.edges)
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
```

### Async Patterns

```python
# Use async for I/O operations
@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    # Async database calls, API calls, etc.
    result = await some_async_operation()
    return result
```

### Testing

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_parse_pipeline():
    payload = {
        "nodes": [...],
        "edges": [...]
    }
    response = client.post("/pipelines/parse", json=payload)
    assert response.status_code == 200
```

---

## 🐛 Troubleshooting

### Port 8000 Already in Use

```bash
# Find process using port 8000 (Windows)
netstat -ano | findstr :8000

# Use different port
uvicorn main:app --port 8001
```

### Virtual Environment Issues

**Activation not working:**
```bash
# Windows: ensure you're using the right path
.venv\Scripts\activate.bat

# If still issues, recreate environment
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Module Import Errors

```bash
# Ensure you're in the virtual environment
.venv\Scripts\activate  # Windows

# Reinstall dependencies
pip install --upgrade --force-reinstall -r requirements.txt
```

### CORS Errors

**Error**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**:
1. Check frontend URL matches CORS origins in `main.py`
2. Ensure backend is running
3. Verify `Access-Control-Allow-Origin` header is present
4. Check browser console for specific errors

```python
# Verify CORS is properly configured
print(app.user_middleware)
```

### JWT Token Issues

**"Invalid token" error:**
1. Check token hasn't expired
2. Verify `SECRET_KEY` is the same for encoding and decoding
3. Check token format in Authorization header: `Bearer <token>`

**Token format:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Dependency Conflicts

```bash
# Create fresh environment
rm -rf .venv
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### API Not Responding

1. Check server is running: `http://localhost:8000/`
2. Check console for error messages
3. Restart server: `Ctrl+C` then rerun
4. Check firewall settings

### Database/Persistent Storage Errors

If implementing database:
```bash
# Migrate/setup database
python -m alembic upgrade head
```

---

## 📚 Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Uvicorn Documentation](https://www.uvicorn.org)
- [Pydantic Documentation](https://pydantic-docs.helpmanual.io)
- [Python-jose Documentation](https://github.com/mpdavis/python-jose)
- [Python Documentation](https://docs.python.org/3/)

---

## 🚀 Deployment

### Prepare for Production

1. **Set strong SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

2. **Update CORS origins** to production domain

3. **Set DEBUG=False**

4. **Use production ASGI server:**
```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Environment Variables (Production)

```env
SECRET_KEY=<strong-random-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=False
FRONTEND_URL=https://yourdomain.com
```

### Deploy Options

- **Render**: Push to Git, automatic deployment
- **Railway**: Simple deployment with environment variables
- **Heroku**: Use Procfile with Gunicorn
- **AWS/Google Cloud**: Container deployment with Docker

---

## 🤝 Getting Help

For issues:
1. Check this documentation
2. Review FastAPI docs
3. Check browser/server console for errors
4. Verify configuration and environment variables
5. Check network requests (browser DevTools)