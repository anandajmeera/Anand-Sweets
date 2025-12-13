from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List
from datetime import datetime, date, timedelta

from app.db.database import get_db
from app.models.sale import Sale, SaleItem
from app.models.sweet import Sweet
from app.models.user import User
from app.schemas.sale import SaleSchema, SalesStats
from app.routes.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[SaleSchema])
def get_all_sales(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Only admin can view all sales
    if not current_user.is_admin:
         raise HTTPException(status_code=403, detail="Not authorized")
    return db.query(Sale).order_by(Sale.created_at.desc()).all()

@router.get("/stats", response_model=SalesStats)
def get_sales_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    today = date.today()
    
    # Sales Today
    sales_today_query = db.query(func.sum(Sale.total_amount)).filter(func.date(Sale.created_at) == today).scalar()
    sales_today = sales_today_query if sales_today_query else 0.0
    
    # Orders Today
    orders_today = db.query(Sale).filter(func.date(Sale.created_at) == today).count()
    
    # Low Stock Items (< 10)
    low_stock = db.query(Sweet).filter(Sweet.quantity < 10).count()
    
    return SalesStats(
        total_sales_today=sales_today,
        orders_today=orders_today,
        low_stock_items=low_stock
    )
