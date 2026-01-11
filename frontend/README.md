# Pipeline Builder - Frontend

This directory contains the React/TypeScript frontend for the Pipeline Builder application. It is built with Vite, Tailwind CSS, and Shadcn UI.

## 🛠️ Tech Stack
- **Framework**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Graph Library**: React Flow
- **State Management**: Zustand
- **Routing**: React Router v6

## 🚀 Setup & Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configuration (.env):**
    Copy `.env.example` to `.env`.
    ```bash
    cp .env.example .env
    ```
    
    **Required Variables:**
    - `VITE_API_BASE_URL`: URL of the backend API (e.g., `http://localhost:8000`).

## ▶️ Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

> **Note:** The server is configured to run on port **5173** (`http://localhost:5173`) to match the backend's OAuth redirect configuration.

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The output will be generated in the `dist` folder.

## 🧪 Other Scripts
- `npm run lint`: Run ESLint validation.
- `npm run preview`: Preview the production build locally.
