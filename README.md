# AI Career Toolkit Frontend

Frontend application for AI Career Toolkit, built with React + Vite.

This UI lets you paste a Job Description and sends it to the backend extractor API,
then renders:

- Job title
- Experience required
- Must-have skills
- Good-to-have skills
- Interview preparation questions

## Tech Stack

- React 19
- Vite 8
- Axios
- ESLint

## Project Structure

```text
AiCareerToolkitFE/
├── README.md                 # This file
└── aicareertoolkit-fe/
    ├── package.json
    ├── src/
    │   ├── main.jsx
    │   └── App.jsx
    └── vite.config.js
```

## Prerequisites

- Node.js 18+
- npm 9+
- Backend running at `http://127.0.0.1:8000`

## Setup

```bash
cd aicareertoolkit-fe
npm install
```

## Run (Development)

```bash
cd aicareertoolkit-fe
npm run dev
```

Vite dev server usually starts at `http://localhost:5173`.

## Build and Preview

```bash
cd aicareertoolkit-fe
npm run build
npm run preview
```

## Available Scripts

From `aicareertoolkit-fe`:

- `npm run dev` - Start dev server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Backend API Dependency

Current frontend request target in code:

- `POST http://127.0.0.1:8000/api/v1/jd/extract`

Payload shape:

```json
{
  "raw_text": "<job description text>"
}
```

Expected response shape:

```json
{
  "job_title": "string",
  "years_of_experience": "string",
  "must_have_skills": ["string"],
  "good_to_have_skills": ["string"],
  "potential_interview_questions": ["string", "string", "string", "string", "string"]
}
```

## Notes

- The API base URL is currently hardcoded in `src/App.jsx`.
- For multi-environment deployment, move API base URL to Vite env variables.

