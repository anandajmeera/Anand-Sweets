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

### 🔗 API Endpoints (Core)
*   `POST /api/auth/register` - Register a new user
*   `POST /api/auth/login` - Login and get JWT
*   `GET /api/sweets` - List all sweets
*   `GET /api/sweets/search?q=...` - Search sweets
*   `POST /api/sweets` - Add new sweet (Admin)
*   `PUT /api/sweets/{id}` - Update sweet details (Admin)
*   `DELETE /api/sweets/{id}` - Remove sweet (Admin)
*   `POST /api/sweets/{id}/purchase` - Buy sweet
*   `POST /api/sweets/{id}/restock` - Restock inventory (Admin)

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

## 📸 Screenshots

![Login Page](frontend/src/assets/login_preview.png)
*Login Screen with secure authentication*

![Dashboard](frontend/src/assets/dashboard_preview.png)
*Main Shop Dashboard with Search and Filters*

![Payment](frontend/src/assets/payment_preview.png)
*Secure Payment Modal with Quantity Selection*

## 🤖 My AI Usage

### Tools Used
*   **Google Gemini (Antigravity Agent)**: Primary coding assistant.
*   **Generate Image API**: Used to create realistic assets for sweets.

### How I Used Them
*   **Brainstorming**: "I used Gemini to brainstorm the database schema for the Sales and SaleItems tables."
*   **TDD Workflow**: "I asked the AI to write failing Pytest unit tests for the inventory logic before implementing the endpoints."
*   **Debugging**: "I used the AI to diagnose a tricky CORS issue where the frontend port was dynamic."
*   **UI Design**: "I described the 'Premium Indian Sweet Shop' vibe, and the AI generated the Tailwind CSS classes and color palette."

### Reflection
AI significantly accelerated the boilerplate code generation (FastAPI setups, React components), allowing me to focus on the business logic (inventory management, billing). It also helped enforce the TDD pattern by generating test skeletons first. However, manual review was crucial for fixing specific logical errors in the authentication flow.
