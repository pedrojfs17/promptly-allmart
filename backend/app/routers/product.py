from io import BytesIO
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.crud import product as product_crud
from app.models.category import Category
from app.models.product_image import ProductImage
from app.schemas.product import CategoryResponse, ProductResponse
from app.dependencies import get_db
from typing import List, Optional


router = APIRouter()

@router.get("/products", response_model=List[ProductResponse])
def read_products(query: Optional[str] = None, category_id: Optional[int] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    if category_id and not db.query(Category).filter(Category.category_id == category_id).first():
        raise HTTPException(status_code=404, detail=f"Category not found")
    products = product_crud.search_products(db, query=query, category_id=category_id, skip=skip, limit=limit)
    return products

@router.get("/products/{product_id}", response_model=ProductResponse)
def read_product(product_id: int, db: Session = Depends(get_db)):
    db_product = product_crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@router.get("/categories", response_model=List[CategoryResponse])
def read_categories(db: Session = Depends(get_db)):
    categories = product_crud.get_categories(db)
    return categories

@router.get("/products/{product_id}/primary-image")
async def get_primary_product_image(product_id: int, db: Session = Depends(get_db)):
    # Try to get the primary image first
    image = db.query(ProductImage).filter(
        ProductImage.product_id == product_id,
        ProductImage.is_primary == True
    ).first()

    # If no primary image, get the first image
    if not image:
        image = db.query(ProductImage).filter(
            ProductImage.product_id == product_id
        ).first()

    if not image:
        raise HTTPException(status_code=404, detail="No image found for this product")

    return StreamingResponse(BytesIO(image.image_data), media_type=image.image_type)

@router.get("/products/{product_id}/images")
async def get_all_product_images(product_id: int, db: Session = Depends(get_db)):
    images = db.query(ProductImage).filter(ProductImage.product_id == product_id).all()

    if not images:
        raise HTTPException(status_code=404, detail="No images found for this product")

    def generate_images():
        for image in images:
            yield (
                b"--frame\r\n"
                b"Content-Type: " + image.image_type.encode() + b"\r\n\r\n" + 
                image.image_data + b"\r\n"
            )

    return StreamingResponse(
        generate_images(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )