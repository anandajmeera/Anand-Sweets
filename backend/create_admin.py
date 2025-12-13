from app.db.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash
import sys

def create_admin(email, password, full_name):
    db = SessionLocal()
    
    # Check if exists
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print(f"User {email} already exists. Promoting to admin...")
        existing_user.is_admin = True
        db.commit()
        print(f"User {email} is now an Admin.")
        db.close()
        return

    # Create new admin
    hashed_password = get_password_hash(password)
    new_user = User(
        email=email,
        hashed_password=hashed_password,
        full_name=full_name,
        is_admin=True,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    print(f"Successfully created Admin user: {email}")
    db.close()

if __name__ == "__main__":
    if len(sys.argv) == 4:
        create_admin(sys.argv[1], sys.argv[2], sys.argv[3])
    else:
        # Default if no args
        create_admin("owner@anandsweets.com", "owner123", "Owner Anand")
