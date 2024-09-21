from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreate, OrderItemCreate

def create_order(db: Session, order: OrderCreate, items: list[OrderItemCreate]):
    db_order = Order(**order.model_dump())
    db.add(db_order)
    db.flush()  # This assigns an id to db_order without committing the transaction

    for item in items:
        # Check if product exists and has sufficient inventory
        product = db.query(Product).filter(Product.product_id == item.product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with id {item.product_id} not found")
        if product.inventory_count < item.quantity:
            raise HTTPException(status_code=400, detail=f"Insufficient inventory for product {product.name}")
        
        # Update product inventory
        product.inventory_count -= item.quantity
        
        # Create order item
        db_item = OrderItem(**item.model_dump(), order_id=db_order.order_id)
        db.add(db_item)

    try:
        db.commit()
        db.refresh(db_order)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="An error occurred while creating the order")
    
    return db_order

def get_order(db: Session, order_id: int):
    return db.query(Order).filter(Order.order_id == order_id).first()

def get_user_orders(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(Order).filter(Order.user_id == user_id).offset(skip).limit(limit).all()
