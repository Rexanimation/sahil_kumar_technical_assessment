# Pipeline Builder - Full Stack Application














































































































































































































































































































































































































































































































































































































































































































5. Restart dev server and clear cache4. Review backend logs if API-related3. Check browser console for errors2. Review code comments1. Check existing documentationFor issues or questions:## 🤝 Getting Help---- [Shadcn UI](https://ui.shadcn.com)- [React Flow Docs](https://reactflow.dev)- [Tailwind CSS Docs](https://tailwindcss.com/docs)- [Vite Documentation](https://vitejs.dev)- [TypeScript Handbook](https://www.typescriptlang.org/docs/)- [React Documentation](https://react.dev)## 📚 Additional Resources---```npm run build# Rebuildrm -rf node_modules/.vite# Clear vite cache```bash### Build Errors```# Or manually refresh the pagenpm run dev# Restart dev server```bash### Hot Module Replacement (HMR) Not Working```npm run dev# Restart dev servernpm install reactflow# Ensure react-flow-renderer is installed```bash### React Flow Not Rendering4. Verify backend CORS configuration3. Check browser console for CORS errors2. Check `VITE_API_URL` in `.env.local`1. Verify backend is running on correct port### API Connection Issues4. Clear browser cache (Ctrl+Shift+Delete)3. Restart dev server2. Check `tailwind.config.ts` includes all template files1. Ensure Tailwind CSS is configured correctly### Styles Not Applying```npm installrm -rf node_modules# Clear node_modules and reinstall```bash### Modules Not Found Errors```npm run dev -- --port 3000# Use different portnetstat -ano | findstr :5173# Find process using port 5173```bash### Port 5173 Already in Use## 🐛 Troubleshooting---6. **Documentation**: Update comments if needed5. **Integration**: Wire up with state/API4. **Testing**: Manual testing in dev environment3. **Styling**: Apply Tailwind classes2. **Component Creation**: Create in appropriate folder1. **Feature Planning**: Break into small, testable units### Adding Features```};  );    </div>      {children}      <h1>{title}</h1>    <div className="...">  return (}: MyComponentProps) => {  onSubmit,  title,  children,export const MyComponent = ({}  onSubmit?: () => void;  title: string;  children?: ReactNode;interface MyComponentProps {import { ReactNode } from 'react';```tsx### Component Template- **Types**: Define interfaces for component props- **Components**: Functional components with hooks- **Imports**: Sort by external, then relative- **Naming**: camelCase for functions/variables, PascalCase for components### Code Style## 📝 Development Guidelines---```className="text-sm md:text-base lg:text-lg"// Mobile-first approach```tsx### Responsive Design- **Accent**: `blue-600`, `purple-600`- **Text**: `slate-100` (primary), `slate-400` (secondary)- **Borders**: `slate-700`- **Cards**: `slate-800` to `slate-900`- **Background**: `slate-900` to `slate-950`### Color Scheme```className="text-slate-100 dark:text-slate-300"// Dark theme textclassName="bg-white/10 backdrop-blur-md border border-white/20"// GlassmorphismclassName="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"// ButtonsclassName="bg-slate-900 border border-slate-700 rounded-lg p-4"// Cards```tsx**Common Patterns:**### Tailwind CSS Classes## 🎨 Styling Guide---```}  }    // Server error  } else {    // Unauthorized - redirect to login  } else if (error.response?.status === 401) {    // Validation error  if (error.response?.status === 400) {} catch (error) {  const result = await api.validatePipeline(nodes, edges);try {```tsx### Error Handling```const response = await api.validatePipeline(nodes, edges);// In componentimport { api } from '@/services/api';```tsx### Making API Calls```async logout(): Promise<void>async getProfile(): Promise<User>// Userasync signup(email, password): Promise<AuthResponse>async login(email, password): Promise<AuthResponse>// Authenticationasync validatePipeline(nodes, edges): Promise<ValidationResult>// Validation```typescript**Key Methods:****Location**: `src/services/api.ts`### API Service## 🔌 API Integration---```};  // Use pipeline state  const { nodes, edges, addNode } = usePipelineStore();export const MyComponent = () => {import { usePipelineStore } from '@/store/pipelineStore';```tsx**Usage**:- User preferences- Validation cache- Undo/redo history (if implemented)- Pipeline state**Manages:****Location**: `src/store/pipelineStore.ts`### Zustand Store (pipelineStore)```};  // Use auth state  const { user, token, login } = useAuth();export const MyComponent = () => {import { useAuth } from '@/context/AuthContext';```tsx**Usage**:- `logout()`: Clear authentication- `signup()`: Register new user- `login()`: Authenticate user- `token`: JWT token- `user`: Current authenticated user**Provides:****Location**: `src/context/AuthContext.tsx`### AuthContext## 🔄 State Management---```];  // ...  },    description: 'Description'    icon: <MyIcon />,    label: 'My Node',    type: 'myNode',  {const nodeTypes = [```tsx3. **Add to node palette** (Sidebar.tsx):```};  // ... other nodes  myNode: MyNode,const nodeTypes = {```tsx2. **Register in Canvas.tsx**:```};  );    </BaseNode>      {/* Custom node content */}    <BaseNode {...props}>  return (export const MyNode = (props) => {import { BaseNode } from './BaseNode';// src/nodes/MyNode.tsx```tsx1. **Create the component**:### Creating a New Node Type- Visual distinction for notes- Text-only node- No input/output handles- Documentation and annotations#### **NoteNode**- Boolean condition evaluation- Multiple output handles (true/false branches)- One input handle- Conditional branching#### **ConditionNode**- Useful for data aggregation- One output handle- Multiple input handles- Combines multiple inputs into one#### **MergeNode**- Configurable delay duration (ms)- Output: Same data after delay- Input: Any data type- Introduces time delays#### **DelayNode**- Supports: +, -, *, /, %, sqrt, pow- Output: Calculation result- Input: Numeric values- Mathematical operations#### **MathNode**- Configurable model selection- Output: Model response- Input: Prompt text- Language model operations#### **LLMNode**- Multiple input/output handles- Auto-resizing based on content- Supports `{{variable}}` syntax for dynamic content- Text processing and manipulation#### **TextNode**- Receives final processed data- No output handles- One input handle- Terminal node#### **OutputNode**- Used to initiate data flow- One output handle- No input handles- Entry point for pipelines#### **InputNode**### Available Node Types```};  );    </div>      <Handle position={Position.Bottom} type="source" />      <Handle position={Position.Top} type="target" />      {/* Icon or custom content */}    <div className="node-styling">  return (export const BaseNode = ({ data, selected }: BaseNodeProps) => {}  selected?: boolean;  };    [key: string]: any;    icon?: React.ReactNode;    label: string;  data: {interface BaseNodeProps {```tsx**Structure:**- Tailwind CSS integration- Selected state styling- Handle display and positioning- Consistent styling (dark theme, glassmorphism)**Key Features:****Purpose**: Provides common functionality for all node types### BaseNode.tsxAll custom nodes extend `BaseNode.tsx` for consistent styling and behavior.## 📦 Custom Nodes---- Checks auth context state- Redirects unauthenticated users to login- Route wrapper for authenticated pages#### **ProtectedRoute.tsx**- API integration- Form validation- Email and password input- Login/signup form#### **AuthModal.tsx**```const validatePipeline = async ();      // Call backend validationconst onConnect = useCallback(...);     // Create new connectionsconst onEdgesChange = useCallback(...); // Handle edge changesconst onNodesChange = useCallback(...); // Handle node changes```typescript**Key Functions:**- Handles undo/redo if implemented- Manages node configurations- Implements validation on node/edge changes- Handles node/edge creation and deletion- Manages React Flow instance**Key Responsibilities:**The heart of the application - implements React Flow for visual pipeline building.#### **Canvas.tsx**### Feature Components- Version info- Quick links- Project information#### **Footer.tsx**- Visual feedback- Updates in real-time- Counts active nodes#### **NodeCounter.tsx**- Pipeline statistics- Error/success messages- Real-time validation feedback#### **StatusBar.tsx**- Node type definitions with descriptions- Drag-and-drop source- Node palette#### **Sidebar.tsx**- Quick links- Branding- Navigation menu#### **TopBar.tsx**### Layout Components- Coordinates child components- Manages React Flow instance- Contains the complete pipeline editor interface#### **Builder.tsx** (Main Application)- Navigation to builder for authenticated users- Login/signup portal- Welcome screen with project overview#### **Index.tsx** (Landing Page)### Page Components## 🏗️ Component Architecture---Creates a development build for debugging purposes.```npm run build:dev```bash### Build in Development ModeServes the production build locally on `http://localhost:4173````npm run preview```bash### Preview Production Build- Source maps (optional)- Asset optimization- Tree shaking- Code minificationThis creates an optimized production build in the `dist/` folder with:```npm run build```bash### Build the Project## 🏗️ Building for Production---Makes the app accessible from other machines on your network.```npm run dev -- --host```bash### Development with Host Access```npm run dev -- --port 3000```bash### Development with Custom Port- Watch for file changes- Enable hot module replacement (HMR)- Start Vite dev server on `http://localhost:5173`This will:```npm run dev```bash### Basic Development Mode## ▶️ Running the Development Server---```echo "VITE_API_URL=http://localhost:8000" > .env.local# Create .env.local in root directory```bash4. **Create environment file** (if needed)```node --versionnpm --version```bash3. **Verify installation**```bun install# or with bunyarn install# or with yarnnpm install```bash2. **Install dependencies**```cd sahil_kumar_technical_assessment```bash1. **Clone and navigate to project**### Step-by-Step Setup- **Git**: For version control- **npm**: 8.0.0 or higher (or yarn/bun)- **Node.js**: 16.0.0 or higher### Prerequisites## 📦 Installation---| **Validation** | Zod | Latest || **Forms** | React Hook Form | Latest || **Icons** | Lucide React | Latest || **Animations** | Framer Motion | 12+ || **HTTP Client** | Axios (React Query) | Latest || **Routing** | React Router | 6+ || **State Management** | Zustand | Latest || **Graph Library** | React Flow | 12+ || **UI Components** | Shadcn UI | Latest || **Styling** | Tailwind CSS | 3+ || **Build Tool** | Vite | Latest || **Language** | TypeScript | Latest || **Framework** | React | 18+ ||----------|-----------|---------|| Category | Technology | Version |## 🛠️ Technology Stack---```└── vite-env.d.ts                        # Vite types├── index.css                            # Global styles├── main.tsx                             # Entry point├── App.tsx                              # Root component│   └── textParser.ts│   ├── dagHelpers.ts├── utils/                               # Helper functions│   └── pipelineStore.ts                 # Zustand store├── store/                               # State management│   └── api.ts                           # Backend API calls├── services/                            # API services│   └── utils.ts├── lib/                                 # Utility libraries│   └── usePerformance.ts│   ├── use-toast.ts│   ├── use-mobile.tsx├── hooks/                               # Custom hooks│   └── AuthContext.tsx                  # Authentication state├── context/                             # React Context│   └── index.ts│   ├── constants.ts                     # Node type definitions│   ├── TextNode.tsx│   ├── OutputNode.tsx│   ├── NoteNode.tsx│   ├── MergeNode.tsx│   ├── MathNode.tsx│   ├── LLMNode.tsx│   ├── InputNode.tsx│   ├── DelayNode.tsx│   ├── ConditionNode.tsx│   ├── BaseNode.tsx                     # Base node component├── nodes/                               # Custom node definitions│   └── NotFound.tsx                     # 404 page│   ├── Index.tsx                        # Landing page│   ├── Home.tsx│   ├── Builder.tsx                      # Pipeline builder page├── pages/                               # Page-level components│       └── ... (other UI components)│       ├── alert-dialog.tsx│       ├── tooltip.tsx│       ├── toast.tsx│       ├── card.tsx│       ├── input.tsx│       ├── dialog.tsx│       ├── button.tsx│   └── ui/                              # Shadcn UI components│   ├── TopBar.tsx                       # Header with nav│   ├── StatusBar.tsx                    # Validation feedback│   ├── Sidebar.tsx                      # Node palette│   ├── ProtectedRoute.tsx               # Route protection wrapper│   ├── NodeCounter.tsx                  # Node statistics│   ├── NavLink.tsx                      # Navigation link│   ├── Footer.tsx                       # Footer component│   ├── Canvas.tsx                       # Main React Flow editor│   ├── AuthModal.tsx                    # Login/signup modal├── components/                          # React componentssrc/```## 📁 Project Structure---- Type-safe TypeScript codebase- Responsive design- Dark theme with glassmorphism effects- Real-time DAG validation- 9 custom node types with unique functionality- Visual node-based editor with React Flow**Key Features:**- View real-time feedback and statistics- Authenticate securely- Validate pipelines for cycles and structure errors- Connect nodes to define data flow- Drag and drop nodes to create pipelinesThe frontend is a modern React single-page application (SPA) that provides an intuitive interface for building and validating data pipelines. Users can:## 🎯 Overview---- [Troubleshooting](#troubleshooting)- [Development Guidelines](#development-guidelines)- [Styling Guide](#styling-guide)- [API Integration](#api-integration)- [State Management](#state-management)- [Custom Nodes](#custom-nodes)- [Component Architecture](#component-architecture)- [Building for Production](#building-for-production)- [Running the Development Server](#running-the-development-server)- [Installation](#installation)- [Technology Stack](#technology-stack)- [Project Structure](#project-structure)- [Overview](#overview)## 📋 Table of ContentsComplete guide to the React/TypeScript frontend application for the Pipeline Builder.A comprehensive frontend and backend application for building and validating DAG-based (Directed Acyclic Graph) workflows with a modern, intuitive user interface.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [API Documentation](#api-documentation)

