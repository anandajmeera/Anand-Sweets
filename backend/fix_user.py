from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

def fix_user():
    db: Session = SessionLocal()
    email = "anandrishi141@gmail.com"
    pwd = "anand123"
    
    try:
        # Delete if exists
        user = db.query(User).filter(User.email == email).first()
        if user:
            print(f"Deleting existing user {email}...")
            db.delete(user)
            db.commit()
        
        # Create fresh
        print(f"Creating new user {email}...")
        new_user = User(
            email=email,
            hashed_password=get_password_hash(pwd),
            full_name="Anand Rishi",
            is_admin=True
        )
        db.add(new_user)
        db.commit()
        print("User recreated successfully with password 'anand123' and Admin access.")
            
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    fix_user()
