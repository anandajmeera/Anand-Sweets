from fastapi import FastAPI
from app.routes import auth, sweets, sales

from fastapi.middleware.cors import CORSMiddleware

from app.db.database import engine, Base

# Create Tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Anand Sweets API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(sweets.router, prefix="/api/sweets", tags=["sweets"])
app.include_router(sales.router, prefix="/api/sales", tags=["sales"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Anand Sweets API"}
