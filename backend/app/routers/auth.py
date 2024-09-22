from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.auth import create_jwt_token, verify_password
from app.dependencies import get_db
from app.schemas.token import LoginRequestForm, Token
from app.crud import user as user_crud

router = APIRouter()

@router.post("/auth/token", response_model=Token)
def login_for_access_token(form_data: LoginRequestForm = Depends(), db: Session = Depends(get_db)):
    user = user_crud.get_user_by_email(db, form_data.email)
    if not user:
        raise HTTPException(status_code=404, detail="Email not found")
    
    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = create_jwt_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}