---

## 🎯 Overview

This project is a full-stack pipeline builder that enables users to:
- Create complex data pipelines by connecting nodes visually
- Validate pipeline structures to prevent cycles and errors
- Use specialized nodes for different operations (LLM, Math, Text processing, etc.)
- Authenticate users and manage secure access
- Experience a modern, dark-themed UI with glassmorphism effects

The application consists of:
- **Frontend**: React/TypeScript SPA with React Flow for visual graph building
- **Backend**: Python FastAPI server providing validation and authentication

---

## ✨ Features

### Frontend
- **Visual Node Editor**: Drag-and-drop interface for building pipelines
- **9 Custom Node Types**:
  - Input Node: Entry point for data
  - Output Node: Pipeline result endpoint
  - LLM Node: Language model integration
  - Text Node: Text processing with `{{variable}}` support
  - Math Node: Mathematical operations
  - Delay Node: Introduce timing delays
  - Merge Node: Combine multiple inputs
  - Condition Node: Conditional logic
  - Note Node: Annotations and documentation
- **Real-time Validation**: DAG validation with cycle detection
- **Node Counter**: Track active nodes in the pipeline
- **Status Bar**: Real-time feedback and validation messages
- **Dark Theme**: Premium dark theme with glassmorphism UI
- **Authentication**: Secure login/signup with protected routes
- **Responsive Design**: Works across different screen sizes

