# Anand Sweets - Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with **FastAPI** (Backend) and **React** (Frontend).

## 🌐 Demo

### Live Website (Frontend Only)
**🔗 https://anand-sweets.vercel.app**

> **Note**: The live site showcases the **frontend UI/UX design**. Backend features (authentication, purchases, admin panel) require local setup.

### Full-Stack Demo (Local)
For complete functionality including backend features:

**Prerequisites:**
- Python 3.11+
- Node.js 16+

**Quick Start:**
```bash
# 1. Start Backend (Terminal 1)
cd "Anand Sweets"
run_backend.bat  # or double-click the file

# 2. Start Frontend (Terminal 2)
cd frontend
npm install
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Features Available

| Feature | Live (Vercel) | Local |
|---------|---------------|-------|
| UI/UX Design | ✅ | ✅ |
| Responsive Layout | ✅ | ✅ |
| User Registration | ❌ | ✅ |
| Login/Authentication | ❌ | ✅ |
| Browse Sweets | ✅ | ✅ |
| Purchase Flow | ❌ | ✅ |
| Admin Dashboard | ❌ | ✅ |

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
   ```bash
   git clone https://github.com/anandajmeera/Anand-Sweets.git
   cd Anand-Sweets
   ```

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

## 🚀 Deployment

### Current Status
- **Frontend**: ✅ Deployed on Vercel (https://anand-sweets.vercel.app)
- **Backend**: ⚠️ Local only (requires manual setup)

### Why Backend Isn't Deployed
This is a **portfolio/demo project** designed to showcase:
- Full-stack development skills
- Modern UI/UX design
- Clean, maintainable code
- Professional deployment practices

For a production deployment with full backend functionality, you would need:
1. Cloud database (PostgreSQL/MongoDB)
2. Backend hosting (Render/Railway/Heroku)
3. Environment variable configuration
4. CORS updates for production domains

### Recommended Usage
- **For Portfolio**: Share the Vercel link to showcase UI/UX
- **For Demos**: Run locally to demonstrate full functionality
- **For Code Review**: Direct to GitHub repository

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
