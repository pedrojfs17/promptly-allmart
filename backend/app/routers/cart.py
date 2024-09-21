from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud import cart as cart_crud
from app.schemas.cart import CartItemCreate, CartResponse, CartCreate
from app.dependencies import get_current_user, get_db
from app.schemas.user import UserResponse

router = APIRouter()

@router.get("/cart", response_model=CartResponse, status_code=status.HTTP_200_OK)
def view_cart(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    cart = cart_crud.get_cart(db, user_id=current_user.user_id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    return cart

@router.post("/cart/clear", response_model=CartResponse, status_code=status.HTTP_200_OK)
def clear_cart(db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    cart = cart_crud.get_cart(db, user_id=current_user.user_id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Clear cart
    cart_crud.clear_cart(db, cart_id=cart.cart_id)

    db.refresh(cart)
    return cart

@router.post("/cart/items", response_model=CartResponse, status_code=status.HTTP_201_CREATED)
def add_cart_item(item: CartItemCreate, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    # Get user cart or create a new one
    cart = cart_crud.get_cart(db, user_id=current_user.user_id)
    if not cart:
        cart = cart_crud.create_cart(db, CartCreate(user_id=current_user.user_id))
    
    # If item is already in cart, update quantity, otherwise add it to cart
    cart_item = cart_crud.get_cart_item(db, cart_id=cart.cart_id, product_id=item.product_id)
    if not cart_item:
        cart_crud.add_cart_item(db, cart_id=cart.cart_id, item=item)
    else:
        cart_crud.update_cart_item(db, cart_item, cart_item.quantity + item.quantity)

    db.refresh(cart)
    return cart

@router.delete("/cart/items/{product_id}", response_model=CartResponse, status_code=status.HTTP_200_OK)
def remove_cart_item(product_id: int, db: Session = Depends(get_db), current_user: UserResponse = Depends(get_current_user)):
    # Get user cart
    cart = cart_crud.get_cart(db, user_id=current_user.user_id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    
    # Remove item from cart
    item = cart_crud.remove_cart_item(db, cart_id=cart.cart_id, product_id=product_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    db.refresh(cart)
    return cart
