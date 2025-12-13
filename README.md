# Anand Sweets - Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with **FastAPI** (Backend) and **React** (Frontend).

## 🚀 Features

- **Authentication**: Secure User Registration & Login (JWT / PBKDF2).
- **Sweets Management**: Browse sweets, Search by name/category.
- **Inventory Control**: Admin panel to Create, Delete, and Restock sweets.
- **Transactions**: Users can purchase sweets, updating stock in real-time with a secure Payment Modal.

## 🛠 Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: SQLite (SQLAlchemy)
- **Auth**: OAuth2 / JWT (PBKDF2 Hashing)
- **Testing**: Pytest

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **State**: React Hooks
- **Routing**: React Router DOM

## 📥 Installation & Setup

1. **Clone the project repository**

2. **Backend Setup**
   ```bash
   cd backend
   # Create virtual environment
   python -m venv venv
   # Activate venv (Windows)
   .\venv\Scripts\activate
   # Install dependencies
   pip install -r requirements.txt
   # Run Tests
   pytest
   # Start Server
   uvicorn app.main:app --reload
   ```
   *Server runs at `http://localhost:8000`*

3. **Frontend Setup**
   Ensure Node.js is installed.
   ```bash
   cd frontend
   # Install dependencies
   npm install
   # Start Dev Server
   npm run dev
   ```
   *Client runs at `http://localhost:5173`*

## 🧪 Running Tests
The project was built using TDD. To verify backend logic:
```bash
cd backend
python -m pytest
```

## 📝 Usage Guide
1. **Register** a new account.
2. **Login** to access the dashboard.
3. Users can **Search** and **Buy** sweets using the **Payment Modal**.
4. Go to `/admin` (Top right link if Admin) to **Add** new sweets or **Restock** existing ones.

## 🎨 Design
- Premium, modern UI using Tailwind CSS.
- Responsive layout for mobile and desktop.
- Custom Animations and Glassmorphism effects.

## 🤖 AI Usage
- **Tools**: Google Gemini (Antigravity Agent)
- **Contribution**: Boilerplate generation, TDD test writing, UI component creation, and Debugging.
