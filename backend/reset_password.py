from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash
import sys

def reset_password(email, new_password):
    db: Session = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"User found: {user.email}")
            user.hashed_password = get_password_hash(new_password)
            db.commit()
            print(f"Password for {email} has been reset successfully.")
        else:
            print(f"User with email {email} not found.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python reset_password.py <email> <new_password>")
    else:
        reset_password(sys.argv[1], sys.argv[2])