### Backend
- **Pipeline Validation**: Detects cycles and validates DAG structure
- **REST API**: Clean endpoints for pipeline operations
- **CORS Support**: Configured for frontend integration
- **Authentication**: User authentication with JWT tokens
- **Error Handling**: Comprehensive error messages and responses

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn UI components
- **Graph Library**: React Flow
- **State Management**: Zustand (pipelineStore)
- **HTTP Client**: Axios (via React Query)
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form

### Backend
- **Framework**: FastAPI (Python 3.8+)
- **Server**: Uvicorn
- **Validation**: Pydantic
- **Graph Processing**: NetworkX
- **Authentication**: Python-jose with cryptography
- **Environment**: python-dotenv
- **API Client**: HTTPX

---

## 📁 Project Structure

```
sahil_kumar_technical_assessment/
├── src/                          # Frontend source
│   ├── components/               # React components
│   │   ├── AuthModal.tsx
│   │   ├── Canvas.tsx            # Main pipeline editor
│   │   ├── Sidebar.tsx           # Node selection
│   │   ├── StatusBar.tsx         # Pipeline feedback
│   │   ├── TopBar.tsx            # Header/navigation
│   │   ├── Footer.tsx
│   │   ├── NodeCounter.tsx       # Node statistics
│   │   ├── ProtectedRoute.tsx
│   │   └── ui/                   # Shadcn UI components
│   ├── pages/                    # Page components
│   │   ├── Index.tsx             # Landing page
│   │   ├── Builder.tsx           # Pipeline builder
│   │   ├── NotFound.tsx
│   ├── nodes/                    # Custom node definitions
│   │   ├── BaseNode.tsx          # Base component
│   │   ├── InputNode.tsx
│   │   ├── OutputNode.tsx
│   │   ├── LLMNode.tsx
│   │   ├── TextNode.tsx
│   │   ├── MathNode.tsx
│   │   ├── DelayNode.tsx
│   │   ├── MergeNode.tsx
│   │   ├── ConditionNode.tsx
│   │   └── NoteNode.tsx
│   ├── context/                  # React Context
│   │   └── AuthContext.tsx
│   ├── hooks/                    # Custom hooks
│   │   ├── usePerformance.ts
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   ├── store/                    # State management
│   │   └── pipelineStore.ts
│   ├── services/                 # API services
│   │   └── api.ts
│   ├── utils/                    # Utility functions
│   │   ├── dagHelpers.ts
│   │   └── textParser.ts
│   ├── App.tsx
│   └── main.tsx
├── backend/                      # Python backend
│   ├── main.py                   # FastAPI app
│   ├── schemas.py                # Pydantic models
│   ├── requirements.txt
│   ├── routes/
│   │   └── auth.py               # Authentication endpoints
│   └── utils/
│       ├── dag.py                # DAG validation logic
│       └── security.py           # Auth utilities
├── public/                       # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.js
```

