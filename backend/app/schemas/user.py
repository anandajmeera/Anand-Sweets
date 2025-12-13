from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    full_name: str
    is_active: bool
    is_admin: bool

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
