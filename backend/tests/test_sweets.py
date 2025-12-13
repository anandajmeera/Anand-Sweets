import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Helper to get auth token
def get_auth_headers():
    client.post(
        "/api/auth/register",
        json={"email": "admin@example.com", "password": "admin", "full_name": "Admin User"}
    )
    response = client.post(
        "/api/auth/token",
        data={"username": "admin@example.com", "password": "admin"}
    )
    token = response.json().get("access_token")
    return {"Authorization": f"Bearer {token}"}

def test_create_sweet():
    headers = get_auth_headers()
    response = client.post(
        "/api/sweets",
        json={"name": "Laddu", "category": "Traditional", "price": 10.0, "quantity": 100, "description": "Tasty"},
        headers=headers
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Laddu"
    assert data["id"] is not None

def test_get_sweets():
    response = client.get("/api/sweets")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_search_sweets():
    # Ensure sweet exists
    headers = get_auth_headers()
    client.post(
        "/api/sweets",
        json={"name": "Kaju Katli", "category": "Premium", "price": 20.0, "quantity": 50, "description": "Cashew"},
        headers=headers
    )
    response = client.get("/api/sweets/search?q=Kaju")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert "Kaju" in data[0]["name"]