---

## 🚀 Frontend Setup

### Prerequisites
- Node.js 16+ and npm/yarn/bun
- Git

### Installation

1. **Navigate to project root**
```bash
cd sahil_kumar_technical_assessment
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
bun install
```

3. **Environment Variables** (if needed)
Create `.env.local` in the root:
```env
VITE_API_URL=http://localhost:8000
```

4. **Start development server**
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🐍 Backend Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Virtual environment support

### Installation

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

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Environment Variables**
Create `.env` file in the `backend/` directory:
```env
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

5. **Run development server**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The backend API will be available at `http://localhost:8000`

---

## ▶️ Running the Application

### Option 1: Local Development (Recommended)

**Terminal 1 - Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
uvicorn main:app --reload
# Runs on http://localhost:8000
```

Then open http://localhost:5173 in your browser.

### Option 2: Production Build
```bash
# Build frontend
npm run build

# Start backend in production
cd backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🏗️ Architecture & Design Decisions

### Frontend Architecture

**Component Hierarchy**
```
App
├── AuthProvider
  ├── Index (Landing)
  └── ProtectedRoute
    └── Builder
      ├── TopBar
      ├── Sidebar
      ├── Canvas (React Flow)
      ├── NodeCounter
      └── StatusBar
```

**Key Design Patterns**
- **Base Node Pattern**: All nodes extend `BaseNode.tsx` for consistent styling and behavior
- **Config-Driven Architecture**: Node types registered via `nodeConfigs` to minimize boilerplate
- **Custom Hooks**: `usePerformance` for monitoring, `usePerformance` for mobile detection
- **Global State**: Zustand store (`pipelineStore`) for pipeline state management
- **Context API**: Authentication state via `AuthContext`

