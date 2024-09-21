-- Clear existing data
TRUNCATE TABLE order_items, orders, cart_items, carts, product_images, products, categories, users RESTART IDENTITY CASCADE;

-- Insert Categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Books', 'Physical and digital books'),
('Clothing', 'Apparel and fashion items'),
('Home & Kitchen', 'Home decor and kitchen appliances');

-- Insert Products
INSERT INTO products (name, description, price, inventory_count, category_id) VALUES
('Smartphone X', 'Latest model with advanced features', 699.99, 50, 1),
('Laptop Pro', 'High-performance laptop for professionals', 1299.99, 30, 1),
('Wireless Earbuds', 'True wireless earbuds with noise cancellation', 129.99, 100, 1),
('The Great Novel', 'Bestselling fiction book', 19.99, 200, 2),
('Cookbook Deluxe', 'Collection of gourmet recipes', 34.99, 75, 2),
('T-shirt Basic', 'Comfortable cotton t-shirt', 14.99, 500, 3),
('Jeans Classic', 'Durable denim jeans', 49.99, 250, 3),
('Smart Home Hub', 'Central control for smart home devices', 129.99, 60, 4),
('Coffee Maker Deluxe', 'Programmable coffee maker with grinder', 89.99, 40, 4);

-- Insert Product Images
INSERT INTO product_images (product_id, image_data, image_name, image_type, is_primary) VALUES
(1, pg_read_binary_file('/images/smartphone.jpg'), 'smartphone.jpg', 'image/jpg', true),
(2, pg_read_binary_file('/images/laptop.png'), 'laptop.png', 'image/png', true),
(3, pg_read_binary_file('/images/earbuds.jpg'), 'earbuds.jpg', 'image/jpg', true),
(4, pg_read_binary_file('/images/book.jpg'), 'book.jpg', 'image/jpg', true),
(5, pg_read_binary_file('/images/cookbook.jpg'), 'cookbook.jpg', 'image/jpg', true),
(6, pg_read_binary_file('/images/tshirt.jpg'), 'tshirt.jpg', 'image/jpg', true),
(7, pg_read_binary_file('/images/jeans.jpg'), 'jeans.jpg', 'image/jpg', true),
(8, pg_read_binary_file('/images/smarthub.png'), 'smarthub.png', 'image/png', true),
(9, pg_read_binary_file('/images/coffeemaker.jpg'), 'coffeemaker.jpg', 'image/jpg', true);

-- Insert Users
-- TODO Add Hashed Passwords
INSERT INTO users (username, email, password_hash) VALUES
('user1', 'user1@example.com', 'hashed_password_1'),
('user2', 'user2@example.com', 'hashed_password_2'),
('user3', 'user3@example.com', 'hashed_password_3');

-- Insert Carts
INSERT INTO carts (user_id) VALUES
(1),
(2),
(3);

-- Insert Cart Items
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 2, 1),
(2, 5, 1),
(3, 6, 3),
(3, 8, 1);

-- Insert Orders
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 959.97, 'processing'),
(2, 1334.98, 'shipped'),
(3, 174.96, 'delivered');

-- Insert Order Items
INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES
(1, 1, 1, 699.99),
(1, 3, 2, 129.99),
(2, 2, 1, 1299.99),
(2, 5, 1, 34.99),
(3, 6, 3, 14.99),
(3, 8, 1, 129.99);
