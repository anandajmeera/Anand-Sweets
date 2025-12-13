from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SaleItemSchema(BaseModel):
    sweet_name: str
    quantity: int
    price_per_unit: float
    subtotal: float

    class Config:
        from_attributes = True

class SaleSchema(BaseModel):
    id: int
    bill_number: str
    total_amount: float
    payment_mode: str
    created_at: datetime
    items: List[SaleItemSchema] = []

    class Config:
        from_attributes = True

class SalesStats(BaseModel):
    total_sales_today: float
    orders_today: int
    low_stock_items: int
