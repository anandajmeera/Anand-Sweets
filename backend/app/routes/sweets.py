from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.sweet import Sweet
from app.models.user import User
from app.schemas.sweet import SweetCreate, SweetResponse, SweetUpdate
from fastapi.security import OAuth2PasswordBearer
from app.core.config import settings
from jose import jwt, JWTError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")

def get_current_user_dependency(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

router = APIRouter()

@router.post("/", response_model=SweetResponse, status_code=status.HTTP_201_CREATED)
def create_sweet(sweet: SweetCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_dependency)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    db_sweet = Sweet(**sweet.dict())
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

@router.get("/", response_model=List[SweetResponse])
def read_sweets(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    sweets = db.query(Sweet).offset(skip).limit(limit).all()
    return sweets

@router.get("/search", response_model=List[SweetResponse])
def search_sweets(q: str, db: Session = Depends(get_db)):
    sweets = db.query(Sweet).filter(Sweet.name.contains(q)).all()
    return sweets

@router.get("/{sweet_id}", response_model=SweetResponse)
def read_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if sweet is None:
        raise HTTPException(status_code=404, detail="Sweet not found")
    return sweet

@router.put("/{sweet_id}", response_model=SweetResponse)
def update_sweet(sweet_id: int, sweet: SweetUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_dependency)):
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if db_sweet is None:
        raise HTTPException(status_code=404, detail="Sweet not found")
    
    update_data = sweet.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_sweet, key, value)
    
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

@router.delete("/{sweet_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_sweet(sweet_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_dependency)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if db_sweet is None:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db.delete(db_sweet)
    db.commit()
    return None

from app.models.sale import Sale, SaleItem
import uuid

@router.post("/{sweet_id}/purchase")
def purchase_sweet(sweet_id: int, quantity: int, payment_mode: str = "Cash", db: Session = Depends(get_db), current_user: User = Depends(get_current_user_dependency)):
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    if db_sweet.quantity < quantity:
        raise HTTPException(status_code=400, detail="Not enough stock")
    
    # Decrement stock
    db_sweet.quantity -= quantity
    db.add(db_sweet)
    
    # Create Sale Record
    total_price = float(db_sweet.price * quantity)
    bill_no = f"BILL-{uuid.uuid4().hex[:8].upper()}"
    
    sale = Sale(
        bill_number=bill_no,
        total_amount=total_price,
        payment_mode=payment_mode,
        user_id=current_user.id
    )
    db.add(sale)
    db.commit()
    db.refresh(sale)
    
    sale_item = SaleItem(
        sale_id=sale.id,
        sweet_id=db_sweet.id,
        quantity=quantity,
        price_per_unit=db_sweet.price,
        subtotal=total_price
    )
    db.add(sale_item)
    
    db.commit()
    db.refresh(db_sweet)
    return db_sweet

@router.post("/{sweet_id}/restock")
def restock_sweet(sweet_id: int, quantity: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user_dependency)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
    db_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not db_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db_sweet.quantity += quantity
    db.add(db_sweet)
    db.commit()
    db.refresh(db_sweet)
    return db_sweet
