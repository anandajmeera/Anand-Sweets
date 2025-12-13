from app.db.database import SessionLocal
from app.models.user import User

def list_users():
    db = SessionLocal()
    users = db.query(User).all()
    print(f"{'ID':<5} {'Email':<30} {'Admin':<10} {'Name'}")
    print("-" * 60)
    for u in users:
        print(f"{u.id:<5} {u.email:<30} {str(u.is_admin):<10} {u.full_name}")
    db.close()

if __name__ == "__main__":
    list_users()
