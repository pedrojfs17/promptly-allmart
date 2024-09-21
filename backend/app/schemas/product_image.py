from pydantic import BaseModel
from datetime import datetime

class ProductImageBase(BaseModel):
    image_name: str
    image_type: str

class ProductImageResponse(ProductImageBase):
    image_id: int
    product_id: int
    is_primary: bool = False
    created_at: datetime

    class Config:
        from_attributes = True