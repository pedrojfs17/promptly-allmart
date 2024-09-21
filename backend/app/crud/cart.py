from sqlalchemy.orm import Session
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.schemas.cart import CartCreate, CartItemCreate

def create_cart(db: Session, cart: CartCreate):
    db_cart = Cart(**cart.model_dump())
    db.add(db_cart)
    db.commit()
    db.refresh(db_cart)
    return db_cart

def get_cart(db: Session, user_id: int):
    return db.query(Cart).filter(Cart.user_id == user_id).first()

def get_cart_item(db: Session, cart_id: int, product_id: int):
    return db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.product_id == product_id).first()

def add_cart_item(db: Session, cart_id: int, item: CartItemCreate):
    db_item = CartItem(**item.model_dump(), cart_id=cart_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
    
def update_cart_item(db: Session, item: CartItem, quantity: int):
    item.quantity = quantity
    db.commit()
    db.refresh(item)
    return item

def remove_cart_item(db: Session, cart_id: int, product_id: int):
    db_item = db.query(CartItem).filter(CartItem.cart_id == cart_id, CartItem.product_id == product_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def clear_cart(db: Session, cart_id: int):
    db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
    db.commit()