from pydantic import BaseModel
from datetime import datetime
from typing import List
from app.models.order import OrderStatus
from .product import ProductResponse

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int
    price_at_time: float

class OrderItemResponse(OrderItemCreate):
    product: ProductResponse

    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    user_id: int
    total_amount: float

class OrderResponse(OrderCreate):
    order_id: int
    status: OrderStatus
    items: List[OrderItemResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
