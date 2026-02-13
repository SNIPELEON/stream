# Recycling Production Line Manager Selection System

A minimal, standalone system for ranking candidates for a Recycling Production Line Manager role.

## Features
- **Database Schema**: MySQL-compatible schema for candidates, evaluations, and rankings.
- **Data Generation**: Script to generate 40 realistic candidate profiles with AI scores.
- **AI Assessment**: Prompts and rubrics for Crisis Management, Sustainability, and Motivation.
- **Dashboard**: React + Vite + Mantine UI dashboard to visualize candidate rankings and skills.

## Project Structure
- `dashboard/`: React frontend application.
- `schema.sql`: Database schema definition.
- `generate_data.js`: Node.js script to generate synthetic data.
- `data.json`: Generated data used by the frontend.
- `insert_data.sql`: SQL INSERT statements for the generated data.
- `ai_prompts.md`: AI assessment prompts and rubrics.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)

### 1. Data Generation (Optional)
The project comes with pre-generated data. To regenerate:
```bash
npm install
node generate_data.js
```
This will update `data.json` and `insert_data.sql`.

### 2. Run Dashboard
Navigate to the dashboard directory and start the dev server:
```bash
cd dashboard
npm install
npm run dev
```
Open your browser to the URL shown (usually `http://localhost:5173`).

## AI Prompts
See [ai_prompts.md](./ai_prompts.md) for the detailed prompting strategy and evaluation rubrics.
