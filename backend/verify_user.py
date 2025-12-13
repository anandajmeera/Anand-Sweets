from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.user import User
from app.core.security import verify_password
import sys

def verify_user(email, password):
    db: Session = SessionLocal()
    try:
        # Check for user
        users = db.query(User).all()
        found = False
        for user in users:
            print(f"Checking DB User: '{user.email}' (ID: {user.id})")
            if user.email == email or user.email.strip() == email.strip():
                found = True
                print(f"User FOUND. Exact match: {user.email == email}")
                if verify_password(password, user.hashed_password):
                    print("SUCCESS: Password verified correctly!")
                else:
                    print("FAILURE: Password verification FAILED.")
                    # Let's try to reset it again right here to be sure
        
        if not found:
            print(f"User with email '{email}' NOT found in DB.")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    verify_user("anandrishi141@gmail.com", "anand123")
