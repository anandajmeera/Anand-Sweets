import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def get_auth_headers():
    # Login as admin from previous tests or create new
    # For simplicity, assuming db persists or re-register handling
    client.post(
        "/api/auth/register",
        json={"email": "inv_admin@example.com", "password": "admin", "full_name": "Admin User"}
    )
    response = client.post(
        "/api/auth/token",
        data={"username": "inv_admin@example.com", "password": "admin"}
    )
    token = response.json().get("access_token")
    return {"Authorization": f"Bearer {token}"}

def test_purchase_sweet():
    headers = get_auth_headers()
    # Create sweet
    create = client.post(
        "/api/sweets",
        json={"name": "Mysore Pak", "category": "Ghee", "price": 15.0, "quantity": 10, "description": "Soft"},
        headers=headers
    )
    sweet_id = create.json()["id"]

    # Purchase 2
    res = client.post(f"/api/sweets/{sweet_id}/purchase?quantity=2", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["quantity"] == 8

def test_restock_sweet():
    headers = get_auth_headers()
    # Assume sweet exists from previous or Create
    create = client.post(
        "/api/sweets",
        json={"name": "Badam Milk", "category": "Drink", "price": 5.0, "quantity": 0, "description": "Milk"},
        headers=headers
    )
    sweet_id = create.json()["id"]

    res = client.post(f"/api/sweets/{sweet_id}/restock?quantity=50", headers=headers)
    assert res.status_code == 200
    data = res.json()
    assert data["quantity"] == 50
