from pydantic import BaseModel
from datetime import datetime
from typing import List
from .product import ProductResponse

class CartItemBase(BaseModel):
    product_id: int
    quantity: int

class CartItemCreate(CartItemBase):
    pass

class CartItemResponse(CartItemBase):
    product: ProductResponse

    class Config:
        from_attributes = True

class CartCreate(BaseModel):
    user_id: int

class CartResponse(BaseModel):
    cart_id: int
    user_id: int
    items: List[CartItemResponse]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True