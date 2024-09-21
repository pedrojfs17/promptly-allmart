from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud import order as order_crud, cart as cart_crud
from app.schemas.order import OrderCreate, OrderItemCreate, OrderResponse
from app.dependencies import get_current_user, get_db
from app.schemas.user import UserResponse
from typing import List

router = APIRouter()

@router.post("/orders", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    cart = cart_crud.get_cart(db, user_id=current_user.user_id)
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cart is empty")
    
    total_amount = sum(item.product.price * item.quantity for item in cart.items)
    order_create = OrderCreate(user_id=current_user.user_id, total_amount=total_amount)
    order_items = [OrderItemCreate(product_id=item.product_id, quantity=item.quantity, price_at_time=item.product.price) for item in cart.items]
    
    order = order_crud.create_order(db, order=order_create, items=order_items)
    cart_crud.clear_cart(db, cart_id=cart.cart_id)
    return order

@router.get("/orders", response_model=List[OrderResponse])
def read_user_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    orders = order_crud.get_user_orders(db, user_id=current_user.user_id, skip=skip, limit=limit)
    return orders

@router.get("/orders/{order_id}", response_model=OrderResponse)
def read_order(order_id: int, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    order = order_crud.get_order(db, order_id=order_id)
    if not order or order.user_id != current_user.user_id:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
