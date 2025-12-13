from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Sale(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    bill_number = Column(String, unique=True, index=True)
    total_amount = Column(Float)
    payment_mode = Column(String) # Cash, UPI, Card, Wallet
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Optional: Link to user if logged in (or keep null for guest, but we require login atm)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")

    items = relationship("SaleItem", back_populates="sale")

class SaleItem(Base):
    __tablename__ = "sale_items"

    id = Column(Integer, primary_key=True, index=True)
    sale_id = Column(Integer, ForeignKey("sales.id"))
    sweet_id = Column(Integer, ForeignKey("sweets.id"))
    quantity = Column(Integer)
    price_per_unit = Column(Float)
    subtotal = Column(Float)

    sale = relationship("Sale", back_populates="items")
    sweet = relationship("app.models.sweet.Sweet")
