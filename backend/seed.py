from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine, Base
from app.models.sweet import Sweet
from app.models.user import User
from app.core.security import get_password_hash

def seed_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Seed Admin
    if not db.query(User).filter(User.email == "admin@example.com").first():
        admin = User(
            email="admin@example.com",
            hashed_password=get_password_hash("admin123"),
            full_name="Admin User",
            is_admin=True
        )
        db.add(admin)
        print("Created Admin: admin@example.com / admin123")

    # Seed Sweets
    sweets = [
        {"name": "Motichoor Laddu", "category": "Traditional", "price": 15.0, "quantity": 100, "description": "Delicious soft balls made of gram flour."},
        {"name": "Kaju Katli", "category": "Premium", "price": 25.0, "quantity": 50, "description": "Diamond shaped cashew fudge."},
        {"name": "Gulab Jamun", "category": "Syrup", "price": 10.0, "quantity": 80, "description": "Deep fried dough balls in rose syrup."},
        {"name": "Mysore Pak", "category": "Ghee", "price": 20.0, "quantity": 40, "description": "Rich ghee sweet from Mysore."},
        {"name": "Rasgulla", "category": "Syrup", "price": 12.0, "quantity": 60, "description": "Spongy cottage cheese balls in syrup."},
    ]

    for s in sweets:
        if not db.query(Sweet).filter(Sweet.name == s["name"]).first():
            new_sweet = Sweet(**s)
            db.add(new_sweet)
            print(f"Added Sweet: {s['name']}")

    db.commit()
    db.close()

if __name__ == "__main__":
    seed_db()
