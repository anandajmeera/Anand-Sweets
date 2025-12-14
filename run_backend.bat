@echo off
echo Starting Anand Sweets Backend Server...
cd backend
if not exist ..\venv (
    echo Virtual environment not found. Please run setup first.
    pause
    exit /b
)
call ..\venv\Scripts\activate.bat
echo Backend server starting on http://localhost:8000
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause
