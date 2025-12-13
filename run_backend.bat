@echo off
cd backend
if not exist venv (
    echo Virtual environment not found. Please run setup first.
    pause
    exit /b
)
call venv\Scripts\activate
echo Starting Backend Server...
python -m uvicorn app.main:app --reload --port 8000
pause
