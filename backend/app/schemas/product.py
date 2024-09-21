from pydantic import BaseModel
from typing import List, Optional
from .product_image import ProductImageResponse

class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryResponse(CategoryBase):
    category_id: int

    class Config:
        from_attributes = True

class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    inventory_count: int
    category_id: Optional[int] = None

class ProductResponse(ProductBase):
    product_id: int
    images: List[ProductImageResponse]
    category: Optional[CategoryResponse] = None

    class Config:
        from_attributes = True
