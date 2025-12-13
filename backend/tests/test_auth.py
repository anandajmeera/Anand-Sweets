import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={"email": "test@example.com", "password": "password123", "full_name": "Test User"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == "test@example.com"
    assert "id" in data

def test_login_user():
    # Register first
    client.post(
        "/api/auth/register",
        json={"email": "login@example.com", "password": "password123", "full_name": "Login User"}
    )
    
    response = client.post(
        "/api/auth/token",
        data={"username": "login@example.com", "password": "password123"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