**Data Flow**
1. User drags node from sidebar → Added to React Flow canvas
2. User connects nodes → Edges created
3. User clicks validate → Send to backend via `/pipelines/parse`
4. Backend validates DAG → Returns validation result
5. Status bar updates with feedback

### Backend Architecture

**API Design**
- RESTful endpoints with clear, consistent naming
- Pydantic models for request/response validation
- CORS middleware for frontend integration
- Error handling with appropriate HTTP status codes

**Validation Pipeline**
```
PipelineData (nodes + edges)
    ↓
validate_pipeline()
    ├── Count nodes and edges
    ├── Build adjacency list
    ├── Detect cycles using DFS
    └── Return validation result
```

**DAG Detection Algorithm**
- Uses depth-first search (DFS) with a recursion stack
- Detects back edges (cycle indicators)
- Time complexity: O(V + E) where V = nodes, E = edges

---

## 📡 API Documentation

### Authentication Endpoints

**POST** `/auth/signup`
```json
Request:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "access_token": "eyJ0eXAi...",
  "token_type": "bearer"
}
```

**POST** `/auth/login`
```json
Request:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response:
{
  "access_token": "eyJ0eXAi...",
  "token_type": "bearer"
}
```

### Pipeline Endpoints

**POST** `/pipelines/parse`
```json
Request:
{
  "nodes": [
    { "id": "1", "type": "input", "data": {}, "position": {} },
    { "id": "2", "type": "output", "data": {}, "position": {} }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2" }
  ]
}

Response:
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true,
  "message": "Pipeline is valid! 2 nodes, 1 edges."
}
```

