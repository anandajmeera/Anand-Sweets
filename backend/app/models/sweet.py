from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Sweet(Base):
    __tablename__ = "sweets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    quantity = Column(Integer)
