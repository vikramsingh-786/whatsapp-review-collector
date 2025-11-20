# WhatsApp Product Review Collector

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14%2B-336791?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Overview

**WhatsApp Product Review Collector** is a full-stack application designed to streamline product feedback collection through an automated WhatsApp chatbot. Users interact with a conversational interface powered by Twilio's WhatsApp API, and their reviews are instantly stored in a PostgreSQL database.

A modern, real-time **React Dashboard** displays all collected reviews with advanced search, filtering, and analytics capabilities.

---

## 📸 Project Gallery

### 🌓 Light & Dark Mode Support
The dashboard features a fully responsive UI with a toggleable Dark Mode that persists user preference.

| **Light Mode** | **Dark Mode** |
|:---:|:---:|
| ![Light Mode](./frontend/src/assets/lightmode.png) | ![Dark Mode](./frontend/src/assets/darkmode.png) |

### 📱 Responsive & Mobile View
Built with a mobile-first approach using Tailwind CSS.

<div align="center">
  <img src="./frontend/src/assets/dark-responsive.png" alt="Mobile Responsive View" width="300" />
</div>

### 💬 WhatsApp Logic Flow
The backend handles conversation state to collect data in a structured format.

| **Step 1: Initiation** | **Step 2: Completion** |
|:---:|:---:|
| ![Chat Flow Part 1](./frontend/src/assets/chat1.png) | ![Chat Flow Part 2](./frontend/src/assets/chat2.png) |
| *Bot asks for Product & Name* | *Bot collects Review & Confirms* |

---

## ✨ Features

### Backend (FastAPI)
- **Conversational State Machine**: Handles multi-turn conversations (Product → Name → Review) seamlessly.
- **Twilio Integration**: Webhook listener to process real-time WhatsApp messages.
- **PostgreSQL Storage**: Robust data persistence using SQLAlchemy ORM.
- **Clean Architecture**: Separation of concerns using Models, Schemas, and CRUD utilities.

### Frontend (React)
- **Dark Mode**: Fully integrated dark theme with system preference detection and local storage persistence.
- **Component-Based Architecture**: Refactored into reusable modular components (`StatsGrid`, `FilterBar`, `ReviewList`).
- **Real-Time Updates**: Dashboard refreshes instantly upon new data availability.
- **Advanced Filtering**: Search by User/Product/Content and filter by specific products.

---

## 🛠️ Prerequisites

Before running this project, ensure you have the following installed:

| Tool | Version | Purpose |
|------|---------|---------|
| **Python** | 3.9 or higher | Backend runtime |
| **Node.js** | 16.x or higher | Frontend runtime |
| **PostgreSQL** | 14 or higher | Database |
| **Ngrok** | Latest | Local tunnel for Twilio webhook |
| **Twilio Account** | Free Sandbox | WhatsApp API access |

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/vikramsingh-786/whatsapp-review-collector.git
cd whatsapp-review-collector
```

### 2️⃣ Backend Setup

#### Step 1: Create Virtual Environment
```bash
cd backend
python -m venv venv

# Activate:
# Windows: .\venv\Scripts\Activate.ps1
# Mac/Linux: source venv/bin/activate
```

#### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 3: Configure Environment
Create a `.env` file in the `backend` directory:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/reviews_db
```

#### Step 4: Run Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3️⃣ Frontend Setup

#### Step 1: Install Dependencies
```bash
cd ../frontend
npm install
```

#### Step 2: Configure Environment
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:8000
```

#### Step 3: Run React App
```bash
npm run dev
```
The dashboard will launch at `http://localhost:5173`.

---

## 🌐 Twilio & Ngrok Configuration (Critical)

To allow WhatsApp to talk to your local computer, follow these steps:

1.  **Start Ngrok**:
    Open a new terminal and run:
    ```powershell
    .\ngrok http 8000
    ```
2.  **Copy URL**: Copy the HTTPS forwarding URL (e.g., `https://a1b2.ngrok-free.app`).
3.  **Configure Twilio**:
    *   Go to **Twilio Console > Messaging > Settings > WhatsApp Sandbox Settings**.
    *   In the **"When a message comes in"** field, paste your URL and add `/webhook`.
    *   *Example:* `https://a1b2.ngrok-free.app/webhook`
    *   Click **Save**.

---

## 🏗️ Project Architecture

The project follows a clean, modular structure for maintainability and scalability.

### Backend Structure
```text
backend/
├── main.py              # FastAPI entry & webhook logic
├── models.py            # Database tables
├── schemas.py           # Pydantic data validation
├── crud.py              # DB operations
├── database.py          # DB connection setup
└── .env                 # Secrets (GitIgnored)
```

### Frontend Structure
```text
frontend/
├── src/
│   ├── assets/          # Images & Static files
│   ├── components/      # Reusable UI Components
│   │   ├── ThemeToggle.jsx # Dark Mode Switcher
│   │   ├── FilterBar.jsx   # Search & Filter logic
│   │   ├── ReviewList.jsx  # Grid of Review Cards
│   │   └── StatsGrid.jsx   # Top Statistics Cards
│   ├── App.jsx          # Main Layout & State
│   └── main.jsx         # Entry point
└── .env                 # API Configuration
```

---

## 🧠 Technical Decisions

1.  **Component-Based UI**: The frontend was refactored from a monolithic file into smaller components (`StatsGrid`, `ReviewList`) to improve readability and allow for future unit testing.
2.  **Dark Mode Implementation**: Used Tailwind's `darkMode: 'class'` strategy combined with React state and LocalStorage to persist user preferences across sessions.
3.  **In-Memory State**: For the scope of this assignment, conversation state is stored in a Python dictionary. In a production environment, I would replace this with **Redis** to ensure state persistence across server restarts.
4.  **Environment Variables**: All sensitive credentials (DB URLs, API keys) are managed via `.env` files to follow security best practices.

---

## 👤 Author

**Vikram Singh**
*   🔗 [LinkedIn Profile](https://www.linkedin.com/in/vikram-singh-508b08250/)
*   🐙 [GitHub Profile](https://github.com/vikramsingh-786)

---

**⭐ If you found this project helpful, please consider giving it a star!**
```