**GET** `/`
```json
Response:
{
  "message": "Pipeline Parser API is running"
}
```

---

## 🔐 Authentication Flow

1. User signs up/logs in on landing page
2. Backend generates JWT token
3. Token stored in localStorage
4. Protected routes check for valid token
5. API requests include token in Authorization header
6. Backend validates token for secure endpoints

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 5173 already in use**
```bash
npm run dev -- --port 3000
```

**Modules not found**
```bash
rm -rf node_modules
npm install
```

### Backend Issues

**Port 8000 already in use**
```bash
uvicorn main:app --port 8001
```

**Virtual environment not activating**
- Ensure you're using the correct activation command for your OS
- On Windows, use `.venv\Scripts\activate`
- On macOS/Linux, use `source .venv/bin/activate`

**CORS errors**
- Ensure backend CORS origins match your frontend URL
- Modify `origins` list in `backend/main.py` if using different ports

---

## 📝 Development Workflow

### Adding a New Node Type

1. Create component in `src/nodes/NewNode.tsx`
2. Extend `BaseNode.tsx`
3. Add to `nodeConfigs` in Canvas component
4. Style with Tailwind CSS

### Modifying API

1. Update schemas in `backend/schemas.py`
2. Update endpoints in `backend/main.py`
3. Update frontend API service in `src/services/api.ts`
4. Test with both frontend and backend running

### Deployment

**Frontend** (Vercel, Netlify, etc.):
```bash
npm run build
# Deploy the dist/ folder
```

**Backend** (Render, Railway, Heroku, etc.):
```
Push to Git → Deploy runs:
  - pip install -r requirements.txt
  - uvicorn main:app
```

---

## 📄 License

This project is part of a technical assessment.

---

## 👤 Author

Sahil Kumar - Technical Assessment

---

## 🤝 Contributing

This is an assessment project. For improvements or issues, please document them for review.

## Environment Variables
Sensitive values are intentionally omitted. See `.env.example`.

## Future Improvements
- **Pipeline execution engine**: Actually processing data through the nodes.
- **AI tool integrations**: Connecting real LLM APIs to the LLM Node.

