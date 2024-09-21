from typing import Optional
from fastapi import Form
from pydantic import BaseModel, EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[EmailStr] = None

class LoginRequestForm:
    def __init__(
        self,
        email: EmailStr = Form(...),
        password: str = Form(..., min_length=8),
    ):
        self.email = email
        self.password = password