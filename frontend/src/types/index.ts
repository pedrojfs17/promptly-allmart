export type User = {
    user_id: number;
    username: string;
    email: string;
    created_at: string;
};

export type Category = {
    category_id: number;
    name: string;
    description: string | null;
};

export type ProductImage = {
    image_id: number;
    product_id: number;
    image_name: string;
    image_type: string;
    is_primary: boolean;
    created_at: string;
};

export type Product = {
    product_id: number;
    name: string;
    description: string | null;
    price: string;
    inventory_count: number;
    category_id: number | null;
    created_at: string;
    updated_at: string;
    images: ProductImage[];
    category: Category;
};

export type CartItem = {
    product_id: number;
    quantity: number;
    product: Product;
};

export type Cart = {
    cart_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    items: CartItem[];
};

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderItem = {
    product_id: number;
    quantity: number;
    price_at_time: string;
    product: Product;
};

export type Order = {
    order_id: number;
    user_id: number;
    total_amount: string;
    status: OrderStatus;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
};

export type LoginCredentials = {
    email: string;
    password: string;
};

export type Token = {
    access_token: string;
    token_type: string;
};

export type UserCreate = {
    username: string;
    email: string;
    password: string;
};

export type CartItemCreate = {
    product_id: number;
    quantity: number;
};