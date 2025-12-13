import sys
from app.db.database import SessionLocal
from app.models.user import User

def promote_user(email):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.is_admin = True
        db.commit()
        print(f"User {email} is now an Admin.")
    else:
        print(f"User {email} not found.")
    db.close()

if __name__ == "__main__":
    if len(sys.argv) > 1:
        promote_user(sys.argv[1])
    else:
        print("Usage: python promote_user.py <email>")
