# AI-Driven Career Analytics & Resume Profiler

A full-stack web application designed to help job seekers optimize their profiles. The application parses a user's resume text, cross-references it against a target job description, and interfaces with the **Gemini 2.5 Flash** model to provide real-time metrics, missing keyword lists, and actionable career improvement strategies.


# web link:
[Resume Analyzer](https://resumeanalyzer0.netlify.app/?utm_source=chatgpt.com)

# demo video:
[resume analyzer](https://canva.link/2tvcusfcgjphlqt)

---

## 🚀 Key Features
- **Dynamic Profile Matching**: Evaluates alignment between resume structures and complex industry requirements.
- **Automated Keyword Extraction**: Instantly flags missing critical technical phrases, frameworks, or tools using specialized prompt constraints.
- **Structured JSON Engine**: Enforces strict LLM output handling, enabling reliable object parsing into dynamic UI feedback views.
- **Asynchronous Execution**: Built on an event-driven Python server architecture to handle third-party API tasks efficiently without blocking main runtime operations.

---

## 🛠️ Architecture & Tech Stack

### Backend Engine
- **Language/Runtime**: Python 3.11+
- **Framework**: FastAPI (Asynchronous REST API)
- **AI Engine**: Google GenAI SDK (Gemini 2.5 Flash Model)

### Frontend Interface
- **Framework**: React.js 18+ (Vite Build Toolchain)
- **State Management**: React Hooks (`useState`, Asynchronous `fetch` abstraction)

---

## 📂 System Folder Structure

```text
ai-resume-analyzer/
├── backend/
│   ├── main.py              # FastAPI application & AI integration pipeline
│   └── requirements.txt     # Python project dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # React Application Entry & UI Layout logic
│   │   └── main.jsx         # Component mounting entrypoint
│   └── package.json         # Node.js project configurations
└── .gitignore               # System file exclude filters (prevents tracking .env/.venv)
---

## 📊 Expected Application Output & Data Schema

### 1. Visual Interface UI
When a resume and job description are submitted through the React dashboard, the application renders a multi-tier profile analysis:
- **Match Score**: A prominent dynamic percentage metric indicating overall structural alignment.
- **Missing Keywords**: Red highlighted badges displaying critical technical phrases or frameworks missing from the profile.
- **Analysis Summary**: A bulleted breakdown of actionable, context-aware career improvements.

### 2. Structured JSON API Response Data
The backend FastAPI server enforces a strict data schema. Below is an exact example of the structured JSON payload returned by the Gemini 2.5 Flash integration layer after an evaluation


