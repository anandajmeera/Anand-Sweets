from typing import Optional
from pydantic import BaseModel

class SweetBase(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    price: float
    quantity: int

class SweetCreate(SweetBase):
    pass

class SweetUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

class SweetResponse(SweetBase):
    id: int

    class Config:
        orm_mode = True
