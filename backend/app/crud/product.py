from sqlalchemy.orm import Session
from app.models.product import Product
from app.models.category import Category

def get_product(db: Session, product_id: int):
    return db.query(Product).filter(Product.product_id == product_id).first()

def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Product).offset(skip).limit(limit).all()

def search_products(db: Session, query: str = None, category_id: int = None, skip: int = 0, limit: int = 100):
    products = db.query(Product)
    if query:
        products = products.filter(Product.name.ilike(f"%{query}%"))
    if category_id:
        products = products.filter(Product.category_id == category_id)
    return products.offset(skip).limit(limit).all()

def get_categories(db: Session):
    return db.query(Category).all()